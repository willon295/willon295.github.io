---
title: '[Scala]05_集合_并行集合'
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

# Nil

所有类型的Nil都是相同的，内容相同，hashCode也相同
```
val a: List[String] = Nil
val b: List[Int] = Nil
//eq 比的是 对象的hashCode，== 比较的是内容

(a == Nil) should be(true)
(a eq Nil) should be(true)

(b == Nil) should be(true)
(b eq Nil) should be(true)

(a == b) should be(true)
(a eq b) should be(true)
```


# 多维数组

```
//构建 4 个Array 对象，元素为数组对象，值为空
val arr  = new Array[Array[Int]](4)

//构建 3 × 4 的二维数组
val arr2 = Array.ofDim[Int](3,4)
```


# 神奇的符号


1. `+=`:
语法：  `集合  +=  元素`
> 元素放在尾部，原集合会被修改
2. `++=`
语法： `集合1 ++= 集合2`
> 集合2放在尾部，原集合1被修改
3. `+:`
语法： `元素 +: 集合`
> 元素放在集合首部，原集合不会被改变，返回新的集合
4. `++:`
语法： `集合1 ++: 集合2`
> 集合1 放入集合2 的头部，原 集合2 不改变
5. `+:()`
语法： `集合.+:(元素)`
> 元素放在集合首部，原集合不会被改变，返回新的集合
6. `++:()`
语法： `集合1.++:(集合2)`
> 集合2 放入集合1 的头部，原 集合1 不改变
7. `::`
语法：  `Any::List[  | Seq]`
> 在集合的 `前面` 加入 Any 元素
8. `:::`
语法： `集合:::集合`
> 将两个 集合进行合并，返回一个List


# 符号的总结

1. 带 `=` 的 会改变原集合
2. 一个加号 `+` 一般是 集合与元素， 两个加号 `++` 是集合与集合操作



# BitSet

位集： 包位于 `scala.collection.mutable`
```
//0000 0000 ....  0100
val  bits = BitSet(2)
bits.toBitMask //输出Array(3)
//在第 6 位补 1
bits += 6
//传入的参数意思是：  在index处添加 1 ， 默认从低位开始索引
```
