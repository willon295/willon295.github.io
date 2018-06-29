---
title: '[Spring]07_Spring异步处理'
tag: Spring
category: Spring
date: 2016-10-12 00:07:00
---


# @EnableAsync

一般用于SpringBoot入口类 之上


# Async


一般用于方法之上，以下特点
1. 被内部调用时，不会异步执行。被外部调用时，异步
2. 方法的返回值全部被置为 null

