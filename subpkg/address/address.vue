<template>
	<view>

		<view class="address-box" v-if="addressList">
			<view v-for="(item,index) in addressList" :key="index" @click="backPay(item)">
				<view class="text-box">
					<view class="left">
						<view class="box">
							<text class="firstname">{{firstName(item.name)}}</text>
						</view>
					</view>
					<view class="main">
						<view class="info">
							<text class="name">{{item.name}}</text>
							<text class="phone">{{item.tel}}</text>
						</view>
						<view class="address">
							{{address(item)}}
						</view>
					</view>
					<view class="right" @click.stop="upAddress(item)">
						<uni-icons type="info" size="30"></uni-icons>
					</view>
				</view>
			</view>
		</view>


		<u-empty v-else mode="address" icon="http://cdn.uviewui.com/uview/empty/address.png">
		</u-empty>

		<view class="btn">
			<view class="text-box" @click="addAddress">
				<text class="text">+添加收货地址</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAddressList
	} from '../../api/address.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				// 地址列表
				addressList: [],

			};
		},
		computed: {

		},
		onShow() {
			// 运行该方法
			this.getList()
		},
		mounted() {
			// uni.getLocation({
			// 	type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			// 	success: function(res) {
			// 		const latitude = res.latitude;
			// 		const longitude = res.longitude;
			// 		uni.openLocation({
			// 			latitude: latitude,
			// 			longitude: longitude,
			// 			success: function() {
			// 				console.log('success');
			// 			}
			// 		});
			// 	}
			// });
		},
		methods: {
			...mapMutations('user',['updateAddress']),
			// 获取地址列表
			getList() {
				getAddressList().then((res) => {
					// console.log(res.data);
					this.addressList = res.data;
					console.log(this.addressList);
				})
			},
			// 获取姓氏
			firstName(name) {
				// console.log(name);
				return name.charAt(0) // 截取姓氏的第一个字符
			},
			address(item) {
				// console.log(item);
				const address = item.province + ' ' + item.city + ' ' + item.county + ' ' + item.street;
				// console.log(address);
				return address;
			},
			// 更新用户信息
			upAddress(item) {
				// console.log(item);
				uni.navigateTo({
					url: '/subpkg/addressInfo/addressInfo?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			// 添加收货地址
			addAddress() {
				const array = this.addressList.map(item => item.id);
				// console.log(array);
				let max = Math.max(...array) + 1;
				console.log(max);
				uni.navigateTo({
					url: '/subpkg/addressInfo/addressInfo?id=' + max + '&isAdd=' + true
				})
			},
			// 携带地址返回支付
			backPay(item) {
				console.log("返回支付");
				console.log(item);
				// 携带数据会与之前的产生冲突
				// uni.navigateTo({
				// 	url: '/subpkg/settlement/settlement?address=' + JSON.stringify(item)
				// })
				let that = this;
				uni.navigateBack({
				  delta: 1,
				  success: function() {
					  console.log(that);
				    // 在返回成功时，向上一页传递地址数据
					that.updateAddress(item)
				  }
				});
			}
		}
	}
</script>

<style lang="scss">
	.address-box {
		background-color: #fff;
		// background-color: red;
		border-radius: 10px;
		margin: 10px 2px;
		// max-height: 500px;
		// height: auto;

		.text-box {
			padding: 10px 2px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.left {
				width: 10%;

				.box {
					width: 30px;
					height: 30px;
					border-radius: 50%;
					background-color: #eec193;

					.firstname {
						font-size: 15px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #ed5f34;
						padding: 5px 0px;
					}
				}
			}

			.main {
				flex: 1;
				padding: 0px 5px;

				.info {
					padding: 2px 0px;

					.name {
						font-weight: bold;
					}
				}

				.address {
					font-size: 12px;
					color: #C0C0C0;
				}
			}

			.right {
				width: 10%;
			}
		}
	}

	.btn {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translate(-50%, -50%);

		.text-box {
			height: 35px;
			width: 240px;
			border-radius: 20px;
			background: linear-gradient(90deg, rgba(175, 58, 180, 1) 20%, rgba(246, 119, 0, 1) 86%);

			text-align: center;

			.text {
				line-height: 35px;
				color: #fff;
			}
		}
	}
</style>