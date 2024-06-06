```js
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const path = require("path");
const oss = require("./oss.config");
const WebpackAliyunOss = require("webpack-aliyun-oss");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: (config) => {
        config.output.globalObject("this");
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@components", resolve("src/components"))
            .set("@base", resolve("baseConfig"))
            .set("@public", resolve("public"));
    },
    configureWebpack: (config) => {
        let webpackAliyunOss = [
            new WebpackAliyunOss({
                from: ["./dist/**", "!./dist/**/*.html"], // 上传那个文件或文件夹  可以是字符串或数组
                // dist: "web_static/devst/to/", // 需要上传到oss上的给定文件目录
                dist: "envOssPath", // 上传到git时打开，用于流水线替换变量
                region: oss.region,
                accessKeyId: oss.accessKeyId,
                accessKeySecret: oss.accessKeySecret,
                bucket: oss.bucket,

                // 可以在进行测试看上传路径是否正确, 打开后只会显示上传路径并不会真正上传;
                test: false,


                // 因为文件标识符 "\"  和 "/" 的区别 不进行 setOssPath配置,上传的文件夹就会拼到文件名上, 丢失了文件目录,所以需要对setOssPath 配置。
                setOssPath: (filePath) => {
                    // some operations to filePath
                    let index = filePath.lastIndexOf("dist");
                    let Path = filePath.substring(index + 4, filePath.length);
                    return Path.replace(/\\/g, "/");
                },
                setHeaders: (filePath) =>
                    ({
                        "Cache-Control": "max-age=31536000"
                    })

            })
        ];
        config.plugins = [...config.plugins, ...webpackAliyunOss];
        config.module.rules.push({
            test: /\.worker.js$/,
            use: {
                loader: "worker-loader",
                options: { inline: true, name: "workerName.[hash].js" }
            }
        });
        if (IS_PROD) {
            config.optimization = {
                splitChunks: {
                    cacheGroups: {
                        common: {
                            name: "chunk-common",
                            chunks: "initial",
                            minSize: 0,
                            priority: 1,
                            minChunks: 2, // 拆分前，这个模块至少被不同 chunk 引用的次数
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        vendors: {
                            name: "chunk-vendors",
                            test: /[\\/]node_modules[\\/]/,
                            chunks: "initial",
                            priority: 2,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        vue: {
                            name: "chunk-vue",
                            test: /[\\/]node_modules[\\/]vue[\\/]/,
                            chunks: "all",
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        vueRouter: {
                            name: "chunk-vue-router",
                            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
                            chunks: "all",
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        vuex: {
                            name: "chunk-vuex",
                            test: /[\\/]node_modules[\\/]vuex[\\/]/,
                            chunks: "all",
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        elementUI: {
                            name: "chunk-element-ui",
                            test: /[\\/]node_modules[\\/]element-ui[\\/]lib/,
                            chunks: "all",
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        antDesign: {
                            name: "chunk-ant-design",
                            test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
                            chunks: "all",
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        antDesignVue: {
                            name: "chunk-ant-design-vue",
                            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
                            chunks: "all",
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        moment: {
                            name: "chunk-moment",
                            test: /[\\/]node_modules[\\/]moment[\\/]/,
                            chunks: "all",
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                    }
                }
            };
        }
    },
    // publicPath: "https://onmc-common.oss-cn-beijing.aliyuncs.com/web_static/devst/to/",
    publicPath: "envPublicPath", // 上传到git时打开，用于流水线替换变量
    lintOnSave: false, //eslint 校验
    outputDir: "dist", // 'dist', 生产环境构建文件的目录
    assetsDir: "static" // 相对于outputDir的静态资源(js、css、img、fonts)目录
};
```
根目录下oss.config.js文件
```js
module.exports = {
    region: "oss-cn-beijing",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: ""
}
```