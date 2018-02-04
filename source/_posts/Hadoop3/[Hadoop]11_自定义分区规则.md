---
title: '[Hadoop]11_自定义分区规则'
category: Hadoop
tags: Hadoop
date: 2017-08-29 12:22:33
---

# 解决的问题

默认情况下，reduce输出的结果只有一个文件 `XXX-part-r-00000` , 比如现在有一个需求：
要处理的用户数据 `按电话号码所在区域`进行划分， `不同的省份` 存储在 `不同的文件中`。

# Hadoop的处理逻辑

Hadoop使用的分区工具来实现，默认是 `HashPartitioner`
```
public  int  getPartition(K key,V value,int  numReduceTasks){

	//根据 key的 hashCode 模除 任务数，返回对应的分区
	return (key.hashCode() & Integer.MAX_VALUE) % numReduceTasks;
}
```

# 自定义分区规则

1. 继承 `HashPartitioner`类，重写 `getPartition()` 方法
```
public class ProvincePartitioner extends HashPartitioner{

	public  int  getPartition(K key,V value,int  numReduceTasks){
	
		//分出3个分区
		pro=key.toString();
		if(pro.equals("136")){
			return 0;
		}else if(ro.equals("138")){
			return 1;
		}else{
			return 2;
		}
	}

}
```
2. 任务提交处，使用 `自定义的 分区规则`,设置 `numReduceTasks 任务数量`

```
job.setPatitionerClass(ProvincePartitioner.class);
job.setNumReduceTasks(3);
```
> 任务数量 `不能少于` 分区规则分出后的分区数量
