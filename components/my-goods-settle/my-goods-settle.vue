<template>
	<!-- 单个商品列表组件 -->
	<view>
		<view class="goods-item">
			<view class="goods-item-up">
				<image :src="goods.img_md" class="goods-pic"></image>
				<view class="box">
					<view class="text">
						{{goods.goods_name}}
					</view>
					<view class="info">
						<view class="price">
							￥{{goods.goods_price}}
						</view>
						<uni-number-box :min="1" :value="goods.goods_count || goods.goods_num" @change="numChangeHandler">
						</uni-number-box>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods-settle",
		// 定义 props 属性，用来接收外界传递到当前组件的数据
		props: {
			// 商品的信息对象
			goods: {
				goods: Object,
				defaul: {},
			},
		},
		data() {
			return {
		
			}
		},
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		mounted() {
			// console.log("购买商品信息");
			// console.log(this.goods);
		},
		methods:{
			numChangeHandler(val) {
				// console.log(this.goods);
				// 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
				this.$emit('num-change', {
					// 商品的 Id
					goods_id: this.goods.goods_id,
					// 商品的最新数量
					goods_count: +val
				})
			}
		}

	}
</script>

<style lang="scss">
	.goods-item {
		background-color: #fff;
		border-radius: 10px;
		margin: 10px 2px;

		.goods-item-up {
			padding: 5px 10px;
			display: flex;

			.goods-pic {
				width: 80px;
				height: 80px;
				border-radius: 5px;
			}
			.box{
				margin-left: 40px;
				padding: 10px 0px;
				width: 100%;
				.info{
					margin-top: 20px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.price{
						color: #FF0000;
					}
				}
			}
		}
	}
</style>