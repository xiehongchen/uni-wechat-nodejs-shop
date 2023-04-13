import store from '@/store/store.js'
 // 引入 baseUrl
import { baseUrl } from './config.js';
export default {
	common: {
		url: "http://localhost:3000/api",
		// url:  baseUrl + "/api",
		data: {},
		header: {
			"Content-Type": "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: "GET",
		dataType: "json"
	},
	request(options = {}) {

		uni.showLoading({
			title: '加载中'
		});

		options.url = this.common.url + options.url;
		options.data = options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = options.dataType || this.common.dataType;

		// console.log(options.url);
		// console.log(store.state.user.token);
		// 判断是否传入了header头的token进行用户是否登录的验证
		if (options.header.token) {
			const token = store.state.user.token;
			// console.log("request---token");
			// console.log(token);
			if (!token) {
				uni.showToast({
					title: "请先登录",
					icon: "none"
				})
				return uni.navigateTo({
					url: "/pages/login/login"
				})
			} else {
				options.header.Authorization = `Bearer ${token}`
			}

		}
		// console.log("options数据");
		// console.log(options.url);
		// console.log(options.data);
		// console.log(options.header);
		// console.log(options.method);
		// console.log(options.dataType);
		// 返回一个promise
		return new Promise((res, rej) => {
			uni.request({
				...options,
				success: (result) => {
					console.log("成功*******************");
					// console.log("result的结果");
					// console.log(result);
					if (result.statusCode != 200) {
						uni.hideLoading();
						return rej();
					}
					let data = result.data
					setTimeout(function() {
						uni.hideLoading();
					}, 200);
					res(data);
				},
				fail: (err) => {
					console.log("错误*******************");
					uni.hideLoading();
				}
			})
		})
	}
}