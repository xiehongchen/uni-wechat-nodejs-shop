var express = require('express');
var router = express.Router();
// 数据库
const db = require('../config/mysql')


// 添加购物车数据
router.post('/add', async function (req, res) {
    console.log(req.body);
    let { goods_id } = req.body;
    let openid = req.openid;
    let insert_sql = `insert into cart (openid,goods_id,goods_num,create_time) values (?,?,'1',CURRENT_TIMESTAMP())`
    let [{ affectedRows }] = await db.query(insert_sql, [openid, goods_id]);
    if (affectedRows > 0) {
        res.json({
            status: res.statusCode,
            msg: '添加商品到购物车成功！'
        });
    }
})

// 编辑购物车数据
router.put('/edit', async function (req, res) {
    console.log(req.body);
    let {goods:{goods_id,goods_count}} = req.body;
    console.log(goods_id);
    let update_sql = `update cart set goods_num = ? where goods_id = ?`
    let [{ affectedRows }] = await db.query(update_sql, [goods_count, goods_id]);
    if (affectedRows > 0) {
        res.json({
            status: res.statusCode,
            msg: '添加商品到购物车成功！'
        });
    }

})

// 删除购物车数据
router.post('/delete', async function (req, res) {
    // console.log(req.body);
    let { goods_id } = req.body;
    let delete_sql = 'delete from cart where goods_id = ?'
    let [{ affectedRows }] = await db.query(delete_sql, [goods_id]);
    if (affectedRows > 0) {
        res.json({
            status: res.statusCode,
            msg: '删除商品成功！'
        });
    }
})


// 更改购物车数据
router.put('/edit', async function (req, res) {

})


module.exports = router;