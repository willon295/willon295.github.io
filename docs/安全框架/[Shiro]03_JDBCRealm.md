---
title: '[Shiro]JDBCRealm'
category: Shiro
tag: Shiro
date: 2018-11-09 00:00:00
---



首先添加数据库依赖

```xml
<dependency>
     <groupId>com.alibaba</groupId>
     <artifactId>druid</artifactId>
     <version>1.1.6</version>
</dependency>
<dependency>
     <groupId>mysql</groupId>
     <artifactId>mysql-connector-java</artifactId>
     <version>5.1.4</version>
</dependency>
```

JDBCRealm 则需要数据库的支持, 如果不配置
`默认会执行以下语句查询` : 

```java

    protected static final String DEFAULT_AUTHENTICATION_QUERY = 
    "select password from users where username = ?";
    
    protected static final String DEFAULT_SALTED_AUTHENTICATION_QUERY = 
    "select password, password_salt from users where username = ?";

    protected static final String DEFAULT_USER_ROLES_QUERY = 
    "select role_name from user_roles where username = ?";

    protected static final String DEFAULT_PERMISSIONS_QUERY = 
    "select permission from roles_permissions where role_name = ?";
```



## 代码验证


**注意**: 如果需要权限检查的时候,  需要打开权限检查的开关 `jdbcRealm.setPermissionsLookupEnabled(true)`


```java

    @Test
    public void testJDBCRealm() {

        DefaultSecurityManager defaultSecurityManager = new DefaultSecurityManager();

        //数据源配置
        DruidDataSource dataSource = new DruidDataSource() {{
            setUrl("jdbc:mysql://localhost:3306/test");
            setUsername("root");
            setPassword("root");
        }};
        JdbcRealm jdbcRealm = new JdbcRealm();
          //注意: 打开权限查询开关
        jdbcRealm.setPermissionsLookupEnabled(true);
          //自定义数据库的查询语句  认证/角色/权限检查语句
        jdbcRealm.setAuthenticationQuery("select password from user where username = ?");
        jdbcRealm.setUserRolesQuery("select role_name from role where username = ?");
        jdbcRealm.setPermissionsQuery("select permission from role_permission where role_name = ?");

        jdbcRealm.setDataSource(dataSource);
        defaultSecurityManager.setRealm(jdbcRealm);
        SecurityUtils.setSecurityManager(defaultSecurityManager);
        // 获取subject
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken("admin", "admin");
        subject.login(token);
        System.out.println("isAuthenticated: " + subject.isAuthenticated());
        subject.checkRole("admin");
        subject.checkPermission("update");
        
    }
```

## 知识点


1. 自定义对应 验证/角色/权限检查SQL语句
```java
//自定义数据库的查询语句  认证/角色/权限检查语句
jdbcRealm.setAuthenticationQuery("select password from user where username = ?");
jdbcRealm.setUserRolesQuery("select role_name from role where username = ?");
jdbcRealm.setPermissionsQuery("select permission from role_permission where role_name = ?");
```
2. 权限检查的开关 , 默认是不检查权限的
```java
jdbcRealm.setPermissionsLookupEnabled(true);
```

