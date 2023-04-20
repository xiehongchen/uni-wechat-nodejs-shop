var express = require('express');
var router = express.Router();
// 数据库
const db = require('../config/mysql')

//引入支付宝沙箱配置
const alipaySdk = require('../config/alipay.js');
const AlipayFormData = require('alipay-sdk/lib/form').default;

// 订单列表
router.get('/list', async function (req, res, next) {
    console.log(req.query);
    let { pageSize = 4, pageNumber = 1, status = 'ALL' } = JSON.parse(req.query.params);
    // console.log(pageSize);
    let openid = req.openid;
    // 计算偏移量
    let size = parseInt(pageSize);
    let offset = size * (pageNumber - 1);
    let code = 0;
    if (status !== 'ALL') {
        let select_sql = 'select code from order_status where name = ?'
        let [results] = await db.query(select_sql, [status]);
        console.log(results[0].code);
        code = results[0].code;
    }

    // 查询订单信息
    let order_sql = `SELECT o.id, DATE_FORMAT(o.create_time,'%Y-%m-%d %H:%i:%s') AS create_time, o.payment, os.text AS status, os.name AS statusName FROM orders o JOIN order_status os ON o.order_state = os.CODE WHERE o.openid = ?`;
    // 附加订单状态查询
    if (status !== 'ALL') {
        order_sql += ` AND o.order_state = ${code}`;
    }
    // 按照创建时间排序
    order_sql += ` ORDER BY o.create_time DESC LIMIT ? OFFSET ?`;
    let [orders] = await db.query(order_sql, [openid, size, offset]);

    // 查询订单总数
    let total_sql = `SELECT COUNT(*) AS total FROM orders WHERE openid = ?`;
    // 附加订单状态查询
    if (status !== 'ALL') {
        total_sql += ` AND order_state = ${code}`;
    }
    let [total] = await db.query(total_sql, [openid]);
    // console.log(total);
    // 查询订单商品信息
    let goods_sql = `SELECT g.brand, g.goods_id, g.goods_name, g.img_md, og.goods_num, og.goods_price, og.order_id FROM ( SELECT id FROM orders WHERE openid = ?`;
    if (status !== 'ALL') {
        goods_sql += ` AND order_state = ${code}`;
    }
    goods_sql += ` ORDER BY create_time DESC LIMIT ? OFFSET ? ) AS o JOIN order_goods og ON og.order_id = o.id JOIN goods g ON g.goods_id = og.goods_id`;
    let [goods] = await db.query(goods_sql, [openid, size, offset]);
    console.log(goods);
    // // 循环遍历给订单数组添加订单商品信息
    orders.forEach((order) => {
        console.log(order);
        order.allowOperation = {}
        if (order.status === '待付款') {
            order.allowOperation.pay = true;
            order.allowOperation.cancel = true;
        } else if (order.status === '待发货' || order.status === '待收货') {
            order.allowOperation.cancel = true;
        } else if (order.status === '付款失败') {
            order.allowOperation.again = true;
            order.allowOperation.cancel = true;
        }
        order.goodsList = goods.filter((item) => item.order_id === order.id);
    });
    // console.log(orders);
    // 获取成功
    res.json({
        status: res.statusCode,
        msg: "获取成功!",
        data: orders,
        ...total[0],
    });
});



