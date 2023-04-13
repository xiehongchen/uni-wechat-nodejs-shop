import $http from '@/config/request.js'

// 获取地址列表
export function getAddressList() {
	return $http.request({
		url: "/address/list",
		header: {
			token: true
		},
	})
}

// 获取默认地址
export function getDefaultAddress() {
	return $http.request({
		url: "/address/default",
		header: {
			token: true
		},
	})
}

// 增加地址
export function addAddress(address) {
	return $http.request({
		url: "/address/add",
		method: "post",
		header: {
			token: true
		},
		data: {
			...address
		}
	})
}

// 更新地址
export function editAddress(address) {
	console.log(address);
	return $http.request({
		url: "/address/edit",
		method: "put",
		header: {
			token: true
		},
		data: {
			...address
		}
	})
}

// 删除地址
export function deleteAddress(id) {
	console.log(id);
	return $http.request({
		url: "/address/delete",
		method: "post",
		header: {
			token: true
		},
		data: {
			id: id
		}
	})
}