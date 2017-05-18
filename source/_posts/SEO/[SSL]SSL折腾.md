---
title: SSL折腾
tags:
  - SEO
id: 87
categories:
  - SEO
date: 2016-12-21 20:33:03
---


## SSL申请

国内有很多的免费的SSL证书，比如腾讯云，比如阿里云，七牛云等等。申请下来之后会有不同几个版本，用与不同的环境

![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/ssl1.png)

想我用的就是lnmp，自然使用Nginx的。

## 证书配置

### 监听端口443
SSL默认监听的是443端口，所以得先开启443端口。

命令：

	iptables -A INPUT -ptcp --dport 443 -j ACCEPT

### 修改配置文件
先把发下来的证书文件`crt `和` key`上传到服务器，记住目录。接下来如果是`nginx` ，需要在文件 `/nginx/conf/nginx.conf `文件中进行配置，修改以下内容：
	
	server
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
	}.
	#重启nginx服务


##  遇到的问题

其实这个东西遇到的问题还是很多的。

1. 配置文件之后你的 nginx 会无法重启，提醒你 can"t find xxxx.so

2. 打开网站 404 ，或者500，或者403.

3. 访问的不是 https ,而是http。

出现以上所有的问题根据提示操作，一个个排错。

## 301重定向

比如想让访问你的http://codexz.cn 自动跳转到https://www.codexz.cn,则需要将cl95.cc重定向：

	if ($host ~ '^codexz.cn'){
	 return 301 https://www.codexz.cn$uri;
	}

## 伪静态
使用不同的建站程序需要不同的规则，比如`wordpress`则需要在`conf`文件中`include  wordpress.conf`文件，伪静态的文件一般安装的时候就会自动生成，保存在`rewrite`文件夹中。如果没有，百度，手动添加。