# Manjaro 装机指南

正常装机， 装机完成之后



1. 使用国内源

   ```
   cat  > /etc/pacman.d/mirrorlist << EOF
   Server=http://mirrors.tuna.tsinghua.edu.cn/manjaro/stable/$repo/$arch
   Server = https://mirrors.ustc.edu.cn/manjaro/stable/$repo/$arch     
   Server = https://mirrors.zju.edu.cn/manjaro/stable/$repo/$arch
   EOF
   
   pacman -Sy
   pacman -S archlinux-keyring --noconfirm
   
   cat  >> /etc/pacman.conf  <<EOF
   [archlinuxcn]
	SigLevel = Optional TrustedOnly
	Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
   EOF
   
   pacman -Sy
   ```

2. 删除无用软件
```
pacman -Rsc catfish  galculator-gtk2  gimp menulibre xfce4-notes-plugin xfce4-screenshooter xfce4-sensors-plugin xfce4-taskmanager xfburn libreoffice-still steam-manjaro  steam-devices hexchat ms-office-online  pidgin    thunderbird  audacious audacious-plugins qpdf qpdfview  gparted manjaro-hello  xfce4-cpufreq-plugin xfce4-smartbookmark-plugin   xfce4-cpugraph-plugin  xfce4-weather-plugin xfce4-whiskermenu-plugin-gtk3  system-config-printer gcolor2 pamac manjaro-settings-manager adapta-maia-theme xfce4-mailwatch-plugin manjaro-hotfixes  manjaro-release  manjaro-browser-settings  manjaro-firmware  manjaro-keyring  manjaro-pulse  manjaro-alsa  manjaro-system  manjaro-wallpapers-18.0  --noconfirm
```
3. 切换中文环境、安装中文字体、安装中文输入法
```bash
pacman  -S wqy-microhei  fcitx fcitx-libpinyin fcitx-gtk3 fcitx-configtool --noconfirm

cat >> /etc/profile <<EOF
export XMODIFIERS="@im=fcitx"
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
EOF
```
4. 安装dock
```
pacman -S  plank --noconfirm
mv   /usr/share/applications/plank.desktop  /etc/xdg/autostart/
```