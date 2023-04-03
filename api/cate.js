import $http from '@/config/request.js'

// 获取分类数据
export function getCateList() {
	return $http.request({
		url: "/cate/list",
	})
}