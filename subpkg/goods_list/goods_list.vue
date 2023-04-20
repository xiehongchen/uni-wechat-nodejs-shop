<template>
	<!-- 商品列表 -->
	<view>
		<!-- 内容 -->
		<view v-if="goodsList.length > 0" class="goods-list">
			<!-- 使用自定义的搜索组件 -->
			<view class="search-box">
				<my-search @click="gotoSearch"></my-search>
			</view>

			<!-- 导航 -->
			<view class="navbar">
				<view class="nav-item" :class="{ current: isOne }" @click="sort(1)">综合排序</view>
				<view class="nav-item" :class="{ current: isTwo }" @click="sort(2)">
					<text>销量</text>
					<view class="p-box">
						<view class="icon">
							<uni-icons v-show="isTwo && isDesc" class="icon1" custom-prefix="iconfont"
								type="icon-xiangshang1" size="10"></uni-icons>
							<uni-icons v-show="isTwo && isAsc" class="icon1" custom-prefix="iconfont" type="icon-xiangxia1"
								size="10"></uni-icons>
						</view>

					</view>
				</view>
				<view class="nav-item" :class="{ current: isThree }" @click="sort(3)">
					<text>价格</text>
					<view class="p-box">
						<view class="icon">
							<uni-icons v-show="isThree && isDesc" custom-prefix="iconfont" type="icon-xiangshang1"
								size="10"></uni-icons>
							<uni-icons v-show="isThree && isAsc" class="icon1" custom-prefix="iconfont"
								type="icon-xiangxia1" size="10"></uni-icons>
						</view>
					</view>
				</view>
				<!-- <view class="nav-item" @click="sortGoods">筛选</view> -->
			</view>

			<!-- 数据展示 -->
			<view v-for="(goods, index) in goodsList" :key="index" @click="gotoDetail(goods)">
				<!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>

		<view v-else>
			<u-modal show="true" title="暂无数据,敬请期待!" @confirm="returnHome"></u-modal>
		</view>
	</view>
</template>

<script>
import { getGoodsList } from '@/api/goods.js'
export default {
	data() {
		return {
			// 请求参数对象
			queryObj: {
				// 查询关键词
				query: '',
				// 商品分类Id
				cid: '',
				// 页码值
				pagenum: 1,
				// 每页显示多少条数据
				pagesize: 10,
				// 排序类型
				sortType: "desc",
				ordernum: 1
			},
			// 商品列表的数据
			goodsList: [],
			// 总数量，用来实现分页
			total: 0,
			// 是否正在请求数据
			isloading: false,
			// 商品排序
			order: "1:desc",
		}
	},
	onLoad(options) {
		// 将页面参数转存到 this.queryObj 对象中
		this.queryObj.query = options.query || ''
		console.log(this.queryObj.query);
		this.queryObj.cid = options.cid || ''
		console.log(this.queryObj.cid);
		// 调用获取商品列表数据的方法
		this.goodsData()
	},
	computed: {
		isOne() {
			return this.order.indexOf("1") != -1;
		},
		isTwo() {
			return this.order.indexOf("2") != -1;
		},
		isThree() {
			return this.order.indexOf("3") != -1;
		},
		isDesc() {
			return this.order.indexOf("desc") != -1;
		},
		isAsc() {
			return this.order.indexOf("asc") != -1;
		},
	},
	methods: {

		// 获取商品列表数据
		async goodsData(cb) {
			// ** 打开节流阀
			this.isloading = true
			// 发起请求
			console.log(this.queryObj);
			let res = await getGoodsList(this.queryObj);
			console.log("商品列表请求数据：");
			console.log(res);
			// ** 关闭节流阀
			this.isloading = false
			// 只要数据请求完毕，就立即按需调用 callback 回调函数
			// cb && cb() 的含义是 只有当有回调参数的时候才执行回调函数
			cb && cb()
			// 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
			this.goodsList = [...this.goodsList, ...res.message.goods]
			console.log("商品列表数据");
			console.log(this.goodsList);
			this.total = res.message.total

			// let obj = {};
			// let reduce = [];
			// reduce = this.goodsList.reduce((item, next) => {
			// 	//item为没有重复id的数组，next为当前对象
			// 	console.log("item");
			// 	console.log(item);
			// 	console.log("next");
			// 	console.log(next);
			// 	obj[next.goods_id] ? '' : (obj[next.goods_id] = true && item.push(next));
			// 	return item;
			// }, []);
			// console.log("去重结果");
			// console.log(reduce);
			// this.goodsList = reduce;
		},
		// 点击跳转到商品详情页面
		gotoDetail(goods) {
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
			})
		},
		// 返回上一页
		returnHome() {
			uni.navigateBack({
				delta: 1
			});
			// uni.switchTab({
			// 	url: '/pages/home/home'
			// });

		},
		// 搜索框
		gotoSearch() {
			// uni.navigateTo() 保留当前页面，跳转到应用内的某个页面
			uni.navigateTo({
				url: '/subpkg/search/search'
			})
		},
		// 商品排序
		sort(index) {
			// 获取order值
			let orderIndex = this.order.split(":")[0];
			let orderSort = this.order.split(":")[1];
			let newOrder = "";
			// 高亮判断
			if (index == orderIndex) {
				newOrder = `${orderIndex}:${orderSort == "desc" ? "asc" : "desc"}`;
			} else {
				newOrder = `${index}:desc`;
			}
			this.order = newOrder;
			console.log("query值");
			this.queryObj.ordernum = newOrder.split(":")[0];
			this.queryObj.sortType = newOrder.split(":")[1];
			this.goodsList = [];
			console.log(this.queryObj);
			console.log(this.order);
			// 重新发起请求
			this.goodsData();
		}
	},
	// 触底的事件
	onReachBottom() {
		// 判断是否还有下一页数据
		if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
		// 判断是否正在请求其它数据，如果是，则不发起额外的请求
		if (this.isloading) return
		// 让页码值自增 +1
		this.queryObj.pagenum += 1
		// 重新获取列表数据
		this.goodsData()
	},
	// 下拉刷新的事件
	onPullDownRefresh() {
		// 1. 重置关键数据
		this.queryObj.pagenum = 1
		this.total = 0
		this.isloading = false
		this.goodsList = []

		// 2. 重新发起请求
		this.goodsData(() => uni.stopPullDownRefresh())
	}
}
</script>

<style lang="scss">
.navbar {
	display: flex;
	width: 100%;
	height: 80rpx;
	background: #fff;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);
	z-index: 10;
	flex-direction: row;

	.nav-item {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		height: 100%;
		position: relative;

		.p-box {
			display: flex;
			flex-direction: column;

			height: 100%;

			.icon {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100%;
			}
		}
	}

	.current {
		color: red;
		position: relative;

		&:after {
			content: "";
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			width: 40rpx;
			height: 0;
			border-bottom: 4rpx solid red;
		}
	}


}

.text {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 600rpx;
	height: 400rpx;
	border-radius: 40rpx;
	background-color: #f9f9f9;

	.text-font {
		font-size: 40rpx;
	}

	.text-button {
		margin-top: 50rpx;
		height: 60rpx;
		width: 220rpx;
		border-radius: 28rpx;
		text-align: center;
		background-color: #37a7c7;
	}
}
</style>