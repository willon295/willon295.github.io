---
title: '[Scala]05_集合&并行集合'
tag: Scala
category: Scala
date: 2018-01-01 00:05:34
---


# 常用的集合

集合分为可变集合 `scala.collection.mutable.XXX`, 不可变集合 `scala.collection.immutable.XXX`
1. Array
```
val arr = Array(1,2,3,4)
```
2. List
`Nil` 表示空的 `List` ,常用的方法有
- `head`: 第一个元素
- `tail`： 除第一个之外所有元素
- `::`：  不同的 集合拼接 ， 单个元素可以直接拼接在集合的前面 `5 :: lst`
3. Map
```
val  m = new HashMap[String, Int]("aa"-> 2,"bb"->3)
```
4. Set


# 常用的方法

1. `sum` , `max` , `min`
2. `sortWith`
```
var arr = Array(1, 3, 4, 5, 6)
//前后两个元素按一定的逻辑排，如按降序排
arr.sortWith( _ > _)
//所有元素按一定的规则排 ，如转成字符串之后排
arr.sortBy((x) => x.toString)
```
3. `map`, 将每个元素取出进行操作，返回新的集合
```
var arr = Array(1, 3, 4, 5, 6)
arr.map(_ * 10)
```
4. `reduce` ,将所有元素进行迭代操作
```
var arr = Array(1, 3, 4, 5, 6)
//连乘
arr.reduce(_ * _)
//相当于，前一次计算的结果会赋值给下一次
arr.reduceLeft((x,y) => x *y)
// （（（1 × ３） × 4 ） × 5 ） × 6
```
5. `fold`, 和 `reduce` 差不多，但是可以给定一个初始值
6. `aggregate` ，一种分区聚合操作，传入两个函数参数
```
val  lst = List(List(1,2,3),List(4,5),List(6,7,8))
// 第一个括号的参数是初始值，代表第一个函数的第一个参数（待完善）
lst.aggregate(100)( _ + _.sum , _ + _)
```

# 并行集合

并行化集合 的方法会多线程执行

```
val  lst = List(1,2,3,4,5,9,8,0)
//转换成并行化集合
val par = lst.par
println(par.sum)
```
