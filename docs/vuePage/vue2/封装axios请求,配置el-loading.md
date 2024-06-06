## 一、axios安装
`npm install axios `
## 二、axios封装
```js
// 引入axios，element的Loading
import axios from 'axios'
import {Message,Loading} from 'element-ui'

// 创建axios实例
const service = axios.create({
    baseURL: '',   //请求url
    timeout: 30000  //前端超时时间
})

// loading方法声明
let loading
let loadingCount = 0 // loading次数
function startLoading(){
    loading = Loading.service({
        target: 'app',
        lock: true,
        text: '数据加载中...',
        background: 'rgba(250,250,250,0.8)'
    })
    loadingCount++
}
function closeLoading(){
    loadingCount--
    if(loadingCount == 0){
        loading.close()
    }
}

// request拦截器
service.interceptors.request.use(config => {
    // 添加全局的loading...
    startLoading()
    // 是否需要设置 token
    if(sessionStorage.getItem('token')){
        config.headers['token'] = sessionStorage.getItem('token')
    }
    return config
}, error => {
    return Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
    response => {
        const res = response.data
        closeLoading()
        if(response.status !== 200) {
            Notification({
                message: '请求失败！',
                type: 'error',
                showClose: 'true',
                position: 'bottom-right'
            })
        } else {
            return res
        }
    },
    error => {
        closeLoading()
        if(error.response == void 0 || error.response == null || error.response == "") {
            Notification({
                message: '请求失败！',
                type: 'error',
                showClose: 'true',
                position: 'bottom-right'
            });
        } else if(error.response.status) {
            switch(error.response.status) {
                //返回错误
                case 400:

                    break;
                //未登录
                case 401:
                    Notification({
                        message: '登录已过期，请重新登录。', // + error.response.data.msg,
                        type: 'error',
                        showClose: 'true',
                        position: 'bottom-right'
                    });
                    auth.removeToken()
                    let tokenKey = localStorage.getItem(globals.TOKEN_INFO);
                    localStorage.removeItem(tokenKey);
                    localStorage.removeItem(globals.TOKEN_INFO);
                    window.location.reload()
                    break;
                case 403:
                    Notification({
                        message: '没有访问权限或登录失效：' + error.response.data.msg,
                        type: 'error',
                        showClose: 'true',
                        position: 'bottom-right'
                    });
                    // 跳转到登录页，清楚token,调用vuex中方法，调用退出登录，清除taken
                    // router.push("/login");
                    // window.location.reload();
                    break;
                case 404:
                    Notification({
                        message: '访问的接口或地址不存在！',
                        type: 'error',
                        showClose: 'true',
                        position: 'bottom-right'
                    });
                    break;
                case 500:
                    //自定义错误
                    Notification({
                        message: '服务器繁忙，请稍后重试！',
                        type: 'error',
                        showClose: 'true',
                        position: 'bottom-right'
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Notification({
                        message: '接口访问出现错误：' + error,
                        type: 'error',
                        showClose: 'true',
                        position: 'bottom-right'
                    });
            }
        }
        return Promise.reject(error)
    }
})
export default service

```

## 三、vue本地转发代理配置
```js
devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
        warnings: true,
        errors: true
    },
    host: "0.0.0.0",
    port: 8080, // 前端端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动默认浏览器
    hotOnly: true, // 热更新
    proxy: {
        // 匹配字符串
        '/testService': {
            target: 'http://127.0.0.1:8080/testService', // 目标地址
            changeOrigin: true, // 是否可以跨域
            pathRewrite: {
                // 匹配字符串替换
                '^/testService': ''
            }
        }
    }
}
```
## 四、使用axios发送请求
```js
import request from "@/utils/request";

export function testApi(data) {
    return request({
        url: "/testService/接口名",
        method: "post",
        data: data
    });
}
```
