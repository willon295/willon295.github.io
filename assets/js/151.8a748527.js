(window.webpackJsonp=window.webpackJsonp||[]).push([[151],{509:function(s,a,t){"use strict";t.r(a);var n=t(13),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"准备工作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#准备工作"}},[s._v("#")]),s._v(" 准备工作")]),s._v(" "),t("ol",[t("li",[s._v("将U盘格式化成 "),t("code",[s._v("FAT32")]),s._v(" 格式")])]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("fdisk -l   //查看U盘的分区=> 比如  sdc1\nmkfs.vfat  /dev/sdc1\n")])])]),t("ol",{attrs:{start:"2"}},[t("li",[s._v("将Grub2 安装到 U 盘, 安装完成之后多出一个 "),t("code",[s._v("boot")]),s._v(" 文件夹")])]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("grub2-install --force --no-floppy --root-directory=/run/media/willon/CL  /dev/sdc\n\n")])])]),t("ul",[t("li",[t("code",[s._v("/run/media/willon/CL")]),s._v(" 是 U 盘挂载点")]),s._v(" "),t("li",[t("code",[s._v("/dev/sdc")]),s._v(" 是 U 盘设备")])]),s._v(" "),t("ol",{attrs:{start:"3"}},[t("li",[s._v("查看 "),t("code",[s._v("UUID")])])]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("ls -l /dev/disk/by-uuid //比如我的 0934-7576\n")])])]),t("ol",{attrs:{start:"4"}},[t("li",[s._v("下载可用的 Winpe ISO 和 Fedora ISO")]),s._v(" "),t("li",[s._v("下载WinPE启动需要的依赖文件 "),t("a",{attrs:{href:"https://pan.baidu.com/s/1c0x63XQ",target:"_blank",rel:"noopener noreferrer"}},[s._v("memdisk"),t("OutboundLink")],1)])]),s._v(" "),t("h1",{attrs:{id:"grub-cfg"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#grub-cfg"}},[s._v("#")]),s._v(" grub.cfg")]),s._v(" "),t("p",[s._v("该文件要手动创建，位于 "),t("code",[s._v("/boot/grub2/")]),s._v(" 目录")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("timeout")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("\ninsmod fat\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("default")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\nloadfont /boot/grub2/fonts/unicode.pf2\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("gfxpayload")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("keep\ninsmod gfxterm\ninsmod vbe\ninsmod loopback\ninsmod iso9660\nterminal_output gfxterm\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("USBUUID")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"8631-511C"')]),s._v("\n\n\nmenuentry "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Windows PE'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        linux16 /iso/win/memdisk iso raw\n        "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Loading PE...'")]),s._v("\n        initrd16 /iso/win/winpe.iso\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n\nmenuentry "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Fedora 26 X86_64'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        insmod fat\n\t    insmod loopback\n\t\t"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("isofile")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/iso/fedora/Fedora-Xfce-Live-x86_64-26-1.5.iso\n        search --no-floppy --fs-uuid "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--set")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("root "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${USBUUID}")]),s._v("\n\t\tloopback loop   "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$isofile")]),s._v("\n\t\t"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("root")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("loop"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n        linux "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("loop"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/isolinux/vmlinuz iso-scan/filename"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$isofile")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("root")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("live:LABEL"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("Fedora-Xfce-Live-26-1-5 "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("rootfstype")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("auto  ro rd.live.image quiet\n        initrd "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("loop"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/isolinux/initrd.img\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n\nmenuentry "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Arch Linux  x86_64"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--class")]),s._v(" arch "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("isoname")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"archlinux-2018.07.01-x86_64.iso"')]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("isofile")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/iso/arch/'),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${isoname}")]),s._v('"')]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Using '),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("${isoname}")]),s._v('..."')]),s._v("\n  loopback loop "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$isofile")]),s._v("\n  linux "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("loop"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/arch/boot/x86_64/vmlinuz "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("img_label")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("CC  "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("img_loop")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$isofile")]),s._v("\n  initrd "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("loop"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/arch/boot/intel_ucode.img "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("loop"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/arch/boot/x86_64/archiso.img\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nmenuentry "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Reboot"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("reboot")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\nmenuentry "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Shotdown"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("halt")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);