---
title: '[SpringBoot]02_00_配置文件'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:02:00
---

# 核心配置文件

## 配置文件类型

1. properties文件
````
server.port=8888
server.address=127.0.0.1
```

2. yml配置,树状结构
```
server:
  port: 8888
```

## 配置文件取值

1. 自定义字段并取值
```
willon:
  name: chen
  password: chenpwd
  toString: ${willon.name} ${willon.password}
```
2. 取随机数
```
server:
    port: ${random.int[1024,9999]}
```


# 多环境配置

默认的 Spring boot会 加载 `application-${profiles}.yml` 或者 `application-${profiles}.properties`
`${profiles}` 字段是自定义的配置。

1. 多个文件
比如：
```
application-dev.yml
application-test.yml
```
2. 单个文件
```
spring:
    profiles: dev
spring:
    profiles: test
```
## 运行时指定配置文件


使用 `--spring.profiles.active=` 指定 `profiles` 字段

```
java -jar XXX.jar  --spring.profiles.active=dev
```
