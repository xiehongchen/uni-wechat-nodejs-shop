<template>
	<!-- 购物车页面 -->
	<view class="cart-container" v-if="cartList.length !== 0">
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
			<block v-for="(goods, index) in cartList" :key="index">
				<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
				<uni-swipe-action-item class="goods-item" :right-options="options"
					@click="swipeActionClickHandler(goods)">
					<view>
						<my-goods-cart :goods="goods" @radio-change="radioChangeHandler"
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
		<view class="my-settle-container">
			<!-- 全选区域 -->
			<label class="radio" @click="changeAllState">
				<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
			</label>

			<!-- 合计区域 -->
			<view class="amount-box">
				合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
			</view>

			<!-- 结算按钮 -->
			<view class="btn-settle" @click="settlement">去结算({{checkedCount}})</view>
		</view>
	</view>

	<!-- 空白购物车区域 -->
	<view v-else>
		<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png">
		</u-empty>
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from '@/mixins/tabbar-badge.js'
	// 按需导入 mapState mapMutations这个辅助函数
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		deleteCartList,
		setCartNum
	} from '../../api/cart.js'
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
				goodsId: '',
				// 已勾选的商品
				payList: []
			};
		},
		// 将 badgeMix 混入到当前的页面中进行使用
		mixins: [badgeMix],
		computed: {
			// 将 cart 模块中的 cart 数组映射到当前页面中使用
			...mapState('cart', ['cartList']),
			//  将 total 映射到当前组件中
			...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			// addstr 是详细的收货地址
			...mapGetters('user', ['addstr']),
			// token 是用户登录成功之后的 token 字符串
			...mapState('user', ['token']),
			//  是否全选
			isFullCheck() {
				return this.total === this.checkedCount
			},
		},
		onShow() {
			// 调用存储购物车数据的方法，该方法是向数据库保存数据
			// this.setCart()
		},
		mounted() {

			// console.log("查看购物车数据");
			// let len = this.cartList.length;
			// console.log(len);
			// for (let i = 0; i < len; i++) {
			// 	if (this.cartList[i].goods_state) {
			// 		this.payList.push(this.cartList[i]);
			// 	}
			// }
			// console.log(this.payList);
		},
		methods: {
			...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById','updateAllGoodsState']),	
			// 把 user 模块中的 updateRedirectInfo 方法映射到当前页面中使用
			...mapMutations('user', ['updateRedirectInfo']),
			// label 的点击事件处理函数
			changeAllState() {
				// 修改购物车中所有商品的选中状态
				// !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 点击了结算按钮
			settlement() {
				//  先判断是否勾选了要结算的商品
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品!')
				//  最后判断用户是否登录
				if (!this.token) return uni.$showMsg('请先登录！')
				let len = this.cartList.length;
				// console.log(len);
				this.payList = []
				for (let i = 0; i < len; i++) {
					if (this.cartList[i].goods_state) {
						this.payList.push(this.cartList[i]);
					}
				}
				// console.log("已勾选的商品");
				// console.log(this.payList);
				uni.navigateTo({
					url: '/subpkg/settlement/settlement?goods=' + JSON.stringify(this.payList) // 替换成实际的目标页面路径
				});
			},
			radioChangeHandler(e) {
				// console.log(e) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
				// console.log("单选按钮");
				// console.log(e);
				this.updateGoodsState(e);
			},
			// 商品的数量发生了变化
			numberChangeHandler(e) {
				console.log(e);
				setCartNum(e).then((res)=>{
					console.log(res);
					this.updateGoodsCount(e)
				})
				
			},
			// 点击了滑动操作按钮
			swipeActionClickHandler(goods) {
				// console.log("滑动删除");
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
				deleteCartList(this.goodsId).then((res)=>{
					console.log(res);
				})
				this.removeGoodsById(this.goodsId);
				this.deleteShow = false;
			},
			// 模态框取消按钮
			closeConfirm() {
				this.deleteShow = false;
			},
			// 长按
			longpress(goods) {
				// console.log("长按");
				// console.log(goods);
				this.goodsId = goods.goods_id;
				this.deleteShow = true;
			},
			// 保存购物车数据
			// setCart(){
			// 	console.log(this.cartList);
			// 	let goodsList = this.cartList.map(({
			// 		goods_id,
			// 		goods_count
			// 	}) => ({
			// 		goods_id,
			// 		goods_count
			// 	}));
			// 	console.log(goodsList);
			// 	setCartList(goodsList).then((res)=>{
			// 		console.log(res);
			// 	})
			// }

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

		.my-settle-container {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			// 将背景色从 cyan 改为 white
			background-color: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 5px;
			font-size: 14px;

			.radio {
				display: flex;
				align-items: center;
			}

			.amount {
				color: #c00000;
			}

			.btn-settle {
				height: 50px;
				min-width: 100px;
				background-color: #c00000;
				color: white;
				line-height: 50px;
				text-align: center;
				padding: 0 10px;
				border-radius: 20px;
			}
		}
	}
</style>