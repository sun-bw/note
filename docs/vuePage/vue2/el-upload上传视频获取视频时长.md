## 获取视频时长
```js
<template>
    <el-upload v-else class="avatar-uploader" action="#" :auto-upload="false" :show-file-list="false"
        :on-change="handleVideoChange" accept=".mp4">
        <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
export default {
    handleVideoChange(file, fileList) {
        // 传入当前文件的file，获取视频时长
        var url = URL.createObjectURL(file.raw);
        var audioElement = new Audio(url);
        audioElement.addEventListener("loadedmetadata", (_event) => {
            this.videoDuration = audioElement.duration;
        });
    },
}
</script>
```