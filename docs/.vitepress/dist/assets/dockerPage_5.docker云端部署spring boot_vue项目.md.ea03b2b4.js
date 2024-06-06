import{_ as s,o as a,c as n,V as l}from"./chunks/framework.bbb6cb24.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"dockerPage/5.docker云端部署spring boot+vue项目.md","filePath":"dockerPage/5.docker云端部署spring boot+vue项目.md","lastUpdated":1717654037000}'),e={name:"dockerPage/5.docker云端部署spring boot+vue项目.md"},o=l(`<h2 id="一、购买服务器-域名" tabindex="-1">一、购买服务器，域名 <a class="header-anchor" href="#一、购买服务器-域名" aria-label="Permalink to &quot;一、购买服务器，域名&quot;">​</a></h2><p>购买服务器，域名，域名备案。服务器创建centos系统</p><h2 id="二、安装docker以及必备软件" tabindex="-1">二、安装docker以及必备软件 <a class="header-anchor" href="#二、安装docker以及必备软件" aria-label="Permalink to &quot;二、安装docker以及必备软件&quot;">​</a></h2><ul><li>docker安装</li><li>mysql安装</li><li>nginx安装</li></ul><h2 id="三、制作centos7-jdk11镜像-使用yum安装" tabindex="-1">三、制作centos7 + jdk11镜像（使用yum安装） <a class="header-anchor" href="#三、制作centos7-jdk11镜像-使用yum安装" aria-label="Permalink to &quot;三、制作centos7 + jdk11镜像（使用yum安装）&quot;">​</a></h2><ol><li>在root下建立Dockerfile：<code>vim Dockerfile</code>(rm -rf Dockerfile删除)</li><li>写入内容：<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#使用的基础镜像</span></span>
<span class="line"><span style="color:#A6ACCD;">FROM centos</span></span>
<span class="line"><span style="color:#A6ACCD;">#作者信息</span></span>
<span class="line"><span style="color:#A6ACCD;">MAINTAINER sun “857153955@qq.com”</span></span>
<span class="line"><span style="color:#A6ACCD;">ENV TZ=Asia/Shanghai</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN yum install java-11 -y</span></span>
<span class="line"><span style="color:#A6ACCD;">ENV LANG=en_US.UTF-8</span></span></code></pre></div></li><li>构建：<code>docker build -t centos7-jdk11 .</code> 注：.表示当前目录下的dockerfile</li><li>运行镜像：<code>docker run -d -it --name centos7-jdk11 /bin/bash</code></li><li>进入镜像：<code>docker exec -it jdk11 bash</code></li><li>查看java版本：<code>java -version</code></li></ol><p>证明镜像制作成功！</p><h2 id="四、部署spring-boot项目" tabindex="-1">四、部署spring boot项目 <a class="header-anchor" href="#四、部署spring-boot项目" aria-label="Permalink to &quot;四、部署spring boot项目&quot;">​</a></h2><ol><li>spring boot项目使用maven打包（blog-0.0.1-SNAPSHOT.jar），放到服务器root目录下</li><li>建立dockerfile写入信息：<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#使用的基础镜像</span></span>
<span class="line"><span style="color:#A6ACCD;">FROM centos7-jdk11</span></span>
<span class="line"><span style="color:#A6ACCD;">#作者信息</span></span>
<span class="line"><span style="color:#A6ACCD;">MAINTAINER SUN &quot;857153966@qq.com&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN mkdir /app</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY ./blog-0.0.1-SNAPSHOT.jar /app/blog-0.0.1-SNAPSHOT.jar</span></span>
<span class="line"><span style="color:#A6ACCD;">EXPOSE 8080</span></span>
<span class="line"><span style="color:#A6ACCD;">ENTRYPOINT [&quot;java&quot;,&quot;-Djava.security.egd=file:/dev/./urandom&quot;,&quot;-Djava.awt.headless=true&quot;,&quot;-jar&quot;,&quot;/app/blog-0.0.1-SNAPSHOT.jar&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">解释：RUN mkdir /app 新建app文件夹</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY ./blog-0.0.1-SNAPSHOT.jar /app/blog-0.0.1-SNAPSHOT.jar 拷贝jar包到app中</span></span>
<span class="line"><span style="color:#A6ACCD;">EXPOSE 8080 容器暴露8080端口</span></span></code></pre></div></li><li>保存后构建：<code>docker build -t blog:0.1 .</code></li><li>运行镜像：<code>docker run -d -p 8080:8080 --name blog --restart=always --cap-add=SYS_PTRACE -v /blog:/data/blog blog:0.1</code></li><li>修改Nginx配置：<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 新增</span></span>
<span class="line"><span style="color:#A6ACCD;">location /api {</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_pass http://212.64.28.154:8080/demo;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div></li><li>通过访问测试接口，测试是否成功。</li></ol><h2 id="五、部署前端vue项目" tabindex="-1">五、部署前端Vue项目 <a class="header-anchor" href="#五、部署前端vue项目" aria-label="Permalink to &quot;五、部署前端Vue项目&quot;">​</a></h2><ol><li><p>修改前端api.js文件（封装axios请求的文件）：axios.defaults.baseURL = ‘/api’</p></li><li><p>打包项目：npm run build</p></li><li><p>打包好的项目，放到宿主机nginx/html目录下。（安装nginx挂载的目录）</p></li><li><p>配置nginx：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;//监听80端口</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name ****************;//自己的域名</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    charset utf-8;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #access_log /var/log/nginx/host.access.log main;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #root /sun/nginx/html/dist;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #index index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        root /usr/share/nginx/html; //前端文件路径</span></span>
<span class="line"><span style="color:#A6ACCD;">        index index.html index.htm;//hash模式配置访问html</span></span>
<span class="line"><span style="color:#A6ACCD;">        try_files $uri $uri/ /index.html;//history模式下</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    location /api {</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy_set_header Host $http_host;</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy_pass http://212.64.28.154:8080/demo;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div></li></ol><h2 id="六、通过域名访问测试是否成功" tabindex="-1">六、通过域名访问测试是否成功 <a class="header-anchor" href="#六、通过域名访问测试是否成功" aria-label="Permalink to &quot;六、通过域名访问测试是否成功&quot;">​</a></h2><p>记一下遇到的坑：</p><ol><li>部署前端vue项目时，前端项目的请求url填写错误，一直跨域。前端baseurl只需要填写api，在nginx增加api的配置即可</li><li>部署spring boot项目时，配置文件没有映射到宿主机，一直映射不到，配置文件不生效。在构建dockerfile的时候没有映射。这个留待以后研究。将dockerfile写在工程里面的。</li></ol>`,14),p=[o];function t(i,c,r,d,A,C){return a(),n("div",null,p)}const u=s(e,[["render",t]]);export{y as __pageData,u as default};
