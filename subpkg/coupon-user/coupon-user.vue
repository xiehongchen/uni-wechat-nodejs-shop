<template>
	<view>
		<my-coupon-list :coupon="couponList" @useCoupon="useCoupon()" @cancelUseCoupon="cancelUseCoupon()"></my-coupon-list>
		<u-empty text="暂无优惠劵" mode="coupon" v-if="couponList.length == 0"> </u-empty>
	</view>
</template>

<script>
import {
	getUserCouponList,
	useUserCoupon
} from "@/api/coupon.js";
export default {
	data() {
		return {
			couponList: [],
			params: {
				// 优惠券状态 0未使用 1已使用 2已过期
				status: 0,
				pageSize: 10,
				pageNumber: 1,
			},
		};
	},
	onShow() {
		this.getList();
	},
	methods: {
		async getList() {
			await getUserCouponList(this.params).then((res) => {
				this.couponList = res.message;
				console.log("获取个人的优惠劵列表---");
				console.log(this.couponList);
			})
		},
		async useCoupon(e) {
			console.log("使用优惠劵---------------------------------");
			console.log(e.item);
			let item = e.item;
			let message = 'use'
			await useUserCoupon(item.id, message).then((res) => {
				console.log(res);
				let pages = getCurrentPages();//获取页面栈
				// console.log(pages);
				let prevPage = pages[pages.length - 2]; //上一个页面
				// console.log(prevPage);
				// 直接给上一个页面的coupon属性赋值
				prevPage.$vm.coupon = item;
				uni.navigateBack({
					delta: 1
				})
			})
		},
		async cancelUseCoupon(e){
			console.log("取消使用优惠劵---------------------------------");
			console.log(e.id);
			let id = e.id;
			let message = 'cancelUse'
			await useUserCoupon(id, message).then((res) => {
				console.log(res);
				let pages = getCurrentPages();//获取页面栈
				// console.log(pages);
				let prevPage = pages[pages.length - 2]; //上一个页面
				// console.log(prevPage);
				// 直接给上一个页面的coupon属性赋值
				prevPage.$vm.coupon = [];
				uni.navigateBack({
					delta: 1
				})
			})
		}
	}
}
</script>

<style lang="scss"></style>
