---
title: '[Linux]ArchLinux_Xfce4装机指南 '
category: Linux
tag: Linux
date: 2018-07-26 00:00:00
---



官网教程有太多坑，比如说操作到某一步，只告诉你要干什么，具体怎么做不提，或者教程在其他网页某个角落。有些步骤是必须的，但是官网说 不需要或者压根不提。所以自己记笔记，避开不必要的坑。

# 准备工作


## 非UEFI启动分区

分区、格式化分区

```bash
分区         大小   文件格式
/dev/sda1   250G  ext4
/dev/sda2 * 300M  EFI/FAT32 
```




## UEFI 启动分区

格式化 U 盘, 分出两个区, 一个EFI,一个Linux文件系统 , `*`  标识可启动

```
分区         大小   文件格式
/dev/sda1   250G  ext4
/dev/sda2 * 300M  EFI/FAT32 
```



## 其他

1. 同步时间（可选）

   ```bash
    timedatectl set-ntp true
   ```
> 如果时间与实际时间有差异, 编辑 `/etc/systemd/timesyncd.conf` 文件
```bash
[Time]
NTP=0.arch.pool.ntp.org 1.arch.pool.ntp.org 2.arch.pool.ntp.org 3.arch.pool.ntp.org
FallbackNTP=0.pool.ntp.org 1.pool.ntp.org 0.fr.pool.ntp.org
```

2. 挂载分区

   ```bash
   mount /dev/sda1  /mnt
   #如果有其他分区同理挂载到相应的分区
   ```



# 安装



## 基础安装



1. 选择镜像源
   编辑   `/etc/pacman.d/mirrorlist` ,  将  `cn`  的某个/全部注释 `#` 删除

2. 安装基础系统

   ```bash
   pacstrap /mnt base
   ```

3. 生成 `Fstab` 

   ```bash
    genfstab -U /mnt >> /mnt/etc/fstab
   ```

4. 进入新的系统

   ```bash
   arch-chroot /mnt
   ```

5. 设置时区

   ```bash
   ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
   ```

6. 生成 `/etc/adjtime`

   ```bash
   hwclock --systohc 
   ```

7. 安装 vim

   ```bash
   pacman -S vim bash-completion
   ```

8. 本地化

   ```bash
   
   cat >  /etc/locale.gen << EOF
   en_US.UTF-8 UTF-8
   zh_CN.UTF-8 UTF-8
   EOF
   
   locale-gen
   
   echo "LANG=en_US.UTF-8"  > /etc/locale.conf
   ```

9. 修改主机名, hosts映射

   ```bash
   echo "willon" > /etc/hostname
   
   cat >  /etc/hosts << EOF
   127.0.0.1	localhost
   ::1		localhost
   EOF
   ```

10. 修改 root 密码

    ```
    passwd
    ```


## 设置网络

1. 安装必要软件

   ```bash
   pacman -S networkmanager  network-manager-applet net iw wpa_supplicant dialog
   
   ```

2. 开机自启

   ```bash
   systemctl enable  dhcpcd
   systemctl enable  NetworkManager
   ```

## 引导相关



## 非 UEFI

1. Initramfs、官网说可以不用，但是实际上要这一步

   ```bash
   mkinitcpio -p linux
   ```

2. 安装 grub 引导

   ```bash
   pacman -S grub
   grub-install --force /dev/sda
   grub-mkconfig -o /boot/grub/grub.cfg   
   ```

3. 退出，重启进入新的系统



## EFI



1. 挂载并且写入引导

```bash
pacman -S grub efibootmgr dosfstools os-prober mtools
mkdir /boot/EFI
mount /dev/sda2 /boot/EFI
grub-install --target=x86_64-efi  --bootloader-id=grub_uefi --recheck
```

2. 生成配置文件

```
grub-mkconfig -o /boot/grub/grub.cfg
```





# 零碎工作

1. 添加用户组，用户

   ```bash
   groupadd willon
   useradd -g willon -d /home/willon -s /bin/bash -m willon
   passwd willon
   ```

2. 安装中文字体、输入法

   ```bash
   pacman -S wqy-microhei wqy-zenhei
   pacman -S fcitx fctix-libpinyin fcitx-configtool
   ```

3. 修改 `/etc/profile` 

   ```bash
   export GTK_IM_MODULE=fcitx
   export QT_IM_MODULE=fcitx
   export XMODIFIERS="@im=fcitx"
   PS1='\[\e[1;36m\]\u@\h:\[\e[32m\]\w\[\e[36m\] > \[\e[m'
   alias vi='vim'
   alias ls='ls --color=auto'
   alias ll='ls -al'
   export TZ='CST-8'
   ```

4. 配置声音

   ```properties
   pacman -S alsa-utils
   vim  /lib/systemd/system/alsa-state.service
   #写入
   [Install] 
   WantedBy=multi-user.target
   
   #设置开机自启
   systemctl start alsa-state.service
   systemctl enable alsa-state.service
   
   #安装pulseaudio
   pacman -S pulseaudio
   ```

