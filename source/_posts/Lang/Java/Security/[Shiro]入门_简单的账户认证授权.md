---
title: '[Shiro]入门_简单的账户认证授权'
category: Shiro
tag: Shiro
date: 2018-11-09 00:00:00
---



# 简单的账户 认证

认证过程: 

1. 创建 `SecurityManager`  
2.  `主体Subject`  提交  `token` 认证
3. `SecurityManager` 进行认证
4. 提交给 `Authenticator`  认证
5. `Realm`  获取角色信息验证

##  简单的账户认证

1. 创建 `SecurityManager` 

   ```java
   DefaultSecurityManager defaultSecurityManager = new DefaultSecurityManager();
   ```

2. 创建简单账户 Realm , 给 `SecurityManager` 设置 Realm 

   ```java
   SimpleAccountRealm simpleAccountRealm = new SimpleAccountRealm();
   simpleAccountRealm.addAccount("Jack", "123456");
   // 第二个参数之后的 是  role  , 角色数据
   simpleAccountRealm.addAccount("li","li","admin","root");
   defaultSecurityManager.setRealm(simpleAccountRealm);
   ```

3. 创建主体 `Subject` , 在创建主体之前需要设置注意细节

   ```java
   SecurityUtils.setSecurityManager(defaultSecurityManager);
   // 获取subject
   Subject subject = SecurityUtils.getSubject();
   ```

4. 创建 token , 并且提交认证

   ```java
   UsernamePasswordToken token = new UsernamePasswordToken("Jack", "123456");
   subject.login(token);
   System.out.println("isAuthenticated: " + subject.isAuthenticated());
   ```

# 简单的账户授权

授权的大概过程:

1. 创建 `SecurityManager`
2. 主体授权
3. `SecurityManager` 授权
4. Authorizer 授权器授权
5. Realm 获取 `角色/权限` 数据

可以调用 `checkXXX` 的方法检查是否拥有权限, 或者角色

```java
subject.checkRole("amdin"); // admin 是已经添加的角色
subject.checkPermission("ed"); // 检查是否拥有编辑的权限
```

