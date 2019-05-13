---
title: '[Android]adb命令'
date: 2015-10-11 00:00:00
---

# 准备

1. 手机开启 `USB调试`  功能，通过 `adb devices` 查看当前所有连接的设备
2. 如果手机已经root，通过 `su` 获取权限


# 查看信息

1. 查看手机屏幕分辨率： `adb shell wm size`
2. 查看所有设备： `adb devices`

# 点击




手机屏幕尺寸是  `宽  X  高`， 定位从左上角开始, 坐标为 `(0,0)`

```
0------>
|
|
|
|
|
v

```

# 滑动

`adb shell input  swipe x1 y1 x2 y2` 

通过 x , y 的坐标实现滑动方向的控制。

```
adb shell input  swipe 200 400 800 400 #右滑
adb shell input  swipe 800 400 200 400 #左滑
adb shell input  swipe 200 400 200 800 #下滑
adb shell input  swipe 200 800 200 400 #上滑
```