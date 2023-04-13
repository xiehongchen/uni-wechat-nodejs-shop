import $http from '@/config/request.js'
import user from '../store/user';

// 登录
export function userLogin(code) {
	return $http.request({
		url: '/user/token',
		method: "post",
		data: {
			code: code,
		}
	})
}

// 更新用户信息
export function setInfo(userInfo) {
	// console.log("传给后台的数据");
	// console.log(userInfo);
	return $http.request({
		url: '/user/info',
		method: "put",
		header: {
			token: true
		},
		data: {
			...userInfo
		}
	})
}

// 删除用户信息
export function removeInfo() {
	return $http.request({
		url: '/user/delete',
		method: "delete",
		header: {
			token: true
		}
	})
}