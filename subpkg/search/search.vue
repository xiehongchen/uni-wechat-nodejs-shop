<template>
	<!-- 搜索页面 -->
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>

		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, index) in searchResults.goods" :key="index"
				@click="gotoDetail(item.goods_id)">
				<uni-icons type="search" size="16"></uni-icons>
				<view class="goods-name">{{ item.goods_name }}</view>
			</view>
		</view>


		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, index) in historys" :key="index" @click="gotoGoodsList(item)">
				</uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
import { getGoodsList } from '@/api/goods.js'
export default {
	data() {
		return {
			// 延时器的 timerId
			timer: null,
			// 搜索关键词
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

			// 搜索结果列表
			searchResults: [],
			// 搜索关键词的历史记录
			historyList: []
		};
	},
	onLoad() {
		this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
	},
	computed: {
		historys() {
			// 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
			// 而是应该新建一个内存无关的数组，再进行 reverse 反转
			return [...this.historyList].reverse()
		}
	},
	methods: {
		input(res) {
			// 清除 timer 对应的延时器
			clearTimeout(this.timer)
			// 重新启动一个延时器，并把 timerId 赋值给 this.timer
			this.timer = setTimeout(() => {
				// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
				this.queryObj.query = res
				console.log(res);
				console.log(this.queryObj.query)
				// 根据关键词，查询搜索建议列表
				this.getSearchList()
			}, 500)
		},
		// 根据搜索关键词，搜索商品建议列表
		async getSearchList() {
			// 判断关键词是否为空
			if (this.queryObj.query === '') {
				this.searchResults = []
				return
			}
			console.log(this.queryObj.query);
			// 发起请求，获取搜索建议列表
			let res = await getGoodsList(this.queryObj)
			console.log(res);
			if (res.meta.status !== 200) return uni.$showMsg()
			this.searchResults = res.message
			console.log(this.searchResults);
			// 1. 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
			this.saveSearchHistory()
		},
		gotoDetail(goods_id) {
			uni.navigateTo({
				// 指定详情页面的 URL 地址，并传递 goods_id 参数
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
			})
		},
		// 2. 保存搜索关键词的方法
		saveSearchHistory() {
			// 2.1 直接把搜索关键词 push 到 historyList 数组中
			// this.historyList.push(this.kw)
			// 1. 将 Array 数组转化为 Set 对象
			const set = new Set(this.historyList)
			// 2. 调用 Set 对象的 delete 方法，移除对应的元素
			set.delete(this.queryObj.query)
			// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
			set.add(this.queryObj.query)
			// 4. 将 Set 对象转化为 Array 数组
			this.historyList = Array.from(set)
			// 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
			uni.setStorageSync('kw', JSON.stringify(this.historyList))
		},
		// 清空搜索历史记录
		cleanHistory() {
			// 清空 data 中保存的搜索历史
			this.historyList = []
			// 清空本地存储中记录的搜索历史
			uni.setStorageSync('kw', '[]')
		},
		// 点击跳转到商品列表页面
		gotoGoodsList(kw) {
			uni.navigateTo({
				url: '/subpkg/goods_list/goods_list?query=' + kw
			})
		}
	}
}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}

.sugg-list {
	padding: 0 5px;

	.sugg-item {
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #E1E1E1;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		.goods-name {
			// 文字不允许换行（单行文本）
			white-space: nowrap;
			// 溢出部分隐藏
			overflow: hidden;
			// 文本溢出后，使用 ... 代替
			text-overflow: ellipsis;
			margin-left: 8px;
		}
	}
}

.history-box {
	padding: 0 5px;

	.history-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;

		.uni-tag {
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>