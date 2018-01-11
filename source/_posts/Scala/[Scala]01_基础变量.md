---
title: '[Scala]01_基础变量'
tag: Scala
category: Scala
date: 2018-01-01 00:24:34
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
