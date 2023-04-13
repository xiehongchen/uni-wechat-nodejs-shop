<template>
	<!-- 单个商品详情 -->
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in goods_swiper" :key="index">
				<!-- 把当前点击的图片的索引，传递到 preview() 处理函数中 -->
				<image :src="item" @click="preview(index)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-info-header">
				<view class="price">￥{{goods_info.goods_price}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>

			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-info">
					<view class="goods-name">{{goods_info.goods_name}}</view>
					<view class="goods_introduce">{{goods_info.goods_introduce}}</view>
				</view>


			</view>
		</view>

		<!-- 商品详情信息 -->
		<view class="goods-detail-box">
			<view class="goods-detail-item">
				商品介绍
			</view>
			<!-- rich-text是uniapp内置富文本组件 nodes属性可以引用节点列表或html string -->
			<view v-if="goods_info.goods_details">
				<rich-text :nodes="goods_info.goods_details"></rich-text>
			</view>
			<view v-else>
				<image src="/static/index/shangpinjieshao.png"></image>
			</view>

		</view>



		<!-- 商品导航组件 -->
		<view class="goods_nav">
			<!-- fill 控制右侧按钮的样式 -->
			<!-- options 左侧按钮的配置项 -->
			<!-- buttonGroup 右侧按钮的配置项 -->
			<!-- click 左侧按钮的点击事件处理函数 -->
			<!-- buttonClick 右侧按钮的点击事件处理函数 -->
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	// 从 vuex 中按需导出 mapState mapMutations mapGetters辅助方法
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		getGoodsDetail
	} from '@/api/goods.js'
	import {
		setCartList
	} from '../../api/cart.js'
	export default {
		data() {
			return {
				// 商品详情对象
				goods_info: {},
				// 商品轮播图
				goods_swiper: [],
				// 左侧按钮组的配置对象
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				// 右侧按钮组的配置对象
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			// 获取商品 Id
			const goods_id = options.goods_id
			// 调用请求商品详情数据的方法
			// console.log("商品id");
			// console.log(goods_id);
			this.goodsDetail(goods_id)
		},
		computed: {
			// 调用 mapState 方法，把 cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
			// ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
			...mapState('cart', ['cart']),
			// 今后无论映射 mutations 方法，还是 getters 属性，还是 state 中的数据，都需要指定模块的名称，才能进行映射

			// 把 cart 模块中名称为 total 的 getter 映射到当前页面中使用
			...mapGetters('cart', ['total']),
		},
		methods: {
			// 定义请求商品详情数据的方法
			async goodsDetail(goods_id) {
				// const {
				// 	data: res
				// } = await uni.$http.get('/api/goods/detail', {
				// 	goods_id
				// })
				let res = await getGoodsDetail(goods_id)

				// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
				// 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
				// res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block;" ').replace(/webp/g, 'jpg')
				// 为 data 中的数据赋值
				this.goods_info = res.message
				// console.log("商品详情");
				// console.log(this.goods_info);
				this.goods_swiper = this.goods_info.pics.split(',');
				// console.log("商品轮播图");
				// console.log(this.goods_swiper);
			},
			// 实现轮播图的预览效果
			preview(index) {
				// 调用 uni.previewImage() 方法预览图片
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current: index,
					// 所有图片 url 地址的数组
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			// 左侧按钮的点击事件处理函数
			onClick(e) {
				if (e.content.text === '购物车') {
					// 切换到购物车页面
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			// 把 cart 模块中的 addToCart 方法映射到当前页面使用
			...mapMutations('cart', ['addToCart']),
			// 右侧按钮的点击事件处理函数
			buttonClick(e) {
				console.log(e);
				// 1. 判断是否点击了 加入购物车 按钮
				if (e.content.text === '加入购物车') {
					setCartList(this.goods_info.goods_id).then((res)=>{
						console.log("------------");
					})
					// 2. 组织一个商品的信息对象
					const goods = {
						goods_id: this.goods_info.goods_id, // 商品的Id
						goods_name: this.goods_info.goods_name, // 商品的名称
						goods_price: this.goods_info.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						img_md: this.goods_info.img_md, // 商品的图片
						goods_state: true // 商品的勾选状态
					}
					// console.log("加入购物车");
					// console.log(goods);
					// 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
					this.addToCart(goods)
				}
			}
		},
		watch: {
			// 定义 total 侦听器，指向一个配置对象
			total: {
				// handler 属性用来定义侦听器的 function 处理函数
				handler(newVal) {
					const findResult = this.options.find(x => x.text === '购物车')
					if (findResult) {
						findResult.info = newVal
					}
				},
				// immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
				immediate: true
			}
		},
	}
</script>

<style lang="scss">
	.goods-detail-container {
		// 给页面外层的容器，添加 50px 的内padding，
		// 防止页面内容被底部的商品导航组件遮盖
		padding-bottom: 50px;

		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		// 商品信息区域的样式
		.goods-info-box {
			background-color: white;
			width: 100%;
			padding: 5px 2px;
			border-radius: 10px;
			margin: 10px 0px;


			.goods-info-header {
				display: flex;
				justify-content: space-between;

				// 收藏区域
				.favi {
					font-size: 10px;
					display: flex;
					flex-direction: column;
					// justify-content: flex-end; 
					margin-right: 30px;
					border-left: 1px solid #efefef;
					color: gray;
				}

				.price {
					color: #c00000;
					font-size: 18px;
					margin: 10px 0;
				}
			}

			.goods-info-body {
				display: flex;
				justify-content: space-between;

				.goods-info {
					.goods-name {
						font-size: 20px;
						padding-right: 10px;
					}

					.goods_introduce {
						font-size: 10px;
						color: #919596;
					}
				}

			}
		}

		.goods-detail-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 10px;
			background-color: white;

			.goods-detail-item {
				font-size: 12px;
				margin: 10px 0px;

				border-bottom: 2px solid #122FA7;

			}

		}

		.goods_nav {
			// 为商品导航组件添加固定定位
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>