---
title: Shell-第一个shell
tags:
  - shell
  - 学习
id: 68
categories:
  - Linux
  - shell
date: 2016-12-17 23:58:12
---

## 第一个shell

首先当然是 vi  一个文件 比如  vi  test.sh写入以下代码：
> #!/bin/bash> 
> echo "Hello World !"
wq保存；
<div>"<span style="color: #ff0000;">#!</span>" 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种Shell。</div>
<div>echo命令用于向窗口输出文本。</div>
<div></div>

### 运行脚本两种方法

<div>1、 chmod  -x  test.sh ;  sh  test.sh (当然也可以使bash ，sh是bash的子集)</div>
<div>2、./test.sh 这种方法是将他当成可执行文件直接执行。</div>
<div>这个时候就会看到系统输出了 “hello world”</div>
<div></div>