// 生成订单
router.post('/create', async function (req, res) {
    console.log(req.body);
    let { addressId, payment, goodsList, couponid, lastPrice } = req.body;
    let openid = req.openid;
    console.log(addressId);
    console.log(payment);
    console.log(goodsList);

    // 获取商品的id
    let goodsId = goodsList.map((item) => item.goods_id);
    console.log(goodsId);
    let select_sql = 'select inventory from goods where goods_id in (?)'
    const connection = await db.getConnection();
    let [results] = await connection.query(select_sql, [goodsId]);
    console.log(results);
    // 遍历每一个商品是否充足，every碰到有为false的，即终止执行
    let isAllPassed = results.every(async function (item, index) {
        let { goods_id, goods_count } = goodsList[index];
        // console.log(goods_id);
        // console.log(goods_count);
        let isPassed = item.inventory >= goods_count;
        // console.log(isPassed);
        if (!isPassed) {
            let sql = `select goods_name from goods where goods_id = ?`
            let [name] = await connection.query(sql, [goods_id])
            // console.log(name[0].goods_name);
            res.json({
                status: 400,
                msg: `${name[0].goods_name}的库存不足！`,
                data: { goods_id }
            })
        }
        return isPassed;
    })

    // 库存不足,终止执行
    if (isAllPassed === false) {
        return;
    }

    try {
        // 开启事务
        await connection.beginTransaction();
        // 拼接减库存sql
        // update goods set inventory = case id when 3 then inventory - 2 when 4 then inventory - 1 end where id in (2,3) 
        let update_sql = `update goods set inventory = CASE goods_id `;
        goodsList.forEach(function (item, indx) {
            update_sql += `when ${item.goods_id} then inventory - ${item.goods_count} `
        })
        update_sql += `END where goods_id in (?);`

        // 1、库存充足
        let [{ affectedRows: update_affected_rows }] = await connection.query(update_sql, [goodsId]);
        // console.log(update_affected_rows);
        if (update_affected_rows === 0) {
            await connection.rollback();
            res.json({
                status: res.statusCode,
                msg: "商品goods减库存失败！"
            });
            return;
        }
        // console.log("1");
        // 2、订单表生成新订单
        let insert_sql = `insert into orders (openid,coupon_id,payment,last_price,create_time) values (?,?,?,?,CURRENT_TIMESTAMP())`;
        let [{ insertId, affectedRows: insert_affected_rows }] = await connection.query(insert_sql, [openid, couponid, payment, lastPrice]);
        // console.log("插入");
        console.log(insertId);
        if (insert_affected_rows === 0) {
            await connection.rollback();
            res.json({ status: res.statusCode, msg: "生成新订单orders失败！" });
            return;
        }
        // console.log("2");
        // 3、存储收货地址快照
        let copy_sql = `INSERT INTO order_address (order_id, name, tel, province, city, county, street) SELECT (?), name, tel, province, city, county, street FROM address WHERE id = ?`;
        let [{ affectedRows: copy_affected_rows }] = await connection.query(copy_sql, [insertId, addressId]);
        if (copy_affected_rows === 0) {
            await connection.rollback();
            res.json({ status: res.statusCode, msg: "生成收货地址快照order_address失败！" });
            return;
        }
        // console.log("3");
        // 4、添加order-goods
        let cut_sql = 'insert into order_goods (order_id, goods_id, goods_num, goods_price) SELECT (?), c.goods_id, c.goods_num, g.goods_price FROM cart c JOIN goods g ON g.goods_id = c.goods_id WHERE c.openid = ? AND c.goods_id IN (?) ';
        let [{ affectedRows: cut_affected_rows }] = await connection.query(cut_sql, [insertId, openid, goodsId]);
        if (cut_affected_rows === 0) {
            await connection.rollback();
            res.json({ status: res.statusCode, msg: "转移订单商品order_goods失败！" });
            return;
        }
        // console.log("4");
        // 5、删除对应商品
        let delete_sql = 'DELETE FROM cart WHERE openid = ? AND goods_id IN (?)';
        let [{ affectedRows: delete_affected_rows }] = await connection.query(delete_sql, [openid, goodsId]);
        if (delete_affected_rows === 0) {
            await connection.rollback();
            res.json({ status: res.statusCode, msg: "移除购物车商品cart失败！" });
            return;
        }

        // 6、删除对应的优惠券
        let use_sql = 'update coupon set status = 1 where openid =? and id =?';
        let [{ affectedRows: update1_affected_rows }] = await connection.query(use_sql, [openid, couponid]);
        if (update1_affected_rows === 0) {
            await connection.rollback();
            res.json({ status: res.statusCode, msg: "使用优惠券失败！" });
            return;
        }


        // console.log("5");
        // 一切顺利，提交事务
        await connection.commit();
        // 创建成功
        res.json({
            status: res.statusCode,
            msg: "success!",
            data: { order_id: insertId }
        });

    } catch (error) {
        console.log(error);
        await connection.rollback();
        res.status(500).json({
            status: res.statusCode,
            msg: error.message,
            error,
        });
    }
})


// 支付
router.put('/pay', async function (req, res) {
    let { order_id, payStatus } = req.body;
    let select_sql = 'select code from order_status where name = ?';
    let [code] = await db.query(select_sql, [payStatus]);
    console.log(code);
    let update_sql = 'update orders set order_state = ? where id = ?';
    let [results] = await db.query(update_sql, [code[0].code, order_id]);
    console.log(results);
    res.send({
        status: res.statusCode,
        msg: '获取成功'
    })
})


// 取消订单
router.put('/cancel', async function (req, res) {
    console.log(req.body);
    let { order_id, reason } = req.body;
    let update_sql = 'update orders set order_state = 8, remarks = ? where id = ?';
    let [{ affectedRows }] = await db.query(update_sql, [reason, order_id]);
    if (affectedRows) {
        res.json({
            status: res.statusCode,
            msg: "取消订单成功！",
        })
    }
});




module.exports = router;