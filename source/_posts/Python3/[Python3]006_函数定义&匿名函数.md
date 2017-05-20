---
title: '[Python3]006_函数定义&匿名函数'
tags:
  - python3
id: 320
categories:
  - Python3
date: 2017-04-16 20:54:56
---

### 函数的定义

使用 `def` 定义，函数参数、返回值可选。

```
    #不带参函数
    def func():
        print('hello')

    #带参函数
    def func1(x,y):
        print('hello'x,y)

    #有返回值函数
    def func(x):
        print('hello',x)
        return x
```


### 函数的返回值

使用`return`返回，返回值可以是任何类型数据。函数不会执行 `return` 之后的代码。

```
    #举个栗子
    def func():
        return 'yes'
        return 'no'
    fun()
     

    #运行结果
    yes
     
```

### 匿名函数lambda

`lambda` 关键字可以用来创建一个匿名函数。

```
    func=lambda 参数一,参数二 : 返回值
```

大概使用就是这样      

```
    #举个栗子

    #正常的函数定义
    def func1(x,y):
        return x*y

    #匿名函数
    func2 = lambda x,y: x*y

    #函数调用
    func1(4,5)
    func2(4,5)
     

    #运行结果
    20
    20 
```