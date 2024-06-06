## 一、参考文章
https://blog.csdn.net/Yvonne_Lu7/article/details/81299291
## 二、代码示例
根据参考文章，使用js获canvas内容，修改为uni-app中语法。
```vue
<template>
	<view class="picColor-container">
		<view class="canvas-container" id="canvas-content">
			<canvas canvas-id="canvasa" id="canvasa" 
			:style="{width:canvasWidth +'px',height:canvasHeight +'px'}" 
			style="border: 1px solid #aaa;z-index: 2;" v-show="originalImageFlag"></canvas>
			<canvas canvas-id="canvasb" id="canvasb" 
			:style="{width:canvasWidth +'px',height:canvasHeight +'px'}" 
			style="border: 1px solid #aaa;position: absolute;z-index: 1;"  v-show="geryFlag"></canvas>
			<canvas canvas-id="canvasc" id="canvasb" 
			:style="{width:canvasWidth +'px',height:canvasHeight +'px'}" 
			style="border: 1px solid #aaa;position: absolute;z-index: 1;"  v-show="blackFlag"></canvas>
		</view>
		<view class="btn-container">
			<view class="btn-info">
				<view class="image-info" @tap="originalImage">
					<image :src="imageDefault" class="btn-image"></image>
					<text>原图</text>
				</view>
				<view class="image-info centerImage" @tap="grayColor">
					<image :src="imageGery" class="btn-image"></image>
					<text>灰度</text>
				</view>
				<view class="image-info" @tap="blackColor">
					<image :src="imageBlack" class="btn-image"></image>
					<text>黑白</text>
				</view>
			</view>
			<view class="btn-content">
				<button @tap="saveToPhoto" class="button savePhoto-btn">保存至相册</button>
				<button @tap="saveImage" class="button confirm-btn">完成</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imageUrl: '', //图片地址
				canvasWidth:'', 
				canvasHeight:'',
				//图片显示状态
				originalImageFlag:true,
				geryFlag: true,
				blackFlag: true,
				//小图片显示
				imageDefault: '',
				imageGery: '',
				imageBlack: '',
				imageId: '',
			}
		},
		onLoad(options) { 
			this.imageUrl = options.imageUrl
			this.canvasWidth = parseInt(options.iamgeWidth) 
			this.canvasHeight =  parseInt(options.imageHeight)
			this.imageId = options.id
		},
		onReady(){
			this.initImage()
		},
		methods: {
			getCanvasFilePath(canvasId) {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: this.canvasWidth,
					height: this.canvasHeight,
					destWidth: 100,
					destHeight: 100,
					canvasId: canvasId,
					success: res => {
						if(canvasId === 'canvasa') {
							this.imageDefault = res.tempFilePath
						}
						if(canvasId === 'canvasb') {
							this.imageGery = res.tempFilePath
						}
						if(canvasId === 'canvasc') {
							this.imageBlack = res.tempFilePath
						}
					}
				})
			},
			initImage() {
				// 相当js中var canvasa = document.getElementById('canvasa')
				 var cxta = uni.createCanvasContext('canvasa')
				 var cxtb = uni.createCanvasContext('canvasb')
				 var cxtc = uni.createCanvasContext('canvasc')
				/*
				 *@functionName: drawImage
				 *@params1: 图片路径
				 *@params2: 起点x
				 *@params3: 起点y
				 *@params4: 宽
				 *@params5: 高
				 *@description:把图片绘制到canvas上
				*/
				cxta.drawImage(this.imageUrl, 0, 0, this.canvasWidth, this.canvasHeight)
				cxta.draw(true,() => {
					//原图直接获取图片
					this.getCanvasFilePath('canvasa')
				})//绘制
				cxta.save();//保存
				cxtb.drawImage(this.imageUrl, 0, 0, this.canvasWidth, this.canvasHeight)
				cxtb.save();//保存
				cxtb.draw(true,async() => {
					// 调用改变颜色方法
					await this.changeGrayColor()
					this.getCanvasFilePath('canvasb')
				})//绘制
				cxtc.drawImage(this.imageUrl, 0, 0, this.canvasWidth, this.canvasHeight)
				cxtc.save();//保存
				cxtc.draw(true,async() => {
					await this.changeBlackColor()
					this.getCanvasFilePath('canvasc')
				})//绘制
			},
			
			originalImage() {
				this.originalImageFlag = true,
				this.geryFlag = false,
				this.blackFlag = false
			},
			
			grayColor() {
				this.originalImageFlag = false,
				this.geryFlag = true,
				this.blackFlag = false
				this.changeGrayColor()
			},
			
			changeGrayColor() {
				return new Promise((resolve, reject) => {
					uni.canvasGetImageData({
						canvasId: 'canvasb',
						x: 0,
						y: 0,
						width:this.canvasWidth,
						height:this.canvasHeight,
						success:(res) => {
							var pixelData = res.data
							for (var i = 0; i < this.canvasWidth*this.canvasHeight; i++) {
								var r = pixelData[i*4+0]
								var g = pixelData[i*4+1]
								var b = pixelData[i*4+2]
										 
								var grey = r*0.3+g*0.59+b*0.11//图片灰度值
										 
								pixelData[i*4+0] = grey
								pixelData[i*4+1] = grey
								pixelData[i*4+2] = grey
							}
							uni.canvasPutImageData({
								canvasId:'canvasb',
								  x: 0,
								  y: 0,
								  width: this.canvasWidth,
								  data: res.data,
								  success:(res) => {
									  resolve()
								  }
							})
						}
					})
				})
			},
			
			blackColor() {
				this.originalImageFlag = false,
				this.geryFlag = false,
				this.blackFlag = true
				this.changeBlackColor()
			},
			
			changeBlackColor() {
				return new Promise((resolve,reject) => {
					uni.canvasGetImageData({
						canvasId: 'canvasc',
						x: 0,
						y: 0,
						width: this.canvasWidth,
						height: this.canvasHeight,
						success:(res) => {
							var pixelData = res.data
							for (var i = 0; i < this.canvasWidth*this.canvasHeight; i++) {
								var r = pixelData[i*4+0]
								var g = pixelData[i*4+1]
								var b = pixelData[i*4+2]
										 
								var grey = r*0.3+g*0.59+b*0.11//图片灰度值
								if (grey >255/2) {
									var v = 1000
								}
								else{
									 v = 0
								} 
								pixelData[i*4+0] = v
								pixelData[i*4+1] = v
								pixelData[i*4+2] = v
							}
							uni.canvasPutImageData({
								  canvasId:'canvasc',
								  x: 0,
								  y: 0,
								  width: this.canvasWidth,
								  data: res.data,
								  success:(res) => {
									  resolve()
								  }
							})
						}
					})
				})
			},
			
			saveImage() {
				this.findImageUrl().then(res => {
					let imagePath = res
					//调用上传
					let uploadUrl = ''
					let data = {}
					data.name = 'multipartFile'
					data.url = imagePath
					// 判断是上传还是编辑
					if(!this.imageId) {
						uploadUrl = 'uploadFile'
						data.formdata = {
							fileName: '图片名字',
							fileType: 'IMAGE',
						}
					} else {
						uploadUrl = 'updateImage'
						data.formdata = {
							id: this.imageId
						}
					}
					
					// updateImage
					this.$API[uploadUrl]({
						data: data,
						success: res => {
							uni.showToast({
								title: '图片上传成功！'
							})
							uni.navigateBack({
								delta: 2
							})
						}
					})
				})
			},
			
			findImageUrl() {
				let canvasId = ''
				if(this.geryFlag) {
					canvasId = 'canvasb'
				}
				if(this.blackFlag) {
					canvasId = 'canvasc'
				}
				if(this.originalImageFlag) {
					canvasId = 'canvasa'
				}
			   return new Promise((resolve,reject) => {
				   uni.canvasToTempFilePath({
					   x: 0,
				       y: 0,
				       width: this.canvasWidth,
				       height: this.canvasHeight,
				   	   destWidth: this.canvasWidth,
				   	   destHeight: this.canvasHeight,
				   	   canvasId: canvasId,
				   	   success: res => {
							// 在H5平台下，tempFilePath 为 base64
							resolve(res.tempFilePath)
				   	   } 
				   })
			   })
				
			},
			 
			saveToPhoto() {
				 this.findImageUrl().then((res) => {
					 uni.saveImageToPhotosAlbum({
					 	filePath: res,
					 	success: function () {
							uni.showToast({
							    title: '保存成功！',
							    duration: 2000
							});
					 	},
						fail: err => {
						}
					 });
				 })
			}
			
		}
	}
</script>

<style scoped lang="stylus">
.picColor-container
	width 100%
	background-color #000000
	.canvas-container
		width 100%
		height 80vh
		display flex
		justify-content center
		align-items center
	.btn-info
		display flex
		justify-content center
		color #FFFFFF
		padding-bottom 50rpx
		.image-info
			display flex
			align-items center
		.centerImage
			padding 0 50rpx
		.btn-image
			width 50rpx
			height 50rpx
			padding-right 20rpx
	.btn-content
		display: flex;
		justify-content: space-between;
		padding: 0 50rpx;
		.savePhoto-btn
			background-color #000000
			color #FFFFFF
			border-radius 20px
			border 1px solid #CCCCCC
</style>
```