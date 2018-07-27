---
title: '[Linux]Grub2制作多启动U盘.md'
tag: Linux
category: Linux
date: 2016-06-13 12:23:33
---


# 准备工作

1. 将U盘格式化成 `FAT32` 格式
```
fdisk -l   //查看U盘的分区=> 比如  sdc1
mkfs.vfat  /dev/sdc1
```
2. 将Grub2 安装到 U 盘, 安装完成之后多出一个 `boot` 文件夹
```
grub2-install --force --no-floppy --root-directory=/run/media/willon/CL  /dev/sdc

```
- `/run/media/willon/CL ` 是 U 盘挂载点
- `/dev/sdc` 是 U 盘设备
3. 查看 `UUID`
```
ls -l /dev/disk/by-uuid //比如我的 0934-7576
```
4. 下载可用的 Winpe ISO 和 Fedora ISO
5. 下载WinPE启动需要的依赖文件 [memdisk](https://pan.baidu.com/s/1c0x63XQ)

# grub.cfg

该文件要手动创建，位于 `/boot/grub2/` 目录

```bash
set timeout=10
insmod fat
set default=0
loadfont /boot/grub2/fonts/unicode.pf2
set gfxpayload=keep
insmod gfxterm
insmod vbe
insmod loopback
insmod iso9660
terminal_output gfxterm
set USBUUID="8631-511C"


menuentry 'Windows PE'{
        linux16 /iso/win/memdisk iso raw
        echo 'Loading PE...'
        initrd16 /iso/win/winpe.iso
}


menuentry 'Fedora 26 X86_64' {
        insmod fat
	    insmod loopback
		set isofile=/iso/fedora/Fedora-Xfce-Live-x86_64-26-1.5.iso
        search --no-floppy --fs-uuid --set=root ${USBUUID}
		loopback loop   $isofile
		set root=(loop)
        linux (loop)/isolinux/vmlinuz iso-scan/filename=$isofile root=live:LABEL=Fedora-Xfce-Live-26-1-5 rootfstype=auto  ro rd.live.image quiet
        initrd (loop)/isolinux/initrd.img

}


menuentry "Arch Linux  x86_64" --class arch {
  set isoname="archlinux-2018.07.01-x86_64.iso"
  set isofile="/iso/arch/${isoname}"
  echo "Using ${isoname}..."
  loopback loop $isofile
  linux (loop)/arch/boot/x86_64/vmlinuz img_label=CC  img_loop=$isofile
  initrd (loop)/arch/boot/intel_ucode.img (loop)/arch/boot/x86_64/archiso.img
}

menuentry "Reboot"{
    reboot
}
menuentry "Shotdown"{
    halt
}

```
