---
title: '[Shell]简单系统菜单命令'
tag: shell
categories:
  - Linux
  - shell
date: 2016-06-13 12:22:33
---

# 代码

```
#! /bin/bash
menu()
{
more <<EOF
########################
(1)重启
(2)关机
(3)显示系统时间
(4)修改系统时间
(5)退出
########################
请选择:
EOF

read choice
case  $choice in
    1) reboot ;;
    2) shutdown -h now ;;
    3) date +"%Y-%m-%d %H:%M:%S" ;;
    4) read  -p "输入一个时间:" mydate
         echo "当前时间修改为："$mydate ;;
    5) exit 0
esac
}
while true
do
    menu
done
```

# 知识点

1. EOF 使用,重定向
2. case 语句
3. while 语句
4. 函数定义以及调用
5. 基本命令 read ,more
