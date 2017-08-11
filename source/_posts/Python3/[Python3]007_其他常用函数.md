---
title: '[Python3]007_其他常用函数'
tags:
  - python3
id: 73
categories:
  - Python3
date: 2017-04-16 20:56:32
---

### 字符处理

1、`str.capitalize()`

用于字体转化,每个单词首字母大写

```
    str="hello world"
    print(str.capitalize())
    #输出 Hello World
```

2、`str.replace()`

```
	#字符替换

    str="hello world"
    str.replace("o",'888')
    #输出 hell88 w88rld
```


3、`str.split()`

```
	#用于字符切割
    ip='192.168.1.120'
    ip.split('.')
    #输出 ['192', '167', '1', '123']
    ip.split('.',2) 
    #字符切割次，结果是
    #['192', '167', '1.123']
```

## 序列处理

### range()函数

`range()` 是python的内置函数，用于取一定范围的list列表

> ! 注意：`range(1,5)`在`python3`中是不会直接输出列表的,但是列表已经生成

```
    #举个栗子

    #本案例环境为 Python3.5.2
    range(1,5)
    list(range(1,10))
    list(range(1,10,2))
     

    #运行结果

    range(1,5)
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    [1, 3, 5, 7, 9]
```

### map()函数

```
    map(func,list1,listb,....)
```

大概的工作流程

1. 先将所有的列表进行`并行变遍历`

2. 每次遍历的元素，重新组合成一个新的列表

3. 如果有 函数`func`，则对列表元素用该函数进行处理


```
    #举个栗子

    a=[1,2,3]
    b=[4,5,6]
    def f(x,y):
        return x*y
    list1=list(map(None,a,b))
    print(list1)
    list2=list(map(f,a,b))
    print(list2)
     

    #运行结果

    [(1,4),(2,5),(3,6)]
    [4,10,18]
```
   

### reduce()函数
定义：
```
    reduce(function, sequence[, initial])
```

`function`参数是一个有`两个参数`的函数，reduce依次从`sequence`中取一个元素，和`上一次调用function的结果`做参数`再次调用function`

> 在`Python 3`里,`reduce()`函数已经被从全局名字空间里移除了,它现在被放置在`fucntools`模块里用的话要先引入。

```
    #举个栗子

    from functools import reduce
    li=list(range(1,4))
    print('进行累积的是：',li)
    def f(x,y):
        return x*y
    rr=reduce(f,li)
    print('结果是',rr)
    #当初始值为10时 
    rr2=reduce(f,li,10)
    print(rr2)
     

    #运行结果

    进行累积的是： [1, 2, 3]
    结果是 6
    60
```
  
> 注意：没有给定初始值的时候，初始值为序列的第一个

### filter()函数

可以称之为过滤器

```
    #举个栗子

    l=range(1,10)
    def f(x):
        if x&gt;5:
            return True
    lr=filter(f,l)
    list(lr)
     

    #运行结果

    [6, 7, 8, 9]

```

### zip()函数

对列表进行并行排序

```
    #举个栗子

    a=[1,2,3]
    b=[4,5,6]
    c=['A','B']
    zip(a,b)
    zip(a,b,c)
     

    #运行结果

    [(1,4),(2,5),(3,6)]
    [(1,4,A),(2,5,B)]
```