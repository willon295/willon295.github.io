---
title: '[Nginx]Nginx基本配置'
category: Nginx
tag: Nginx
date: 2019-03-03 00:00:01
---


配置文件位于 `安装目录` 的 `conf` 文件夹， 一般只需要修改 `nginx.conf`  文件


# 基本配置

**worker_processes 1**:  woker进程的数量， 默认是1个， 可修改，太大会竞争cpu，建议修改 `cpu个数*核心数` 

**连接特性**: 

```nginx
event{
    woker_connections 1024； #一个子进程允许的最大连接数
}
```

**HTTP服务器配置**

```nginx
http{
    #server配置
    server{
        listen 80; #监听80端口
        server_name www.local.com #域名配置
        location / {
            root /usr/local/nginx/html; #站点根目录
            index index.html index.php; #默认站点文件
        }
        error_page 404 /404.html;       #404文件
        error_page 500 502 503 504 /50x.html;  #50x的错误配置文件
        location = /50x.html {
            root /usr/local/nginx/html;   #错误配置文件跟目录
        }
    }
    
    
    server{
        
    }
}
```



# Location 语法

location就是定位， 将不同的 `URI` 进行具体访问定位

一般匹配的语法是：

```nginx
location [=|~|~*|^~]  pattern { # 不要[] ，[]内任选一
    
}
```

**精准匹配：**  `location = pattern {}`

**一般匹配：** `location pattern {}`

**正则匹配：** `location ~ pattern {} `

一般配置： 

```nginx
location / {
    root  /usr/local/nginx/html;
    index index.html index.htm;
}
```

如访问 `www.local.com`  --> 找到站点根目录  --> 找到 index对应文件



**正则： **

```nginx
location ~.*(js|css|png|gif|jpg|mp3|ogg)$  {
        root /var/www/static;
}
```

> 1. 访问 localhost/aa/bb/main.css  
> 2. 寻找 /var/www/static/aa/bb/main.css 文件