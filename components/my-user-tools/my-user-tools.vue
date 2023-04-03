<template>
	<view>
		<!-- 常用工具 -->


		<view class="interact-container">
			<view class="interact-item" @click="navigateTo('/pages/mine/address/addressManage')">
				<image src="/static/mine/myaddress.png" mode=""></image>
				<view>地址管理</view>
			</view>
			<view class="interact-item" @click="navigateTo('/pages/mine/myTracks')">
				<image src="/static/mine/logistics.png" mode=""></image>
				<view>我的足迹</view>
			</view>
			<view class="interact-item" @click="navigateTo('/pages/order/evaluate/myEvaluate')">
				<image src="/static/mine/feedback.png" mode=""></image>
				<view>我的评价</view>
			</view>
			<view class="interact-item" @click="navigateTo('/pages/mine/myCollect')">
				<image src="/static/mine/myfavorite.png" mode=""></image>
				<view>我的关注</view>
			</view>
			<view class="interact-item" @click="navigateTo('/pages/mine/set/feedBack')">
				<image src="/static/mine/feedback.png" mode=""></image>
				<view>意见反馈</view>
			</view>
			<view class="interact-item" @click="navigateTo('/pages/mine/set/editionIntro')">
				<image src="/static/mine/pointgift.png" mode=""></image>
				<view>关于</view>
			</view>
			<view class="interact-item" @click="navigateTo('/pages/mine/set/setUp')">
				<image src="/static/mine/setting.png" mode=""></image>
				<view>设置</view>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		name: "my-user-tools",
		data() {
			return {

			};
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url,
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.interact-container {
		margin: 0 20rpx;
		background: #fff;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 24rpx 0 rgba($color: #f6f6f6, $alpha: 1);
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		text-align: center;

		.interact-item {
			font-size: 25rpx;
			width: 25%;
			height: 160rpx;
			padding: 30rpx;
			box-sizing: border-box;

			image {
				width: 52rpx;
				height: 52rpx;
				margin-bottom: 6rpx;
			}
		}





	}
</style>