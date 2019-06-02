---
title: '[Share]Mac启动U盘制作'
tag: Share
category: Share
date: 2018-09-10 00:00:00
---

本教程涉及在各种环境下制作 Mac启动 U 盘, 使用的 mac 安装镜像地址是:

- 链接: 
[Mac High Sierra 10.13.6  ](https://pan.baidu.com/s/11sEPHsGPl08FXWiHFSRgIQ)
- 密码: `5aui` 


# Windows环境

需要如下步骤:

1. 下载 并且安装 [Transmac](https://transmac.en.softonic.com) 软件
2. 格式化U盘
![tranmac01](/images/tranmac01.png)
3. 刻录镜像
![tranmac02](/images/tranmac02.png)
![tranmac03](/images/tranmac03.png)

# Mac环境

比较麻烦, 直接刻录 dmg 镜像, U 盘不会生效, 所以需要先将 dmg 转化成 ISO 镜像, 在刻录 ISO 镜像

1. 打开 `Launchpad` , 打开 `磁盘工具`
2. 转换镜像
    ![macdisk01](/images/macdisk01.png)
    选择下载的 `XXX.dmg` 镜像
    ![macdisk02](/images/macdisk02.png)
    开始转化, 转化完成之后, 会有一个新的 `MacOS.iso` 文件
3. 将 ISO 镜像刻录进 U 盘
- 查看 U盘 所在的 `位置` , 比如我的是 `/dev/disk02`
```
diskutil list
```
- 使用`dd` 刻录U盘
```
sudo dd  if=MacOS.iso  of=/dev/disk02 bs=1m ; sync
```

# Linux 环境

archlinux 平台使用  `acetoneiso2` , 其他发行版可以 使用 `dmg2iso`, 命令也是大同小异.

1. 将 `dmg` 镜像文件转化成 `iso` 文件
```bash
dmg2iso 源文件  xxx.iso
```
2. 查看 U盘 所在的 `位置` , 比如我的是 `/dev/sdc`
```bash
fdisk  -l
```
3. 查看使用 `dd` 命令刻录镜像
```bash
dd  if=MacOS.iso of=/dev/sdc bs=1m ;sync
```