<template>
	<!-- 地址组件 -->
	<view class="box">
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="!address.id">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>

		<!-- <view class="address-choose-box" v-else>
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">1111</button>
		</view> -->
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="left">
				<u-icon name="map-fill" color="red" size="30px"></u-icon>
			</view>
			<view class="main">
				<view class="address">
					{{addressAnd(address)}}
				</view>
				<view class="info-box">
					<view class="name">
						{{address.name}}
					</view>
					<view class="phone">
						{{address.tel}}
					</view>
				</view>
			</view>
			<view class="right">
				<u-icon name="arrow-right" size="18px"></u-icon>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "my-address",
		data() {
			return {

			};
		},
		props: ['address'],
		mounted() {
			console.log("获取地址");
			// console.log(address);
		},
		methods: {
			chooseAddress() {
				uni.navigateTo({
					url: '/subpkg/address/address'
				})
			},
			addressAnd(item) {
				// console.log(item);
				const address = item.province + ' ' + item.city + ' ' + item.county + ' ' + item.street;
				// console.log(address);
				return address;
			},
		}

	}
</script>

<style lang="scss">
	.box {
		background-color: #fff;
		border-radius: 10px;
		margin: 10px 2px;

		// 选择收货地址的盒子
		.address-choose-box {
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		// 渲染收货信息的盒子
		.address-info-box {
			font-size: 12px;
			height: 90px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 5px;

			.left {
				width: 10%;
			}

			.main {
				flex: 1;

				.address {
					font-size: 15px;
				}

				.info-box {
					display: flex;
					flex-direction: row;

					.name {
						padding-right: 20rpx;
					}
				}
			}

			.right {
				width: 5%;
			}
		}
	}
</style>