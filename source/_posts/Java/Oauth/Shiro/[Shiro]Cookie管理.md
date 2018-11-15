---
title: '[Shiro]Cookie管理'
category: Shiro
tag: Shiro
date: 2018-11-09 00:00:00
---

实现登录之后保存 Cookie

1. 在 SecurityManager 处设置

```java
CookieRememberMeManager cookieRememberMeManager = new CookieRememberMeManager();
SimpleCookie simpleCookie = new SimpleCookie("rememberMe");
simpleCookie.setMaxAge(10);
cookieRememberMeManager.setCookie(simpleCookie);
defaultWebSecurityManager.setRememberMeManager(cookieRememberMeManager);
```


2. 在 Controller 传入 token 设置
```java
UsernamePasswordToken token = new UsernamePasswordToken(user.getUsername(), user.getPassword());
token.setRememberMe(true);
```