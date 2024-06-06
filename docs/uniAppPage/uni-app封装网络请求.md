## 一、request.ts文件
```ts
import { findBaseUrl } from './envAccessAddress'
import { getToken, getTokenKey, removeToken, getBehaviorUserInfo } from './userInfo'
import baseInfo from './base'
import * as login from '@/utils/login'

let baseUrl = ''  // 请求地址
const header = {}
// 是否正在刷新token的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requestList = []
// 请求定时器
let requestTimer = null
let requestTimerTime = 1000
interface IRequestParams {
	url: string,
	data?: Object,
	requestService?: string,
	method?: any,
	loadingFlag?: boolean,
	requestNumber?: number // 重试请求次数
}
let loadingCount = 0 // loading次数
export interface CustomSuccessData<T = any> {
	code:string,
	msg: string,
	data: T,
	[keys: string]: any
}
const request = <T>(requestParams: IRequestParams) => {
	let {url, data, requestService, method = "POST", loadingFlag = true, requestNumber = 1} = requestParams
	/**
	 * 判断访问的环境
	 * 查找ip和端口号
	 */
	baseUrl = findBaseUrl(requestService)
	// 请求投携带token
	if(getTokenKey()) {
		header[getTokenKey()] = getToken()
		header['onmc-biz-sys-poss-page-trace'] = JSON.stringify(getBehaviorUserInfo())
	}
	header['onmc-client-type'] = 'wechat_miniprogram'
	header['onmc-client-appid'] = baseInfo.appCode
	header['channel-message-id'] = uni.getStorageSync('channelMessageId') // 消息初始化小程序使用
	// 封装request promise
	return new Promise<CustomSuccessData<T>>((resolve, reject) => {
		if(loadingFlag) {
			uni.showLoading({
				title: '加载中......',
				mask: true
			})
			loadingCount++
		}
		uni.request({
			method: method,
			url: baseUrl + url,
			data: data,
			header: header,
			dataType: 'json',
			success: async (res: any) => {
				switch(res.statusCode) {
					case 200:
						/**
						 * 每一个case都写hideLoading
						 * 如果在switch结束统一写，会造成showToast提示，一闪而过
						 * 所以在提示之前，关掉接口loading，在进行提示
						 */
						isCloseLoading(loadingFlag)
						// 返回值
						resolve(res.data)
						break;
					case 400:
						isCloseLoading(loadingFlag)
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
						})
						reject(res.data)
						break;
					case 401:
                        /**
                         * token过期，重新请求token
                         * 请求token成功后，再次请求接口
                         */
						if(requestNumber < 3) {
							// 1秒 2秒 4秒 三次重试
							if(requestNumber == 0) {
								requestTimerTime = 1000
							}
							if(requestNumber == 1) {
								requestTimerTime = 2000
							}
							if(requestNumber == 2) {
								requestTimerTime = 4000
							}
							requestTimer = setTimeout(async () => {
								requestNumber+=1
								// 赋值，重新传参
								requestParams.requestNumber = requestNumber
								if(!isRefreshing) {
									isRefreshing = true
									// 获取token
									await login.loginWx()
									requestList.forEach(cb => cb())
									isRefreshing = false
									requestList = []
									resolve(request(requestParams))
								} else {
									return requestList.push(() => {
										resolve(request(requestParams))
									})
								}
							}, requestTimerTime)
						} else {
							requestTimer = null
							clearTimeout(requestTimer)
						}
						isCloseLoading(loadingFlag)
						break;
					case 403:
						isCloseLoading(loadingFlag)
						if(res.data.code == 'user.not.auth') {
							uni.removeStorageSync('channelMessageId')
							uni.reLaunch({
								url: '/pages/main/main'
							})
						} else {
							uni.showToast({
								title: '暂无访问权限！',
								icon: 'none',
							})
						}
						break;
					case 404:
						isCloseLoading(loadingFlag)
						uni.showToast({
							title: '访问的接口或地址不存在！',
							icon: 'none',
						})
						break;
					case 417:
						isCloseLoading(loadingFlag)
						if(res.data.code == 'Unique.mobile') {
							console.log(res.data.msg)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
							})
						}
						reject(res.data)
						break;
					case 500:
						isCloseLoading(loadingFlag)
						uni.showToast({
							title: '服务器繁忙，请稍后重试！',
							icon: 'none',
						})
						break;
					default:
						isCloseLoading(loadingFlag)
						uni.showToast({
							title: '意料之外的错误！',
							icon: 'none',
						})
						break;
				}
			},
			fail: (error) => {
				reject(error)
				isCloseLoading(loadingFlag)
			}
		})
	})
}

const isCloseLoading = (loadingFlag: boolean) => {
	if(loadingFlag) {
		loadingCount--
		if(loadingCount == 0) {
			uni.hideLoading()
		}
	}
}
export default request
```
## envAccessAddress文件
进行环境和服务判断
```ts
import baseInfo from './base'
enum RequestService {
	HKB = "HKB",
	D2P_IM = "D2P_IM",
	IA = "IA", // 智能助手
	PSS_CORE = "PSS_CORE", // 患者自服务
	PSS_FCED = "PSS_FCED", // 抗癌每一天
	AUC = "AUC", // 分享
	HIP = "HIP", // 医生信息服务
	D2P = "D2P",//医患沟通
	D2PCC = "D2PCC",//医患沟通电话
	LOGIN = "LOGIN", // 平台登录
	BU = "BU",//平台用户
	NNTL_WECHAT = "NNTL_WECHAT", // 平台微信认证
	ULC = "ULC",
	// tkb联调
	TKB = "TKB",
	TKB1 = "TKB1",
	MB_PUSH = "MB_PUSH" // 消息推送websocket
}
export function findBaseUrl(requestService: string) {
	let baseUrl = ''
	let NODE_ENV = baseInfo.NODE_ENV // 环境
	if(NODE_ENV == 'devst') {
		switch(requestService) {
			case RequestService.HKB:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-hkb'
				break
			case RequestService.IA:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-ia'
				break
			case RequestService.PSS_FCED:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-pss-fced'
				break
			case RequestService.D2P_IM:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-d2p-im'
				break
			case RequestService.PSS_CORE:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-pss-core'
				break
			case RequestService.AUC:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-auc'
				break
			case RequestService.HIP:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-hip'
				break
			case RequestService.D2P:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-d2p-core'
				break
			case RequestService.D2PCC:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-d2p-cc'
				break
			case RequestService.LOGIN:
				baseUrl = 'http://dev.onmc.top/onmc/org0/plat-nntl-login'
				break
			case RequestService.BU:
				baseUrl = 'http://dev.onmc.top/onmc/org0/plat-app-bu'
				break
			case RequestService.NNTL_WECHAT:
				baseUrl = 'http://dev.onmc.top/onmc/org0/plat-nntl-wechat'
				break
			case RequestService.ULC:
				baseUrl = 'http://dev.onmc.top/onmc/org0/plat-enabler-ulc'
				break
			case RequestService.TKB: 
				baseUrl = 'http://10.8.1.78:8083/chc/cdpe/p'
				break
			case RequestService.TKB1:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/tkb-enabler-chc-cdpe-c/chc/cdpe'
				break
			case RequestService.MB_PUSH:
				baseUrl = 'http://dev.onmc.top/tenant/org1101/poss-app-mb-push'
				break
		}
	}
	if(NODE_ENV == 'sit') {
		switch(requestService) {
			case RequestService.HKB:
				baseUrl = 'http://dev.onmc.top/tenant/org101/poss-app-hkb'
				break
			case RequestService.IA:
				baseUrl = 'http://dev.onmc.top/tenant/org101/poss-app-ia'
				break
			case RequestService.PSS_FCED:
				baseUrl = 'http://dev.onmc.top/tenant/org101/poss-app-pss-fced'
				break
			case RequestService.PSS_CORE:
				baseUrl = 'http://dev.onmc.top/tenant/org101/poss-app-pss-core'
				break
			case RequestService.AUC:
				baseUrl = 'http://dev.onmc.top/tenant/org101/poss-app-auc'
				break
			case RequestService.HIP:
				baseUrl = 'http://dev.onmc.top/tenant/org101/poss-app-hip'
				break
			case RequestService.D2P:
				baseUrl = 'http://dev.onmc.top/tenant/org101/poss-app-d2p-core'
				break
			case RequestService.D2PCC:
				baseUrl = 'http://dev.onmc.top/tenant/org101/poss-app-d2p-cc'
				break
			case RequestService.LOGIN:
				baseUrl = 'http://dev.onmc.top/onmc/org0/plat-nntl-login'
				break
			case RequestService.BU:
				baseUrl = 'http://dev.onmc.top/onmc/org0/plat-app-bu'
				break
			case RequestService.NNTL_WECHAT:
				baseUrl = 'http://dev.onmc.top/onmc/org0/plat-nntl-wechat'
				break
			case RequestService.MB_PUSH:
				baseUrl = 'http://dev.onmc.top/tenant/org101/poss-app-mb-push'
			break
		}
	}
	if(NODE_ENV == 'pp') {
		switch(requestService) {
			case RequestService.HKB:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-hkb'
				break
			case RequestService.IA:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-ia'
				break
			case RequestService.PSS_FCED:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-pss-fced'
				break
			case RequestService.D2P_IM:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-d2p-im'
				break
			case RequestService.PSS_CORE:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-pss-core'
				break
			case RequestService.AUC:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-auc'
				break
			case RequestService.HIP:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-hip'
				break
			case RequestService.D2P:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-d2p-core'
				break
			case RequestService.D2PCC:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-d2p-cc'
				break
			case RequestService.LOGIN:
				baseUrl = 'https://pp.onmc.top/onmc/org0/plat-nntl-login'
				break
			case RequestService.BU:
				baseUrl = 'https://pp.onmc.top/onmc/org0/plat-app-bu'
				break
			case RequestService.NNTL_WECHAT:
				baseUrl = 'https://pp.onmc.top/onmc/org0/plat-nntl-wechat'
				break
			case RequestService.ULC:
				baseUrl = 'https://pp.onmc.top/onmc/org0/plat-enabler-ulc'
				break
			case RequestService.MB_PUSH:
				baseUrl = 'https://pp.onmc.top/tenant/org101/poss-app-mb-push'
			break
		}
	}
	return baseUrl
}
```
## base文件
```js
/**
 * @description: 全局通用变量
 * @author: 孙博文
 * @date: 2021-9-27 1:56:55 ?F10: PM?
*/
let NODE_ENV = 'pp' // 访问环境
let appCode = ''
if(NODE_ENV == 'devst') {
	appCode = ''
}
if(NODE_ENV == 'sit') {
	appCode = ''
}
if(NODE_ENV == 'pp') {
	appCode = ''
}
export default {
	NODE_ENV,
	appCode,
}
```
## 使用
```js
import request from '@/utils/request'

export function deleteDataApi() {
	return request({
		url: '/pss/core/tool/delete_data',
		requestService: 'PSS_CORE'
	})
}
```