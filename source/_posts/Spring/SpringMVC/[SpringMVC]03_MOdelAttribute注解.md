---
title: '[SpringMVC]03_MOdelAttribute注解'
tag: SpringMVC
category: SpringMVC
date: 2017-10-23 00:00:00
---

# 介绍

在开发当中， 如果想更新一个用户的数据，比如用户拥有
`id, name ,pass, regDate`. `regDate` 是不可修改的，而修改用户信息时， 默认情况下， `regDate` 会被置为null

`@ModelAttribute` 注解的方法会在 `update()` 方法执行之前执行, 将即将修改的用户信息完整获取。在设置到map中，执行 `update` 后数据会进行合并


# @ModelAttribute 修饰无返回方法


# @ModelAttribute 修饰有返回的方法
