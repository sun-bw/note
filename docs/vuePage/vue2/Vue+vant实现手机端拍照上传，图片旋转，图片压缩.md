## 一、移动端图片上传旋转，压缩
使用vant的组件实现手机端上传功能，经过测试，发现部分安卓机拍照上传图片后，会出现图片旋转问题。
## 二、通过Orientation图片旋转的角度
* 0 值为1
* 顺时针90度 值为6
* 逆时针90度 值为8
* 180度 值为3
## 三、通过exif.js获取Orientation，获取图像数据进行处理
1. 安装依赖：npm install exif-js --save
2. 使用EXIF.getData()，EXIF.getTag()，获取图像数据，图像数据方向参数
## 三、HTML代码
**上传组件如果写了accept的话，在部分安卓机无法调用相机进行照相**
```html
<van-uploader :after-read="afterRead">
	<van-button icon='photo' type='info' round size='small'></van-button>
</van-uploader>
```
## 四、js代码
```js
data(){
    return{
	files: {
            name:'',
            type:'',
        },
        picValue:null,
        headerImage:null,
    }
},
methods:{
    /**
     * 图片上传问题：
     */
    async afterRead(file){
        this.files.name = file.file.name;//获取文件名
        this.files.type = file.file.type;//获取类型
        this.picValue = file.file;//获取文件流
        this.imgPreview(this.picValue)
    },
        
    //处理图片
    imgPreview(file){
        let self = this;
        var Orientation = 6;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function () {
            // Orientation = Exif.getTag(this,"Orientation")
            // Exif.getAllTags(this)
            Orientation = Exif.getTag(this,"Orientation")
        })
        //判断是否支持fileReader
        if(!file || !window.FileReader) return;
        if(/^image/.test(file.type)) {
            //创建reader
            let reader = new FileReader();
            //将图片转成base64格式
            reader.readAsDataURL(file);
            //读取成功后的回调
            let that = this;
            reader.onloadend = function () {
                let result = this.result;
                let img = new Image();
                img.src = result;
                console.log(111,img)
                //判断图片是否大于500k，是压缩，否直接上传
                if(this.result.length <= 500 * 1024) {
                    self.headerImage = this.result;
                    self.postImg();
                }else {
                    img.onload = function () {
                        let data = self.compress(img, Orientation);
                        self.headerImage = data;
                        self.postImg();
                    }
                }
            }
        }
    },

    //压缩图片
    compress(img,Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        //瓦片canvas
        let tCanvas = document.createElement('canvas');
        let tctx = tCanvas.getContext("2d");
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩并将大小压到400万以下
        let ratio;
        if((ratio = (width * height) / 4000000 > 1)) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        }else {
            ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        //铺底色
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if((count = (width * height) / 1000000) > 1) {
            //计算要分成多少瓦片
            count = ~~(Math.sqrt(count) + 1);
            //计算每块瓦片的宽和高
            let nw = ~~(width / count);
            let nh = ~~(height / count);
            tCanvas.width = nw;
            tCanvas.height = nh;
            for(let i = 0; i < count; i++) {
                for(let j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    ctx.drawImage(tCanvas,i * nw, j * nh, nw, nh);
                }
            }
        }else {
            ctx.drawImage(img, 0, 0, width, height);
        }

        //修复图片上传旋转问题
            if(Orientation != '' && Orientation != 1) {
                switch (Orientation) {
                    case 6://需要顺时针旋转90
                        this.rotateImg(img, 'left', canvas);
                        break;
                    case 8://逆时针旋转90
                        this.rotateImg(img, 'right', canvas);
                        break;
                    case 3://180旋转
                        this.rotateImg(img, 'right', canvas);
                        this.rotateImg(img, 'right', canvas);
                        break;
                }
            }
        // 进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0, 1);
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
    },

    //旋转图片
    rotateImg(img, direction, canvas) {
        //最小与最大的旋转方向，图片旋转4次后回到原点
        const min_step = 0;
        const max_step = 3;
        if(img == null) return;
        //img的高度和宽度不能再img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if(step == null) {
            step = min_step;
        }
        if(direction == 'right') {
            step++;
            //旋转到原位置，即超过最大值
            step > max_step && (step = min_step);
        }else {
            step--;
            step < min_step && (step = max_step);
        }
        //旋转角度用弧度计算为参数
        let degree = (step * 90 * Math.PI) / 180;
        // let degree = 2.7
        console.log('旋转的角度',degree)
        console.log('step',step)
        let ctx = canvas.getContext("2d");
        // ctx.rotate(degree);
        switch (step) {
            case 0:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0);
                break;
            case 1:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
        //上传的图片如果长方形，旋转90度的话，旋转后的图片长会有一片空白区域，所以旋转后长宽重新赋值
                //参数一次为，图片，画布上x坐标，y坐标，宽，高
                ctx.drawImage(img, 0, -width, height, width);
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height);
                break;
            case 3:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0);
                break;
        }
        this.postImg();
    },

    //将base64转成文件
    dataURLtoFile(dataurl) {
        var arr = dataurl.split(','),
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while(n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], this.files.name, {
            type: this.files.type
        })
    },

    async postImg() {
    //自己的上传方法自己的逻辑。
        let file = this.dataURLtoFile(this.headerImage);
        let data = new FormData();
        data.append('file', file)
        data.append('fileType', 1)
        data.append('interfaces',"/course/coursePage/pictemplate/" + 'avatar' + "student")
        await axios.post('/zuul/base/nou/common/uploadPic',data).then(res => {
            this.src = window._nouConfig.downLoadUrl + res.data.filePath;
            this.avatar = res.data.filePath;
        })
    },
}
```