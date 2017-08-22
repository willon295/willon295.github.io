---
title: '[Linux]Linux环境制作双系统启动U盘'
tag: Linux
category: Linux
---


# 主要目的

前段时间非常痛恨Windows，于是果断把电脑装成debian单系统。问题来了，小胖子说报了office等级考试，总不能在Linux教人家操作吧。仔细想想还是有必要装个精简一点的Windows，以备不时之需。

**目的**：Linux下制作WinPE和,Ubuntu16，（CDlinux可选）二合一启动U盘，这样一个U盘可以实现装Windows和Linux双系统，装Linux时也不用刻录


## 准备工作

1. `grub4dos.7Z` ：[点击下载](http://grub4dos.chenall.net/downloads/grub4dos-0.4.6a-2017-06-25/)用于写入引导

2. `TouchPE.iso`:  WindowsPE镜像，用于重装Windows

3. `Ubuntu16.04.iso`： Ubuntu16镜像，用于装Linux

## 开始动手

1. 将 `grubdos.7Z` 解压,文件夹满权限
	```
	sudo chmod  -R 777 grubdosXXX
	```
2. 以`FAT32`格式化U盘
3. 使用 `df` 或 `fdisk` 查看U盘，我的U盘为 `/dev/sdc4`
4. cd到grub4dos目录，将其安装到U盘
	```
	sudo ./bootlace.com  --floppy  /dev/sdc4
	```
5. 把 `grub4dos` 中的 `grldr` 和 `menu.lst` 复制到 U 盘根目录
6. 把`ubuntu16.iso`镜像中 `casper` 下的 `vmlinuz.efi` 和 `initrd.lz` 复制到 U 盘根目录或子目录中
7. 把`TouchPE.iso`复制到 U 盘根目录
8. 编辑 `menu.lst`文件，制作启动菜单

	```
	#WindowsPE启动项
	title WindowsPE
	find --set-root --ignore-floppies --ignore-cd /TouchPE.iso
	map /TouchPE.iso (hd32)
	map --hook
	chainloader (hd32)
	boot
	savedefault --wait=2

	#CDLinux启动项（可选）
	title CDLinux
	find --set-root --ignore-floppies --ignore-cd /CDlinux/bzImage
	kernel /CDlinux/bzImage CDL_DEV=LABEL=CDLINUX CDL_LANG=zh_CN.UTF-8
	initrd /CDlinux/initrd
	boot
	savedefault --wait=2

	#Ubuntu16启动项
	title Ubuntu16
	kernel /vmlinuz.efi boot=casper iso-scan/filename=/ubuntu16.iso locale=zh_CN.UTF-8
	initrd  /initrd.lz
	boot
	savedefault --wait=2

	title reboot 
	reboot

	title halt 
	halt


	#In the end, font lines for unicode chars in unifont.hex format.
	#It should include all unicode chars used in the above menu code.
	#Surely normal ASCII chars are not necessary to be included here.

	5173:10100810082000003FF8010001000100FFFE010002800280044008203018C006
	542F:010000801FFC1004100410041FFC10001000100017FC24042404440487FC0404
	673A:100011F011101110FD10111031103910551055109110111211121212120E1400
	91CD:001000F83F000100FFFE01001FF011101FF011101FF001003FF80100FFFE0000

	```





