## 一、申请证书
人域名是在腾讯云买的，直接在腾讯云申请证书。<br/>
选择域名免费版。<br/>
按照提示填写相应的域名信息。<br/>
证书签发成功后，点击下载，把证书下载到本地。<br/>
## 二、证书安装
nginx安装方法：
1. 把下载的证书文件解压后，`nginx`文件夹下的证书文件和私钥文件拷贝到`nginx`的目录下`/usr/local/nginx/conf`。 文件要和`nginx.conf`的配置文件在同一目录下。
2. 修改`nginx.conf`文件，增加一下内容
```
server {
    #SSL 访问端口号为 443
    listen 443 ssl;
    #填写绑定证书的域名
    server_name cloud.tencent.com;
    #证书文件名称
    ssl_certificate 1_cloud.tencent.com_bundle.crt;
    #私钥文件名称
    ssl_certificate_key 2_cloud.tencent.com.key;
    ssl_session_timeout 5m;
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    location / {
    #网站主页路径。此路径仅供参考，具体请您按照实际目录操作。
        root html;
        index  index.html index.htm;
    }
}
```
3. 如果之前使用的是`http`，部署`https`后，就需要转发一下。防止通过`http`访问，不能正确访问。<br>
直接修改`nginx.conf`文件，新增加一个`server`对象：
```
server {
    listen 80;
    #填写绑定证书的域名
    server_name cloud.tencent.com;
    #把http的域名请求转成https
    return 301 https://$host$request_uri;
}
```