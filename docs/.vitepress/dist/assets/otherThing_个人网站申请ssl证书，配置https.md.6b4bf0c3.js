import{_ as s,o as n,c as a,V as e}from"./chunks/framework.39adc7c5.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"otherThing/个人网站申请ssl证书，配置https.md","filePath":"otherThing/个人网站申请ssl证书，配置https.md","lastUpdated":1717654037000}'),l={name:"otherThing/个人网站申请ssl证书，配置https.md"},p=e(`<h2 id="一、申请证书" tabindex="-1">一、申请证书 <a class="header-anchor" href="#一、申请证书" aria-label="Permalink to &quot;一、申请证书&quot;">​</a></h2><p>人域名是在腾讯云买的，直接在腾讯云申请证书。<br> 选择域名免费版。<br> 按照提示填写相应的域名信息。<br> 证书签发成功后，点击下载，把证书下载到本地。<br></p><h2 id="二、证书安装" tabindex="-1">二、证书安装 <a class="header-anchor" href="#二、证书安装" aria-label="Permalink to &quot;二、证书安装&quot;">​</a></h2><p>nginx安装方法：</p><ol><li>把下载的证书文件解压后，<code>nginx</code>文件夹下的证书文件和私钥文件拷贝到<code>nginx</code>的目录下<code>/usr/local/nginx/conf</code>。 文件要和<code>nginx.conf</code>的配置文件在同一目录下。</li><li>修改<code>nginx.conf</code>文件，增加一下内容</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">    #SSL 访问端口号为 443</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 443 ssl;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #填写绑定证书的域名</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name cloud.tencent.com;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #证书文件名称</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_certificate 1_cloud.tencent.com_bundle.crt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #私钥文件名称</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_certificate_key 2_cloud.tencent.com.key;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_session_timeout 5m;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #请按照以下协议配置</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">    #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。</span></span>
<span class="line"><span style="color:#A6ACCD;">        root html;</span></span>
<span class="line"><span style="color:#A6ACCD;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ol start="3"><li>如果之前使用的是<code>http</code>，部署<code>https</code>后，就需要转发一下。防止通过<code>http</code>访问，不能正确访问。<br> 直接修改<code>nginx.conf</code>文件，新增加一个<code>server</code>对象：</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #填写绑定证书的域名</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name cloud.tencent.com;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #把http的域名请求转成https</span></span>
<span class="line"><span style="color:#A6ACCD;">    return 301 https://$host$request_uri;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,8),o=[p];function c(t,r,i,C,A,d){return n(),a("div",null,o)}const y=s(l,[["render",c]]);export{h as __pageData,y as default};
