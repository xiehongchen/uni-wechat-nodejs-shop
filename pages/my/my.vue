<template>
	<view class="user">
		<!-- 个人信息 -->
		<view class="header" @click="userDetail">
			<view class="head-left">
				<image :src="userInfo.avatarUrl || '/static/missing-face.png'"></image>
			</view>
			<view class="head-right" v-if="userInfo.nickName">
				<view class="user-name">{{ userInfo.nickName }}</view>
			</view>
			<view class="head-right" v-else>
				<view class="user-name">登录/注册</view>
			</view>
			<u-icon style="display: flex;align-items: flex-start;" name="arrow-right"></u-icon>
		</view>
		<!-- 我的订单，代付款 -->
		<view class="order">
			<view class="order-item" @click="navigateTo('/pages/order/myOrder?status=1')">
				<view class="bag bag2">
					<u-icon name="bag-fill" size="35" color="#fff"></u-icon>
				</view>
				<view>待付款</view>
			</view>
			<view class="order-item" @click="navigateTo('/pages/order/myOrder?status=3')">
				<view class="bag bag3">
					<u-icon name="car-fill" size="35" color="#fff"></u-icon>
				</view>
				<view>待收货</view>
			</view>
			<view class="order-item" @click="navigateTo('/pages/order/evaluate/myEvaluate')">
				<view class="bag bag4">
					<u-icon name="star-fill" size="35" color="#fff"></u-icon>
				</view>
				<view>待评价</view>
			</view>
			<view class="order-item" @click="navigateTo('/pages/order/afterSales/afterSales')">
				<view class="bag bag5">
					<u-icon name="server-fill" size="35" color="#fff"></u-icon>
				</view>
				<view>售后</view>
			</view>
			<view class="order-item" @click="navigateTo('/pages/order/myOrder?status=0')">
				<view class="bag bag1">
					<u-icon name="order" size="35" color="#fff"></u-icon>
				</view>
				<view>我的订单</view>
			</view>
		</view>
		<tools></tools>
	</view>
</template>
<script>
	import tools from '@/components/my-user-tools/my-user-tools.vue'
	// 1. 从 vuex 中按需导入 mapState 辅助函数
	import {
		mapState
	} from 'vuex'
	import {
		userLogin
	} from '@/api/user.js'
	export default {
		data() {
			return {
				userInfo: {},
			};
		},
		components: {
			tools,
		},
		mounted() {
			let that = this;
			//获取code
			uni.login({
				success: (res) => {
					that.code = res.code;
					console.log("wx.login的code");
					console.log(that.code);
				},
			});
		},
		computed: {
			// 将 m_user 模块中的 userinfo 映射到当前页面中使用
			// ...mapState('m_user', ['userInfo']),
		},
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userinfo') || '{}');
			console.log(this.userInfo);
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url,
				});
			},
			// 用户登录
			userDetail() {
				// console.log(userinfo);
				// let res = userLogin(this.code);
				// console.log(res);
				this.userInfo.nickName ?
				this.navigateTo("/subpkg/user_info/user_info") :
				this.navigateTo("/subpkg/login/login");

			}
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		.header {
			max-width: 100%;
			height: 300rpx;
			background-size: cover;
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			background-image: url("/static/img/main-bg.png");
			background-position: bottom;
			background-repeat: no-repeat;
			color: #ffffff;
			display: flex;
			justify-content: space-between;

			.head-left {
				margin-left: 50rpx;
				width: 152rpx;
				position: relative;
				display: flex;
				align-items: center;

				image {
					width: 152rpx;
					height: 144rpx;
					border-radius: 50%;
					margin-bottom: 30rpx;
					border: 3px solid #fff;
				}
			}

			.head-right {
				flex: 1;
				display: flex;
				align-items: center;
				margin-left: 50rpx;

			}
		}

		.order {
			border-radius: 20rpx;
			background: #fff;
			margin: -40rpx 20rpx 40rpx 20rpx;
			height: 200rpx;
			text-align: center;
			font-size: 25rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 0 3%;
			color: #999;

			.order-item {
				display: flex;
				flex-direction: column;
				position: relative;
				width: 96rpx;
				height: 140rpx;

				.bag {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					margin: 20rpx auto;
				}
			}

		}
	}

	.bag1 {
		background: #ff4a48;
	}

	.bag2 {
		background: #ff992f;
	}

	.bag3 {
		background: #009ee0;
	}

	.bag4 {
		background: #00d5d5;
	}

	.bag5 {
		background: #28ccb0;
	}
</style>