<template>
	<view>
		<u-modal :show="show" title="商城" :mask-close-able="true" :show-confirm-button="false">
			<view class="modal-box">
				<view class="tips">
					为了更好地用户体验，需要您授权手机号
				</view>
				<button class="register" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					去授权
				</button>
			</view>

		</u-modal>
		<view class="wx-auth-container">
			<view class="box">
				<view class="logo-info">
					<text class="title">欢迎进入微信小程序商城</text>
				</view>
				<view class="small-tips">
					<view>为您提供优质服务,小程序商城需要获取以下信息</view>
					<view>您的公开信息（昵称、头像）</view>
				</view>
				<view class="btns">
					<button type="primary" bindtap="getUserProfile" @click="getUserProfile()"
						class="btn-auth">使用微信授权</button>
					<view @click="back" class="btn-callback">暂不登录</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import {
		userLogin
	} from '@/api/user.js'
	export default {

		data() {
			return {
				show: false,
				query: {
					code: '',
				}

			};
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
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			// 返回上一页
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			//获取用户信息
			getUserProfile(e) {
				console.log("获取用户信息");
				console.log(e);
				let that = this;
				uni.getUserProfile({
					desc: "用于完善会员资料",
					success: async (res) => {
						console.log("获取用户信息成功");
						console.log(res);
						//展示手机号获取授权
						// this.show = true;
						// 获取token
						console.log("获取code");
						console.log(that.code);
						let result = await userLogin(that.code);
						console.log("获取token");
						console.log(result);
						// 保存用户信息到本地
						that.updateUserInfo(res.userInfo);
						that.updateToken(result.token);
						uni.navigateBack({
							delta: 1
						});
					},
					fail: err => {
						uni.$showMsg('您取消了登录授权！')
					}
				})
			},
			// 用户手机号码登录
			getPhoneNumber(e) {
				console.log("用户手机号码登录");
				console.log(e);
				let iv = e.detail.iv;
				let encryptedData = e.detail.encryptedData;
				console.log(iv);
				console.log(encryptedData);
				if (!e.detail.encryptedData) {
					uni.showToast({
						title: "请授予手机号码权限，手机号码会和会员系统用户绑定！",
						icon: "none",
					});
					return;
				}
				this.show = false;
			}
		}
	}
</script>

<style lang="scss">
	.modal-box {
		display: flex;
		flex-direction: column;

		.tips {
			width: 80%;
			text-align: left;
			margin: 6% 10%;
			margin-top: 48rpx;
			line-height: 1.75;
		}

		.register {
			color: #00DD00;
			border-style: none;
			background: #fff;
		}
	}


	.wx-auth-container {
		width: 100%;
		margin-top: 20%;

		.box {
			margin: 0rpx 30rpx;

			.logo-info {
				display: flex;
				flex-wrap: nowrap;
				justify-content: flex-start;
				flex-direction: row;
				align-items: flex-start;
				padding: 20rpx;
				font-weight: bold;

				.title {
					display: inline-block;
					font-size: 50rpx;
					color: #333;
				}
			}

			/* 文字提示*/
			.small-tips {
				width: 94%;
				padding: 20rpx;
				font-size: 24rpx;
				margin: 0 0 20rpx;
				color: #999;
			}

			.btns {
				margin-top: 100rpx;
				display: flex;
				flex-direction: column;
				width: 100%;
				justify-content: center;

				.btn-auth {
					width: 92%;
					margin: 0 auto 40rpx;
					border-radius: 100px;
				}

				.btn-callback {
					text-align: center;
					font-size: 30rpx;
					background: #ededed;
					height: 90rpx;
					line-height: 90rpx;
					border-radius: 100px;
					width: 92%;
					margin: 0 auto;
				}
			}
		}

	}
</style>