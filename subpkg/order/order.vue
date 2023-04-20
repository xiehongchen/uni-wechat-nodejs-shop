<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item"
				:class="{ current: currentIndex === index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>
		<!-- 内容 -->
		<swiper :current="currentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(item, index) in navList" :key="index">
				<scroll-view class="list-scroll" scroll-y @scrolltolower="loadData(index)">
					<!-- 空白页 -->
					<u-empty text="暂无订单" mode="list" v-if="item.orderList.length == 0"> </u-empty>

					<my-goods-order :goods="item.orderList" @waitPay="waitPay" @onCancel="onCancel"
						@againPay="againPay"></my-goods-order>

				</scroll-view>
			</swiper-item>
			<!-- <u-loadmore :status="item.loadStatus" /> -->
		</swiper>

		<uni-popup ref="popup" background-color="#fff" type="bottom">
			<view class="cancel-box">
				<view class="header">取消订单</view>
				<view class="body">
					<view class="title">请选择取消原因？</view>
					<view class="value">
						<radio-group @change="change">
							<label class="list" v-for="(reason, index) in cancelList" :key="index">
								<view>
									<radio :value="reason.value" color="#f0ad4e" />
								</view>
								<view>{{ reason.name }}</view>
							</label>
						</radio-group>
					</view>
				</view>

				<view class="footer">
					<u-button size="medium" ripple v-if="reason" shape="circle" @click="submitCancel">提交</u-button>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
