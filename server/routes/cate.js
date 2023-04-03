var express = require('express');
var router = express.Router();
// 导入数据库操作模块
const db = require('../config/mysql')

/* GET users listing. */
router.get('/list', async (req, res, next) => {
    const select_sql = `select * from category`;
    let [results] = await db.query(select_sql);
    // 筛选出一级菜单
    let cate_1st = results.filter((item) => item.cate_pid === 0);
    console.log("一级菜单");
    console.log(cate_1st);
    // 转换为树形结构--递归函数
    const parseToTree = function (list) {
        return list.map((parent) => {
            let children = results.filter((child) => child.cate_pid === parent.cate_id);
            if (children.length) {
                return { ...parent, children: parseToTree(children) }
            } else {
                return { ...parent }
            }
        });
    }
    // 生成树形菜单
    let tree_menu = parseToTree(cate_1st);
    // 获取当前状态码
    const status = res.statusCode;
    res.json({
        message: tree_menu,
        meta: {
            status: status,
            msg: '获取成功'
        }
    })
});



module.exports = router;
