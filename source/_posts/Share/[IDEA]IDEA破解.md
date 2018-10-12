---
title: '[IDEA]IDEA2017破解'
tag: idea
category: 分享
date: 2017-10-21 10:34:23
---

# 准备

1. Intellij IDEA 2017 pro
2. JavaCracker-2.69.jar

# 开始

1. 将`JetBrainsCracker-2.xx.jar` 复制到idea安装目录bin下
2. 编辑文件 `bin/idea.vmoptions` 和`bin/idea64.vmoptions` ，最后一行加入
```bash
-javaagent:/安装目录/bin/JetBrainsCracker-2.xx.jar
```
3. 启动时写入激活key
```bash
ThisCrackLicenseId-{  
"licenseId":"testID",  
"licenseeName":"willon",  
"assigneeName":"",  
"assigneeEmail":"idea@163.com",   
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

