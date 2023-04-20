var express = require('express');
var router = express.Router();
// 导入数据库操作模块
const db = require('../config/mysql')


// 获取优惠券列表
router.get('/list', async (req, res, next) => {
    let select_sql = 'select * from coupon_list';
    let [result] = await db.query(select_sql);
    console.log(result);
    res.send({
        message: result,
        meta: {
            status: res.statusCode,
            msg: '获取成功'
        }
    });
})

// 获取用户的优惠券列表
router.get('/u-list', async (req, res, next) => {
    console.log(req.query);
    let { status = 0, pageSize = 10, pageNumber = 1 } = JSON.parse(req.query.params);
    let openid = req.openid;
    let size = parseInt(pageSize);
    let offset = size * (pageNumber - 1);
    console.log(status, pageSize, pageNumber, openid, size, offset);
    let select_sql = 'select * from coupon where openid = ? and status = ? limit ? offset ?';

    let [result] = await db.query(select_sql, [openid, status, size, offset]);

    console.log(result);
    res.send({
        message: result,
        meta: {
            status: res.statusCode,
            msg: '获取成功'
        }
    });
})

// 添加优惠劵
router.post('/add', async (req, res, next) => {
    let { couponId } = req.body;
    let openid = req.openid;
    let select_sql = 'select * from coupon_list where id = ?';
    let [results] = await db.query(select_sql, [couponId]);
    console.log(...results);
    let { id, couponType, discount, consumeThreshold, price, endTime } = results[0];

    let insert_sql = 'insert into coupon (openid,couponId,couponType,discount,consumeThreshold,price,endTime) values (?,?,?,?,?,?,?)';

    let [{ affectedRows }] = await db.query(insert_sql, [openid, id, couponType, discount, consumeThreshold, price, endTime]);
    if (affectedRows) {
        res.send({
            meta: {
                status: res.statusCode,
                msg: '领取成功'
            }
        });
    }
})

// 使用优惠劵
router.put('/use', async (req, res) => {
    // console.log(req.body);
    let { id, message } = req.body;
    console.log(id, message);
    let openid = req.openid;
    if (message == 'use') {
        console.log("预使用---");
        // 将所有未使用的优惠券全部初始化再进行预使用
        let sql = `update coupon set message = null where openid = ? and status = 0`
        let [{ affectedRows1 }] = await db.query(sql, [openid])
        console.log(affectedRows1);
        let upadate_sql = 'update coupon set message = ? where openid = ? and id = ?'
        let [{ affectedRows }] = await db.query(upadate_sql, [message,openid, id])
        console.log(affectedRows);
        if (affectedRows) {
            res.send({
                meta: {
                    status: res.statusCode,
                    msg: '预使用成功'
                }
            });
        }

    }
    if(message == 'cancelUse'){
        let sql = `update coupon set message = null where openid = ? and id = ?`
        let [{ affectedRows }] = await db.query(sql, [openid,id])
        if (affectedRows) {
            res.send({
                meta: {
                    status: res.statusCode,
                    msg: '取消使用成功'
                }
            });
        }
    }
    if (message == 'hasUse') {
        let upadate_sql = 'update coupon set status = 1, message = ? where openid = ? and id = ?'
        let [{ affectedRows }] = await db.query(upadate_sql, [message,openid, id])
        if (affectedRows) {
            res.send({
                meta: {
                    status: res.statusCode,
                    msg: '已使用成功'
                }
            });
        }
    }

})

module.exports = router;