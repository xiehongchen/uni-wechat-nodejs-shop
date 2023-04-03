// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 导入 store 的实例对象
import store from './store/store.js'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}

Vue.config.productionTip = false


const app = new Vue({
	...App,
	// 将 store 挂载到 Vue 实例上
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif