import $http from '@/config/request.js'

// 提交购物车数据
export function setCartList(goods_id) {
	return $http.request({
		url: "/cart/add",
		method: 'post',
		header: {
			token: true
		},
		data: {
			goods_id: goods_id
		}
	})
}

// 提交购物车数据
export function setCartNum(goods) {
	return $http.request({
		url: "/cart/edit",
		method: 'put',
		header: {
			token: true
		},
		data: {
			goods: goods
		}
	})
}

export function deleteCartList(goods_id) {
	return $http.request({
		url: "/cart/delete",
		method: 'post',
		header: {
			token: true
		},
		data: {
			goods_id: goods_id
		}
	})
}