---
title: '[SpringBoot]多环境配置管理'
category: SpringBoot
tag: Java
date: 2018-11-27 00:01:00
---



SpringBoot  对多环境配置的支持是十分友好的 。 最简单的实现就是

1. 规范文件名称：  application-环境名.yml
2. 启动时指定profile：  `mvn spring-boot:run  -D`