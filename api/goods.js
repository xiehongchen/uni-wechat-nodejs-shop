import $http from '@/config/request.js'

// 获取商品列表
export function getGoodsList(data) {
	return $http.request({
		url: "/goods/search",
		data: data
	})
}

// 获取商品详情
export function getGoodsDetail(goods_id) {
	return $http.request({
		url: "/goods/detail",
		data: {
			goods_id:goods_id
		}
	})
}