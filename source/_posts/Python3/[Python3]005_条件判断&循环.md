---
title: '[Python3]005_条件判断&循环'
tags:
  - python3
id: 318
categories:
  - Python3
date: 2017-04-16 20:53:59
---

在这里最容易出错的就是缩进。

> `Python`代码的缩进规则: 具有相同缩进的代码被视为代码块

## 条件语句

### if

if条件语句：没有`()`和 `{}`,在 `:` 之后的为逻辑处理代码块

```
	#举个栗子
    a = 20
    if a&gt;10:
        print("more than 10")

    ##运行结果
	more than 10
``` 

### if..else..

注意缩进，`if` 和 `else`必须是相同缩进量

```
    #举个栗子
    a = 20
    if a&gt;10:
        print("more than 10")
    else:
        print("less than 10")
    #运行结果
    more than 10
```
  
### if...elif ...else...

注意缩进，注意缩进，注意缩进

```
    #举个栗子
    score = 70
    if  score &lt;0 or score&gt;100:
        print("error")
    else:
        if score&gt;=80:
            print("A")
        else :
            if score&gt;=60:
                print("B")
            else :
                print("C")
    #运行结果
    B
```

上面的这种代码会随着逻辑处理复杂，缩进越来越复杂。代码不美观 所以这我们 使用

### if...elif ...else...

```
    #举个栗子
    score = 70
    if  score &lt;0 or score&gt;100:
        print("error")
    elif score&gt;=80:
        print("A")
    elif score&gt;=60:
        print("B")
    else :
        print("C")
    #运行结果 ： B
```  

## 循环
### for循环

```
    #举个栗子
    L=['python',2017,True]
    for name in  L:
        print(name)
    #运行结果
    python
    2017
    True
```  

### while循环

```
    #举个栗子
    sum = 0
    x = 1
    while x&lt;10:
        sum=sum+x
        x=x+1
    print(sum)

    #运行结果
    45
```

### break退出

```
    #举个栗子
    #计算1-100的和
    sum = 0
    x = 1
    while True:
        sum=sum+x
        x=x+1
        if x&gt;100:
            break
    print(sum)
    #运行结果
    5050
```  

### continue

```
    #举个栗子
    #统计班级及格人数
    L=[45,48,89,65,76,48,96,98,87,43,84,65]
    sum = 0
    for score in L:
        if score&lt;60:
            continue
        sum=sum+1
    print("及格人数",sum)
    #运行结果
    及格人数 8  
```  

### 嵌套

```
    #举个栗子

    for a in ['A','B','C']:
        for b in [1,2]:
            print(a,b)

    #运行结果
    A 1
    A 2
    B 1
    B 2
    C 1
    C 2
``` 