var express = require('express');
var router = express.Router();
// 导入数据库操作模块
const db = require('../config/mysql')

// 获取商品列表
router.get('/search', async (req, res) => {
    let { pagesize = 10, pagenum = 1, query, cid, ordernum, sortType } = req.query;
    console.log("获取的query值");
    console.log("每页显示多少：" + pagesize);
    console.log("页码值：" + pagenum);
    console.log("query值：" + query);
    console.log("三级分类值：" + cid);
    console.log("排序值：" + ordernum);
    console.log("排序类型：" + sortType);

    let arr = [null, "sales", "goods_price"]
    let type = arr[ordernum - 1];
    console.log(type);
    // 计算偏移量
    let size = parseInt(pagesize);
    console.log(size);
    let offset = pagesize * (pagenum - 1);
    // 根据参数，拼接SQL
    let select_sql = `SELECT goods_id, goods_name, goods_introduce, goods_price, img_md, sales, brand FROM GOODS where 1 = 1`;
    if (cid) {
        select_sql += ` AND cate_3rd = ${cid}`;
    }
    if (type == "goods_price") {
        select_sql += ` order by goods_price ${sortType}`;
    }
    if(type == "sales"){
        select_sql += ` order by sales ${sortType}`;
    }
    if (query) {
        select_sql += ` AND goods_name LIKE '%${query}%'`;
    }
    select_sql += ` LIMIT ? OFFSET ?`
    console.log(select_sql);
    // 查询商品
    let [goods] = await db.query(select_sql, [size, offset]);
    console.log("获取的数据");
    console.log([goods]);
    const total = goods.length;
    const status = res.statusCode;
    console.log([goods].length);
    // 计算总数
    res.json({
        message: {
            total: total,
            pagenum: pagenum,
            goods: goods
        },
        meta: {
            status: status,
            msg: '获取成功'
        }
    });
})

// 获取商品详情
router.get('/detail', async (req, res) => {
    console.log("query值");
    console.log(req.query);
    let { goods_id } = req.query;
    console.log(goods_id);
    const select_sql = `select * from goods where goods_id = ?`;
    let [[goods]] = await db.query(select_sql, [goods_id]);
    const status = res.statusCode;
    //获取成功
    res.json({
        message: goods,
        meta: {
            status: status,
            msg: '获取成功'
        }
    });
})
module.exports = router;
