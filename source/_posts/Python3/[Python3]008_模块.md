---
title: '[Python3]008_模块'
tags:
  - python3
id: 326
categories:
  - Python3
date: 2017-04-16 20:57:28
---

模块其实就是一个有一个的 `.py` 文件，将一些常用的函数工具进行封装，其他模块使用的时候秩序使用关键字`import` 导入即可

## 举个栗子

模块一、

    # Filename: support.py

    #这是要引用的模块   
    def test():
        print("hello world")
     

    模块二、

     # Filename: demo.py

    import support
    #调用函数
    support.test()
     

    运行结果

     hello world
     

## 系统内置

python要使用某些功能，需要系统的自带一些模块

### time

这个模块可以用来获取和处理一些时间的数据

    举个栗子

     #获取格式化的本地时间
    import time
    date=time.localtime()
    currenttime=time.strftime('%Y-%m-%d %H:%M:%S',date)
    print(dates)
     

    #运行结果

    2017-03-26 22：13：04


### OS
这个模块用来操作系统上的一些东西。

#### `os.chmod(path,mod)`
- path: 文件夹或文件目录
- mod: 权限

| 参数 | 说明 |
|-----|------|
|stat.S_IXOTH | 其他用户有执行权0o001|
|stat.S_IWOTH |其他用户有写权限0o002
|stat.S_IROTH |其他用户有读权限0o004|
|stat.S_IRWXO |其他用户有全部权限(权限掩码)0o007|
|stat.S_IXGRP|组用户有执行权限0o010|
|stat.S_IWGRP|组用户有写权限0o020|
|stat.S_IRGRP|组用户有读权限0o040|
|stat.S_IRWXG|组用户有全部权限(权限掩码)0o070|
|stat.S_IXUSR|拥有者具有执行权限0o100|
|stat.S_IWUSR|拥有者具有写权限0o200|
|stat.S_IRUSR|拥有者具有读权限0o400|
|stat.S_IRWXU|拥有者有全部权限(权限掩码)0o700|
|stat.S_ISVTX|目录里文件目录只有拥有者才可删除更改0o1000|
|stat.S_ISGID|执行此文件其进程有效组为文件所在组0o2000|
|stat.S_ISUID|执行此文件其进程有效用户为文件所有者0o4000|
|stat.S_IREAD|windows下设为只读|
|stat.S_IWRITE|windows下取消只读|


#### `os.close(fo)`

     #关闭文件
    import os, sys

    # 打开文件
    fd = os.open( "foo.txt", os.O_RDWR|os.O_CREAT )

    # 写入字符串
    os.write(fd, "This is test")

    #关闭文件
    os.close( fd )

    print ("关闭文件成功!!")
     

#### `os.read(fd,num)`

- fd: 打开的文件对象
- num: 读取的字节数
     

    #举个栗子

    import os, sys
    # 打开文件
    fd = os.open("foo.txt",os.O_RDWR)

    # 读取文本
    str1 = os.read(fd,12)
    print (str1)

    # 关闭文件
    os.close(fd)
    print ("关闭文件成功!）
     

    #运行结果

    This is test
    关闭文件成功!

#### `os.rename(old,new)` ：重命名

#### `os.remove()`:删除

更多可以参考文档...