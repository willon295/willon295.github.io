---
title: '[Hbase]01_分区'
category: Hbase
tag: Hbase
date: 2016-08-28 00:03:33
---


# 简介

hbase中有多个regionserver，如果想对不同的  rowKey 进行划分，不同区间的rowKey内容进入不同的文件，那么可以创建分区规则。
可以使用 `|` 、 `～` 对分区规则进行限定


# 基本使用

## 手动指定分区规则

```
create 'test:t_user',{NAME=>'baseInfo',VERSIONS=2},{NAME=>'extraInfo',VERSIONS=2},{SPLITS=>'100','200','300'}
```

## 指定分区规则文件


```
create 'test:t_user',{NAME=>'baseInfo',VERSIONS=2},{NAME=>'extraInfo',VERSIONS=>2},{SPLITS_FILE=>'splits.txt'}
```


1000|  => 比 1000大的值 
