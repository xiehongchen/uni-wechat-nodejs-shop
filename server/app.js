var createError = require('http-errors');
// 导入 express 模块
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 导入数据库操作模块
const db = require('./config/mysql')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var homeRouter = require('./routes/home');
var cateRouter = require('./routes/cate');
var goodsRouter = require('./routes/goods');
var ordersRouter = require('./routes/orders');
var addressRouter = require('./routes/address');
var cartRouter = require('./routes/cart');
var couponRouter = require('./routes/coupon');


// 创建 express 的服务器实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json());
// 通过 express.urlencoded() 这个中间件，来解析 表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 定义中间件，用于解析请求头中的用户信息
const getTokenMiddleware = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  // console.log("Authorization数据");
  // console.log(authHeader);
  if (!authHeader) {
    req.token = null;
  } else {
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      req.token = null;
    } else {
      req.token = token;
      // console.log("token数据");
      // console.log(token);
      let sql = `select openid from user where token = ?`
      let [results] = await db.query(sql, [token]);
      // console.log("openid-----------------");
      // console.log(results);
      // console.log(results[0].openid);
      req.openid = results[0].openid;
    } 
  }



  next();
};

// const getOpenidMiddleware = async (req, res, next) => {
//   const token = req.token;
//   let sql = `select openid from user where token = ?`
//   let [results] = await db.query(sql,[token]);
//   console.log(results);
//   req.openid = results.openid;
//   next();
// };


// 使用中间件
app.use(getTokenMiddleware);
// app.use(getOpenidMiddleware);

app.use('/api', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/home', homeRouter);
app.use('/api/cate', cateRouter);
app.use('/api/goods', goodsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/address', addressRouter);
app.use('/api/cart', cartRouter);
app.use('/api/coupon', couponRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
