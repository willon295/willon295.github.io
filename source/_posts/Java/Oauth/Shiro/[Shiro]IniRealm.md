---
title: '[Shiro]IniRealm'
category: Shiro
tag: Shiro
date: 2018-11-09 00:00:00
---

简单的介绍就是 : 

将 `用户的信息` 存储在  `.ini` 文件中,  程序运行时 , 认证和授权的信息来自于 `xx.ini`  文件

## ini 文件格式

```
#用户名=密码,角色1,角色2..

[users]
Jack=123456,admin
Tom=123456,normal


#角色=权限1,权限2...

[roles]
admin=delete,edit,update,select
normal=select
```

## 代码验证

```java

    @Test
    public void testIniRealm() {

        DefaultSecurityManager defaultSecurityManager = new DefaultSecurityManager();
        
          // 创建 IniRealm , 设置文件路径
        IniRealm iniRealm = new IniRealm("classpath:user.ini");
        defaultSecurityManager.setRealm(iniRealm);
        SecurityUtils.setSecurityManager(defaultSecurityManager);
        // 获取subject
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken("Tom", "123456");
        subject.login(token);
        System.out.println("isAuthenticated: " + subject.isAuthenticated());
        subject.checkRole("normal");
        subject.checkPermission("select");

    }

```