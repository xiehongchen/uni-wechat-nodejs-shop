<template>
	<view class="box">
		<uni-section title="编辑收货地址" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :modelValue="address" label-width="80px" :rules="customRules">
					<uni-forms-item label="收货人" required name="name"> 
						<uni-easyinput v-model="address.name" placeholder="名字" :rules="nameRules"/>
					</uni-forms-item>
					<uni-forms-item label="手机号码" required name="tel">
						<uni-easyinput v-model="address.tel" placeholder="手机号"/>
					</uni-forms-item>
					<uni-forms-item label="所在地区" required>
						<uni-easyinput v-model="area" placeholder="地区" />
					</uni-forms-item>
					<uni-forms-item label="详细地址" required>
						<uni-easyinput type="textarea" v-model="address.street" placeholder="详细地址" />
					</uni-forms-item>
				</uni-forms>
				<view class="default">
					<text>设为默认收获地址</text>
					<u-switch v-model="value" @change="change"></u-switch>
				</view>
				<!-- 保存信息按钮 -->
				<view class="btn">
					<view class="text-box" @click="submitAddress">
						<text class="text">保存</text>
					</view>
					<view class="text-box" @click="deleteAddress">
						<text class="text">删除</text>
					</view>
				</view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import {
		editAddress,
		deleteAddress,
		addAddress
	} from '../../api/address.js'
	export default {
		data() {
			return {
				// 地址信息
				address: {},
				// 设置默认收货地址
				value: false,
				// 所在地区
				area: '',
				isAdd: false,
				customRules: {
					// 对name字段进行必填验证
					name: {
						// name 字段的校验规则
						rules: [
							// 校验 name 不能为空
							{
								required: true,
								errorMessage: '请填写姓名',
							},
							// 对name字段进行长度验证
							{
								minLength: 3,
								maxLength: 8,
								errorMessage: '长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					tel: {
						rules: [{
								required: true,
								errorMessage: '请填写号码'
							},
							{
								validateFunction: function(rule, value, data, callback) {
									let iphoneReg = (
										/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/
									); //手机号码
									if (!iphoneReg.test(value)) {
										callback('手机号码格式不正确，请重新填写')
									}
								}
							}
						]
					}
				}
			};
		},
		// onReady() {
		// 	// 需要在onReady中设置规则
		// 	this.$refs.baseForm.setRules(this.customRules)
		// },
		onLoad(options) {
			console.log("onLoad--------------------------------------");
			// 获取商品 Id
			// console.log(options);
			// console.log(options.id);
			if (options.id) {
				this.address.id = options.id;
				this.isAdd = options.isAdd;
			}
			// console.log(this.address);
			// console.log(this.isAdd);
			// console.log(options.item);
			if (options.item) {
				this.address = JSON.parse(decodeURIComponent(options.item));
				if(this.address.isDefault){
					this.value = true;
				}
			}
			// console.log(this.address);

		},
		onShow() {
			console.log("onShow--------------------------------------");
			// console.log(this.address.name);
			if (this.address.name) {
				this.area = this.address.province + ' ' + this.address.city + ' ' + this.address.county;
			}
			// console.log(this.address);
		},
		methods: {
			change() {
				if (this.value) {
					console.log("设为默认");
				}
			},
			// 更新地址
			submitAddress() {
				// this.$refs.baseForm.validate().then(res => {
				// 	console.log('success', res);
				// 	uni.showToast({
				// 		title: `校验通过`
				// 	})
				// }).catch(err => {
				// 	console.log('err', err);
				// })
				if (this.address.name == null || this.address.tel == null || this.area == null || this.address.street ==
					null) {
					uni.showToast({
						title: '请正确填写信息',
						duration: 2000,
						icon: 'error'
					});
					return;
				}
				// 进行编写发送的数据格式
				let temporary = this.area.split(' ')
				this.address.province = temporary[0];
				this.address.city = temporary[1];
				this.address.county = temporary[2];
				if (this.value) {
					this.address.isDefault = 1;
				} else {
					this.address.isDefault = 0;
				}
				// console.log(this.address);
				// console.log("保存地址");

				if (this.isAdd) {
					console.log("新增");
					console.log(this.address);
					addAddress(this.address).then((res) => {
						console.log(res);
						if (res.status == 200) {
							uni.navigateBack({
								delta: 1
							});
						}
					})
				} else {
					editAddress(this.address).then((res) => {
						console.log(res);
						if (res.status == 200) {
							uni.navigateBack({
								delta: 1
							});
						}
					})
				}

			},
			// 删除地址
			deleteAddress() {
				if (this.isAdd) {
					uni.navigateBack({
						delta: 1
					});
				} else {
					deleteAddress(this.address.id).then((res) => {
						if (res.status == 200) {
							uni.navigateBack({
								delta: 1
							});
						}
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	.box {
		background-color: #fff;
		height: 100%;
		width: 100%;
		border-radius: 10px;
		margin: 10px;

		.default {
			display: flex;
			justify-content: space-between;
			margin-top: 30px;
			padding: 0px 20px;
		}

		.btn {
			display: flex;
			justify-content: space-around;
			margin: 30px 0px;

			.text-box {
				height: 35px;
				width: 150px;
				border-radius: 20px;
				background: linear-gradient(90deg, rgba(175, 58, 180, 1) 20%, rgba(246, 119, 0, 1) 86%);

				text-align: center;

				.text {
					line-height: 35px;
					color: #fff;
				}
			}
		}
	}
</style>