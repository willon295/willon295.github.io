---
title: '[SpringSecurity]入门'
category: SpringSecurity
tag: Spring
date: 2018-12-19 00:00:00
---

# 简单入门

【待完善】permission 的自定义与 `hasPermission` , `hasAnyAuthority` 的详解

基于 `Spring Boot 2.0.7.RELEASE`

首先， 在原有的 `Spring Boot` 项目中加上
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

启动项目之后  , 输出日志多出一行

```
Using generated security password: e4ad1710-01a7-4332-a641-93a63276a2e3
```
访问站点出现登录表单

![](/images/spring_security_default_login.png)



## 分析

1. 搜索日志的输出信息 `generated security password`  发现其出现在两个类中：
- `UserDetailsServiceAutoConfiguration`
- `ReactiveUserDetailsServiceAutoConfiguration`
2. 都出现在同一个方法中
```java
private String getOrDeducePassword(SecurityProperties.User user,
	PasswordEncoder encoder) {
	String password = user.getPassword();
	if (user.isPasswordGenerated()) {
	logger.info(String.format("%n%nUsing generated security password: %s%n",
	user.getPassword()));
	}
	if (encoder != null || PASSWORD_ALGORITHM_PATTERN.matcher(password).matches())
	{
	  return password;
	}
	return NOOP_PASSWORD_PREFIX + password;
	}
```

可以看出其中密码信息来于：  `SecurityProperties.User` ， 继续看 `SecurityProperties.User` 源码：

```java

	public static class User {

		/**
		 * Default user name.
		 */
		private String name = "user";

		/**
		 * Password for the default user name.
		 */
		private String password = UUID.randomUUID().toString();

		/**
		 * Granted roles for the default user name.
		 */
		private List<String> roles = new ArrayList<>();

		private boolean passwordGenerated = true;

		public String getName() {
			return this.name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getPassword() {
			return this.password;
		}

		public void setPassword(String password) {
			if (!StringUtils.hasLength(password)) {
				return;
			}
			this.passwordGenerated = false;
			this.password = password;
		}

		public List<String> getRoles() {
			return this.roles;
		}

		public void setRoles(List<String> roles) {
			this.roles = new ArrayList<>(roles);
		}

		public boolean isPasswordGenerated() {
			return this.passwordGenerated;
		}

	}

```

再看 `SecurityProperties` 这个类源码

```java
@ConfigurationProperties(prefix = "spring.security")
public class SecurityProperties {
	// 省略其他
    public static class User{}
}
```

可以看出， 这个properties类会加载 springboot 配置文件前缀为 `spring.security` 的信息，  那么猜测可以通过配置文件修改 `user` ， `password` ， `roles` ， 测试：

```yaml
server:
  port: 8080
spring:
  security:
    user:
      name: root
      password: root
      roles: [USER,ADMIN]
```

启动程序之后， 验证通过

## 当前结论

1.  引入maven依赖， 未做任何配置时， spring默认会启动安全校验
2. 默认会校验所有URI
3. 自带单点登录表单
4. 默认的用户名： `user` , 密码由 `UUID` 随机生成， 且无加密手段
5. 可以通过yml配置文件 `spring.security` 修改默认账户信息

# 进阶学习

通过上面简单入门发现几个问题

1. 用户名密码只有一个， 且是通过配置文件定义的， 并非从从数据库获取
2. 具体验证的方法不是自定义的

通过啃官方文档之后， 发现需要定一个类， 继承 `WebSecurityConfigurerAdapter` , 重写 `configure` 方法， 看 `WebSecurityConfigurerAdapter` 源码

```java
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.anyRequest().authenticated()
				.and()
			.formLogin().and()
			.httpBasic();
	}
```

**简单分析** 

1. 拦截所有请求
2. 表单登录

在通过搜索登录表单的信息发现出现在 `DefaultLoginPageGeneratingFilter` 的 `generateLoginPageHtml` 方法中 ， 其中源码关键定义如下

```java
public class DefaultLoginPageGeneratingFilter extends GenericFilterBean {
    
    // 默认的登录URI
	public static final String DEFAULT_LOGIN_PAGE_URL = "/login";
	public static final String ERROR_PARAMETER_NAME = "error";
	private String loginPageUrl;  //登录页面URL
	private String logoutSuccessUrl;  // 登录成功URL
	private String failureUrl;  // 登录失败URL
	private String usernameParameter;  // 用户名表单参数
	private String passwordParameter; // 用户密码表单参数
	private String rememberMeParameter; // 记住密码表单参数
}
```

再回头看 `WebSecurityConfigurerAdapter` 的 `formLogin` 方法， 最后会调用到

```java
public FormLoginConfigurer() {
		super(new UsernamePasswordAuthenticationFilter(), null);
		usernameParameter("username");
		passwordParameter("password");
	}

```

也就是说登录表单默认参数是 

- `password`
- `username`



## 密码加密，身份信息设定

首先实现自定义登录用户的信息， 需要注意的是

1. 源码中大部分的 `PasswordEncoder` 已经被废弃
2. 如果需要使用可通过工厂类 `PasswordEncoderFactories` 创建

