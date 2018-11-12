---
title: '[Shiro]CustomRealm'
category: Shiro
tag: Shiro
date: 2018-11-09 00:00:00
---


# 自定义Realm

即自定的 Realm , 自定义用户的信息来源

先背两个单词:

- **Authentication**: 认证
- **Authorization**: 授权


1. 自定义类 , 继承 `AuthorizingRealm` , 重写获取 `认证` 和 `授权` 的方法

```java

public class CustomRealm extends AuthorizingRealm {
    
    /**
     * 认证: 获取包含认证信息的用户认证数据
     *
     * @param token token信息
     * @return 返回认证信息
     * @throws AuthenticationException 认证异常
     */
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        // 1. 通过 token 获取认证信息
        String username = (String) token.getPrincipal();
        // 2. 模拟从 数据库读取用户信息
        Map<String, String> dataSource = new HashMap<String, String>() {{
            put("Tom", "123456");
            put("Jack", "123456");
        }};
        String password = dataSource.get(username);
        // 3. 如果密码不存在 , 表示用户不存在
        if (StringUtils.isEmpty(password)) {
            throw new AuthenticationException("用户不存在");
        }
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(username, password, "customRealm");
        return info;
    }


    /**
     *   授权: 获取包含用户授权信息的数据, 包含角色,权限
     *
     * @param principals 信息
     * @return 授权信息 ,包括角色/权限
     */
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

        // 1. 获取用户名
        String username = (String) principals.getPrimaryPrincipal();

        // 2. 从数据库/缓存 查询用户的 角色/权限信息
        Set<String> roles = getRoleByName(username);
        Set<String> permissions = getPermissionByName(username);

        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.setRoles(roles);
        info.setStringPermissions(permissions);

        return info;
    }



    private Set<String> getRoleByName(String username) {
        return new HashSet<String>() {{
            add("admin");
            add("user");
        }};
    }
    private Set<String> getPermissionByName(String username) {
        return new HashSet<String>() {{
            add("select");
            add("update");
        }};

    }

}

```


**测试**

```java
    @Test
    public void testCustomRealm() {

        DefaultSecurityManager defaultSecurityManager = new DefaultSecurityManager();
        CustomRealm customRealm = new CustomRealm();
        defaultSecurityManager.setRealm(customRealm);
        SecurityUtils.setSecurityManager(defaultSecurityManager);
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken("Tom", "123456");
        subject.login(token);
        System.out.println(subject.isAuthenticated());
        subject.checkRole("admin");
        subject.checkPermission("select");
    }
```



# 对密码进行简单加密


测试类中改动

```java

    @Test
    public void testCustomRealm() {

        DefaultSecurityManager defaultSecurityManager = new DefaultSecurityManager();
        CustomRealm customRealm = new CustomRealm();
        defaultSecurityManager.setRealm(customRealm);
        SecurityUtils.setSecurityManager(defaultSecurityManager);
        Subject subject = SecurityUtils.getSubject();

          // 添加加密算法
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher();
        matcher.setHashAlgorithmName("md5");
        matcher.setHashIterations(1);
        customRealm.setCredentialsMatcher(matcher);
        
        
        UsernamePasswordToken token = new UsernamePasswordToken("Tom", "123456");
        subject.login(token);
        System.out.println(subject.isAuthenticated());
        subject.checkRole("admin");
        subject.checkPermission("select");
    }

```


自定义 Realm 中的改动

```java
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        // 1. 通过 token 获取认证信息
        String username = (String) token.getPrincipal();
        // 2. 模拟从 数据库读取用户信息
        Map<String, String> dataSource = new HashMap<String, String>() {{
            put("Tom", "e10adc3949ba59abbe56e057f20f883e");
            put("Jack", "e10adc3949ba59abbe56e057f20f883e");
        }};
        String password = dataSource.get(username);
        // 3. 如果密码不存在 , 表示用户不存在
        if (StringUtils.isEmpty(password)) {
            throw new AuthenticationException("用户不存在");
        }
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(username, password, "customRealm");
        
          // 加salt , 更加安全
        info.setCredentialsSalt(ByteSource.Util.bytes("se30(*(&(*dfsf"));
        return info;
    }

```