import{_ as s,o as n,c as a,O as e}from"./chunks/framework.f59a8fe5.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vuePage/vue2/监听滚动条.md","filePath":"vuePage/vue2/监听滚动条.md","lastUpdated":1698904591000}'),l={name:"vuePage/vue2/监听滚动条.md"},o=e(`<div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">mounted() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //监听滚动条</span></span>
<span class="line"><span style="color:#A6ACCD;">    window.addEventListener(&#39;scroll&#39;,this.handleScroll,true)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">// 销毁监听滚动条</span></span>
<span class="line"><span style="color:#A6ACCD;">destroyed(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    window.removeEventListener(&#39;scroll&#39;, this.handleScroll,true);</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">methods:{</span></span>
<span class="line"><span style="color:#A6ACCD;">    handleScroll(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(document.documentElement.scrollTop )</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span></code></pre></div>`,1),p=[o];function t(c,r,i,d,_,C){return n(),a("div",null,p)}const m=s(l,[["render",t]]);export{u as __pageData,m as default};
