---
title: '[Share]Idea使用技巧' 
category: Share
tag: Share
date: 2018-09-27 00:00:00
---

# 远程调试

## 问题 

1. A 项目需要调用 B 项目 ,
2. B 项目已经上线
3. A 调用 B 时 , 想知道 B 项目的 `某个接口` 有没有没调用 , 某行代码有没有被执行, 进行远程调试


## 解决
  
1. Idea  本地打开 B 项目
2. `Run`  --> 选择 `Edit configurations`  --> `+ Remote`  --> 输入远程的项目的 IP , 端口 `50000` -->  OK
3. 在需要调试的代码处 `打个断点`
4. 点击运行的 `debug` , 开始监听远程调试


# 项目运行问题

1. 出现 

```
Forbid consumer 10.1.134.169 access service xxx.XXXService from registry zk1.xxx.com:2181 use dubbo version 2.6.0 ...
```
> 解决: 检查项目环境的配置文件  `dev.properties` 对应消费的项目的 `xx.dubbo.version`  , 一般统一改成  `xx.dubbo.version=1.0.0-分支名`

2. 一般项目运行出现问题需要检查 
- 项目 `pom.xml` 文件中 , 消费的第三方的 `xx.client.version` 是否是最新的, 是自己需要的版本
- 如果 `xx-client` x项目代码需要更改, 更改只在本变更中需要使用 ?　修改