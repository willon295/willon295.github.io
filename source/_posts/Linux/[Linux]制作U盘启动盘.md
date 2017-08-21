---
title: '[Linux]制作启动U盘'
tag: Linux
id: 110
---

Linux下制作U盘启动盘

# 大概步骤

1. 格式化U盘,终端输入 `df`  命令查看自己的U盘，`/dev/sdc4`

```
#运行结果
#文件系统           1K-块     已用     可用 已用% 挂载点
#udev             1942136        0  1942136    0% /dev
#tmpfs             392880    11328   381552    3% /run
#/dev/sda1      111234848 10486740 95074588   10% /
#tmpfs            1964388   175320  1789068    9% /dev/shm
#tmpfs               5120        4     5116    1% /run/lock
#tmpfs            1964388        0  1964388    0% /sys/fs/cgroup
#tmpfs             392880      100   392780    1% /run/user/1000
#tmpfs             392880        8   392872    1% /run/user/108
#/dev/sdc4       30247680  1551680 28696000    6% /media/willon/Ubuntu 16.0

```

2. 卸载U盘
```
sudo umount /dev/sdc4
```
3. 写入镜像

```
sudo dd if=镜像全路径   of=/dev/sdc4
#例如 sudo dd if=/home/ubuntu-16.04-beta2-desktop-amd64.iso  of=/dev/sdc4
```

> 注意：of后面的设备一定需要注意，选错了可能会造成不可逆的损失，制作时看清你的U盘对应的设备
