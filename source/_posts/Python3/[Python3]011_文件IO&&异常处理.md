---
title: '[Python3]011_文件IO&&异常处理'
tags:
  - python3
id: 330
categories:
  - Python3
date: 2017-04-16 20:58:53
---

首先最简单的是交互环境下键盘输入

`raw_input('请输入：')`

当执行到这一行的时候，系统会进入等待状态。用户输入并且回车之后结束等待，继续执行

### 文件

先最好申明编码格式

`# -*- coding: UTF-8 -*-`

**1、打开和关闭文件**

举个栗子

    # -*- coding: UTF-8 -*-
    # 打开, wb为打开模式（可写，二进制）
    fo = open("foo.txt", "wb")
    print("文件名:",fo.name)
    print("是否已关闭:",fo.closed)
    print("访问模式:",fo.mode)
    print("末尾是否强制加空格:",fo.softspace)
    #关闭电影
    fo.close()
    `</pre>

    运行结果

    <pre>`文件名:  foo.txt
    是否已关闭 :  False
    访问模式 :  wb
    末尾是否强制加空格 :  0
    `</pre>

    **2、write()方法**

    举个栗子

    <pre>`# -*- coding: UTF-8 -*-

    # 打开一个文件
    # w+:写权限，不存在则创建该文件
    fo = open("foo.txt", "w+")
    fo.write( "hello\nworld!");

    # 关闭打开的文件
    fo.close()
    `</pre>

    **3、read()方法**

    `fileObject.read([num])`: num为读取的总字节数，不传则读到最后一个

    举个栗子

    <pre>`# -*- coding: UTF-8 -*-

    # 打开一个文件,r权限
    fo = open("foo.txt", "r")

    #读取文件
    str1 = fo.read()
    print(str1)

    # 关闭打开的文件
    fo.close()
    `</pre>

    运行结果

    <pre>`hello
    world!
    