---
title: [分享]破解Jetbrain全系列产品
tag: 分享
category: 分享
date: 2016-06-13 12:22:33
---


## 准备工作

1. jetbrainCracker.jar文件
2. Jetbrain的IDE如 IDEA，Pycharm等等

## 开始

1. 下载文件 jetbrainCracker.jar，复制到软件的安装目录,这里是 `/home/softwares/idea1702`
2. 编辑安装目录下的`安装目录/bin`  下面的 `idea.vmoptions` 和 `idea64.vmoprions 在最后一行加入代理代码:

```
-javaagent:/home/willon/Softwares/IDEA170202/bin/jetbraincrack269.jar
```

3. 激活，在licenseKey框中输入

```
ThisCrackLicenseId-{
"licenseId":"ThisCrackLicenseId",
"licenseeName":"idea",
"assigneeName":"",
"assigneeEmail":"idea@163.com",
"licenseRestriction":"For This Crack, Only Test! Please support genuine!!!",
"checkConcurrentUse":false,
"products":[
{"code":"II","paidUpTo":"2099-12-31"},
{"code":"DM","paidUpTo":"2099-12-31"},
{"code":"AC","paidUpTo":"2099-12-31"},
{"code":"RS0","paidUpTo":"2099-12-31"},
{"code":"WS","paidUpTo":"2099-12-31"},
{"code":"DPN","paidUpTo":"2099-12-31"},
{"code":"RC","paidUpTo":"2099-12-31"},
{"code":"PS","paidUpTo":"2099-12-31"},
{"code":"DC","paidUpTo":"2099-12-31"},
{"code":"RM","paidUpTo":"2099-12-31"},
{"code":"CL","paidUpTo":"2099-12-31"},
{"code":"PC","paidUpTo":"2099-12-31"}
],
"hash":"2911276/0",
"gracePeriodDays":7,
"autoProlongated":false}
```

4. 结束