如果需要使用密码加密手段

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        auth.inMemoryAuthentication().withUser("root").password(encoder.encode("root")).roles("ADMIN", "USER");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
```

### 密码加密注意的坑

已经配置了 `PasswordEncoder`  还是报错
```java
There is no PasswordEncoder mapped for the id “null”
```
**解决** : 加上  `scope=“prototype” `

```java
@Bean
@Scope(scopeName = "prototype")
public  PasswordEncoder passwordEncoder() {
	return PasswordEncoderFactories.createDelegatingPasswordEncoder();
}
```

## 角色权限设定，请求拦截

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    /**
     * 配置过滤路径， 配置权限访问
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/js/**", "/css/**", "/resources/**").permitAll()
                .antMatchers("/user/**").hasRole("USER")
                .antMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and().formLogin();
    }

    /**
     * 配置用户角色信息
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        auth.inMemoryAuthentication()
                .withUser("root").password(encoder.encode("root")).roles("ADMIN", "USER").and()
                .withUser("tom").password(encoder.encode("tom")).roles("USER");
    }

    /**
     * 配置密码加密器
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}

```



测试 Controller 

```java
@RestController
public class UserController {
    @GetMapping("/get")
    public String get() {
        return "role test";
    }

    @GetMapping("/user/get")
    public String userGet(){
        return "User get";
    }

    @GetMapping("/admin/get")
    public String adminGet(){
        return "Admin get";
    }
}
```



## 使用注解、SpringEL拦截接口

1. `WebSecurityConfig` 不配置URL权限控制

   ```java
   @EnableWebSecurity
   @EnableGlobalMethodSecurity(prePostEnabled = true)
   public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
   
   
       /**
        * 配置过滤路径
        */
       @Override
       protected void configure(HttpSecurity http) throws Exception {
           http.csrf().disable().authorizeRequests()
                   .antMatchers("/js/**", "/css/**", "/resources/**").permitAll()
                   .anyRequest().authenticated()
                   .and().formLogin()
                   .and().logout();
       }
   
       /**
        * 配置用户信息
        */
       @Override
       protected void configure(AuthenticationManagerBuilder auth) throws Exception {
           PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
           auth.inMemoryAuthentication()
                   .withUser("root").password(encoder.encode("root")).roles("ADMIN", "USER").and()
                   .withUser("tom").password(encoder.encode("tom")).roles("USER");
       }
   
       /**
        * 配置密码加密器
        */
       @Bean
       public PasswordEncoder passwordEncoder() {
           return PasswordEncoderFactories.createDelegatingPasswordEncoder();
       }
   }
   ```

2. 开启注解拦截方法

   - 类上面加上 `@EnableGlobalMethodSecurity(prePostEnabled = true)` 注解， 可加在 程序入口处， 也可加在 `WebSecurityConfig` 上

   使用 `@PreAuthorize` 注解

   ```java
       @PreAuthorize("hasRole('ADMIN')")
       @GetMapping("/admin/get")
       public String adminGet(){
           return "Admin get";
       }
   ```



## 使用数据库读取用户信息

1. `WebSecurityConfig` 配置 

```java
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    /**
     * 配置过滤路径
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/js/**", "/css/**", "/resources/**").permitAll()
                .anyRequest().authenticated()
                .and().formLogin()
                .and().logout().permitAll();
    }

    /**
     * 配置用户信息
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService());
    }

    /**
     * 配置用户信息来源
     */
    @Bean
    @Override
    protected UserDetailsService userDetailsService() {
        return new CustomUserDetailService();
    }

    /**
     * 配置密码加密器
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}

```
2. 编写自定义的 `UserDetailService` 
```java
@Component
public class CustomUserDetailService implements UserDetailsService {
    
    @Resource
    private UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDAO.getByUserName(username);
        if (user==null){
            throw new UsernameNotFoundException("No Such user");
        }
        return user;
    }
}
```

3. 自定义DAO

```java
@Component
public class UserDAO {

    private static Map<String, User> map = new HashMap<>();

    // 构造用户数据
    static {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        SimpleGrantedAuthority roleUser = new SimpleGrantedAuthority("ROLE_USER");
        SimpleGrantedAuthority roleAdmin = new SimpleGrantedAuthority("ROLE_ADMIN");
        ArrayList<GrantedAuthority> adminAuth = new ArrayList<GrantedAuthority>() {{
            add(roleAdmin);
            add(roleUser);
        }};

        User tom = new User("tom", encoder.encode("tom"), Collections.singletonList(roleUser));
        User admin = new User("admin", encoder.encode("admin"), adminAuth);
        map.put("tom", tom);
        map.put("admin", admin);
    }

    /**
     *  查询接口
     */
    public User getByUserName(String username) {
        return map.get(username);
    }
}

```



### 注意的坑

如果使用    `@PreAuthorize("hasRole('ADMIN')")`注解 ， 自定义数据源 ，   role 的名字必须以 `ROLE_` 开头 ，  因为 `hasRole`  方法是默认加了 `ROLE_` 前缀的



## 使用自定义的 Login页面

需要整合 `thymleaf`

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>

```



1. 新建一个 `login.html`  页面

   ```html
   <form action="/login" method="post" >
       <input type="text" name="username"/> <br>
       <input type="password" name="password"/> <br>
       <input name="submit" type="submit" value="Login"/> <br>
   </form>
   ```

2. `WebSecurityConfig` 配置登录页面，登陆成功跳转页面

   ```java
     @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/js/**").permitAll()
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/css/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                    .loginPage("/login")
                    .defaultSuccessUrl("/").permitAll()
                .and()
                .logout().permitAll();
    }
   ```

3. Controller 添加页面映射

   ```java
       @RequestMapping("/login")
       public String login() {
           return "/login";
       }
   ```



# 总结



1. 目前只实现了单点登录
2. 进行了 Role 的校验， 并没有 `Permission` 以及更详细的权限校验
3. 自定义类继承 `WebSecurityConfigurerAdapter` 是关键 ， 用户信息， 拦截路径等信息全在这里配置 