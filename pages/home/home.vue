<template>
	<!-- 主页 -->
	<view>
		<!-- 使用自定义的搜索组件 -->
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>

		<!-- 轮播图区域 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 循环渲染轮播图的 item 项 -->
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<!-- 动态绑定图片的 src 属性 -->
					<image class="swiper-item-image" :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
				<text class="nav-text">{{ item.name }}</text>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].width + 'rpx' }"
							mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2"
							v-if="index2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{ width: item2.width + 'rpx' }">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { baseUrl } from '../../config/config.js';
import {
	getSwiperList,
	getNavList,
	getFloorTitle,
	getFloorList
} from '@/api/home.js'
import $http from '@/config/request.js'
export default {
	data() {
		return {
			// 轮播图的数据列表，默认为空数组
			swiperList: [],
			// 分类导航的数据列表
			navList: [],
			// 楼层的数据列表
			title: [],
			data: [],
			floorList: [{
				floor_title: {},
				product_list: []
			},
			{
				floor_title: {},
				product_list: []
			},
			{
				floor_title: {},
				product_list: []
			}
			],
		};
	},
	onLoad() {
		// 在小程序页面刚加载的时候，调用获s取轮播图数据的方法
		this.swiper()
		// 在 onLoad 中调用获取数据的方法
		this.nav()
		// 在 onLoad 中调用获取楼层数据的方法
		this.floorTitle()
		this.floorData()
	},
	methods: {
		//  获取轮播图数据
		async swiper() {
			let res = await getSwiperList();
			// console.log("获取的数据");
			// console.log(res);
			this.swiperList = res.message
			// this.swiperList.forEach((item)=>{
			// 	// console.log(item);
			// 	item.image_src = baseUrl + '/' + item.image_src
			// })
			// console.log("首页轮播图");
			// console.log(this.swiperList);
		},
		// 获取分类导航数据
		async nav() {
			let res = await getNavList();
			this.navList = res.message
			console.log("首页分类导航");
			console.log(this.navList);
		},
		// nav-item 项被点击时候的事件处理函数
		navClickHandler(item) {
			// 判断点击的是哪个 nav
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			} else if (item.name === '每日优惠') {
				uni.navigateTo({
					url: '/subpkg/coupon-list/coupon-list'
				})
			} else if (item.name === '电子产品') {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + '电子产品'
				})
			}else{
				uni.switchTab({
					url: '/pages/my/my'
				})
			}
		},
		// 获取楼层标题
		async floorTitle() {
			let res = await getFloorTitle();
			// console.log("楼层标题");
			// console.log(res);
			this.title = res.message;
			// console.log(this.title);
		},
		// 获取楼层数据
		async floorData() {
			let res = await getFloorList();
			// console.log("楼层内容1");
			// console.log(res);
			this.data = res.message;
			// console.log("楼层内容2");
			// console.log(this.data);
			for (let i = 0; i < this.title.length; i++) {
				this.floorList[i].floor_title = this.title[i];
				this.floorList[i].product_list = this.data.slice(i * 5, i * 5 + 5)
			}
			// console.log("楼层数据");
			// console.log(this.floorList);
			// 通过双层 forEach 循环，处理 URL 地址
			this.floorList.forEach(floor => {
				floor.product_list.forEach(prod => {
					prod.url = '/subpkg/goods_list/goods_list?query=' + prod.name;
				})
			})
			// console.log("添加url的楼层数据");
			// console.log(this.floorList);
		},
		gotoSearch() {
			// uni.navigateTo() 保留当前页面，跳转到应用内的某个页面
			uni.navigateTo({
				url: '/subpkg/search/search'
			})
		}
	}
}
</script>

<style lang="scss">
.search-box {
	// 设置定位效果为“吸顶”
	position: sticky;
	// 吸顶的“位置”
	top: 0;
	// 提高层级，防止被轮播图覆盖
	z-index: 999;
}

.swiper {
	height: 330rpx;

	.swiper-item {
		height: 100%;

		.swiper-item-image {
			width: 100%;
			height: 100%;
		}
	}
}

.nav-list {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin: 10px 0;
	padding: 10px 5px;
	border-radius: 10px;
	background: #fff;

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;

		.nav-text {
			font-size: 24rpx;
			margin-top: 10rpx;
		}

		.nav-img {
			width: 40px;
			height: 40px;
		}

	}
}

.floor-title {
	height: 60rpx;
	width: 100%;
	display: flex;
}

.right-img-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.floor-img-box {
	display: flex;
	padding-left: 10rpx;
}
</style>