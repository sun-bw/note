import{_ as s,o as a,c as n,V as e}from"./chunks/framework.39adc7c5.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vuePage/vue3源码解析/2.Vue源码结构.md","filePath":"vuePage/vue3源码解析/2.Vue源码结构.md","lastUpdated":1717656181000}'),p={name:"vuePage/vue3源码解析/2.Vue源码结构.md"},l=e(`<h2 id="一、源码设计" tabindex="-1">一、源码设计 <a class="header-anchor" href="#一、源码设计" aria-label="Permalink to &quot;一、源码设计&quot;">​</a></h2><h3 id="_1-1-源码目录结构" tabindex="-1">1.1 源码目录结构 <a class="header-anchor" href="#_1-1-源码目录结构" aria-label="Permalink to &quot;1.1 源码目录结构&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">├── packages              // 核心代码</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  compiler-core         // 重要，编译器核心代码</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  compiler-dom          // 重要，浏览器相关编译模块</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  compiler-sfc          // 单文件组件(.vue)编译模块</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  compiler-ssr          // 服务端渲染的编译模块</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  reactivity            // 重要，响应性核心代码</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  reactivity-transform  // 已经过期，不需要关注</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  runtime-core          // 重要，运行时核心代码，内部针对不同台进行实现</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  runtime-dom           //</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  runtime-test          //</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  server-renderer       // 服务器渲染</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  sfc-playground        // sfc 工具：比如：https://play.vuejs.org/</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  shared                // 重要：共享的工具类</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  size-check            // 测试运行时包大小</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  template-explorer     // 提供一个线上的测试（https://template-explorer.vuejs.org）</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  vue                   // 重要：测试实例，打包之后的dist在这里</span></span>
<span class="line"><span style="color:#A6ACCD;">|   ├──  vue-compat            // 用于兼容vue2的代码</span></span>
<span class="line"><span style="color:#A6ACCD;">├── api-extractor.json    // TypeScript的API分析工具</span></span>
<span class="line"><span style="color:#A6ACCD;">├── CHANGELOG.md          // 更新日志</span></span>
<span class="line"><span style="color:#A6ACCD;">├── jest.config.js        // 测试相关</span></span>
<span class="line"><span style="color:#A6ACCD;">├── LICENSE               // 开源协议</span></span>
<span class="line"><span style="color:#A6ACCD;">├── netlify.toml          // 自动化部署相关</span></span>
<span class="line"><span style="color:#A6ACCD;">├── package.json          // npm包管理工具</span></span>
<span class="line"><span style="color:#A6ACCD;">├── pnpm-lock.yaml        // pnpm相关配置</span></span>
<span class="line"><span style="color:#A6ACCD;">├── pnpm-workspace.yaml   // pnpm下载的依赖包版本</span></span>
<span class="line"><span style="color:#A6ACCD;">├── rollup.config.js      // rollup 配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">├── SECURITY.md           //  报告漏洞</span></span>
<span class="line"><span style="color:#A6ACCD;">├── tsconfig.json         // TypeScript 配置文件</span></span></code></pre></div>`,3),o=[l];function c(t,r,i,C,A,y){return a(),n("div",null,o)}const d=s(p,[["render",c]]);export{_ as __pageData,d as default};
