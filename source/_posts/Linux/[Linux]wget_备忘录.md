---
title: '[Linux]wget--备忘录'
tags:
  - Linux
id: 38
categories:
  - Linux
date: 2016-12-23 17:05:24
---
### 常用的命令
Linux `wget`是一个下载文件的工具，它用在命令行下。
- wget下载单个文件		#从网络下载一个文件并保存在当前目录 ，会显示下载进度，剩余时间，字节等
		wget http://cn.wordpress.org/wordpress-4.7-zh_CN.zip 

- wget -O下载并以不同的文件名保存 		wget -O wordpress.zip http://www.centos.bz/download.php?id=1080
- wget –limit -rate 限速下载
		wget –limit-rate=300k http://cn.wordpress.org/wordpress-4.7-zh_CN.zip

- wget -c 断点续传		wget -c http://cn.wordpress.org/wordpress-4.7-zh_CN.zip
- wget -b 后台下载		wget -b http://cn.wordpress.org/wordpress-3.1-zh_CN.zip
	> 查看下载信息：tail -f wget-log
- wget –spider测试下载链接		wget –spider URL
- wget –tries 增加重试次数		wget –tries=40 URL</span>
- wget -i 下载多个文件	首先，保存一份下载链接文件
		
		cat > filelist.txt
		url1
		url2
		url3
		url4
	接着使用这个文件和参数-i下载
		wget -i filelist.txt 
- wget –mirror 镜像网站	下面的例子是下载整个网站到本地。
		wget –mirror -p –convert-links -P ./LOCAL URL

		#–miror:开户镜像下载		#-p:下载所有为了html页面显示正常的文件		#–convert-links:下载后，转换成本地的链接		#-P ./LOCAL：保存所有文件和目录到本地指定目录

- wget –reject 过滤指定格式下载	你想下载一个网站，但你不希望下载图片，你可以使用以下命令。		wget –reject=gif url

- wget -o 把下载信息存入日志文件	你不希望下载信息直接显示在终端而是在一个日志文件，可以使用以下命令：		wget -o download.log URL</span>
- wget -Q限制总下载文件大小	当你想要下载的文件超过5M而退出下载，你可以使用以下命令:		wget -Q5m -i filelist.txt 
		#注意：这个参数对单个文件下载不起作用，只能递归下载时才有效。
- wget -r -A下载指定格式文件		wget -r -A.pdf url 
- wget FTP下载
	- wget匿名ftp下载			wget ftp-url
	- wget用户名和密码认证的ftp下载
			wget –ftp-user=USERNAME –ftp-password=PASSWORD url

### 命令格式：
	wget [参数列表] [目标软件、网页的网址]

|  参数 |  说明 |
|------|------|
|-V,–version| 显示软件版本号然后退出| 
| -h,–help | 显示软件帮助信息 | 
| -e,–execute=COMMAND | 执行一个 “.wgetrc”命令| 
| -a,–append-output=FILE| 将软件输出信息追加到文件| 
| -d,–debug| 显示输出信息| 
| -q  |  不显示输出信息| 
| -i,–input-file=FILE|  从文件中取得URL| 
| -t,–tries=NUMBER| 是否下载次数（0表示无穷次）|
| -O –output-document=FILE|下载文件保存为别的文件名|
| -nc, –no-clobber| 不要覆盖已经存在的文件|
|-N,–timestamping|只下载比本地新的文件|
|-T,–timeout=SECONDS| 设置超时时间|
|-Y,–proxy=on/off |关闭代理|
|-nd,–no-directories |不建立目录|
|-x,–force-directories |强制建立目录|
|–http-user=USER|设置HTTP用户|
|–http-passwd=PASS|设置HTTP密码|
|–proxy-user=USER|设置代理用户|
|–proxy-passwd=PASS|设置代理密码|
|-r,–recursive |目录（小心使用）|
|-l,–level=NUMBER| 下载层次|
|-A,–accept=LIST |可以接受的文件类型|
|-R,–reject=LIST|拒绝接受的文件类型|
|-D,–domains=LIST|可以接受的域名|
|–exclude-domains=LIST|拒绝的域名|
|-L,–relative |下载关联链接|
|–follow-ftp |只下载FTP链接|
|-H,–span-hosts |可以下载外面的主机|
|-I,–include-directories=LIST|允许的目录|
|-X,–exclude-directories=LIST| 拒绝的目录|
