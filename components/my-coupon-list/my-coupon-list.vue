<template>
	<view class="coupon-box">
		<view v-for="(item, index) in coupon" :key="index" class="coupon-item">
			<view class="left-box">
				<view class="left">
					<view v-if="item.couponType == 'DISCOUNT'" class="discount">
						<view class="dis-price">
							{{ item.discount }}
						</view>
						<view class="dis-type">折</view>
					</view>
					<view v-else class="price">
						<view class="pri-type">￥</view>
						<view class="pri-price">{{ item.price }}</view>
					</view>
				</view>
				<view class="right">
					<view class="text">优惠劵</view>
					<view class="line"></view>
					<view class="message">
						满{{ item.consumeThreshold }}元可用
					</view>
				</view>
			</view>
			<view class="right-box">
				<view class="right-text">
					<view v-if="message == 'get'" class="use" @click="getCoupon(item.id)">立即领取</view>
					<view v-else-if="item.status == 0 && item.message == null" class="use" @click="useCoupon(item)">立即使用</view>
					<view v-else-if="item.status == 1" class="use">已经使用</view>
					<view v-else-if="item.status == 0 && item.message == 'use'" class="use" @click="cancelUseCoupon(item.id)">取消使用</view>
					<view v-else-if="item.status == 2" class="use">已经过期</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	name: "my-coupon-list",
	// 接收数据
	props: {
		coupon: {
			type: Array,
			default: () => []
		},
		message: {
			type: String,
			default:''
		}
	},
	data() {
		return {

		};
	},
	methods: {
		getCoupon(couponId) {
			console.log("领取优惠劵");
			console.log(couponId);
			this.$emit('getCoupon', {
				couponId: couponId
			})
		},
		useCoupon(item) {
			console.log("使用优惠劵");
			this.$emit('useCoupon', {
				item
			})
		},
		cancelUseCoupon(id){
			console.log("取消使用优惠劵");
			this.$emit('cancelUseCoupon',{
				id
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.coupon-box {
	background: #f8f8f8;
	height: 100%;
}

.coupon-item {
	display: flex;
	align-items: center;
	height: 220rpx;
	margin: 20rpx;
	border-radius: 10rpx;
	background: $main-color;

	.left-box {
		display: flex;
		height: 90%;
		background-color: $uni-color-warning;
		width: 75%;
		margin-left: 10px;
		align-items: center;
		justify-content: space-between;
		border-radius: 10px;
		padding: 0 10px;
		color: $main-color;

		.left {
			display: flex;
			width: 60%;
			flex-direction: row;
			align-items: center;

			.discount {
				display: flex;
				width: 100%;
				align-items: center;

				.dis-price {
					font-size: 140rpx;
					font-weight: bold;
				}

				.dis-type {
					font-size: 60rpx;
					margin-left: 10rpx;
				}
			}

			.price {
				display: flex;
				width: 100%;
				align-items: center;

				.pri-type {
					font-size: 40rpx;
				}

				.pri-price {
					font-size: 80rpx;
					font-weight: bold;
				}
			}
		}

		.right {
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: center;

			.text {
				font-size: 40rpx;
				font-weight: bold;
			}

			.line {
				width: 100%;
				height: 1px;
				background-color: $main-color;
				margin: 10rpx 0;
			}

			.message {
				font-size: 30rpx;
			}
		}
	}

	.right-box {
		display: flex;
		height: 100%;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 25%;

		.right-text {
			display: flex;
			height: 60px;
			width: 60px;

			background-color: $uni-color-warning;
			border-radius: 10px;

			.use {
				padding: 5px;
				font-size: 40rpx;
				text-align: center;
				color: #f8f8f8;
				line-height: 40rpx;
			}
		}
	}

}
</style>