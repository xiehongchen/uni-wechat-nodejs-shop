import $http from '@/config/request.js'


// 提交订单	地址id、支付金额、商品列表
export function createOrder(addressId, payment, goodsList,couponid,lastPrice) {
	return $http.request({
		url: "/orders/create",
		method: 'post',
		header: {
			token: true
		},
		data: {
			addressId: addressId,
			payment: payment,
			goodsList: goodsList,
			couponid:couponid,
			lastPrice:lastPrice
		}
	})
}

// 支付	订单id、支付状态
export function payCart(order_id,payStatus) {
	return $http.request({
		url: "/orders/pay",
		method: 'put',
		header: {
			token: true
		},
		data: {
			order_id: order_id,
			payStatus:payStatus
		}
	})
}

// 获取订单列表	订单状态
export function getOrderList(params) {
	return $http.request({
		url: "/orders/list",
		header: {
			token: true
		},
		data: {
			params: params,
		}
	})
}

// 取消订单
export function cancelOrder(order_id,reason) {
	return $http.request({
		url: "/orders/cancel",
		method: 'put',
		header: {
			token: true
		},
		data: {
			order_id: order_id,
			reason: reason
		}
	})
}
