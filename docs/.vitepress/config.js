import { defineConfig } from 'vitepress'

export default defineConfig({
    base: '/',
    title: 'Hello VitePress', // 网站title
    description: 'Just playing around.', // 描述
    lastUpdated: true, // 最后更新时间
    lang: 'zh-CN',
    appearance: true,
    markdown: {
        lineNumbers: true, // 代码块带行数
    },
    themeConfig: {
        // 网站标题和logo
        siteTitle: "My Custom Title", // 导航title
        outlineTitle: '目录', // 大纲顶部文字
        outline: [2,6], // 文章右侧大纲层级
        lastUpdatedText: '最后更新时间',
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Evan You'
        },
        search: {
            // 指定搜索服务器的地址
            provider: 'local'
        },
        // 右上角导航
        nav: [
            { text: '首页', link: '/' },
            {
                text: '📱前端开发',
                items: [
                    {
                        text: '前端框架和语言',
                        items: [
                            { text: 'Vue', link: '/vuePage/vue2/el-table表格拖拽' },
                            { text: 'JavaScript', link: '/JavaScriptPage/通用方法' },
                            { text: '乾坤', link: '/qiankun/1.vue3+vite微前端项目搭建' },
                            { text: 'CSS', link: '/cssPage/样式记录' },
                        ]
                    },
                    { text: '杂七杂八', link: '/otherThing/个人网站申请ssl证书，配置https' },
                ],
            },
            {
                text: '📦后端开发',
                items: [
                    {
                        text: '开发框架和工具',
                        items: [
                            { text: 'Node', link: '/nodePage/nvm/nvm安装' }
                        ]
                    },
                    {
                        text: '服务器和反向代理',
                        items: [
                            { text: 'Nginx', link: '/vuePage/vue2/el-table表格拖拽' }
                        ]
                    }
                ]
            },
            {
                text: '💻混合开发',
                items: [
                    {
                        text: '应用框架',
                        items: [
                            { text: 'uni-app', link: '/uniAppPage/uni-app微信小程序依赖包优化' }
                        ]
                    },
                    {
                        text: '工具和平台',
                        items: [
                            { text: 'Vue', link: '/vuePage/vue2/el-table表格拖拽' }
                        ]
                    }
                ]
            },
            {
                text: '🛠️构建工具',
                items: [
                    {
                        text: '编译器',
                        items: [
                            { text: 'VScode', link: '/vuePage/vue2/el-table表格拖拽' }
                        ]
                    },
                    {
                        text: '包管理工具和构建工具',
                        items: [
                            { text: 'npm', link: '/vuePage/vue2/el-table表格拖拽' },
                            { text: 'Webpack', link: '/webpackPage/1.webpack简介' },
                            { text: 'Docker', link: '/dockerPage/1.docker安装' }
                        ]
                    }
                ]
            },
        ],
        sidebar: {
            // 当用户位于 `vuePage` 目录时，会显示此侧边栏
            '/vuePage/': [
                {
                    text: 'Vue',
                    items: [
                        { text: 'css中使用js变量', link: '/vuePage/css中使用js变量' },
                        { text: '懒加载', link: '/vuePage/懒加载' },
                        { text: 'vue路由两种模式', link: '/vuePage/vue路由两种模式' }
                    ]
                },
                {
                    text: 'Vue2',
                    collapsed: true,
                    items: [
                        { text: 'el-table表格拖拽', link: '/vuePage/vue2/el-table表格拖拽'},
                        { text: 'el-upload上传视频获取视频时长', link: '/vuePage/vue2/el-upload上传视频获取视频时长'},
                        { text: '封装axios', link: '/vuePage/vue2/封装axios请求,配置el-loading'},
                        { text: '监听滚动条', link: '/vuePage/vue2/监听滚动条'},
                        { text: '组件通信', link: '/vuePage/vue2/组件通信'},
                        { text: 'Vuex理解', link: '/vuePage/vue2/Vuex理解'},
                        { text: 'Vue项目打包优化', link: '/vuePage/vue2/Vue项目打包优化'},
                        { text: 'vue项目使用eslint', link: '/vuePage/vue2/vue项目使用eslint'},
                        { text: ' Vue+vant实现手机端拍照上传，图片旋转，图片压缩', link: '/vuePage/vue2/Vue+vant实现手机端拍照上传，图片旋转，图片压缩'},
                        { text: 'Vue自定义指令', link: '/vuePage/vue2/Vue自定义指令'},
                        { text: 'Vue图片马赛克，旋转', link: '/vuePage/vue2/Vue图片马赛克，旋转'},
                        { text: 'Vue打包后文件上传到oss', link: '/vuePage/vue2/Vue打包后文件上传到oss'},
                    ]
                },
                {
                    text: 'Vue3',
                    collapsed: true,
                    items: [
                        { text: '父子组件传值', link: '/vuePage/vue3/父子组件传值' },
                        { text: '组件动态ref', link: '/vuePage/vue3/组件动态ref' },
                    ]
                },
                {
                    text: 'Vue3源码',
                    collapsed: true,
                    items: [
                        // { text: '1.框架设计的基本概念', link: '/vuePage/vue3源码解析/1.框架设计的基本概念' },
                        // { text: '2.Vue源码结构', link: '/vuePage/vue3源码解析/2.Vue源码结构' },
                        // { text: '3.响应系统', link: '/vuePage/vue3源码解析/3.响应系统' },
                        // { text: '4.reactivity模块', link: '/vuePage/vue3源码解析/4.reactivity模块' },
                        // { text: '5.ref模块', link: '/vuePage/vue3源码解析/5.ref模块' },
                        // { text: '6.computed && watch', link: '/vuePage/vue3源码解析/6.computed && watch' },
                        { text: '1.项目搭建', link: '/vuePage/vue3源码/1.项目搭建' },
                        {
                            text: '2.响应式-reactivity',
                            collapsed: true,
                            items: [
                                { text: '1.响应式基础实现', link: '/vuePage/vue3源码/reactivity/1.响应式基础实现' },
                            ]
                        }
                    ]
                },
            ],
            '/qiankun/': [
                { text: '1.项目搭建', link: '/qiankun/1.vue3+vite微前端项目搭建' },
            ],
            '/JavaScriptPage/': [
                {
                    text: 'JavaScript基础',
                    items: [
                        { text: '1.数据，变量，内存', link: '/JavaScriptPage/1.数据，变量，内存' },
                        { text: '2.js中this指向理解', link: '/JavaScriptPage/2.js中this指向理解' },
                        { text: '3.js中原型和原型链', link: '/JavaScriptPage/3.js中原型和原型链' },
                        { text: '4.函数执行上下文和执行上下文栈', link: '/JavaScriptPage/4.函数执行上下文和执行上下文栈' },
                        { text: '5.js闭包理解', link: '/JavaScriptPage/5.js闭包理解.md' },
                        { text: '6.js继承模式', link: '/JavaScriptPage/6.js继承模式.md' },
                        { text: '7.浅拷贝和深拷贝', link: '/JavaScriptPage/7.浅拷贝和深拷贝.md' },
                        { text: '8.JS-Web-API', link: '/JavaScriptPage/8.JS-Web-API' },
                        { text: '9.Event Loop', link: '/JavaScriptPage/9.Event Loop' },
                        { text: '10.Promise和async/await', link: '/JavaScriptPage/10.Promise和async，await' },
                    ],
                },
                {
                    text: 'JavaScript',
                    items: [
                        { text: '通用方法', link: '/JavaScriptPage/通用方法' },
                        { text: '防抖和节流', link: '/JavaScriptPage/防抖和节流' },
                        { text: '判断元素是否在可视区域内', link: '/JavaScriptPage/判断元素是否在可视区域内' },
                        { text: '图片旋转方法', link: '/JavaScriptPage/图片旋转方法' },
                    ]
                },
            ],
            '/cssPage/': [
                {
                    text: 'CSS',
                    collapsed: true,
                    items: [
                        { text: '样式记录', link: '/cssPage/样式记录'},
                        { text: '问题记录', link: '/cssPage/问题记录'},
                        { text: '浏览器滚动条样式修改', link: '/cssPage/浏览器滚动条样式修改'},
                        { text: '省略号', link: '/cssPage/省略号'},
                        { text: 'clip-path裁剪', link: '/cssPage/clip-path裁剪'},
                        { text: '盒子模型', link: '/cssPage/盒子模型'},
                        { text: '弧形边框选项卡', link: '/cssPage/弧形边框选项卡'},
                    ]
                },
            ],
            '/dockerPage/': [
                {
                    text: 'Docker',
                    // collapsed: true,
                    items: [
                        { text: '1.Docker安装', link: '/dockerPage/1.docker安装.md'},
                        { text: '2.Docker基本命令', link: '/dockerPage/2.docker基本命令.md'},
                        { text: '3.Docker安装MySQL', link: '/dockerPage/3.docker安装MySQL'},
                        { text: '4.Docker安装Nginx', link: '/dockerPage/4.docker安装Nginx.md'},
                        { text: '5.Docker云端部署spring boot+vue项目', link: '/dockerPage/5.docker云端部署spring boot+vue项目.md'},
                    ]
                },
            ],
            '/webpackPage/': [
                {
                    text: 'webpack',
                    collapsed: true,
                    items: [
                        { text: '1.webpack简介', link: '/webpackPage/1.webpack简介'},
                        { text: '2.webpack开发环境基本配置', link: '/webpackPage/2.webpack开发环境基本配置'},
                        { text: '3.webpack生产环境基本配置', link: '/webpackPage/3.webpack生产环境基本配置'},
                        { text: '4.webpack配置HMR', link: '/webpackPage/4.webpack配置HMR'},
                        { text: '5.webpack配置source-map', link: '/webpackPage/5.webpack配置source-map'},
                        { text: '6.webpack配置缓存', link: '/webpackPage/6.webpack配置缓存'},
                    ]
                },
            ],
            '/uniAppPage/': [
                {
                    text: '其他',
                    collapsed: false,
                    items: [
                        { text: 'uni-app微信小程序依赖包优化', link: '/uniAppPage/uni-app微信小程序依赖包优化'},
                        { text: 'uni-app封装网络请求', link: '/uniAppPage/uni-app封装网络请求'},
                        { text: 'uni-app微信小程序图片裁剪，旋转', link: '/uniAppPage/uni-app微信小程序图片裁剪，旋转'},
                        { text: 'uni-app微信小程序图片实现滤镜效果', link: '/uniAppPage/uni-app微信小程序图片实现滤镜效果'},
                    ]
                }
            ],
            '/nodePage': [
                { text: 'nvm安装', link: '/nodePage/nvm/nvm安装'},
            ],
            '/otherThing/': [
                {
                    text: '其他',
                    collapsed: true,
                    items: [
                        { text: '个人网站申请ssl证书，配置https', link: '/otherThing/个人网站申请ssl证书，配置https'},
                        { text: 'PciGo图床工具使用', link: '/otherThing/PicGo图床工具的使用'},
                        { text: 'vscode快捷注释', link: '/otherThing/vscode快捷注释'},
                    ]
                }
            ]
        },
    },
})

// module.exports = {

// }