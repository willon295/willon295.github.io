---
title: '[Hadoop]15_Combiner'
category: Hadoop
tag: Hadoop
date: 2017-08-28 00:15:33
---

# Combiner介绍

1. Combiner什么?
功能相当于 Reducer ， 对map的输出结果再做一次合并，然后传给shuffle，这个过程叫 Combiner
2. 怎么用？
- 定义一个 Combiner 继承 Reducer ,重写 `reduce()` 方法
- 在job处写入方法  job.setCombinerClass(自定义的Combiner)
