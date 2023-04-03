<template>
	<!-- 单个商品列表组件 -->
	<view>
		<view class="goods-item">
			<!-- 商品左侧图片区域 -->
			<view class="goods-item-left">
				<!-- radio是单项选择器组件 -->
				<radio checked color="#C00000" :checked="goods.goods_state" @click="radioClickHandler">
				</radio>
				<image :src="goods.img_md || defaultPic" class="goods-pic"></image>
			</view>
			<!-- 商品右侧信息区域 -->
			<view class="goods-item-right">
				<!-- 商品标题 -->
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods_introduce">{{goods.goods_introduce}}</view>
				<view class="goods-info-box">
					<!-- 商品价格 -->
					<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
					<!-- 商品数量 -->
					<!-- uni-number-box组件是带加减按钮的数字输入框 -->
					<uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler">
					</uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods-cart",
		// 定义 props 属性，用来接收外界传递到当前组件的数据
		props: {
			// 商品的信息对象
			goods: {
				goods: Object,
				defaul: {},
			},
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			// radio 组件的点击事件处理函数
			radioClickHandler(e) {
				console.log("购物车数据");
				console.log(this.goods);
				// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
				// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
				this.$emit('radio-change', {
					// 商品的 Id
					goods_id: this.goods.goods_id,
					// 商品最新的勾选状态
					goods_state: !this.goods.goods_state
				})
			},
			// NumberBox 组件的 change 事件处理函数
			numChangeHandler(val) {
				// 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
				this.$emit('num-change', {
					// 商品的 Id
					goods_id: this.goods.goods_id,
					// 商品的最新数量
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		// 让 goods-item 项占满整个屏幕的宽度
		width: 750rpx;
		// 设置盒模型为 border-box
		box-sizing: border-box;
		display: flex;
		padding: 10px 10px;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 80px;
				height: 80px;
				display: block;
				border-radius: 5px;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 10px;

			.goods-name {
				font-size: 13px;
			}

			.goods_introduce {
				font-size: 10px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}

			.goods_sales {
				font-size: 10px;
				color: #919596;
			}

			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.goods-price {
				font-size: 15px;
				color: #c00000;
			}
		}
	}
</style>