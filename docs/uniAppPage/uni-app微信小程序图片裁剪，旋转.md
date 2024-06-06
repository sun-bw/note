## 一、导入插件
插件地址：https://ext.dcloud.net.cn/plugin?id=2381#detail
## 二、图片旋转vue文件代码示例
模版内容：
```html
<template>
	<view class="container">
		<view class="cropper-wrap">
		  <image-cropper
		    id="image-cropper"
		    ref="cropper"
		    :zoom="1"
		    :angle="0"
			:imageCenter='true'
		    :max-zoom="1"
		    :min-zoom="1"
			cutWidth='70%'
			:boundDetect='true' 
			:showCtrlBorder='true' 
			:resetCut='true' 
		    :src="imageSrc"
		    @load="load"
		    @error="errHandle"
		    @cropped="cropped"
		    @afterDraw="afterDraw"
		    @beforeDraw="beforeDraw"
		  />
		</view>
		<view class="">
			<view class="ctrls-wrap">
				<view class="rotate-info" @tap="leftRateClick">
					<image class="rotate-image" src="/static/img/picture-edit-leftRorate.png"></image>
					<text>左转90°</text>
				</view>
				<view class="rotate-info" @tap="rightRateClick">
					<image class="rotate-image" src="../../static/img/picture-edit-rightRorate.png"></image>
					<text>右转90°</text>
				</view>
			</view>
			<view class="btn-info">
				<button class="button confirm-btn" type="primary" @tap="nextClick">下一步</button>
			</view>
		</view>
	</view>
</template>
```
js:
```js
<script>
	import ImageCropper from '@/components/uniapp-nice-cropper/cropper.vue'
	export default{
		components: {
			ImageCropper
		},
		data() {
			return {
				imageSrc: '',//图片地址
				rorateImage: '',//截取旋转后的图片
				rateAngle:0,//图片旋转的度数
				id: '',
				runNumbner: 0,
			}
		},
		onLoad(options) {
			this.imageSrc = options.chooseImage
			this.id = options.id
		},
		methods: {
			/*
			 *@description: 图片加载完成回调。
			*/
			load(path, info) {
				this.rorateImage = path.path
			},
			
			/*
			 *@description: 画布绘制前的钩子函数
			*/
			beforeDraw(context, transform) {
				// 裁剪背景色
				context.setFillStyle('white')
				// transform.zoom = 2
			},
			
			/*
			 *@description: 画布绘制后的钩子函数
			*/
		   afterDraw(ctx, info){
			   ctx.setFillStyle('white')
			   // ctx.fillText('我是一行小水印', info.width - 100, info.height - 20)
		   },
		   
		  /*
		   *@description:裁剪结果回调
		   * runNumbner：判断是否为编辑，编辑的时候是否是第一次执行当前方法。 
		   * 如果是不进行赋值
		   * 不进行的原因为，编辑的时候，如果不操作，获取不到图片。
		  */
		   cropped(e) { 
			   if(this.id && this.runNumbner == 0) {
				   this.runNumbner++
				   return
			   }
			  this.rorateImage = e
		   },
		   
		   leftRateClick() {
			   this.rateAngle -= 90
			   this.$refs.cropper.setRotate(this.rateAngle)
		   },
		   
		   rightRateClick() {
			   this.rateAngle += 90
			   this.$refs.cropper.setRotate(this.rateAngle)
		   },
		   
		   nextClick() {
			   /*
			    *@description:获取图片信息，cropper.js新增方法
			   */
			   let rotateImageInfo = this.$refs.cropper.getImage()
			   uni.navigateTo({
				url:'/pages/upload-picture/change-color-picture?imageUrl=' + this.rorateImage 
							+ '&iamgeWidth=' + rotateImageInfo.width 
							+ '&imageHeight=' + rotateImageInfo.height
							+ `&id=${this.id ? this.id : ''}`
			   })
		   }
		}
	}
</script>
```
## 三、插件代码修改示例
为了满足需求，修改了插件源码，满足裁剪框初始和图片一样大。<br/>
cropper.js
```js
initImage() {
    /*
    *@description:改变裁剪框初始位置，和图片一般大
    */
	
    let countHeight = this.containerHeight - this.image.height 
    this.corner.top = countHeight - (countHeight / 2)
    this.corner.bottom = countHeight - (countHeight / 2)
    this.ctrlHeight = this.image.height //重新赋值默认高度
}
setRotate() {
    /*
    *@description: 旋转后调用方法
    */
    this.draw()
}
/*
    *@description: 新增获取图片数据
*/
getImage() {
    return this.image
},
```