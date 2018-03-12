---
title: '[Hadoop]08_MapReduce环境准备'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:08:33
---

# 环境配置

`yarn` 的工作是负责工作，内存调度
`mapreduce` 负责运算

## yarn-site.xml

1. 设置 yarn 服务器的名称
2. 设置 shuffle
```
<configuration>
<property>
        <name>yarn.resourcemanager.hostname</name>
        <value>hdpnn0</value>
</property>

<property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
</property>

</configuration>
~                  
```

## mapre-site.xml

把所有的分布任务交给 `yarn` 处理
```

<configuration>
	<property>
		<name>mapreduce.framework.name</name>
		<value>yarn</value>
	</property>
</configuration>
```

## 启动服务

1. start-dfs.sh
2. start-yarn.sh
