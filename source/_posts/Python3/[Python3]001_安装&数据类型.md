---
title: '[Python3]001_安装&数据类型'
tags:
  - python3
id: 310
categories:
  - Python3
date: 2017-04-16 20:49:15
---

Pyton 是一门解释型的语言，代码量少，速度速度比Java，c慢。Python 适合脚本、后台开发。不适合移动应用的开发

### Python安装

Windows下无疑以下几件事：

1.  安装程序

    在官方网站[http://www.python.org/](http://www.python.org/) 下载程序，安装、记住安装目录</p>
2.  配置环境

    在系统环境变量中添加 `Path` 路径，路径填写 `python.exe`

3.  调试

    在`cmd`输入命令 `python` ，出现`python`提示并且进入python交互环境即成功

### Hello World

1.  交互环境下

	直接写入`python`语句:

    	print "Hello World"

2. 脚本文件

    新建 `Hello.py`文件，用高级的文本编辑器 写入 python语句，在交互环境中

	    python  Hello.py
	    #运行结果Hello World


### 使用帮助

`python` 的内置方法`help()` 可以简单的查看帮助文档

举个栗子

	#查看list类型的 pop()方法
    help(list.pop)

    #简单查看数据类型
	a = '123'
    b = 123
    type(a)
    type(b)
    #运行结果：
	#<class str >,<class int>

### 数据类型

1.  布尔型
	- True
	- False
    `注意大小写` ，布尔值可以用`and`, `or`, `not` 逻辑运算得到
2.  整数浮点数
    整数 与 浮点数运算结果为浮点数
3.  空值

        *   None ：与 0 的意义不同
4.  字符串
    字符串以 `''` ,  `" "`括起来的任意文本，如 `" Hello World"`
	举个栗子
	
		print(2.5+10/4) 
	    print(2.5+10.0/4)
	    print("字符串")
	    print(10&gt;9)
	
	    #运行结果
		#4.5
	    #5.0
	    #字符串
	    #True


### 注释

python中的注释 `#` 开头，如

	#这是注释Demo
    print "Hello World"
    #print  100+200

    #运行结果
    Hello World
    