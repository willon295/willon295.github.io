---
title: '[Hadoop]14_序列化'
category: Hadoop
tag: Hadoop
date: 2017-08-28 00:14:33
---

# 介绍

1. JAVA原生的序列化并不是非常理想，可以说是臃肿，Hadoop 对序列化进行优化
2. 在 Hadoop 的序列化中，所有的数据应该可以比较大小所以自定义的类 需要实现 `Comparable`


# 接口介绍

Hadoop 有以下接口

## Writable

该接口有两个方法需要重载， `readFileds()` , `write()`


## Comparable

方法 `compareTo()`,而为了避免歧义，通常也会重写 `equals()` 和 `hashCode()`
