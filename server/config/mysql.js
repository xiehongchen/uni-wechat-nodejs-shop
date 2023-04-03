// 导入 mysql 模块
const mysql = require('mysql2/promise');

// 创建数据库连接对象，连接池pool
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'uni_wechat_shop',
})

// 向外共享 db 数据库连接对象
module.exports = db
