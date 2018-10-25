---
title: '[Scala]01_基础变量'
tag: Scala
category: Scala
date: 2018-01-01 00:01:34
---

# 变量的声明和引用

## 单个变量的声明

1. 第一种方式,手动声明类型
```
var name: String = "willon"
var age: Int = 23
```
2. 第二种方式，系统自动识别类型
```
var name = "willon"
var age = 23
```
3. 变量的引用
```
print("name:"+name+"----age:"+age)
```

## 多个变量声明

1. 多个变量同时定义
```
var a,b,c,d = 100
//声明a,b,c,d都为100
```

## 定义集合

```
var numbers = List(122,11,22,33,44)
var user = (23,"zhangsan","2018-01-01")
```


# val 和 var 的区别

1. val 定义的变量的引用不能变
```
val a  = Array(1,3,5,7)
a = Array(1,2) //报错
```
2. var 定义的变量可以改变引用,但是数据类型不能变
```
var a  = Array(1,3,5,7)
a = Array(1,2) //可以
a = Array("aa","bb","cc") //报错
```
