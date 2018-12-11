---
title: '[Shiro]SpringBoot整合Shiro_Thymleaf'
category: Shiro
tag: Shiro
date: 2018-11-11 00:00:00
---

# SpringBoot集成Shiro

pom 文件

```
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.9.RELEASE</version>
        <relativePath/>
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-spring</artifactId>
            <version>1.3.2</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
    </dependencies>
```

##  代码编写


自定义一个ShiroConfig类, 用于Shiro配置

1. 配置需要过滤的URL, 对应的权限, 自定义 Realm
```java

@Configuration
public class ShiroConfig {

    /**
     * 1. 配置shiroFilterFactory , 过滤相应的URL
     *
     * @return shiro过滤器配置
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean() {

        // 1.1 配置登录的URL, 当未授权时会跳转该页面
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager());
        shiroFilterFactoryBean.setLoginUrl("/login");
        shiroFilterFactoryBean.setSuccessUrl("/index");
        shiroFilterFactoryBean.setUnauthorizedUrl("/403");
        // 1.2 配置过滤的URL 和对应的访问权限, anon : 表示匿名可访问; authc : 表示需要授权
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        map.put("/user/**", "roles[user]");
        map.put("/admin/**", "roles[admin]");
        map.put("/logout", "anon");
        map.put("/js/**", "anon");
        map.put("/css/**", "anon");
        map.put("/**", "authc");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);

        return shiroFilterFactoryBean;
    }

    /**
     * 2. 配置 SecurityManager 主要设置自定义Realm
     *
     * @return SecurityManager
     */
    @Bean
    public SecurityManager securityManager() {
        DefaultWebSecurityManager defaultWebSecurityManager = new DefaultWebSecurityManager();
        defaultWebSecurityManager.setRealm(customRealm());
        return defaultWebSecurityManager;
    }

    /**
     * 注入一个自定义的Realm
     *
     * @return 自定义的Realm
     */
    @Bean
    public CustomRealm customRealm() {
        CustomRealm customRealm = new CustomRealm();
        customRealm.setCredentialsMatcher(hashedCredentialsMatcher());
        return customRealm;
    }

    /**
     * 注入MD5加密
     *
     * @return HashedCredentialsMatcher加密Matcher
     */
    @Bean
    public HashedCredentialsMatcher hashedCredentialsMatcher() {
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher();
        matcher.setHashAlgorithmName("md5");
        matcher.setHashIterations(1);
        return matcher;
    }
}

```

2. 开启Shiro注解支持
```java
    /**
     * 解决 Shiro注解不生效
     *
     * @return
     */
    @Bean
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        defaultAdvisorAutoProxyCreator.setProxyTargetClass(true);
        return defaultAdvisorAutoProxyCreator;
    }

    @Bean
    public static LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    /**
     * 开启shiro注解支持
     *
     * @return 注解扫描支持
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor() {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager());
        return authorizationAttributeSourceAdvisor;
    }
```
3. applicatioin.yml 文件需要开启支持
```
spring:
  aop:
    proxy-target-class: true
```
4. 自定的 CustomRealm 
```java


public class CustomRealm extends AuthorizingRealm {

    /**
     * 获取包含认证信息的用户认证数据
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
            put("admin", "d46735ab418fa524965b9df37f8bfc53");
            put("user", "d46735ab418fa524965b9df37f8bfc53");
        }};
        String password = dataSource.get(username);
        // 3. 如果密码不存在 , 表示用户不存在
        if (null == password) {
            throw new AuthenticationException("用户不存在");
        }
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(username, password, "customRealm");
        // 加盐 , 提高安全性
        String salt = "se30(*(&(*dfsf";
        info.setCredentialsSalt(ByteSource.Util.bytes(salt));
        return info;
    }


    /**
     * 获取包含用户授权信息的数据, 包含角色,权限
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


    // 模拟数据获取
    private Set<String> getRoleByName(String username) {
        
        HashSet<String> set = new HashSet<>();
        if ("admin".equals(username)) {
            set.add("admin");
            set.add("user");
            return set;
        }
        if ("user".equals(username)) {
            set.add("user");
            return set;
        }
        return set;

    }

    private Set<String> getPermissionByName(String username) {
        HashSet<String> set = new HashSet<>();
        if ("admin".equals(username)) {
            set.add("user:select");
            set.add("user:update");
            set.add("user:delete");
            set.add("user:insert");
            return set;
        }

        if ("user".equals(username)) {
            set.add("user:select");
            return set;
        }
        return set;
    }
}

```
5. 编写测试 TestController
```java
// 对应的 thymleaf 跳转


    @GetMapping("/login")
    String login() {
        return "login";
    }

    @GetMapping("/403")
    String unAuth() {
        return "403";
    }

    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    @GetMapping(value = {"/index", "/"})
    String index() {
        return "index";
    }

// 执行登录POST请求 
    @ResponseBody
    @PostMapping(value = "/login")
    public String login(@RequestBody User user) {
        UsernamePasswordToken token = new UsernamePasswordToken(user.getUsername(), user.getPassword());
        try {
            ShiroUtil.login(token);
            return "0";
        } catch (Exception e) {
            return "1";
        }
    }
// 各种角色权限测试

    @ResponseBody
    @RequiresRoles(value = "admin")
    @GetMapping("/admin/test")
    public String testAdmin() {
        return "admin test";
    }

    @RequestMapping("/list")
    @RequiresRoles(value = {"admin"})
    public String list() {
        return "list";
    }


    @ResponseBody
    @RequiresPermissions("user:delete")
    @GetMapping("/user/delete")
    public String testUserDelete() {
        return "user delete";
    }


    @ResponseBody
    @RequiresPermissions("user:select")
    @GetMapping("/user/select")
    public String testUserSelect() {
        return "user select";
    }

    @ResponseBody
    @GetMapping("/logout")
    public String logout() {
        ShiroUtil.logout();
        return "退出成功";
    }
```


# 注意的事项

1. Shiro的 @RequireRoles等注解不生效
在 `ShiroConfig` 类中添加
```java

    @Bean
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        defaultAdvisorAutoProxyCreator.setProxyTargetClass(true);
        return defaultAdvisorAutoProxyCreator;
    }

    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }
```
在 `application.yml` 文件中添加
```
spring:
  aop:
    proxy-target-class: true

```


2. `shiroFilterFactoryBean.setSuccessUrl("/index")` 不生效
这个问题可以直接使用 html 页面实现跳转,  不要依赖框架

3. 关于权限控制
权限控制可以分为
- **过滤器统一配置**: 如统一配置角色
```
        map.put("/user/**", "roles[user]");
        map.put("/admin/**", "roles[admin]");
```
- **注解具体配置**, 如:
```java

    @RequestMapping("/list")
    @RequiresRoles(value = {"admin"})
    public String list() {
        return "list";
    }

    @RequiresRoles(value = {"user", "admin"}, logical = Logical.OR)
    @GetMapping(value = {"/index", "/"})
    String index() {
        return "index";
    }

    @ResponseBody
    @RequiresPermissions("user:delete")
    @GetMapping("/user/delete")
    public String testUserDelete() {
        return "user delete";
    }
```

