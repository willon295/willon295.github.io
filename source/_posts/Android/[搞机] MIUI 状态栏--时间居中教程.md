---
title: '[搞机] MIUI 状态栏--时间居中教程'
tags:
  - Android
id: 3
categories:
  - Android
date: 2017-05-04 15:59:32
---

让我们先来看一看 MIUI 的原生状态栏

![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/000.png)
丑爆了有没有，除了时间，其他的所有图标都挤在右边。从我个人的审美角度来讲 ，这个布局比重很不合理，空间利用不充分。而且不对称。。。。也不知道谁想出来这么神经的状态栏。相比之下，虽然我对高价低配的vivo没什么好感，但是客观的讲，它的状态栏还是挺不错的。

## DEMO

于是我决定反编译一波MIUI的状态栏。先上一张成果图
![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/005.png)

## 准备工作

去`apktool` 官网下载最新的版本，[传送门](https://ibotpeaches.github.io/Apktool/ "传送门")

1、 `apktool-2.2.ar` 和`apktool.bat`
2、电脑一台

> 需要的东西后面打包



## 开工

### 一、提取文件

1、system/app/miui.apk
2、system/framework/framework-res.apk
3、system/framework/framework-ext-res/fraework-ext-res.apk
4、system/priv-app/miuisystemui.apk

### 二、导入框架

`apktool if  framework-res.apk`
`apktool if  fraework-ext-res.apk`
`apktool if  miui.apk`

### 三、反编译文件

`apktool  d  miuisystemui.apk`
成功后多出一个文件夹  `miuisystemui`

![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/002.jpg)

### 四、替换布局文件

文件位于`res/layout/`

status_bar_simple.xml
signal_cluster_view.xml

### 五、回编译

`apktool b  miuisystemui`

在`MIUIsystem/dist/`生成  `MIUIsystemUI.apk`, 这个apk是没有签名的

![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/003.jpg)

### 六、再替换

使用压缩软件打开回编译  MIUIsystemUI.apk   ①
使用压缩软件打开源文件  MIUIsystemUI.apk   ②

将 ① 中的 status_bar_simple.xml ，signal_cluster_view.xml替换到②中。

### 七、收工

将新 `MIUIsystemUI.apk`  扔进 `system/priv-app/miuisystemui/`文件夹，权限 `0644` ，重启手机

### 资源下载

[点此下载](http://wwwcodexzcn-10039191.cossh.myqcloud.com/MIUI%E6%97%B6%E9%97%B4%E5%B1%85%E4%B8%AD_byCL.zip)