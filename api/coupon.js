import $http from '@/config/request.js'

// 获取优惠券列表
export function getCouponList() {
    return $http.request({
        url: "/coupon/list",
        header: {
            token: true
        },
    })
}

// 获取用户的优惠劵列表
export function getUserCouponList(params) {
    console.log(params);
    return $http.request({
        url: "/coupon/u-list",
        header: {
            token: true
        },
        data: {
            params: params
        }
    })
}

// 添加优惠券
export function addCoupon(couponId) {
    return $http.request({
        url: "/coupon/add",
        method: "POST",
        header: {
            token: true
        },
        data: {
            couponId
        }
    })
}

// 使用优惠券
export function useUserCoupon(id,message){
    return $http.request({
        url: "/coupon/use",
        method:"put",
        header:{
            token:true
        },
        data:{
            id:id,
            message:message
        }
    })
}