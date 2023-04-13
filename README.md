# uni-wechat-nodejs-shop

## 基本介绍

> **毕设内容**，微信小程序商城内容

技术栈：uniapp+nodejs(express)+mysql+uviewui+vuex

## 基本使用

- 前端部分直接使用**HbuilderX**运行，需要修改自己的微信信息

- 后端内容在server，包含sql文件，运行即可，数据库连接在**config**文件夹，微信信息也需要更改

> 注意：后端数据都在本地运行，如果要真机调试的话，需要做内网穿透（我打算这么搞）或者租个服务器

### 支付

微信小程序，如果要使用微信支付，就需要一些证件（商家），个人不支持支付功能，因此项目没有微信支付

项目也没有做微信支付，只是模拟过程，支付成功和支付失败都会向后端发起请求，修改订单状态

（也可以使用支付宝沙箱，不过我没有看到微信小程序的，这个我看到的只能通过webview拉起一个H5页面，挺麻烦的，所以没有搞）

### 订单

#### 订单状态

-1,CREATE_FAILED,创建订单失败
0,WAIT_BUYER_PAY,待付款
1,PAYMENT_CONFIRMING,付款确认中
2,BUYER_PAYMENT_FAILED,付款失败
3,BUYER_PAYMENT_SUCCESS,待发货
4,SELLER_DELIVERED,待收货
5,BUYER_RECEIVED,已完成
6,GOODS_RETURNING,退货中
7,GOODS_RETURNED_SUCCESS,退货成功
8,ORDER_CLOSED,取消订单