5. 启用国内源、multilib， 修改 `/etc/pacman.conf`

   ```properties
   [multilib] 
   Include = /etc/pacman.d/mirrorlist
   [archlinuxcn]
   SigLevel = Optional TrustAll
   Server =  http://mirror.tuna.tsinghua.edu.cn/archlinuxcn/$arch
   ```

6. 同步仓库

   ```
   pacman  -Sy
   ```


# 桌面环境



1. `Xorg` [必装]

   ```
   pacman -S xorg
   ```

2. `Xfce4` 

   ```
   pacman -S xfce4 xfce4-goodies
   ```

3. 登陆管理器

   ```bash
    pacman -S lightdm lightdm-gtk-greeter lightdm-gtk-greeter-settings
   ```

4. 启动登陆管理器

   ```bash
   systemctl start lightdm.service
   ```

5. 此时会进入图形界面，将其设置为开机自启动

   ```bash
   systemctl enable lightdm.service
   ```

6. 锁屏软件, 解压软件

   ```bash
   pacman -S xscreensaver
   ```

### 普通用户无法进入桌面环境?

将 /root/.Xauthority  文件拷贝到 用户目录， 更改用户组和拥有者

```bash
cp /root/.Xauthority  /home/willon/
cd  /home/willon
chown willon .Xauthority
chgrp willon .Xauthority
reboot
```



# 开机优化 

1. 检查无效、删除服务

   ```bash
   #检查无效的服务
   systemctl --all | grep not-found
   #删除无效的服务
   systemctl mask XXX
   ```

2. 关闭开机延迟

   ```
   echo  GRUB_FORCE_HIDDEN_MENU='true' >>  /etc/default/grub
   ```

3. 将文件 [31_hold_shift](https://gist.github.com/Jetchisel/10407606)  (开机按住shift进入启动菜单，否则直接跳过)   放入 `/etc/grub.d`  , 给其可执行权限
   ```
   mv 31_hold_shift /etc/grub.d/
   chmod a+x 31_hold_shift
   ```

   31_hold_shift文件的内容：
   ```bash
   #! /bin/sh
   set -e
   prefix="/usr"
   exec_prefix="${prefix}"
   datarootdir="${prefix}/share"
   
   export TEXTDOMAIN=grub
   export TEXTDOMAINDIR="${datarootdir}/locale"
   source "${datarootdir}/grub/grub-mkconfig_lib"
   
   found_other_os=
   
   make_timeout () {
   
     if [ "x${GRUB_FORCE_HIDDEN_MENU}" = "xtrue" ] ; then 
       if [ "x${1}" != "x" ] ; then
         if [ "x${GRUB_HIDDEN_TIMEOUT_QUIET}" = "xtrue" ] ; then
       verbose=
         else
       verbose=" --verbose"
         fi
   
         if [ "x${1}" = "x0" ] ; then
       cat <<EOF
   if [ "x\${timeout}" != "x-1" ]; then
     if keystatus; then
       if keystatus --shift; then
         set timeout=-1
       else
         set timeout=0
       fi
     else
       if sleep$verbose --interruptible 3 ; then
         set timeout=0
       fi
     fi
   fi
   EOF
         else
       cat << EOF
   if [ "x\${timeout}" != "x-1" ]; then
     if sleep$verbose --interruptible ${GRUB_HIDDEN_TIMEOUT} ; then
       set timeout=0
     fi
   fi
   EOF
         fi
       fi
     fi
   }
   
   adjust_timeout () {
     if [ "x$GRUB_BUTTON_CMOS_ADDRESS" != "x" ]; then
       cat <<EOF
   if cmostest $GRUB_BUTTON_CMOS_ADDRESS ; then
   EOF
       make_timeout "${GRUB_HIDDEN_TIMEOUT_BUTTON}" "${GRUB_TIMEOUT_BUTTON}"
       echo else
       make_timeout "${GRUB_HIDDEN_TIMEOUT}" "${GRUB_TIMEOUT}"
       echo fi
     else
       make_timeout "${GRUB_HIDDEN_TIMEOUT}" "${GRUB_TIMEOUT}"
     fi
   }
     adjust_timeout
   
       cat <<EOF
   if [ "x\${timeout}" != "x-1" ]; then
     if keystatus; then
       if keystatus --shift; then
         set timeout=-1
       else
         set timeout=0
       fi
     else
       if sleep$verbose --interruptible 3 ; then
         set timeout=0
       fi
     fi
   fi
   EOF
   ```




4. 重新制作引导

   ```
   grub-mkconfig  -o /boot/grub/grub.cfg
   ```




# 其他软件

1. TIM 、Wechat 安装 `deepin.com.XXXX`  

2. Mariadb，只是下载好软件包，并没有完整安装，需要手动安装

   ```bash
   mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
   ```

   MySQL 默认禁用客户端自动补全功能。要在整个系统中启用它，编辑 `/etc/mysql/my.cnf`，将 `no-auto-rehash` 替换为 `auto-rehash`。下次客户端启动时就会启用自动补全。

3. WPS-Office: 官网 [http://linux.wps.cn](http://linux.wps.cn)



## 自动挂载硬盘,解压缩软件

```bash
pacman -S  gvfs  ntfs-3g    engrampa
```



