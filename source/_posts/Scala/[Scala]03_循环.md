---
title: '[Scala]03_循环'
tag: Scala
category: Scala
date: 2018-01-01 00:25:34
---

# for循环的基本用法

```
for( var x <- Range ){
   statement(s);
}
```
> 注意： `<-` 箭头表示赋值 ！

## to

`a  to  b` 用来表示范围,从a到b
```
for (a <- 1 to 10 ){//表示 1--10包括10
	print(a)
}
//结果12345678910
``` 

## util

`a util b`: 表示从 a 到 b,不包含 b
```
for (a <- 1 to 10 ){//表示 1--10不包括10
	print(a)
}
//结果123456789
```

## 多区间/多维遍历

可以通过分号“;” 隔开遍历的条件

```
for( a <- 1 to 3; b <- 1 to 3){
	println(a+"---"+b )
}
//结果
//1---2
//2---1
//2---2
//3---1
//3---2
```

## 遍历集合

1. 语法
```
for( var x <- List ){
   statement(s);
}
```
2. 举个离子
```
var nums = List(1,2,33,555,6)
for (a <- nums){
	print(a)
}
```

## 循环过滤

遍历的过程中可以过滤

```
//多个过滤条件用分号; 隔开
for (a <- numlist if a < 5; if a > 3) {
      println(a)
}
```

## yield返回结果

`yield` 跟在for语句结束处，直接返回结果，注意此时用的是 `{}` 包含遍历条件

```
var newList = for {a <- numlist if a >= 1; if a < 5} yield a
```
