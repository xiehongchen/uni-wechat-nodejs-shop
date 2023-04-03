create database uni_wechat_shop;
use uni_wechat_shop;

-- ----------------------------
-- 首页轮播图
-- ----------------------------
drop table if exists swiperdata;
create table swiperdata
(
    goods_id  int                                                     NOT NULL AUTO_INCREMENT,
    image_src varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品轮播图片',
    PRIMARY KEY (goods_id) USING BTREE
);
-- ----------------------------
-- 首页轮播图数据
-- ----------------------------
insert into swiperdata
values (1, 'http://localhost:3000/images/home/swiper1.jpg'),
       (2, 'http://localhost:3000/images/home/swiper2.jpg'),
       (3, 'http://localhost:3000/images/home/swiper3.jpg');
-- ----------------------------
-- 首页分类导航
-- ----------------------------
drop table if exists cateitems;
create table cateitems
(
    name      varchar(100)                                            NOT NULL,
    image_src varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
);
-- ----------------------------
-- 首页分类导航数据
-- ----------------------------
insert into cateitems
values ('分类', 'http://localhost:3000/images/home/icon1.jpg'),
       ('秒杀拍', 'http://localhost:3000/images/home/icon2.jpg'),
       ('超市购', 'http://localhost:3000/images/home/icon3.jpg'),
       ('母婴品', 'http://localhost:3000/images/home/icon4.jpg');
-- ----------------------------
-- 首页楼层标题
-- ----------------------------
drop table if exists floor_title;
create table floor_title
(
    name      varchar(100)                                            NOT NULL,
    image_src varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
);
-- ----------------------------
-- 首页楼层标题数据
-- ----------------------------
insert into floor_title
values ('时尚女装', 'http://localhost:3000/images/home/floor-title1.png'),
       ('户外运动', 'http://localhost:3000/images/home/floor-title2.png'),
       ('箱包配饰', 'http://localhost:3000/images/home/floor-title3.png');
-- ----------------------------
-- 首页楼层内容
-- ----------------------------
drop table if exists floor_data;
create table floor_data
(
    name      varchar(100)                                            NOT NULL,
    image_src varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    width     varchar(100)                                            NOT NULL
);
-- ----------------------------
-- 首页楼层内容数据
-- ----------------------------
insert into floor_data
values ('服饰', 'http://localhost:3000/images/home/floor10.png', 232),
       ('热门', 'http://localhost:3000/images/home/floor11.png', 233),
       ('爆款', 'http://localhost:3000/images/home/floor12.png', 233),
       ('春季', 'http://localhost:3000/images/home/floor13.png', 233),
       ('心动', 'http://localhost:3000/images/home/floor14.png', 233),
       ('户外', 'http://localhost:3000/images/home/floor20.png', 232),
       ('登山包', 'http://localhost:3000/images/home/floor21.png', 273),
       ('手套', 'http://localhost:3000/images/home/floor22.png', 193),
       ('运动鞋', 'http://localhost:3000/images/home/floor23.png', 193),
       ('冲锋衣', 'http://localhost:3000/images/home/floor24.png', 273),
       ('饰品', 'http://localhost:3000/images/home/floor30.png', 232),
       ('胸针', 'http://localhost:3000/images/home/floor31.png', 263),
       ('手链', 'http://localhost:3000/images/home/floor32.png', 203),
       ('水晶项链', 'http://localhost:3000/images/home/floor33.png', 193),
       ('情侣表', 'http://localhost:3000/images/home/floor34.png', 273);
-- ----------------------------
-- 首页分类
-- ----------------------------
drop table if exists cateitems;
create table cateitems
(
    name      varchar(100)                                            NOT NULL,
    image_src varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
);
-- ----------------------------
-- 首页分类数据
-- ----------------------------
insert into cateitems
values ('分类', 'http://localhost:3000/images/home/icon1.jpg'),
       ('秒杀拍', 'http://localhost:3000/images/home/icon2.jpg'),
       ('超市购', 'http://localhost:3000/images/home/icon3.jpg'),
       ('母婴品', 'http://localhost:3000/images/home/icon4.jpg');
