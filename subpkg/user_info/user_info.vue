<template>
	<view class="user_info">
		<view class="user_info_img" @click="changeFace">
			<image :src="userInfo.avatarUrl"></image>
			<view class="text">点击修改头像</view>
		</view>

		<view class="user_info_box">
			<uni-forms ref="baseForm" :modelValue="userInfo">
				<uni-forms-item label="姓名">
					<uni-easyinput :inputBorder="false" v-model="userInfo.nickName" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="性别">
					<uni-data-checkbox v-model="userInfo.gender" :localdata="sex" />
				</uni-forms-item>
				<uni-forms-item label="生日">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="userInfo.birth" @maskClick="maskClick"
						:border="false" />
				</uni-forms-item>
				<view class="submit" @click="submit">保存</view>
				<view class="submit" @click="showModalDialog">退出登录</view>
				<u-modal show-cancel-button :show="show" @cancel="cancal" @confirm="confirm" :confirm-color="lightColor"
					:content="'确定要退出登录么？'" confirmColor="red"></u-modal>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				userInfo: {},
				sex: [{
					text: '男',
					value: 1
				}, {
					text: '女',
					value: 2
				}],
				// 退出框
				show: false,
			};
		},
		onShow() {
			this.userInfo = JSON.parse(uni.getStorageSync('userinfo'));
			console.log(this.userInfo.gender);
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo', 'removeUserInfoStorage']),
			// 保存数据
			submit() {
				// 保存信息到本地
				this.updateUserInfo(this.userInfo);
				console.log(this.userInfo);
				uni.navigateBack({
					delta: 1
				});
			},
			// 显示退出框
			showModalDialog() {
				this.show = true;
			},
			clear() {
				this.removeUserInfoStorage()
			},
			// 确认按钮
			confirm() {
				this.clear();
				this.show = false;
				uni.navigateBack({
					delta: 1
				});
			},
			// 取消按钮
			cancal() {
				this.show = false;
			}
		}
	}
</script>

<style lang="scss">
	.user_info_img {
		display: flex;
		padding: 20rpx 0rpx;
		flex-direction: column;
		align-items: center;
		background-color: #fff;


		image {
			width: 144rpx;
			height: 144rpx;
			border-radius: 50%;
			margin-bottom: 30rpx;
			border: 3px solid #fff;
		}

		.text {
			font-size: 25rpx;
			color: #919596;
		}
	}

	/deep/ .uni-forms {
		background-color: #ffffff;
		padding: 0;
		font-size: 25rpx;

		.uni-forms-item {
			padding: 5rpx 20rpx;
			height: 80rpx;
			margin: 0;
			border-bottom: 1rpx solid #C0C0C0;

			.uni-data-checklist {
				margin-top: 5px;
			}
		}

	}



	.user_info_box {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 20rpx 30rpx;

		.submit {
			height: 50rpx;
			text-align: center;
			margin-top: 20rpx;
			font-size: 30rpx;
			color: #C80000;
		}
	}
</style>