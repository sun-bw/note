使用canvas进行图片显示，之后进行旋转，马赛克操作
## vue模板
::: code-group
```vue [template]
<template>
    <div>
        <el-dialog title="图片编辑" :visible.sync="imageDialog" :before-close="cancelDialog" width="650px" append-to-body>
            <div>
                <div id="box" style="max-height: 50vh;overflow-y: auto;">
                    <canvas id="canvas"></canvas>
                    <div id="cur"></div>
                </div>
                <div style="background:#dfe1eb;width:100%;text-align: center;margin-top:10px;border-radius:5px">
                    <img @click="cutImage()" src="@/assets/img/cut.png" style="width:20px;margin: 2px 10px 2px 0;cursor: pointer;">
                    <img @click="mosaicImage()" src="@/assets/img/mosaic.png" style="width:20px;margin: 2px 10px 2px 0;cursor: pointer;">
                    <img @click="rotateLeftImage()" src="@/assets/img/rotate-left.png" style="width:20px;margin: 2px 10px 2px 0;cursor: pointer;">
                    <img @click="rotateRightImage()" src="@/assets/img/rotate-right.png"  style="width:20px;margin: 2px 10px 2px 0;cursor: pointer;">
                    <!-- <img @click="directionRight(index, key, value)" src="@/assets/img/direction-right.png" style="width:20px;margin: 2px 10px 2px 0;cursor: pointer;"> -->
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitDialog">保 存</el-button>
                <el-button @click="cancelDialog">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
```
```vue [js]
<script>
import { getOssClient, getFileUrl, ossUploadFile } from '@/utils/ossUtils.js'
import { rotateImage } from '@/utils/rotateImage.js'
export default {
    data() {
        return {
            imageDialog: false,
            newImage: {}, // 图片内容
            base64: '', // 文件base64编码
            imageFile: '', // 文件file
            imageName: '', // 文件名称
            // 父组件数组位置，为了定位旧值
            parentIndex: '', // 父组件位置
            parentKey: '', // 父组件key
            // canvas
            canvas: '',
            ctx: '',
        }
    },
    methods: {
        openDialog(index, key, value) {
            this.imageDialog = true
            this.imageName = value.fileName
            this.parentIndex = index
            this.parentKey = key
            this.$nextTick(() => {
                this.onLoadCanvas(value.imageUrl)
                this.mosaicImage()
            })
        },

        /*
         *@description: 图片赋值给canvas,初始化
         *@author: 
         *@date: 2022-02-14 09:54:09
        */
        onLoadCanvas(imageUrl) {
            let img = new Image()
            img.src = imageUrl
            img.setAttribute("crossOrigin",'Anonymous') // 设置图片跨域
            img.onload = () => {
                this.newImage.img = img
                this.newImage.width = img.width
                this.newImage.height = img.height
                this.newImage.r = 20
                // canvas渲染图片
                this.canvas = document.getElementById("canvas")
                this.ctx = this.canvas.getContext("2d")
                let cur = document.getElementById("cur")
                // 图片等比缩小
                if(img.width < 600) {
                    this.canvas.width = img.width
                    this.canvas.height = img.height
                    cur.style.width = img.width
                    cur.style.height = img.height
                    this.ctx.drawImage(img, 0, 0, img.width, img.height)
                }
                if(img.width >= 600) {
                    let scale = img.width / img.height
                    this.canvas.width = 600
                    this.canvas.height = 600 / scale
                    cur.style.width = 600
                    cur.style.height = 600 / scale
                    this.ctx.drawImage(img, 0, 0, 600, 600 / scale)
                }
                // 获取整个画布的像素数据
                this.newImage.imageData = this.ctx.getImageData(0,0,img.width, img.height)
                // 像素点数组
                this.newImage.pixels = this.newImage.imageData.data
            }
        },

        // 输出canvas文件
        findCanvasFile() {
            let canvas = document.getElementById("canvas")
            let base64 = canvas.toDataURL("image/png")
            return base64
        },

        // 图片旋转
        async rotateLeftImage() {
            this.rotateImage('left')
        },
        async rotateRightImage() {
            this.rotateImage('right')
        },
        rotateImage(orientation) {
            let img = new Image()
            img.src = this.findCanvasFile() // 渲染新的图片
            img.setAttribute("crossOrigin",'Anonymous') // 设置图片跨域
            img.onload = () => {
                if(img.width > img.height) {
                    this.canvas.width = img.height // 设置canvas的宽高，否则图片大小会不对
                    this.canvas.height = img.width
                }
                if(img.width < img.height) {
                    this.canvas.width = img.height // 设置canvas的宽高，否则图片大小会不对
                    this.canvas.height = img.width
                }
                if(img.width == img.height) {
                    this.canvas.width = img.width // 设置canvas的宽高，否则图片大小会不对
                    this.canvas.height = img.height
                }
                this.ctx.width = img.width // canvas 图像的宽高
                this.ctx.height = img.height
                if(orientation == 'left') {
                    this.ctx.rotate(270 * Math.PI / 180);
                    this.ctx.drawImage(img, -img.width, 0);
                }
                if(orientation == 'right') {
                    this.ctx.rotate(90 * Math.PI / 180);
                    this.ctx.drawImage(img, 0, -img.height);
                }
                this.onLoadCanvas(this.findCanvasFile())
            }
        },

        /*
         *@description: 开始渲染马赛克
         *@author: 
         *@date: 2022-02-25 18:00:39
        */
        mosaicImage() {
            let box = document.getElementById("box")
            let isDown = false
            box.addEventListener('mousedown', () => {
                isDown = true
            })
            box.addEventListener('mouseup', () => {
                isDown = false
            })
            // 鼠标在外层盒子区域移动时，监听
            box.addEventListener('mousemove', (e) => {
                console.log(1111, isDown)
                /**
                 * 获取外层盒子距离屏幕两边的距离
                 * 区域出现滚动条设置
                 * 马赛克，鼠标出现的位置
                 * +20 解决马赛克高度和鼠标高低不一样问题
                 */
                let top = box.getBoundingClientRect().top - document.getElementById("box").scrollTop + 20
                let left = box.getBoundingClientRect().left + document.body.scrollLeft
                // 没有滚动条
                // let top = box.getBoundingClientRect().top + document.body.scrollTop + 20

                let absPageX = e.pageX - left
                let absPageY = e.pageY - top
                let x = absPageX - this.newImage.r / 20
                let y = absPageY - this.newImage.r / 20
                let cur = document.getElementById("cur")
                cur.style.left = x
                cur.style.top = y
                // 鼠标按下，进行马赛克绘制
                if(isDown) {
                    this.fnDraw(x,y)
                }
            })
        },

        fnDraw(x,y) {
            let tileR = 8
            let arrPos = this.getPos(x,y)
            for(let i = 0; i< arrPos.length; i++) {
                // 获取像素中心点坐标
                let tmp = arrPos[i]
                let ty = tmp[0] * tileR + tileR / 2
                let tx = tmp[1] * tileR + tileR / 2

                let pos = (Math.floor(ty) * (this.newImage.imageData.width * 4)) + (Math.floor(tx) * 4)
                let red = this.newImage.pixels[pos]
                let green = this.newImage.pixels[pos+1]
                let blue = this.newImage.pixels[pos+2]
                this.ctx.fillStyle = "rgb("+ red + ","+ green + ","+ blue + ")"
                this.ctx.fillRect(tx, ty, tileR, tileR)
            }
        },

        getPos(x,y) {
            let tileR = 8
            let curR = 20
            let rs = Math.floor(y/tileR)
            let cs = Math.floor(x/tileR)
            let number = Math.floor(curR/tileR)
            let tmp = []
            for(let i = rs; i < rs+number; i++) {
                for(let j = cs; j < cs+number; j++) {
                    tmp.push([i,j])
                }
            }
            return tmp
        },

        dataURLtoFile(dataUrl, imageName) {
            var arr = dataUrl.split(','),
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
            while(n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], imageName, {
                type: 'image'
            })
        },

        // 裁剪图片
        cutImage() {
            let imageUrl = this.findCanvasFile()
            this.$refs.OnmcCropperImage.openDialog(imageUrl)
        },

        /*
         *@description: 保存编辑
         *@author: 
         *@date: 2022-02-15 09:24:44
        */
        async submitDialog() {
            this.findImageFile()
            //图片同步上传,返回存储路径和图片地址
            let newImageObject = await this.uploadRotateImage(this.imageFile)
            this.$emit('findImageInfo', newImageObject, this.parentIndex, this.parentKey)
            this.cancelDialog()
        },

        /*
         *@description: 获取canvas图片文件
         *@author: 
         *@date: 2022-02-14 17:46:07
        */
        findImageFile() {
            this.base64 = this.canvas.toDataURL("image/png")
            this.imageFile = this.dataURLtoFile(this.base64, this.imageName)
        },

        /*
         *@description: oss同步上传
         *@author: 
         *@date: 2022-02-15 09:34:23
        */
        async uploadRotateImage(file) {
            // 调用oss上传方法, 获取token
            let bucketName = 'onmc-poss'
            let date = new Date()
            let time = date.getTime()
            let data = {}
            data.bucketName = bucketName
            data.key = 'sit/coco/' + time + '/' + this.imageName
            data.durationSeconds = 3600
            let ossClient = await getOssClient(data)
            let uploadFile = await ossUploadFile(ossClient, data.key, file)
            let newImageUrl = await getFileUrl(ossClient, data.key)
            // 上传成功后，获取文件路径
            let fileOssKey = bucketName + ',' + data.key
            let imageObj = {
                fileOssKey: fileOssKey,
                newImageUrl: newImageUrl
            }
            return imageObj
        },

        cancelDialog() {
            this.newImage = {},
            this.base64 = '',
            this.imageFile = '',
            this.imageName = '',
            this.parentIndex = '',
            this.parentKey = '',
            this.imageDialog = false;
        }
    }
}
</script>
```
## 样式
```vue [css]
<style lang="stylus" scoped>
.cur
    width 10px
    height 10px
    position absolute
    background-color rgba(0,0,0,0.8)
    left 0
    top 0
    display none
</style>
```