-- ----------------------------
-- 分类
-- ----------------------------
DROP TABLE IF EXISTS category;
CREATE TABLE category
(
    `cate_id`    int                                                     NOT NULL AUTO_INCREMENT,
    `cate_name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
    `cate_pid`   int                                                     NOT NULL COMMENT '父级id',
    `cate_level` int                                                     NULL DEFAULT NULL COMMENT '层级',
    `cate_icon`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    PRIMARY KEY (`cate_id`) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 139
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci COMMENT = '商品分类'
  ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 分类数据
-- ----------------------------
insert into category
values (1, '家电', 0, 0, ''),
       (2, '手机相机', 0, 0, ''),
       (3, '电脑办公', 0, 0, ''),
       (4, '电视', 1, 1, ''),
       (5, '空调', 1, 1, ''),
       (6, '冰箱', 1, 1, ''),
       (7, '品牌', 2, 1, ''),
       (8, '配件', 2, 1, ''),
       (9, '电脑整机', 3, 1, ''),
       (10, '电脑外设', 3, 1, ''),
       (11, '曲面电视', 4, 2, 'http://localhost:3000/images/cate/11.jpg'),
       (12, '海视', 4, 2, 'http://localhost:3000/images/cate/12.jpg'),
       (13, '夏普', 4, 2, 'http://localhost:3000/images/cate/13.jpg'),
       (14, '创维', 4, 2, 'http://localhost:3000/images/cate/14.jpg'),
       (15, '变频空调', 5, 2, 'http://localhost:3000/images/cate/15.jpg'),
       (16, '立柜空调', 5, 2, 'http://localhost:3000/images/cate/16.jpg'),
       (17, '挂壁空调', 5, 2, 'http://localhost:3000/images/cate/17.jpg'),
       (18, '中央空调', 5, 2, 'http://localhost:3000/images/cate/18.jpg'),
       (19, '对开门冰箱', 6, 2, 'http://localhost:3000/images/cate/19.jpg'),
       (20, '多门冰箱', 6, 2, 'http://localhost:3000/images/cate/20.jpg'),
       (21, '三门冰箱', 6, 2, 'http://localhost:3000/images/cate/21.jpg'),
       (22, '十字对开门', 6, 2, 'http://localhost:3000/images/cate/22.jpg'),
       (23, '荣耀', 7, 2, 'http://localhost:3000/images/cate/23.jpg'),
       (24, '华为', 7, 2, 'http://localhost:3000/images/cate/24.jpg'),
       (25, 'oppo', 7, 2, 'http://localhost:3000/images/cate/25.jpg'),
       (26, 'vivo', 7, 2, 'http://localhost:3000/images/cate/26.jpg'),
       (27, '移动电源', 8, 2, 'http://localhost:3000/images/cate/27.jpg'),
       (28, '手机耳机', 8, 2, 'http://localhost:3000/images/cate/28.jpg'),
       (29, '轻薄本', 9, 2, 'http://localhost:3000/images/cate/29.jpg'),
       (30, '平板电脑', 9, 2, 'http://localhost:3000/images/cate/30.jpg'),
       (31, '台式机', 9, 2, 'http://localhost:3000/images/cate/31.jpg'),
       (32, '一体机', 9, 2, 'http://localhost:3000/images/cate/32.jpg'),
       (33, '鼠标', 10, 2, 'http://localhost:3000/images/cate/33.jpg'),
       (34, '键盘', 10, 2, 'http://localhost:3000/images/cate/34.jpg'),
       (35, '电脑音箱', 10, 2, 'http://localhost:3000/images/cate/35.jpg');

-- ----------------------------
-- 商品详情
-- ----------------------------
DROP TABLE IF EXISTS goods;
CREATE TABLE goods
(
    goods_id        int                                                      NOT NULL AUTO_INCREMENT,
    cate_1st        int                                                      NOT NULL COMMENT '一级分类id',
    cate_2nd        int                                                      NOT NULL COMMENT '二级分类id',
    cate_3rd        int                                                      NULL DEFAULT NULL COMMENT '三级分类id',
    goods_name      varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL COMMENT '商品名称',
    goods_introduce varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL COMMENT '商品介绍',
    goods_price     decimal(10, 2)                                           NOT NULL COMMENT '商品价格',
    discount        decimal(10, 0)                                           NULL DEFAULT NULL COMMENT '折扣',
    inventory       int                                                      NOT NULL COMMENT '库存',
    sales           int                                                      NOT NULL COMMENT '销售量',
    img_lg          varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL COMMENT '商品主图-720',
    img_md          varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL COMMENT '商品主图-360',
    pics            varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL COMMENT '商品轮播图片',
    brand           varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci  NULL DEFAULT NULL COMMENT '商品品牌',
    goods_details   varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品详情',
    freight         decimal(10, 0)                                           NULL DEFAULT 0 COMMENT '商品运费',
    create_time     datetime                                                 NULL DEFAULT NULL COMMENT '创建时间',
    update_time     datetime                                                 NULL DEFAULT NULL COMMENT '更新时间',
    PRIMARY KEY (goods_id) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 39
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci COMMENT = '商品表'
  ROW_FORMAT = DYNAMIC;
-- ----------------------------
-- 商品详情数据
-- ----------------------------
insert into goods
values (1, 3, 9, 29, '机械师', '【9月20号0:00首发，预约享12期免息特权，仅此一天】【鎏金3D金属A壳】【1677万色RGB背光键盘】【IPS雾面屏】机械师',
        6999.00, 9, 100, 2,
        'http://localhost:3000/images/goods/1_720.jpg',
        'http://localhost:3000/images/goods/1_360.jpg',
        'http://localhost:3000/images/goods/11.jpg,http://localhost:3000/images/goods/12.jpg,http://localhost:3000/images/goods/13.jpg,http://localhost:3000/images/goods/14.jpg',
        '机械师',
        '<p><img src=\"http://localhost:3000/images/details/1a.jpg\" style=\"max-width:100%;\"><img src=\"http://localhost:3000/images/details/1b.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/1c.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/1d.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/1e.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/1f.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/1g.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/.jpg\" style=\"max-width: 100%;\"><br></p>',
        0, now(), now()),
       (2, 1, 4, 11, '曲面电视', '【京东配送】AOC C2791VHE/WS 27英寸 1800R曲率 VA广视角 家用电竞双实力 不闪屏曲面电视',
        1249.00, 8, 100, 5,
        'http://localhost:3000/images/goods/2_720.jpg',
        'http://localhost:3000/images/goods/2_360.jpg',
        'http://localhost:3000/images/goods/21.jpg,http://localhost:3000/images/goods/22.jpg,http://localhost:3000/images/goods/23.jpg,http://localhost:3000/images/goods/24.jpg',
        'AOC',
        '<p><img src=\"http://localhost:3000/images/details/2a.jpg\" style=\"max-width:100%;\"><img src=\"http://localhost:3000/images/details/2b.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/2c.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/2d.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/2e.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/2f.jpg\" style=\"max-width: 100%;\"><br></p>',
        0, now(), now()),
       (3, 3, 9, 31, '电脑主机', '京天（KOTIN）第八代i5 8400/GTX1050Ti 4GD独显吃鸡游戏组装机DIY台式组装电脑主机',
        4599.00, 9, 1000, 8,
        'http://localhost:3000/images/goods/3_720.jpg',
        'http://localhost:3000/images/goods/3_360.jpg',
        'http://localhost:3000/images/goods/31.jpg,http://localhost:3000/images/goods/32.jpg,http://localhost:3000/images/goods/33.jpg',
        '京天',
        '<p><img src=\"http://localhost:3000/images/details/3a.jpg\" style=\"max-width:100%;\"><img src=\"http://localhost:3000/images/details/3b.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/3c.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/3d.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/3e.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/3f.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/3g.jpg\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/3h.jpg\" style=\"max-width: 100%;\"><br></p>',
        0, now(), now()),
       (4, 3, 9, 29, '惠普笔记本', '惠普(HP) 幽灵Spectre x360 13.3英寸超轻薄翻转笔记本',
        8499.00, 9, 1000, 20,
        'http://localhost:3000/images/goods/4_720.jpg',
        'http://localhost:3000/images/goods/4_360.jpg',
        'http://localhost:3000/images/goods/41.jpg,http://localhost:3000/images/goods/42.jpg,http://localhost:3000/images/goods/43.jpg,http://localhost:3000/images/goods/44.jpg',
        'HP',
        '<p><img src=\"http://localhost:3000/images/details/4a.png\" style=\"max-width:100%;\"><img src=\"http://localhost:3000/images/details/4b.png\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/4c.png\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/4d.png\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/4e.png\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/4f.png\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/4g.png\" style=\"max-width: 100%;\"><img src=\"http://localhost:3000/images/details/4h.png\" style=\"max-width: 100%;\"><br></p>',
        0, now(), now());
insert into goods
values (5, 2, 7, 23, '荣耀Play4T Pro',
        '麒麟810芯片 OLED屏幕指纹 3D超薄机身 4800万高感光夜拍三摄 6.3英寸OLED珍珠屏全面屏手机',
        1699.00, 8, 100, 700,
        'http://localhost:3000/images/goods/5.jpg',
        'http://localhost:3000/images/goods/5.jpg',
        'http://localhost:3000/images/goods/5.jpg',
        '荣耀',
        '',
        0, now(), now());
-- ----------------------------
-- 用户信息
-- ----------------------------
DROP TABLE IF EXISTS user;
CREATE TABLE user
(
    id          int                                                     NOT NULL AUTO_INCREMENT,
    nickname    varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
    sex         varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '未知' COMMENT '性别 0：未知、1：男、2：女',
    avatar      varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL  COMMENT '头像',
    tel         varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
    country     varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '国家',
    province    varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '省',
    city        varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '市',
    openid      varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '小程序唯一标示id',
    session_key varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '会话密钥',
    token varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'token',
    PRIMARY KEY (id) USING BTREE
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci COMMENT = '用户表'
  ROW_FORMAT = DYNAMIC;





