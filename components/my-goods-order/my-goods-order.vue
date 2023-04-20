<template>
	<view class="goods-box">
		<!-- 订单列表数据 -->
		<view class="seller-view" v-for="(item, orderIndex) in goods" :key="orderIndex">
			<view v-for="(good, index) in item.goodsList" :key="index" @click="orderDetail(item)">
				<!-- 店铺名称和状态 -->
				<view class="brand-box">
					<view class="brand-name">
						<view class="name">
							{{ good.brand }}
						</view>
					</view>
					<view class="order-status">
						<!-- 只在第一次循环时显示 item.status，其它循环时为空 -->
						<view v-if="index === 0">
							{{ item.status }}
						</view>
					</view>
				</view>

				<!-- 商品数据 -->
				<view class="goods-item">
					<image :src="good.img_md" class="goods-img"></image>
					<view class="info">
						<view class="name-price">
							<view class="goods-name">
								{{ good.goods_name }}
							</view>
							<view class="goods-price">
								￥{{ good.goods_price }}
							</view>
						</view>
						<view class="goods-num">
							<view>
								x{{ good.goods_num }}
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 付款信息 -->
			<view class="price-btn">
				<view class="price-box">
					<view v-if="item.payStatus === 'PAID'">
						已付金额：
					</view>
					<view v-else>应付金额：</view>
					<view class="price">￥{{ item.payment }}</view>
				</view>
				<view class="btn">
					<!-- 待付款 -->
					<u-button ripple class="btn" shape="circle" size="small" v-if="item.allowOperation.pay"
						@click="waitPay(item)">
						立即付款
					</u-button>
					<!-- 取消订单 -->
					<u-button ripple class="btn" shape="circle" size="small" v-if="item.allowOperation.cancel"
						@click="onCancel(item)">
						取消订单
					</u-button>
					<u-button ripple class="btn" shape="circle" size="small" v-if="item.allowOperation.again"
						@click="againPay(item)">
						重新付款
					</u-button>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
export default {
	name: "my-goods-order",
	props: {
		goods: {
			type: Array,
			required: true
		}
	},
	data() {
		return {

		};
	},
	methods: {
		waitPay(item) {
			this.$emit("waitPay", item)
		},
		onCancel(item) {
			this.$emit("onCancel", item)
		},
		orderDetail(item) {
			console.log("点击跳转到订单详情");
		},
		againPay(item) {
			this.$emit("againPay", item)
		}

	}
}
</script>

<style lang="scss">
.goods-box {
	height: 100%;

	.seller-view {
		border-radius: 10px;
		background-color: #fff;
		margin: 20rpx 20rpx;
		padding: 20rpx 20rpx;

		// 店铺名称和状态
		.brand-box {
			height: 50rpx;
			padding: 0 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.brand-name {
				font-size: 28rpx;
				font-weight: 600;


				.name {
					margin-left: 15rpx;
					margin-top: -2rpx;
				}
			}

			.order-status {
				color: $aider-light-color;
				font-size: 26rpx;
			}
		}

		// 商品数据
		.goods-item {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			// padding: 10rpx 20rpx;

			.goods-img {
				width: 60px;
				height: 60px;
				margin-right: 10rpx;
				margin-bottom: 10rpx;

			}

			.info {
				padding-left: 30rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				flex: 1;

				.name-price {
					.goods-name {
						margin-bottom: 10rpx;
						color: #333333;
					}

					.goods-price {
						font-size: 24rpx;
						margin-bottom: 10rpx;
						color: $price-color;
					}
				}

				.goods-num {
					font-size: 28rpx;
					margin-bottom: 10rpx;
					color: $aider-light-color;
				}
			}
		}

		// 付款信息
		.price-btn {
			padding: 10rpx 30rpx;
			font-size: 26rpx;
			display: flex;
			height: 30px;
			justify-content: space-between;
			align-items: center;

			.price-box {
				display: flex;
				color: #909399;
				size: 24rpx;
				flex: 1;

				.price {
					color: $main-color;
				}
			}

			.btn {
				display: flex;
			}
		}
	}
}
</style>

