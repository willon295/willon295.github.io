---
title: SSL折腾
tags:
  - SEO
id: 87
categories:
  - SEO
date: 2016-12-21 20:33:03
---

<div class="para">ecure Socket Layer，为[Netscape](http://baike.baidu.com/view/153922.htm)所研发，用以保障在Internet上数据传输之安全，利用[数据加密](http://baike.baidu.com/view/696431.htm)(Encryption)技术，可确保数据在网络上之传输过程中不会被截取及窃听。一般通用之规格为40 bit之安全标准，[美国](http://baike.baidu.com/view/2398.htm)则已推出128 bit之更高安全标准，但限制出境。只要3.0版本以上之I.E.或Netscape[浏览器](http://baike.baidu.com/view/7718.htm)即可支持SSL。</div>
<div class="para">当前版本为3.0。它已被广泛地用于[Web浏览器](http://baike.baidu.com/view/206703.htm)与服务器之间的[身份认证](http://baike.baidu.com/view/1014826.htm)和加密数据传输。</div>
<div class="para">SSL协议位于[TCP/IP协议](http://baike.baidu.com/view/7649.htm)与各种[应用层](http://baike.baidu.com/view/239619.htm)协议之间，为[数据通讯](http://baike.baidu.com/view/1474554.htm)提供安全支持。SSL协议可分为两层： SSL记录协议（SSL Record Protocol）：它建立在可靠的[传输协议](http://baike.baidu.com/view/441895.htm)（如TCP）之上，为高层协议提供[数据封装](http://baike.baidu.com/view/262940.htm)、压缩、加密等基本功能的支持。 SSL[握手协议](http://baike.baidu.com/view/1712962.htm)（SSL Handshake Protocol）：它建立在SSL记录协议之上，用于在实际的数据传输开始前，通讯双方进行[身份认证](http://baike.baidu.com/view/1014826.htm)、协商[加密算法](http://baike.baidu.com/view/155969.htm)、交换加密[密钥](http://baike.baidu.com/view/934.htm)等。这都是百度的。下面就说说折腾这个ssl的几个烦人的地方。</div>

### <span style="color: #ff0000;">SSL申请</span>

国内有很多的免费的SSL证书，比如腾讯云，比如阿里云，七牛云等等。申请下来之后会有不同几个版本，用与不同的环境

![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/ssl1.png)

想我用的就是lnmp，自然使用Nginx的。

### <span style="color: #ff0000;">`证书配置`</span>

<div>**1、监听端口443**</div>
<div>SSL默认监听的是443端口，所以得先开启443端口。</div>
<div>命令：iptables -A INPUT -ptcp --dport 443 -j ACCEPT</div>
<div>**2、修改配置文件**</div>
<div>先把发下来的证书文件<span style="color: #ff0000;">crt</span> 和 <span style="color: #ff0000;">key</span>上传到服务器，记住目录。接下来如果是nginx ，需要在文件 /nginx/conf/nginx.conf 文件中进行配置，修改以下内容：</div>
<div>
<pre>server
{
listen 80;
listen 443 ssl;
server_name www.codexz.cn;
index index.php index.html index.htm default.html;
root /www/web/www.codexz.cn;
#error_page 404/404.html;
ssl_certificate key/www.codexz.cn/key.csr;
ssl_certificate_key key/www.codexz.cn/key.key;
if ($server_port !~ 443){
rewrite ^/.*$ https://$host$uri;
}
error_page 497 https://$host$uri;
error_page 404 /404.html;
error_page 502 /502.html;
include enable-php-70.conf;
include rewrite/www.codexz.cn.conf;
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
{
expires 30d;
access_log on;
}
location ~ .*\.(js|css)?$
{
expires 12h;
access_log on;
}
access_log /www/wwwlogs/www.codexz.cn.log;
}.</pre>
</div>
<div>重启nginx服务。</div>
<div></div>

###  <span style="color: #ff0000;">遇到的问题</span>

<div>其实这个东西遇到的问题还是很多的。</div>
<div>1、配置文件之后你的 nginx 会无法重启，提醒你  can"t  find  xxxx.so</div>
<div>2、打开网站 404 ，或者500，或者403.</div>
<div>3、访问的不是 https ,而是http。</div>
<div>出现以上所有的问题根据提示操作，一个个排错。</div>

### <span style="color: #ff0000;">301重定向</span>

<div>比如想让访问你的http://codexz.cn 自动跳转到https://www.codexz.cn,则需要将cl95.cc重定向：</div>
<pre>if ($host ~ '^codexz.cn'){
 return 301 https://www.codexz.cn$uri;
}</pre>

### <span style="color: #ff0000;">伪静态</span>

<div>使用不同的建站程序需要不同的规则，比如wordpress则需要在conf文件中include  wordpress.conf文件，伪静态的文件一般安装的时候就会自动生成，保存在rewrite文件夹中。如果没有，百度，手动添加。</div>