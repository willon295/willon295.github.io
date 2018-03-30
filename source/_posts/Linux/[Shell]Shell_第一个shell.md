---
title: [Shell]Shell-第一个shell
tags:
  - shell
  - 学习
categories:
  - Linux
  - shell
date: 2016-06-13 12:22:33
---

## 第一个shell

首先当然是 vi  一个文件 比如  vi  test.sh写入以下代码：

	 #!/bin/bash
	echo "Hello World !"
wq保存；
<div>"<span style="color: #ff0000;">#!</span>" 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种Shell。
echo命令用于向窗口输出文本。


### 运行脚本两种方法

1、 chmod  -x  test.sh ;  sh  test.sh (当然也可以使bash ，sh是bash的子集)
2、./test.sh 这种方法是将他当成可执行文件直接执行。
这个时候就会看到系统输出了 “hello world”
