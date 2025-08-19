```vue
<template>
    <view class="container">
        <!--画布区域-->
        <cover-view class="topBox">
            <button class="backStep" type="default" @click="backStep" size="mini">撤销</button>
            <button class="saveBtn" type="warn" @click="saveimg" size="mini">保存</button>
        </cover-view>
        <view class="canvas_area">
            <canvas
                canvas-id="myCanvas"
                class="myCanvas"
                disable-scroll="false"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd"
                :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
            ></canvas>
        </view>
        <!--画布工具区域-->
        <view class="canvas_tools">
            <view class="box box1" @click="penSelect(3)"></view>
            <view class="box box2" @click="penSelect(15)"></view>
        </view>
    </view>
</template>
<script setup lang="ts">
	import { onLoad, onReady } from '@dcloudio/uni-app'
	import { ref, getCurrentInstance } from 'vue'
	
	let imgurl = ref('')
	let pen = ref(15)  //画笔粗细默认值
	let startX = ref(0)//保存X坐标轴变量
	let startY = ref(0)  //保存X坐标轴变量
	let canvasWidth = ref('')
	let canvasHeight = ref('')
	let ctx = ref(null)
	let allDrawWorksPath = ref([])//图片路径 用于撤销
	let pixels = ref(null) // 图片像素点
	
	onLoad((options) => {
		//真实环境为后端返回图片路径
		// imgurl.value = 'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/72f082025aafa40f2982756baa64034f78f0193b.jpg';
		imgurl.value = 'https://onmc-production-frontend.oss-cn-beijing.aliyuncs.com/tenant/org202/poss/miniprogram/patient/homeNew/hospital_logo.png'
		getSystemInfo(); //获取设备信息
		ctx.value = uni.createCanvasContext('myCanvas')
	})
	// 获取设备信息
	const getSystemInfo = () => {
	    uni.getSystemInfo({
	        success: (res:any) => {
	            console.log('设备信息', res);
	            canvasHeight.value = res.windowHeight; //若加底部操作区域 需-60
	            canvasWidth.value = res.windowWidth;
	        }
	    });
	}
	
	onReady(() => {
		console.log(222,imgurl.value, ctx.value)
		uni.getImageInfo({
		    src: imgurl.value,
		    success: (ress) => {
		        console.log('图片信息', ress, ctx.value);
		        ctx.value.drawImage(ress.path, 0, 0, canvasWidth.value, canvasHeight.value);
		        ctx.value.stroke();
		        wx.drawCanvas({
		            canvasId: 'myCanvas',
		            reserve: true,
		            actions: ctx.value.getActions() // 获取绘图动作数组
		        });
				
				uni.canvasGetImageData({
					canvasId: 'myCanvas',
					x: 0,
					y: 0,
					width: canvasWidth.value,
					height: canvasHeight.value,
					success: res => {
						pixels.value = getPixel2D(res)
					}
				}, getCurrentInstance())
		    },
		    fail(err) {
				 console.log('图片信息', imgurl.value, canvasHeight.value);
		        console.log('err', err);
		    }
		});
	})
	
	// 保存图片
	const saveimg = () => {
	    // ctx.value.draw();
	    setTimeout(()=> {
	        drawAfter();
	    }, 500);
	}
	// 保存
	const drawAfter = () => {
	    uni.canvasToTempFilePath(
	        {
	            // width: canvasWidth.value, //686
	            // height: canvasHeight.value,
	            canvasId: 'myCanvas',
	            success:(res) => {
	                console.log('保存图片', res);
	                var tempFilePath = res.tempFilePath;
	                console.log(tempFilePath);
	                //把图片保存到相册
	                wx.saveImageToPhotosAlbum({
	                    filePath: tempFilePath
	                });
	                //把图片保存到相册
	                //进行文件的拷贝
	                //上传
	            }
	        },);
	}
	// 开始
	const touchStart = (e) => {
	    console.log('开始绘制');
	    //得到触摸点的坐标
	    startX.value = e.changedTouches[0].x;
	    startY.value = e.changedTouches[0].y;
	    // this.ctx.setStrokeStyle(this.color); //画笔颜色
	    ctx.value.setLineWidth(pen.value); //线条宽度
	    ctx.value.setLineCap('round'); // 让线条圆润
	    ctx.value.beginPath();
	    saveCurrentDrawWorks(); //记录每一步步骤-撤销
	}
	
	//手指触摸后移动
	const touchMove = (e) => {
	    console.log('开始移动中');
	    var startX1 = e.changedTouches[0].x;
	    var startY1 = e.changedTouches[0].y;
		// 画笔颜色
		let color = 'rgb(' + pixels.value[startY1][startX1][0] + ',' + pixels.value[startY1][startX1][1] + ',' + pixels.value[startY1][startX1][2] + ')'
		ctx.value.setStrokeStyle(color)
	    ctx.value.moveTo(startX.value, startY.value);
	    ctx.value.lineTo(startX1, startY1);
	    ctx.value.stroke();
	    startX.value = startX1;
	    startY.value = startY1;
	
	    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。
	    // context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
	    wx.drawCanvas({
	        canvasId: 'myCanvas',
	        reserve: true,
	        actions: ctx.value.getActions() // 获取绘图动作数组
	    });
	}
	
	const getPixel2D = (res) => {
		const { data, width, height } = res;
		// 定义二维数组，存储每个坐标 (x,y) 的像素数据
		let pixel2D = [];
	  
		// 遍历行（y 轴）
		for (let y = 0; y < height; y++) {
			pixel2D[y] = []; // 初始化第 y 行
			// 遍历列（x 轴）
			for (let x = 0; x < width; x++) {
				// 计算当前像素在一维数组中的起始索引
				const index = (y * width + x) * 4;
				// 提取 RGBA 数据
				const rgba = [
					data[index],     // R（红色通道，0~255）
					data[index + 1], // G（绿色通道，0~255）
					data[index + 2], // B（蓝色通道，0~255）
					data[index + 3]  // A（透明度，0~255，0 为完全透明）
				];
				pixel2D[y][x] = rgba; // 存储到二维数组的 (x,y) 位置
			}
		}
		return pixel2D
	}
	
	//手指触摸动作结束
	const touchEnd = () => {
	    console.log('停止');
	}
	//更改画笔大小的方法
	const penSelect = (e) => {
	    console.log(e);
	    pen.value = e;
	}
	// 保存每一步操作
	const saveCurrentDrawWorks = () => {
	    wx.canvasToTempFilePath({
	        canvasId: 'myCanvas',
	        success: (res) => {
	            var imgPath = res.tempFilePath;
	            allDrawWorksPath.value = [...allDrawWorksPath.value, imgPath];
	            console.log('步骤', allDrawWorksPath.value);
	        },
	        fail: res => {
	            console.log('获取画布图片失败', res);
	        }
	    });
	}
	// 撤销一步
	const backStep = () => {
	    if (allDrawWorksPath.value == null || allDrawWorksPath.value.length == 0 || allDrawWorksPath.value == undefined) {
	        uni.showToast({
	            icon: 'none',
	            title: '已经撤销到起始位置'
	        });
	        allDrawWorksPath.value = [];
	        return;
	    }
	    let privWorksPath = allDrawWorksPath.value.pop();
	    ctx.value.drawImage(privWorksPath, 0, 0, canvasWidth.value, canvasHeight.value);
	    ctx.value.stroke();
		ctx.value.draw()
	    wx.drawCanvas({
	        canvasId: 'myCanvas',
	        reserve: true,
	        actions: ctx.value.getActions() // 获取绘图动作数组
	    });
	}
</script>
<style lang="scss">
.container {
    position: relative;
    width: 100%;
    height: 100%;
    .topBox {
        position: fixed;
        z-index: 99999;
        width: 100%;
        .backStep {
            width: 50px;
            top: 2px;
            left: 2px;
        }
        .saveBtn {
            width: 50px;
            position: absolute;
            top: 2px;
            right: 2px;
        }
    }
    .canvas_tools {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background-color: #eee;
        align-items: center;
    }
    .box {
        width: 100rpx;
        height: 100rpx;
        line-height: 100rpx;
        border-radius: 50%;
        background-color: rebeccapurple;
    }
    .box1 {
        background-color: #99cccc;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH3gUEFTU3owPJ+gAAArpJREFUSMeVlU9IVFEUxn/nvjdTaTQZYyaaZlEpIfhvkVSMSAmBFRZpYYugbcs2QbWpXUFKC3chLdpFUFHQpqxE2rQ0ahEp5BRm6TgqODP3tpg78nzznukHF+7lnfOd73zn8q7gw8jISGFbCzQCLvAGmANIJBKr4l3CcRqIAhVAFngRFKRCqu8ALtkCMeAyEPHFFBN40Am0Ajm7TgDNayrwMEeBi4ADGLu2ARf+24JFE9AR4kmdv40ggnPWAz/2Ad2BCjyMVbZSGHqtqSs5fgVdwIE1CFqBo6sUeKpvAc4TPplCTJ81uEhBM9Ae0KKf8DjQUGjD+7EH2G73WeAV8A54DoySHydAJXDGr6DK5/AjK/Uj8NKSP/EVi3sJOoH9dv8XGALmPQnTwCCQsudGIFEg2Ex+9gVj5m2CH0kgbfdRa3hEAW3AEU9gHDgUQFAPlHnOHUCLIn/v454PJcANOxUFiJV83Y6xgAqg3wVOBlRrB54BY4AGDpP/wfjRrYAHHnO8qLZ99oUkp4EhZd29AyyzfuSAe8B9ZSUOAgN2vx48BO4CWac1vsTS3HSurffKh9mpHzsRaRFRIqIIWko5T8t2H7w6/np4Pjk+itw4tRdgl85lmsqq6ytr2rpuupFNdcba74XOZWeS42O3k5/Hvjpu9AvwTW6dbcAY0yMij0VEKaUcUcoxBrRe3ZExWhutsyLiGGOuiciAW3WsH7RRynGiNbW1amtpKQALi4tMTkz4SRT5W4gx2lHKwS0prwOjcdyIKd9TTywWAyCVSvF7SRWpWFGjNcpxcTPpGYwxOI5L+s9PJLOQH3I6zXJ6Bp3TxWYYMMYSTL4dBmMQEabeRxClVipkMpnQORoDogQ3szAL1nH/TRLCYQAl4IoIxs5srYRABgE3p/OPj5gNpeefLA3up++/CueNwgD8A0fm3rIoh3Y0AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA5LTE3VDE1OjIwOjM4KzA4OjAwDAwhawAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0wNS0wNFQyMTo1Mzo1NSswODowMMTKtgsAAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDcuMC4xLTYgUTE2IHg4Nl82NCAyMDE2LTA5LTE3IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn3dmlTgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABl0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMTA2Mx0uiBoAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTM3XiCV0QAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzk5MjExNjM1VZFQ9AAAABJ0RVh0VGh1bWI6OlNpemUAMTguNEtCh1extQAAAF90RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE2MDIvMTE2MDI0NC5wbmcC2t7tAAAAAElFTkSuQmCC);
        background-repeat: no-repeat;
        background-position: center;
    }
    .box2 {
        background-color: #0099cc;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAeCAMAAAAvtQ9FAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACf1BMVEUAAAB8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiN8TiNINiWHUyJ+TyN9TyN9TyN9TyN9TyN+TyOPVyJBMyYoKCgpKChaPyVkQyVjQyVjQyVjQyVjQyVTPCYmJygoKCgfHx8eHh4fHx4gHx4gHx4gHx4gHx4gHx4eHh4eHh4fHx8TExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExITExIHBwcHBwcHBwcHBwd8TiMTExITExITExITExIHBwf////3ECwAAAAAznRSTlMAAAAARX4EAAAAAFLkqwIAAAAAVOv/vQkAAAA54v//4CEAAAARvP////1qAAAAAGj9/////9o1AAAAFMb/////2WgXAE70//////7BLI///////6O+/////+fY///84f///dz///HI/////9Wl/////6hy/f///G056////+YxDr7/////sggAcv////1hAAAg3P/////JEwBMTLj//v7//pxKS+j7+//////++vvi1f///////////83V///O1f//ztX//87V///O1f//zSidjOsAAAABYktHRNQJuwuFAAAAB3RJTUUH3gUEFTU21AT5bAAAAS9JREFUGNNjYGBgZGJmYWVjZwABDk4ubh5ePn4QW0BQSFhEVExcAsSRlJKWkZWTV1BUAnKUVVTV1DU0tbR1dBkY9PQNDI2MTUzNzC0sGaysbWzPnbOzd3B0cmZwcXU7d+6cu4enl7cPg6+f/zkQCAgMCmYICQ0Dc86FR0QyREWfg4KYWIa4eBgnIZEhKRnGSUllSEvPgLAzs7IZcnLzIJz8gkKGouISCKe0rJyhorIKzK6uqa1jqG9obAJxmlta2xjaOzq7QBLdPb19DP0TJk6aPHnylKnTps9gmDlr9py58+bNX7Bw0WKGJUuXLV+xcuWq1WvWrmNYv2Hjps1btmzdtn3HToZdu89DwZ69DPv2X4CCAwfxcA4dvggFR44yHDt+CQpOnGQ4dfoyFJw5CwBZdsIQZAP16AAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wOS0xN1QxNToyMDozOCswODowMAwMIWsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMDUtMDRUMjE6NTM6NTQrMDg6MDBivb2/AAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA3LjAuMS02IFExNiB4ODZfNjQgMjAxNi0wOS0xNyBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ93ZpU4AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAZdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADEwNjMdLogaAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADQyNaj3r4sAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTM5OTIxMTYzNCKWYGIAAAASdEVYdFRodW1iOjpTaXplADEyLjdLQs+hF00AAABfdEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvc2l0ZS93d3cuZWFzeWljb24ubmV0L2Nkbi1pbWcuZWFzeWljb24uY24vc3JjLzExNjAyLzExNjAyNDMucG5nsPoC/QAAAABJRU5ErkJggg==);
        background-repeat: no-repeat;
        background-position: center;
    }
    .box3 {
        background-color: #cc0033;
    }
    .box4 {
        background-color: #ff9900;
    }
    .box5 {
        background-color: #00cd00;
    }
    .box6 {
        text-align: center;
        color: #fff;
    }
}
</style>
```