import {
	getOrderList,
	cancelOrder
} from "@/api/order.js";
export default {
	data() {
		return {
			// 取消订单id
			cancelId: '',
			cancelShow: true,
			currentIndex: 0,
			show: false,
			navList: [
				//导航栏list
				{
					state: 0,
					text: "全部",
					orderList: [],
					pageNumber: 1,
					loadStatus: "loadmore"
				},
				{
					state: 1,
					text: "待付款",
					orderList: [],
					pageNumber: 1,
					loadStatus: "loadmore"
				},
				{
					state: 2,
					text: "待发货",
					orderList: [],
					pageNumber: 1,
					loadStatus: "loadmore"
				},
				{
					state: 3,
					text: "待收货",
					orderList: [],
					pageNumber: 1,
					loadStatus: "loadmore"
				},
				{
					state: 4,
					text: "已完成",
					orderList: [],
					pageNumber: 1,
					loadStatus: "loadmore"
				},
				{
					state: 5,
					text: "已取消",
					orderList: [],
					pageNumber: 1,
					loadStatus: "loadmore"
				},
			],
			/**
			 * 订单状态
			 * ALL 全部
			 * WAIT_BUYER_PAY 待付款
			 * BUYER_PAYMENT_SUCCESS 待发货
			 * SELLER_DELIVERED 待收货
			 * BUYER_RECEIVED 已完成
			 * ORDER_CLOSED 已取消
			 * GOODS_RETURNING 退货中
			 * GOODS_RETURNED_SUCCESS 退货成功
			 */
			orderStatus: [{
				code: 0,
				name: 'ALL',
				text: '全部',
			},
			{
				code: 1,
				name: 'WAIT_BUYER_PAY',
				text: '待付款',
			},
			{
				code: 2,
				name: 'BUYER_PAYMENT_SUCCESS',
				text: '待发货',
			},
			{
				code: 3,
				name: 'SELLER_DELIVERED',
				text: '待收货',
			},
			{
				code: 4,
				name: 'BUYER_RECEIVED',
				text: '已完成',
			},
			{
				code: 5,
				name: 'ORDER_CLOSED',
				text: '已取消',
			},
			{
				code: 6,
				name: 'GOODS_RETURNING',
				text: '退货中',
			},
			{
				code: 7,
				name: 'GOODS_RETURNED_SUCCESS',
				text: '退货成功',
			},
			],
			// 发送请求数据
			params: {
				pageNumber: 1,
				pageSize: 4,
				status: "ALL",
			},
			// 取消订单原因
			reason: '',
			// 取消订单原因列表
			cancelList: [{
				name: "我不想买了",
				value: 0
			},
			{
				name: "换个地址",
				value: 1
			}
			]
		};
	},
	onLoad(options) {
		// console.log(options);
		this.currentIndex = options.status;
	},
	onShow() {
		// 初始化数据
		this.initData(this.currentIndex);
	},
	// 页面触底事件的处理函数
	onReachBottom() { },
	watch: {
		currentIndex: function (newVal, oldVal) {
			// console.log(newVal);
			// console.log(oldVal);
			this.params.status = this.orderStatus[newVal].name;
			this.navList.forEach((res) => {
				res.pageNumber = 1;
				res.loadStatus = "loadmore";
				res.orderList = [];
			});
			this.loadData(newVal);
		}
	},
	methods: {
		change(e) {
			// console.log("change");
			// console.log(this.cancelList[e.detail.value].name);
			this.reason = this.cancelList[e.detail.value].name;
			// console.log(this.reason);
		},
		//顶部tab点击
		tabClick(index) {
			console.log("tabClick");
			this.currentIndex = index;

		},
		//swiper 切换监听
		changeTab(e) {
			console.log("changeTab");
			this.currentIndex = e.target.current;

		},
		// 初始数据
		initData(index) {
			this.navList[index].pageNumber = 1;
			this.navList[index].loadStatus = "loadmore";
			this.navList[index].orderList = [];
			this.loadData(index);
		},
		// 首次获取订单列表
		loadData(index) {
			this.params.pageNumber = this.navList[index].pageNumber;
			console.log(index);
			// console.log(this.params);
			getOrderList(this.params).then((res) => {
				uni.stopPullDownRefresh();
				console.log(res);
				if (res.status == 200) {
					let orderList = res.data;
					// console.log(orderList);
					// 判断是否有更多数据(如果数据小于4条，就没有更多数据了)
					if (orderList.length == 0) {
						this.navList[index].loadStatus = "noMore";
					} else if (orderList.length < 4) {
						this.navList[index].loadStatus = "noMore";
					}
					if (orderList.length > 0) {
						// console.log(this.navList[index].orderList);
						this.navList[index].orderList =
							this.navList[index].orderList.concat(orderList);
						this.navList[index].pageNumber += 1;
					}
					// console.log(this.navList[index].orderList);
					// console.log(this.navList[index].orderList.length);
				}
			})
		},
		// 待付款
		waitPay(e) {
			// console.log(e);
			console.log("待付款");
		},
		// 取消订单
		onCancel(e) {
			this.cancelId = e.id;
			// console.log(e);
			// console.log(this.cancelId);
			this.$refs.popup.open();
			console.log("取消订单");
		},
		// 提交取消订单
		submitCancel() {
			console.log(this.reason);
			cancelOrder(this.cancelId, this.reason).then((res) => {
				console.log(res);
				if (res.status == 200) {
					this.$refs.popup.close();
					this.initData(this.currentIndex);
				}
			})
		},
		// 重新支付
		againPay(e) {
			console.log(e.goodsList);
			uni.navigateTo({
				url: '/subpkg/settlement/settlement?data=' + JSON.stringify(e.goodsList) + '&isOrder=true&order_id=' + e.goodsList[0].order_id
			})
			console.log("再次支付");
		},

	}
}
</script>

<style lang="scss" scoped>
.content {
	background: #f8f8f8;
	height: 100%;
}

.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 100;

	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 26rpx;
		color: $font-color-light;
		position: relative;

		&.current {
			color: $main-color;

			&:after {
				content: "";
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid $main-color;
			}
		}
	}


}

.swiper-box {
	height: 100%;

	.list-scroll {
		height: 100%;
	}
}

.cancel-box {
	height: 400px;

	.header {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 15rpx 0rpx;
	}

	.body {
		padding: 30rpx;

		.title {
			font-weight: 400;
		}

		.value {
			margin: 20px 0px;

			.list {
				display: flex;
				padding: 10rpx 0rpx;
			}
		}
	}


	.footer {
		text-align: center;
	}
}
</style>