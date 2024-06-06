import{_ as s,o as n,c as a,O as l}from"./chunks/framework.f59a8fe5.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"cssPage/省略号.md","filePath":"cssPage/省略号.md","lastUpdated":1692844591000}'),p={name:"cssPage/省略号.md"},o=l(`<div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 单行</span></span>
<span class="line"><span style="color:#A6ACCD;">overflow: hidden;</span></span>
<span class="line"><span style="color:#FFCB6B;">text-overflow</span><span style="color:#A6ACCD;">: ellipsis;</span></span>
<span class="line"><span style="color:#FFCB6B;">white-space</span><span style="color:#A6ACCD;">: nowrap;</span></span>
<span class="line"><span style="color:#A6ACCD;">// 多行（设置宽高）</span></span>
<span class="line"><span style="color:#A6ACCD;">overflow: hidden;</span></span>
<span class="line"><span style="color:#FFCB6B;">text-overflow</span><span style="color:#A6ACCD;">: ellipsis;</span></span>
<span class="line"><span style="color:#A6ACCD;">display: -webkit-box;</span></span>
<span class="line"><span style="color:#A6ACCD;">-webkit-line-clamp: 2;</span></span>
<span class="line"><span style="color:#FFCB6B;">line-clamp</span><span style="color:#A6ACCD;">: 2;</span></span>
<span class="line"><span style="color:#A6ACCD;">-webkit-box-orient: vertical;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">// 自定义省略号样式</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;</span><span style="color:#FFCB6B;">div</span><span style="color:#A6ACCD;"> class=&quot;</span><span style="color:#FFCB6B;">ellipsis-content</span><span style="color:#A6ACCD;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;</span><span style="color:#FFCB6B;">span</span><span style="color:#A6ACCD;"> class=&quot;</span><span style="color:#FFCB6B;">ellipsis-more</span><span style="color:#A6ACCD;">&quot;</span><span style="color:#89DDFF;">&gt;{</span><span style="color:#A6ACCD;">{scope.row.result ? scope.row.result </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">---</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">}&lt;/</span><span style="color:#FFCB6B;">span</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/</span><span style="color:#FFCB6B;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ellipsis-content</span></span>
<span class="line"><span style="color:#A6ACCD;">	overflow: hidden;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">text-overflow</span><span style="color:#A6ACCD;">: ellipsis;</span></span>
<span class="line"><span style="color:#A6ACCD;">	display: -webkit-box;</span></span>
<span class="line"><span style="color:#A6ACCD;">	-webkit-line-clamp: 3;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">line-clamp</span><span style="color:#A6ACCD;">: 3;</span></span>
<span class="line"><span style="color:#A6ACCD;">	-webkit-box-orient: vertical;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">text-overflow</span><span style="color:#A6ACCD;">: ellipsis;</span></span>
<span class="line"><span style="color:#A6ACCD;">	overflow: hidden;</span></span>
<span class="line"><span style="color:#A6ACCD;">	color:</span><span style="color:#89DDFF;">#</span><span style="color:#A6ACCD;">333;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">font-weight</span><span style="color:#A6ACCD;">: 900;</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">ellipsis-more</span></span>
<span class="line"><span style="color:#A6ACCD;">	color: black;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#FFCB6B;">font-weight</span><span style="color:#A6ACCD;">: 100;</span></span></code></pre></div>`,1),e=[o];function t(c,r,C,i,A,y){return n(),a("div",null,e)}const B=s(p,[["render",t]]);export{F as __pageData,B as default};
