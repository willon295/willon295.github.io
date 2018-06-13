---
title: '[SEO]Let-Encrypt实现Https'
tag: SEO
category: SEO
date: 2018-06-07 00:00:00
---

# Lets-Encrypt是什么

一个推动全民 https 的良心组织。


# 说明

1. 系统 ： `Centos-7.2 x64`
2. web服务器; `Nginx`


# 开始


官网在 [这里](https://certbot.eff.org/lets-encrypt)

## 生成证书

1. 准备工作
```
$ yum -y install yum-utils
$ yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
$ yum install python2-certbot-nginx
```
2. 开始生成，根据提示输入邮箱，域名等
```
$ certbot --nginx certonly
```
3. 出现一下内容表示成功
```
congratulations ！.....
...

ssl_certificate "/etc/letsencrypt/live/willon.cn/fullchain.pem"; #证书
ssl_certificate_key "/etc/letsencrypt/live/willon.cn/privkey.pem"; #私钥
...
```

## 配置证书


1. 站点配置文件
```
$ cd /etc/nginx
$ mkdir vhosts
$ cd vhosts
$ vi willon_cn.conf
```
写入内容: 
```
    server {
        listen       443 ssl http2 default_server;
        listen       [::]:443 ssl http2 default_server;
        server_name  willon.cn;
        root         /www/willon_cn;
        ssl_certificate "/etc/letsencrypt/live/willon.cn/fullchain.pem";
        ssl_certificate_key "/etc/letsencrypt/live/willon.cn/privkey.pem";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
        include /etc/nginx/default.d/*.conf;

        location / {
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```
2. `/etc/nginx/nginx.conf`，加载站点配置文件

```
include /etc/nginx/vhosts/*.conf
```
3. 重启nginx
```
systemctl restart nginx
```

## 自动更新证书

```
0 0 1 * 1  certbot renew 

```

