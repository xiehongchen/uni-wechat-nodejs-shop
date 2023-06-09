var express = require('express');
var router = express.Router();
const axios = require('axios');
// JSON Web Token
const jwt = require("jsonwebtoken");
// 微信小程序
let { appid, appSecret } = require('../config/wx');
// 数据库
const db = require('../config/mysql')


router.post('/token', async function (req, res, next) {
  let { code } = req.body;
  console.log("wx.login得到的code");
  console.log(code);

  // 请求微信API，获取OpenID 
  let url = 'https://api.weixin.qq.com/sns/jscode2session';
  /**
   * openid:用户唯一标识
   * session_key:会话密钥
   * errcode:错误码
   * errmsg:错误信息
   */
  let { status, statusText, data: { openid, unionid, session_key, errcode, errmsg } } = await axios.get(url, {
    params: { appid, secret: appSecret, js_code: code, grant_type: "authorization_code" }
  })
  console.log("返回状态");
  console.log(status);
  console.log(statusText);
  console.log("返回数据");
  console.log(openid);
  console.log(session_key);
  console.log(unionid);
  console.log(errcode);
  console.log(errmsg);

  if (status !== 200) {
    res.json({
      status: res.statusCode,
      msg: statusText
    });
    return;
  }

  // 微信api返回错误
  if (errcode) {
    res.json({
      status: res.statusCode,
      msg: "微信API错误"
    });
    return;
  }
  // 生成token
  let token = jwt.sign({ openid, session_key }, 'secret');
  // 查询数据库中是否有此openid
  let select_sql = 'SELECT * FROM user WHERE openid = ?';
  let [results] = await db.query(select_sql, [openid]);
  // 如果没有此openid，插入新的数据
  if (results.length === 0) {
    // 不可以把解析出来的openid和session_key直接返回给前端，会造成信息安全问题
    let insert_sql = 'INSERT INTO user (openid,session_key,token) VALUES (?,?,?)';
    let [{ affectedRows: insert_affectedRows }] = await db.query(insert_sql, [openid, session_key,token]);
    console.log(insert_affectedRows);
    if (insert_affectedRows > 0) {
      res.json({
        status: res.statusCode,
        token: token
      });
    }
    return;
  }
  // 如果有此openid，更新session_key的数据
  let update_sql = 'UPDATE user SET session_key = ? WHERE openid = ?';
  let [{ affectedRows: update_affectedRows }] = await db.query(update_sql, [session_key, openid]);
  if (update_affectedRows > 0) {
    res.json({
      status: res.statusCode,
      token: token
    });
  }
});

// 更改用户信息
router.put('/info', async (req, res) => {
  let  {nickName, gender, avatarUrl, country, province, birth,city}  = req.body;
  console.log(nickName);
  const  token  = req.token;
  console.log(token);
  let sql = `UPDATE user SET nickname = ?, sex = ?, avatar = ?, country = ?, province = ?, city = ?, birth = ? WHERE token = ?`;
  let [{ affectedRows }] = await db.query(sql, [nickName, gender, avatarUrl, country, province, city, birth, token]);
  console.log(affectedRows);
  if (affectedRows) {
    res.json({
      status: res.statusCode,
      msg: "存储信息成功！",
    })
  }
});


// 删除用户信息
router.delete('/delete', async (req, res) => {
  const  token  = req.token;
  console.log(token);
  let sql = `DELETE FROM user WHERE token = ?`;
  let [{ affectedRows }] = await db.query(sql, [token]);
  if (affectedRows) {
    res.json({
      status: res.statusCode,
      msg: "删除成功！",
    })
  }
});

module.exports = router;
