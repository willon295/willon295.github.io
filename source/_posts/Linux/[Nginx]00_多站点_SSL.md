---
title: '[Nginx]00_多站点_SSL'
tag: Nginx
category: Linux
date: 2017-05-01 00:01:00
---

# Nginx

优点：
1. 高性能，高并发
2. 轻量级


# 多站点

1. 更改 `/etc/nginx/nginx.conf`,加入
```
include /etc/nginx/vhost/*.conf;
```
2. 创建简单站点文件，`vi vhost/demo_com.conf`
```
server{

    listen 80;
    server_name demo.com;
    location / {
        root /www/demo_com;
        index index.html index.htm index.php index.jsp;
    }
    
    error_page 500 502 503 504 /50x.html;

}
```

# SSL配置


```
    server {
        listen       443 ssl http2 default_server;
        listen       [::]:443 ssl http2 default_server;
        server_name  willon.cn;
        root         /www/demo_com;
        #http强制跳转
        return 301 https://$server_name$request_uri;
        #配置证书
        ssl_certificate "/etc/letsencrypt/live/demo_com/fullchain.pem";
        ssl_certificate_key "/etc/letsencrypt/live/demo_com/privkey.pem";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
    }

```
