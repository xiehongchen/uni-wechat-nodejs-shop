export default {
	// 开启命名空间
	namespaced: true,

	// state 数据
	state: () => ({
		// 3. 读取本地的收货地址数据，初始化 address 对象
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// 登录成功之后的 token 字符串
		token: uni.getStorageSync('token') || '',
		// 用户的基本信息
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向的 object 对象 { openType, from }
		redirectInfo: null
	}),

	// 方法
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address
			// 2. 通过 this.commit() 方法，调用 user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
			this.commit('user/saveAddressToStorage')
		},
		// 定义将 address 持久化存储到本地 mutations 方法
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 更新用户的基本信息
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo
			// 通过 this.commit() 方法，调用 user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
			this.commit('user/saveUserInfoToStorage')
			// console.log("vuex---用户信息更新完毕");
			// console.log(state.userinfo);
		},
		// 将 userinfo 持久化存储到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
			// console.log("vuex---将用户信息存储到本地");
		},
		// 更新 token 字符串
		updateToken(state, token) {
			state.token = token
			// 通过 this.commit() 方法，调用 user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
			this.commit('user/saveTokenToStorage');
			// console.log("vuex---用户token更新完毕");
			// console.log(state.token);
		},
		// 将 token 字符串持久化存储到本地
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
			// console.log("vuex---将用户token存储到本地");
		},
		// 删除userinfo用户信息
		removeUserInfoStorage(state) {
			uni.removeStorageSync('userinfo');
			uni.removeStorageSync('token');
			uni.removeStorageSync('address');
			uni.removeStorageSync('kw');
			uni.removeStorageSync('cart');
		},
		// 更新重定向的信息对象
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
		}
	},

	// 数据包装器
	getters: {
		// 收货详细地址的计算属性
		addstr(state) {
			if (!state.address.provinceName) return ''

			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}
	},
}