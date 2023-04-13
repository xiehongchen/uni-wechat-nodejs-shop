<template>
	<view>
		<my-address :address="address"></my-address>
		<view class="goods-box" v-for="(item, index) in data" :key="index">
			<my-goods-settle :goods="item" @num-change="numberChangeHandler"></my-goods-settle>
		</view>

		<view class="pay-box">
			<radio-group @change="pay">
				<view class="weixin">
					<u-icon name="weixin-circle-fill" size="30px" color="#33ec4e"></u-icon>
					<text class="weixin-text">微信支付</text>
					<radio checked value="微信支付" color="#f6a93c"></radio>
				</view>
				<view class="zhifubao">
					<u-icon name="zhifubao-circle-fill" size="30px" color="#3394ec"></u-icon>
					<text class="zhifubao-text">支付宝</text>
					<radio value="支付宝" color="#f6a93c"></radio>
				</view>
			</radio-group>
		</view>

		<!-- 底部提交订单 -->
		<view class="my-settle-container">
			<view class="amount-box">
				<text class="text">共{{ checkedCount }}件</text>
				合计:<text class="amount">￥{{ checkedGoodsAmount }}</text>
			</view>
			<!-- 结算按钮 -->
			<view class="btn-settle" @click="submitOrder">提交订单</view>
		</view>

		<!-- 付款信息 -->
		<u-modal :confirm-color="lightColor" :show="showPay" :show-cancel-button="true" :content="'是否确认付款?'"
			@confirm="confirmPay" @cancel="cancelPay"></u-modal>
	</view>
</template>

<script>
import {
	mapMutations,
	mapGetters
} from 'vuex'
import {
	getDefaultAddress
} from '../../api/address.js'
import {
	createOrder,
	payCart
} from '../../api/order.js'
export default {
	data() {
		return {
			// 付款信息
			showPay: false,
			// 商品信息
			data: [],
			// 支付状态
			payStatus: '',
			// 订单id
			order_id: '',
			// 地址
			address: {
				// id: 1,
				// name: '张三',
				// tel: 15863008280,
				// province: '山东省',
				// city: '青岛市',
				// county: '李沧区',
				// street: '重庆中路873号',
				// isDefault: 1
			},
			// 商品列表，传给后台的数据
			goodsList: [],
			// 支付来源
			isOrder: false,
		};
	},
	computed: {
		...mapGetters('cart', ['checkedCount', 'checkedGoodsAmount'])
	},
	onLoad(options) {
		// console.log("onLoad-----------");
		// 获取商品 Id
		console.log(options);
		if (options.isOrder) {
			this.isOrder = options.isOrder;
			this.order_id = options.order_id;
			console.log(this.isOrder);
			console.log(this.order_id);
		}

		this.data = JSON.parse(options.data);
		this.setAddress();
		// this.address = JSON.parse(uni.getStorageSync('address'));
		// this.data = JSON.parse(uni.getStorageSync('cart'))
		// 调用请求商品详情数据的方法
		// console.log("商品信息");
		// console.log(this.data);
	},
	onShow() {

		this.getAddress();
		// this.address = JSON.parse(uni.getStorageSync('address'));
		// console.log("onShow---------");
		// console.log(this.address);
	},
	mounted() {
		// console.log("mouted---------");
		// console.log(this.address);
	},
	// onBackPress: function() {
	// 	// 监听返回事件，在返回时获取传递的地址数据
	// 	uni.$on('addressData', function(item) {
	// 		// 在这里处理传递的地址数据
	// 		console.log("返回数据---------");
	// 		console.log(item);
	// 	});
	// },
	methods: {
		...mapMutations('user', ['updateAddress']),
		...mapMutations('cart', ['removeGoodsById']),
		// 商品的数量发生了变化
		numberChangeHandler(e) {
			console.log("数量发生变化")
			console.log(e);
			for (let i = 0; i < this.data.length; i++) {
				// console.log(this.data);
				if (this.data[i].goods_id == e.goods_id) {
					console.log("数量发生变化" + e.goods_id);
					// console.log(this.data);
					this.data[i].goods_count = e.goods_count;
					console.log(this.data[i].goods_count);
				}
			}
			console.log(this.data);
		},
		// 选择支付方式
		pay(event) {
			// console.log(event);
			this.payType = event.detail.value;
		},
		// 开始支付
		submitOrder() {
			// 如果来自订单页面，直接支付
			if (this.isOrder) {
				this.showPay = true;
			}else {
				let addressId = this.address.id;
				let payment = this.checkedGoodsAmount;
				console.log(this.data);
				this.goodsList = this.data.map(({
					goods_id,
					goods_count
				}) => ({
					goods_id,
					goods_count
				}));

				// console.log("开始结算-------------");
				// console.log(addressId);
				// console.log(payment);
				// console.log(goodsList);

				// 生成订单
				createOrder(addressId, payment, this.goodsList).then((res) => {
					console.log(res);
					this.order_id = res.data.order_id;
					console.log(this.order_id);
					if (res.status == 200) {
						// 付款成功(后续支付结果需要调用支付接口，支付成功就返回BUYER_PAYMENT_SUCCESS，否则返回BUYER_PAYMENT_FAILED)
						this.showPay = true;
					}
				})
			}
		},
		// 支付
		pay() {
			// 调用支付接口
			payCart(this.order_id, this.payStatus).then((res) => {
				console.log(res);
				if (res.status == 200) {
					for (let i = 0; i < this.goodsList.length; i++) {
						console.log(this.goodsList[i].goods_id);
						// 从购物车中删除已经下单的商品
						this.removeGoodsById(this.goodsList[i].goods_id)
					}
					// 返回上一页（后续添加支付成功页面，直接跳转）
					uni.navigateBack({
						delta: 1
					});
				}
			})
		},
		// 从本地数据获取地址
		async getAddress() {
			setTimeout(() => {
				// 获取数据
				this.address = JSON.parse(uni.getStorageSync('address'));
			}, 100);
		},
		// 从数据库获取默认地址
		async setAddress() {
			await getDefaultAddress().then((res) => {
				// console.log(res);
				this.address = res.data[0];
				// console.log(this.address);
				this.updateAddress(this.address)
			})
			// console.log(this.address);
		},
		// 取消付款
		cancelPay() {
			this.showPay = false;
			this.payStatus = 'BUYER_PAYMENT_FAILED';
			this.pay();
		},
		// 确认付款
		confirmPay() {
			this.showPay = false;
			this.payStatus = 'BUYER_PAYMENT_SUCCESS';
			this.pay();
		},
	}
}
</script>

<style lang="scss">
.pay-box {
	background-color: #fff;
	border-radius: 10px;
	margin: 10px 2px;
	padding: 15px 10px;

	.zhifubao {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 5px 0px;

		.zhifubao-text {
			width: 100%;
			margin-left: 20px;
			line-height: 30px;
		}
	}

	.weixin {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 5px 0px;

		.weixin-text {
			width: 100%;
			margin-left: 20px;
			line-height: 30px;
		}
	}
}

.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 5px;
	font-size: 18px;

	.amount-box {
		display: flex;
		justify-content: center;
		align-items: center;

		.text {
			font-size: 13px;
			color: #888586;
			margin-right: 20px;
			margin-left: 5px;
		}

		.amount {
			color: #f63c4c;
		}
	}

	.btn-settle {
		height: 40px;
		min-width: 100px;
		background-color: #f6a93c;
		color: white;
		border-radius: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
		margin-right: 10px;
	}
}
</style>