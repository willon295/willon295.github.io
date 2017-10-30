---
title: '[PHP]遇到的坑以及解决办法'
category: PHP
tag: PHP
date: 2017-03-15 18:22:27
---

# 主要实现
1. `PhpStorm` 写代码
2. 浏览器输入URL,直接在 `wamp` 环境运行php
3. 点PhpStorm的`chrome`，打开，并在wamp的环境运行php

# wamp 的坑

## 启动`0x0007b`,`0x000142`报错

解决：重装软件，或者重装系统，大部分是电脑系统问题。直接重装

## 403 

解决：找到`apache`配置文件`httpd.conf` , 在`<Directory>`里面加上:

```
<Directory>
	Allow from all
</Directory>

```

重启 wamp;

## 多站点配置

1. `httpd.conf`找到`Include extra/httpd-vhosts.conf`,删掉`#`注释。
2. 打开`httpd-vhosts.conf`,添加：

	```
	<VirtualHost *:80>
    	DocumentRoot "E:/MyProject/PhpProjects/www.php1.com"
    	ServerName www.php1.com
	</VirtualHost>
	```

3. 添加 `host` 解析


# PhpStorm的坑

1. 默认服务启动，端口为`65442`
2. 无法获取`post`提交的数据，`get`可以.

> 解决办法： 
> 1. 使用`wamp` 作为运行环境，`phpstorm` 只用作开发环境
> 2. 抛弃 `phpstorm`,直接用`sublime`敲代码（效率明显低一点


## phpstorm设置

1. 找到`Settings->Deployment`
2. 点 ` + `号，填入名称，选择`In place`.
3. 点击刚配置的名称`Web Server root URL` 填入host解析的域名
