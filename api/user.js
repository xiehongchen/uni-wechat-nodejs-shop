import $http from '@/config/request.js'

// 登录
export function userLogin(code){
	return $http.request({
		url:'/user/token',
		method:"post",
		data:{
			code: code,
		}
	})
}