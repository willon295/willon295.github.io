---
title: '[Fedora]00_写个装机脚本'
category: Fedora
tag: Fedora
date: 2018-07-07 00:00:00
---

# 起因

用了几年的Fedora25 确实有点老了，决定换 Fedora26（装完就后悔了） ，但是：

1. 原生界面丑
2. 我不用的软件多
3. 输入法用不惯
4. 反正很多细节不满意
5. 每次装机删除东西装东西太麻烦

# 记笔记

## 软件

1. `chrome` 、 `Idea`  写程序必备
2. `kchmviewer` 阅读API （rpmfusion）
3. `smplayer`  视频播放器 （rpmfusion）
4. `Tim`  、 `Wechat`
5.  `fcitx-pinyin` 输入法，主要是稳定，sogou不稳定
6. `VirtualBox` : 建N多个虚拟机用 (KVM的IO没有它快)
7. `Wps-office` ： 办公 ,终于更新了 ，[官网](http://linux.wps.cn/)。
8. `xdm` :    多线程下载工具，集成 Chrome插件
9. `Geany` 、 `Typora` : 写md笔记用
10. `Jmeter`： qps测试工具

## 自定义快捷键

1. `Super+W`: 浏览器
2. `Super+E`: 文件管理器
3. `Super+T`: 终端
4. `Super+Left`: 分屏靠左
5. `Super+Right`: 分屏靠右
6. `Super+UP`: 窗口最大化
7. `Super+PageUP`: 窗口靠左上
8. `Super+PageDown`: 窗口靠右上
9. `Super+Down`: 窗口靠左下
10 `Ctrl+Alt+A`: 选择截屏

# 写个小脚本

用于删除无用软件、装chrome、装numix主题、装fcitx输入法、换mirror、关firewall、se

```bash
#!/bin/bash

##delete useless 
echo "Delte useless software..."
yum remove abiword \
asunder \
catfish \
claws-mail \
gnome-disks \
gnome-disk-utility.x86_64 \
galculator \
gnumeric \
pidgin \
pragha \
xfburn \
yumex-dnf \
transmission-* \
leafpad \
gparted \
gnome-help \
gnome-abrt \
xfce4-about \
xfce4-clipman \
xfce4-clipman-plugin.x86_64 \
xfce4-clipman-settings \
xfce4-cpugraph-plugin.x86_64 \
xfce4-eyes-plugin.x86_64\
xfce4-mailwatch-plugin.x86_64 \
xfce4-fsguard-plugin.x86_64 \
xfce4-whiskermenu-plugin.x86_64 \
xfce4-weather-plugin.x86_64 \
xfce4-xkb-plugin.x86_64 \
xfce4-systemload-plugin.x86_64 \
xfce4-battery-plugin.x86_64 \
xfce4-popup-clipman \
xfce4-popup-clipman-actions \
xfce4-popup-directorymenu \
xfce4-popup-whiskermenu \
xfce4-taskmanager -y
##change mirrors
echo "change mirror to aliyun."
rm -rf /etc/yum.repos.d/*
wget -O /etc/yum.repos.d/fedora.repo http://mirrors.aliyun.com/repo/fedora.repo
wget -O /etc/yum.repos.d/fedora-updates.repo http://mirrors.aliyun.com/repo/fedora-updates.repo
yum clean all
yum makecache
##install chrome
echo "Install chrome..."
yum install redhat-lsb-core libappindicator-gtk3 -y
wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
rpm -ivh google-chrome-stable_current_x86_64.rpm
##remove firefox
yum remove  firefox.x86_64 -y
rm -rf  /usr/lib64/firefox
##install numix theme
yum install numix-* -y
##diable firewall and selinux
systemctl  stop  firewalld.service 
systemctl  disable  firewalld.service
cat > /etc/selinux/config  << EOF
SELINUX=disabled
SELINUXTYPE=targeted
EOF
##change input method
yum remove  ibus* -y
yum install fcitx fcitx-pinyin fcitx-configtools -y
echo "End!"
```
