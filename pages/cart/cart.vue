<template>
	<!-- 购物车页面 -->
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- <my-address></my-address> -->
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 商品列表区域 -->
		<!-- uni-swipe-action 是最外层包裹性质的容器 -->
		<uni-swipe-action>
			<block v-for="(goods, index) in cart" :key="index">
				<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
				<uni-swipe-action-item class="goods-item" :right-options="options"
					@click="swipeActionClickHandler(goods)">
					<view>
						<my-goods-cart :goods="goods" @radio-change.native.stop="radioChangeHandler"
							@num-change="numberChangeHandler" @longpress="longpress(goods)"></my-goods-cart>
					</view>

				</uni-swipe-action-item>
			</block>

		</uni-swipe-action>

		<u-modal :show="deleteShow" :title="title" @confirm="delectConfirm" @cancel="closeConfirm" show-cancel-button
			:content="deleteContent"></u-modal>

		<!-- <uni-popup ref="popup" :mask-click="false">
			<view class="text">
				<view class="text-font">
					暂无数据，敬请期待！
				</view>
				<view class="text-button">
					<view @click="returnHome">返回上一页</view>
				</view>
			</view>
		</uni-popup> -->
		<!-- 结算区域 -->
		<my-settle></my-settle>
	</view>

	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from '@/mixins/tabbar-badge.js'
	// 按需导入 mapState mapMutations这个辅助函数
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import cart from '../../store/cart';
	export default {
		data() {
			return {
				options: [{
					text: '删除', // 显示的文本内容
					style: {
						backgroundColor: '#C00000' // 按钮的背景颜色
					}
				}],
				deleteShow: false, //右滑删除
				title: '提示',
				deleteContent: "删除该商品？", //删除显示的信息
				goodsId: ''
			};
		},
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix],
		computed: {
			// 将 m_cart 模块中的 cart 数组映射到当前页面中使用
			...mapState('m_cart', ['cart']),
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangeHandler(e) {
				// console.log(e) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
				console.log("单选按钮");
				console.log(e);
				
				this.updateGoodsState(e);
			},
			// 商品的数量发生了变化
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			// 点击了滑动操作按钮
			swipeActionClickHandler(goods) {
				console.log("滑动删除");
				this.deleteShow = true;
				this.goodsId = goods.goods_id;
				// this.$refs.popup.open('center');
				// uni.showModal({
				// 	title: '提示',
				// 	content: '删除该商品？',
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			console.log(this);
				// 			console.log('用户点击确定');
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
				// this.removeGoodsById(goods.goods_id)
			},
			// 模态框确认按钮
			delectConfirm() {
				this.removeGoodsById(this.goodsId);
				this.deleteShow = false;
			},
			// 模态框取消按钮
			closeConfirm() {
				this.deleteShow = false;
			},
			// 长按
			longpress(goods) {
				console.log("长按");
				console.log(goods);
				this.goodsId = goods.goods_id;
				this.deleteShow = true;
			},
			// 点击跳转到商品详情页面
			// gotoDetail(goods) {
			// 	console.log("点按");
			// 	uni.navigateTo({
			// 		url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
			// 	})
			// },
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;

		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 5px;
			border-bottom: 1px solid #efefef;

			.cart-title-text {
				margin-left: 10px;
			}
		}

		.goods-item {
			display: flex;
			box-sizing: border-box;
			margin: 8px 2px;
			background-color: white;
			border-radius: 10px;
		}

		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 600rpx;
			height: 400rpx;
			border-radius: 40rpx;
			background-color: #f9f9f9;

			.text-font {
				font-size: 40rpx;
			}

			.text-button {
				margin-top: 50rpx;
				height: 60rpx;
				width: 220rpx;
				border-radius: 28rpx;
				text-align: center;
				background-color: #37a7c7;
			}
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>