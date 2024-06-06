import{_ as s,o as a,c as n,O as l}from"./chunks/framework.f59a8fe5.js";const D=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"webpackPage/1.webpack简介.md","filePath":"webpackPage/1.webpack简介.md","lastUpdated":1703469366000}'),p={name:"webpackPage/1.webpack简介.md"},e=l(`<h2 id="一、webpack简介" tabindex="-1">一、webpack简介 <a class="header-anchor" href="#一、webpack简介" aria-label="Permalink to &quot;一、webpack简介&quot;">​</a></h2><ol><li>webpack是什么 静态资源打包器，根据入口文件，把不同的依赖引入，形成代码块chunk。根据不同的资源进行不同的处理，输出bundle文件。</li><li>webpack五个核心概念</li></ol><ul><li>entry：webpack的入口文件，指示webpack以哪个文件为入口，进行打包，分析构建内部依赖图。</li><li>output： webpack打包后的输出文件，指示webpack以哪个文件为输出，输出到哪个文件夹，以及如何命名。</li><li>loader： webpack的加载器，指示webpack以什么方式去处理文件，比如js文件，css文件，图片文件，字体文件</li><li>plugins： 插件，可以用于执行范围更广的业务，插件的范围包括，从打包优化和压缩，一直到重新定义环境变量等。</li><li>mode： 指示webpack以什么模式去运行，有三种模式，development（开发模式），production（生产模式），none。</li></ul><h2 id="二、打包前端资源" tabindex="-1">二、打包前端资源 <a class="header-anchor" href="#二、打包前端资源" aria-label="Permalink to &quot;二、打包前端资源&quot;">​</a></h2><h3 id="_1-打包样式资源" tabindex="-1">1. 打包样式资源 <a class="header-anchor" href="#_1-打包样式资源" aria-label="Permalink to &quot;1. 打包样式资源&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//loader配置</span></span>
<span class="line"><span style="color:#A6ACCD;">module:{</span></span>
<span class="line"><span style="color:#A6ACCD;">    rules:[</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 详细loader配置</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 不同文件配置不同loader处理</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            //匹配那些文件</span></span>
<span class="line"><span style="color:#A6ACCD;">            test: /\\.css$/,</span></span>
<span class="line"><span style="color:#A6ACCD;">            use:[</span></span>
<span class="line"><span style="color:#A6ACCD;">                // use执行顺序，从上到下，从左到右依次执行</span></span>
<span class="line"><span style="color:#A6ACCD;">                // 创建style标签，将js的样式资源插入进行，添加到head中生效</span></span>
<span class="line"><span style="color:#A6ACCD;">                &#39;style-loader&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                // 将css文件变成commonjs模块加载js中，里面内容是样式字符串</span></span>
<span class="line"><span style="color:#A6ACCD;">                &#39;css-loader&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            ]</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            test: /\\.less$/,</span></span>
<span class="line"><span style="color:#A6ACCD;">            use: [&#39;style-loader&#39;,&#39;css-loader&#39;,&#39;less-loader&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_2-打包html资源" tabindex="-1">2. 打包html资源 <a class="header-anchor" href="#_2-打包html资源" aria-label="Permalink to &quot;2. 打包html资源&quot;">​</a></h3><p>loader：下载，使用。 plugins：下载，引入，使用</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">	// html-webpack-plugin</span></span>
<span class="line"><span style="color:#A6ACCD;">	// 功能：默认创建一个空的html文件，自动引入打包输出的所有资源（js.css）</span></span>
<span class="line"><span style="color:#A6ACCD;">	// 需求：需要有结构的html文件</span></span>
<span class="line"><span style="color:#A6ACCD;">	new HtmlWebpackPlugin({</span></span>
<span class="line"><span style="color:#A6ACCD;">		// 复制index.html文件，并自动引入打包输出的所有资源</span></span>
<span class="line"><span style="color:#A6ACCD;">		template:&#39;./src/index.html&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">	})</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span></span></code></pre></div><h3 id="_3-打包图片资源" tabindex="-1">3. 打包图片资源 <a class="header-anchor" href="#_3-打包图片资源" aria-label="Permalink to &quot;3. 打包图片资源&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">module:{</span></span>
<span class="line"><span style="color:#A6ACCD;">	rules:[</span></span>
<span class="line"><span style="color:#A6ACCD;">		{</span></span>
<span class="line"><span style="color:#A6ACCD;">			test: /\\.less$/,</span></span>
<span class="line"><span style="color:#A6ACCD;">			use: [&#39;style-loader&#39;,&#39;css-loader&#39;,&#39;less-loader&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">		},</span></span>
<span class="line"><span style="color:#A6ACCD;">		{</span></span>
<span class="line"><span style="color:#A6ACCD;">			// 默认不能处理html中img图片</span></span>
<span class="line"><span style="color:#A6ACCD;">			// 处理图片资源</span></span>
<span class="line"><span style="color:#A6ACCD;">			test: /\\.(jpg|png|gif)$/,</span></span>
<span class="line"><span style="color:#A6ACCD;">			// 下载url-loader，file-loader</span></span>
<span class="line"><span style="color:#A6ACCD;">			loader: &#39;url-loader&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">			options: {</span></span>
<span class="line"><span style="color:#A6ACCD;">				// 图片的大小小于8kb，base64处理</span></span>
<span class="line"><span style="color:#A6ACCD;">				// 优点：能够减少请求数量，减轻服务器压力</span></span>
<span class="line"><span style="color:#A6ACCD;">				// 缺点：图片体积会更大</span></span>
<span class="line"><span style="color:#A6ACCD;">				limit:8*1024,</span></span>
<span class="line"><span style="color:#A6ACCD;">				// 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs</span></span>
<span class="line"><span style="color:#A6ACCD;">                // 解析时会出问题：[object Module]</span></span>
<span class="line"><span style="color:#A6ACCD;">                // 解决：关闭url-loader的es6模块化，使用commonjs解析</span></span>
<span class="line"><span style="color:#A6ACCD;">				esModule:false,</span></span>
<span class="line"><span style="color:#A6ACCD;">				// 图片重命名</span></span>
<span class="line"><span style="color:#A6ACCD;">				// [hash:10]取图片的hash前10位</span></span>
<span class="line"><span style="color:#A6ACCD;">				// [ext]取原来的扩展名</span></span>
<span class="line"><span style="color:#A6ACCD;">				name: &#39;[hash:10].[ext]&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">			}</span></span>
<span class="line"><span style="color:#A6ACCD;">		},</span></span>
<span class="line"><span style="color:#A6ACCD;">		{</span></span>
<span class="line"><span style="color:#A6ACCD;">			test: /\\.html$/,</span></span>
<span class="line"><span style="color:#A6ACCD;">			// 处理html文件的img图片</span></span>
<span class="line"><span style="color:#A6ACCD;">			loader: &#39;html-loader&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">		}</span></span>
<span class="line"><span style="color:#A6ACCD;">	]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_4-打包其他资源" tabindex="-1">4. 打包其他资源 <a class="header-anchor" href="#_4-打包其他资源" aria-label="Permalink to &quot;4. 打包其他资源&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">module:{</span></span>
<span class="line"><span style="color:#A6ACCD;">	rules:[</span></span>
<span class="line"><span style="color:#A6ACCD;">	{</span></span>
<span class="line"><span style="color:#A6ACCD;">		test:/\\.css$/,</span></span>
<span class="line"><span style="color:#A6ACCD;">		use:[&#39;style-loader&#39;,&#39;css-loader&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">	},</span></span>
<span class="line"><span style="color:#A6ACCD;">	//打包其他资源（除了html，css，js以外的）</span></span>
<span class="line"><span style="color:#A6ACCD;">	{</span></span>
<span class="line"><span style="color:#A6ACCD;">		exclude:/\\.(css|js|html)$/,</span></span>
<span class="line"><span style="color:#A6ACCD;">		loader:&#39;file-loader&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"><span style="color:#A6ACCD;">	]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_5-devserver" tabindex="-1">5. devServer <a class="header-anchor" href="#_5-devserver" aria-label="Permalink to &quot;5. devServer&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）</span></span>
<span class="line"><span style="color:#A6ACCD;">// 特点：只会在内存中编译打包，不会有任何输出</span></span>
<span class="line"><span style="color:#A6ACCD;">// 启动devServer指令为：npx webpack-dev-server</span></span>
<span class="line"><span style="color:#A6ACCD;">devServer: {</span></span>
<span class="line"><span style="color:#A6ACCD;">	// 项目构建后的路径</span></span>
<span class="line"><span style="color:#A6ACCD;">	contentBase: resolve(__dirname, &#39;build&#39;),</span></span>
<span class="line"><span style="color:#A6ACCD;">	// 启动gzip压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">	compress:true,</span></span>
<span class="line"><span style="color:#A6ACCD;">	// 端口号：8080</span></span>
<span class="line"><span style="color:#A6ACCD;">	port:8080,</span></span>
<span class="line"><span style="color:#A6ACCD;">	// 自动打开浏览器</span></span>
<span class="line"><span style="color:#A6ACCD;">	open:true</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,15),t=[e];function o(c,r,i,C,A,d){return a(),n("div",null,t)}const h=s(p,[["render",o]]);export{D as __pageData,h as default};
