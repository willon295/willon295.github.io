---
title: '[Scala]12_柯里化Currying'
tag: Scala
category: Scala
date: 2018-01-01 00:12:34
---

# 柯里化

柯里化（Currying）是把接受 `多个参数` 的函数变换成 `接受一个单一参数` (最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

# Scala 柯里化

在scala中柯里化可以将 `多参数函数` 变换成 `接受单一参数函数`

## 多参数->单一参数

1. 方法不可以直接柯里化，应该先转化成 函数
2. 函数可以柯里化
3. 举个例子
```
def mutiply(x: Int, y: Int): Int = x * y

//将方法转化成 函数
val f: (Int, Int) => Int = mutiply _

//函数柯里化
val curried: Int => Int => Int = f.curried



//方法和函数的调用
mutiply(2,3)
f(2,3)

//柯里化之后的函数调用
curried(2)(3)
```

## 单一参数 => 多参数

```
def customFilter(f: Int => Boolean)(xs: List[Int]) ={x.filter(f)}
def onlyEven(x: Int) = x % 2 == 0
val lst1 = List(12, 11, 5, 20, 3, 13, 2)

//对传入的数字进行过滤
customFilter(onlyEven)(lst1) 

//转化
val onlyEvenFilter = customFilter(onlyEven) _
onlyEvenFilter(lst)
```
