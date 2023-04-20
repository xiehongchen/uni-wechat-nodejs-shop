<template>
	<view class="content">
		<view class="navbar">
			<view v-for="item, index in navList" :key="index" class="nav-item" @click="handleTabClick(index)">
				<text :class="{ current: tabCurrentIndex === index }">
					{{ item.text }}
				</text>
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(item, index) in navList" :key="index">
				<scroll-view class="list-scroll" scroll-y @scrolltolower="loadData(index)">
					<u-empty text="暂无优惠劵" mode="coupon" v-if="item.dataList.length == 0"> </u-empty>
					
					<my-coupon-list :coupon="item.dataList" @useCoupon="useCoupon"></my-coupon-list>
					  
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
import {
	getUserCouponList
} from '@/api/coupon.js'
export default {
	data() {
		return {
			// tab栏下标
			tabCurrentIndex: 0,
			navList: [
				{
					text: '未使用',
					loadStatus: 'loadmore',
					pageNumber: 1,
					dataList: []
				},
				{
					text: '已使用',
					loadStatus: 'loadmore',
					pageNumber: 1,
					dataList: []
				},
				{
					text: '已过期',
					loadStatus: 'loadmore',
					pageNumber: 1,
					dataList: []
				}
			],
			// 请求参数
			params: {
				// 优惠券状态 0未使用 1已使用 2已过期
				status: 0,
				pageSize: 10,
				pageNumber: 1,
			},
		};
	},
	onShow() {
		this.initData(this.tabCurrentIndex);
	},
	watch: {
		tabCurrentIndex: function (newVal, oldVal) {
			// console.log(newVal);
			// console.log(oldVal);
			this.params.status =  newVal;
			this.navList.forEach((res) => {
				res.pageNumber = 1;
				res.loadStatus = "loadmore";
				res.dataList = [];
			});
			this.loadData(newVal);
		}
	},
	methods: {
		// tab栏点击事件
		handleTabClick(indx) {
			console.log("tab栏点击事件");
			this.tabCurrentIndex = indx;
		},
		useCoupon() {
			uni.navigateTo({
				url: '/subpkg/goods_list/goods_list?query=荣耀'
			})
		},
		// swiper切换事件
		changeTab(e) {
			console.log(e);
			console.log("swiper切换事件");
			this.tabCurrentIndex = e.detail.current;
		},
		// 初始数据
		initData(index) {
			// console.log(index);
			this.navList[index].pageNumber = 1;
			this.navList[index].loadStatus = "loadmore";
			this.navList[index].dataList = [];
			this.loadData(index);
		},
		// 获取优惠券列表
		loadData(index) {
			console.log("触发加载更多");
			this.params.pageNumber = this.navList[index].pageNumber;
			// console.log(this.params);
			getUserCouponList(this.params).then(res => {
				// console.log(res);
				uni.stopPullDownRefresh();
				if (res.meta.status == 200) {
					let dataList = res.message;
					console.log(dataList);
					if (dataList.length == 0) {
						this.navList[index].loadStatus = "noMore";
					} else if (dataList.length < 4) {
						this.navList[index].loadStatus = "noMore";
					}
					if (dataList.length > 0) {
						this.navList[index].dataList =
							this.navList[index].dataList.concat(dataList);
						this.navList[index].pageNumber += 1;
					}
					console.log(this.navList[index].orderList);
				}
			})
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
	justify-content: space-around;
	align-items: center;
	height: 80rpx;
	background-color: #fff;
	color: #ff0000;
	z-index: 100;

	.nav-item {
		flex: 1;
		text-align: center;
		color: #ff0000;
		height: 100%;
		position: relative;

		.current {
			font-weight: bold;
			font-size: 28rpx;

			&:after {
				content: "";
				position: absolute;
				bottom: 20rpx;
				left: 108rpx;
				width: 30rpx;
				border-bottom: 2px solid #ff0000;
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
</style>
