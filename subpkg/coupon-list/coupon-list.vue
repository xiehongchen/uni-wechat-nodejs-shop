<template>
	<view>
		<my-coupon-list :coupon="couponList" :message="source" @getCoupon="getCoupon()"></my-coupon-list>
	</view>
</template>

<script>
import {
	getCouponList,
	addCoupon
} from "@/api/coupon.js";
export default {
	data() {
		return {
			source: 'get',
			couponList: []
		};
	},
	onShow() {
		this.getList();
	},
	methods: {
		async getList() {
			let res = await getCouponList();
			this.couponList = res.message;
			
			console.log("获取优惠券列表");
			console.log(this.couponList);
		},
		async getCoupon(e) {
			console.log(e);
			await addCoupon(e.couponId);
		},
	}
}
</script>

<style lang="scss"></style>
