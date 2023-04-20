var express = require('express');
var router = express.Router();
// 数据库
const db = require('../config/mysql')


router.get('/list', async function (req, res, next) {
    let sql = 'select id,name,tel,province,city,county,street,isDefault from address';
    let [results] = await db.query(sql)
    res.send({
        status: res.statusCode,
        msg: "获取成功!",
        data: results,
    })
});

router.get('/default', async function (req, res, next) {
    let sql = 'select id,name,tel,province,city,county,street from address where isDefault = 1';
    let [results] = await db.query(sql)
    res.send({
        status: res.statusCode,
        msg: "获取成功!",
        data: results,
    })
});


router.put('/edit', async function (req, res, next) {
    let { id, name, tel, province, city, county, street, isDefault } = req.body;
    let openid = req.openid;
    console.log("业务逻辑");
    console.log(openid);
    console.log(id);
    console.log(isDefault);
    // 获取一个连接
    const connection = await db.getConnection();

    try {
        // 开启事务
        await connection.beginTransaction();
        // 判断是否默认地址，如果是默认地址，其他地址取消默认
        if (isDefault == 1) {
            console.log("------------------");
            let update_sql = 'UPDATE address SET isDefault = 0 WHERE openid = ?';
            await connection.query(update_sql, [openid]);
        }
        let sql = `update address set name = ?,tel = ?,province = ?,city = ?,county = ?,street = ?,isDefault = ? where id = ?`;
        let [{ affectedRows: address_affected_rows }] = await connection.query(sql, [name, tel, province, city, county, street, isDefault, id]);
        if (address_affected_rows === 0) {
            await connection.rollback();
            res.json({
                status: res.statusCode,
                msg: "地址address更新失败！"
            });
            return;
        }
        // 一切顺利，提交事务
        await connection.commit();
        // 创建成功
        res.json({
            status: res.statusCode,
            msg: "修改成功!",
        });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({
            status: res.statusCode,
            msg: error.message,
            error,
        });
    }
    // let sql = `update address set name = ?,tel = ?,province = ?,city = ?,county = ?,street = ?,isDefault = ? where id = ?`;
    // let [{ affectedRows }] = await db.query(sql, [name, tel, province, city, county, street, isDefault, id]);
    // if (affectedRows) {
    //     res.json({
    //         status: res.statusCode,
    //         msg: "更新信息成功！",
    //     })
    // }
})

router.post('/add', async function (req, res, next) {
    let { id, name, tel, province, city, county, street, isDefault } = req.body;
    let openid = req.openid;
    console.log(openid);
    console.log(id);
    console.log(isDefault);

       // 获取一个连接
    const connection = await db.getConnection();

    try {
        // 开启事务
        await connection.beginTransaction();
        // 判断是否默认地址，如果是默认地址，其他地址取消默认
        if (isDefault == 1) {
            console.log("------------------");
            let update_sql = 'UPDATE address SET isDefault = 0 WHERE openid = ?';
            await connection.query(update_sql, [openid]);
            console.log("设置默认成功");
        }
        let sql = `insert address value(?,?,?,?,?,?,?,?,?)`;
        let [{ affectedRows: address_affected_rows }] = await connection.query(sql, [id, openid, name, tel, province, city, county, street, isDefault]);
        console.log(address_affected_rows);
        if (address_affected_rows === 0) {
            console.log("增加失败");
            await connection.rollback();
            res.json({
                status: res.statusCode,
                msg: "地址address增加失败！"
            });
            return;
        }
        console.log("增加成功1");
        // 一切顺利，提交事务
        await connection.commit();
        console.log("增加成功2");
        // 创建成功
        res.json({
            status: res.statusCode,
            msg: "增加address成功!",
        });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({
            status: res.statusCode,
            msg: error.message,
            error,
        });
    }
})

router.post('/delete', async function (req, res, next) {
    let { id } = req.body;
    console.log(id);
    let sql = `delete from address where id = ?`;
    let [{ affectedRows }] = await db.query(sql, [id]);
    if (affectedRows) {
        res.json({
            status: res.statusCode,
            msg: "删除信息成功！",
        })
    }
})


module.exports = router;