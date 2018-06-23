---
title: '[Linux]个人PC装机'
category: Linux
tag: Linux
date: 2017-10-11 12:00:00
---

# 概览

1. 系统： Fedora25
2. 桌面： xfce4
3. 主题&图标： numix
4. 软件： Chrome, IDEA2016-3, WPS ， SmPlayer, SecureCRT，Geany(文本编辑器),Axel(多线程下载)，Wechat、QQ



# 各分区介绍

1. `/` ： 根分区， 一般 10 --18G, 足够，用于存储系统文件
2. `/boot` ,启动文件所在目录， 1 G
3. `swap` 交换分区，当内存不够使用时生效，充当虚拟内存。一般分内存大小即可，但是如果电脑内存在8G以上，完全不用分Swap。
4. `/home`：主要功能分区

# 方案

|   分区  | 大小    |
|-----|-----|
| /  |   15G  |
| /boot |   1G |
| /home | 剩余空间，尽可能大 |
| /swap   |   视情况而定，内存大则不用  |

> /home 独立分区主要是后期重装系统时，重要的软件文件可以不用备份，重新挂载即可



