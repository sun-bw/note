## 一、hash和history
1. hash默认的，url地址中会带有#。例如：`http://localhost:8082/#/PersonalNotes`。 hash的值为#/PersonalNotes。改变当前hash值，整个页面不会重新加载，不会重新请求接口。
2. history：开启路由history模式`mode:'history'`。当工程开启history模式，部署之后，刷新页面就会报404错误。
当时用history模式时，需要在nginx配置
```js
location / {
    try_files $uri $uri/ /index.html;
}
```
## 二、区别
* 默认为hash模式，hash模式下，url地址中会带有#，history不带。使用history模式还有一个问题就是，在访问二级页面的时候，做刷新操作，会出现404错误，那么就需要和后端人配合让他配置一下apache或是nginx的url重定向，重定向到你的首页路由上就ok啦。
* history模式下，build之后本地 index.html 打开是无效的。
* hash模式下，build之后本地 index.html 打开正常！