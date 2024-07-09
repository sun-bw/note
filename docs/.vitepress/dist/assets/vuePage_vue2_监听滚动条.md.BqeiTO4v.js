import{_ as s,c as a,o as n,aR as i}from"./chunks/framework.BCbTIoR1.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vuePage/vue2/监听滚动条.md","filePath":"vuePage/vue2/监听滚动条.md","lastUpdated":1717654037000}'),e={name:"vuePage/vue2/监听滚动条.md"},l=i(`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mounted() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    //监听滚动条</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    window.addEventListener(&#39;scroll&#39;,this.handleScroll,true)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 销毁监听滚动条</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">destroyed(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    window.removeEventListener(&#39;scroll&#39;, this.handleScroll,true);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">methods:{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    handleScroll(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.log(document.documentElement.scrollTop )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span></code></pre></div>`,1),t=[l];function p(h,E,d,c,o,r){return n(),a("div",null,t)}const g=s(e,[["render",p]]);export{_ as __pageData,g as default};
