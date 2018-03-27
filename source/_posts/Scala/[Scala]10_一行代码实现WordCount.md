---
title: '[Scala]10_一行代码WordCount'
tag: Scala
category: Scala
date: 2018-01-01 00:10:34
---




# 实现


```
Source.fromFile("/home/willon/Documents/tmp/input/aa.txt").getLines.flatMap(_.toString.split(" ")).map((_,1)).toList.groupBy(_._1).map(t => (t._1,t._2.length)).foreach(println)
```
