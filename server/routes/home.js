var express = require('express');
var router = express.Router();
// 导入数据库操作模块
const db = require('../config/mysql')

// 轮播图
router.get('/swiperdata', async(req, res) => {
    const select_sql = `select * from swiperdata`;
    let [results] = await db.query(select_sql);
    const status = res.statusCode;
    res.send({
        message: results,
        meta: {
            status: status,
            msg: '获取成功'
        }
    })
})

// 分类导航
router.get('/cateitems',async (req, res) => {
    const select_sql = `select * from cateitems`;
    let [results] = await db.query(select_sql);
    const status = res.statusCode;
    res.send({
        message: results,
        meta: {
            status: status,
            msg: '获取成功'
        }
    })
})

// 楼层标题
router.get('/floortitle', async(req, res) => {
    const select_sql = "select * from floor_title";
    let [results] = await db.query(select_sql);
    const status = res.statusCode;
    res.send({
        message: results,
        meta: {
            status: status,
            msg: '获取成功'
        }
    })
})

// 楼层内容
router.get('/floordata', async(req, res) => {
    const select_sql = "select * from floor_data";
    let [results] = await db.query(select_sql);
    const status = res.statusCode;
    res.send({
        message: results,
        meta: {
            status: status,
            msg: '获取成功'
        }
    })
})
module.exports = router;
