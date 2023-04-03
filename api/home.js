import $http from '@/config/request.js'
// 获取主页轮播图
export function getSwiperList() {
	return $http.request({
		url: "/home/swiperdata",
	})
}

// 获取分类导航数据
export function getNavList() {
	return $http.request({
		url: "/home/cateitems",
	})
}

// 获取楼层标题
export function getFloorTitle() {
	return $http.request({
		url: "/home/floortitle",
	})
}

// 获取楼层数据
export function getFloorList() {
	return $http.request({
		url: "/home/floordata",
	})
}