---
title: '[SpringBoot]11_多数据源_事务管理'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:11:00
---


解决的问题； 当一个项目需要多个数据源（数据库）、那么就通过几种方式
1. 分包： 不同的包的业务访问不同的数据库
2. 自定义注解： 在业务层方法上面使用自定义注解指定数据库

# 数据库的划分

垂直： 每个表对应着不同的业务
水平： 同一个表，根据字段规则，拆到不同的数据库中


# 多数据源事务问题

如下代码中， service2 调用 service1 
service2 事务的执行并不会影响 service1 的事务，
service1 事务执行成功， service2 执行失败。
而我们想要的结果是： `要么一起成功，要么一起回滚`.

```java
@Service
public class UserServiceTest2 {

    @Autowired
    private UserMapper1 userMapper1;
    
    @Autowired
    private UserMapper2 userMapper2;
    
    @Transactional
    public String add(User user) {

        //service2 调用 service1 的业务
        userMapper1.add(user);
        
        //抛出异常，测试 userMapper1 的事务是否成功 
        int i = 1 / 0;
        
        userMapper2.add(user);
        
        return "2_add_";
    }
    
}
```


# SpringBoot__jta-atomikos 多数据源配置_分布式事务管理

思路： 将 `DAO层` 与 `Service层` 从项目中抽离出来，  进行 `分包` 处理

|包|数据库|
|---|---|
|cn.willon.test1|test1|
|cn.willon.test2|test2|

项目大概结构是：
```
└── cn
    └── willon
        ├── App.java
        ├── bean
        │   └── User.java
        ├── controller
        │   └── HelloController.java
        ├── dbConf
        │   ├── DataSourceConfig1.java
        │   ├── DataSourceConfig2.java
        │   ├── DBConfig1.java
        │   └── DBConfig2.java
        ├── test1
        │   ├── dao
        |   │   └── UserMapper1.java
        │   └── service
        │       └── UserServiceTest1.java
        └── test2
            ├── dao
            |   └── UserMapper2.java
            └──service
                └── UserServiceTest2.java

```


1. 引入jta-atomikos依赖
```xml
<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-jta-atomikos</artifactId>
</dependency>
```
2. 配置文件中配置多个数据源信息
```yaml
test1:
  mysql:
    datasource:
      url: jdbc:mysql://localhost/test1?useSSL=false&useUnicode=true&characterEncoding=utf-8
      driver-class-name: com.mysql.jdbc.Driver
      username: root
      password: root
      minPoolSize: 3
      maxPoolSize: 25
      maxLifetime: 2000
      borrowConnectionTimeout: 30
      loginTimeout: 30
      maintenanceInterval: 60
      maxIdleTime: 60
test2:
  mysql:
    datasource:
      url: jdbc:mysql://localhost/test2?useSSL=false&useUnicode=true&characterEncoding=utf-8
      driver-class-name: com.mysql.jdbc.Driver
      username: root
      password: root
      minPoolSize: 3
      maxPoolSize: 25
      maxLifetime: 2000
      borrowConnectionTimeout: 30
      loginTimeout: 30
      maintenanceInterval: 60
      maxIdleTime: 60
```
3. 数据源配置
```java
@Data
@NoArgsConstructor
@Configuration
@ConfigurationProperties(prefix = "test1.mysql.datasource")
public class DBConfig1 {
    private String url;
    private String username;
    private String password;
    private int minPoolSize;
    private int maxPoolSize;
    private int maxLifetime;
    private int borrowConnectionTimeout;
    private int loginTimeout;
    private int maintenanceInterval;
    private int maxIdleTime;
}

@Data
@Configuration
@NoArgsConstructor
@ConfigurationProperties(prefix = "test2.mysql.datasource")
public class DBConfig2 {
    private String url;
    private String username;
    private String password;
    private int minPoolSize;
    private int maxPoolSize;
    private int maxLifetime;
    private int borrowConnectionTimeout;
    private int loginTimeout;
    private int maintenanceInterval;
    private int maxIdleTime;
}

@Configuration
@MapperScan(basePackages = "cn.willon.test1", sqlSessionTemplateRef = "test1SqlSessionTemplate")
public class DataSourceConfig1 {

    @Bean(name = "test1DataSource")
    public DataSource test1DataSource(DBConfig1 dbConfig1) throws SQLException {
        MysqlXADataSource mysqlDataSource = new MysqlXADataSource();
        mysqlDataSource.setURL(dbConfig1.getUrl());
        mysqlDataSource.setPinGlobalTxToPhysicalConnection(true);
        mysqlDataSource.setUser(dbConfig1.getUsername());
        mysqlDataSource.setPassword(dbConfig1.getPassword());
        AtomikosDataSourceBean xadataSource = new AtomikosDataSourceBean();
        xadataSource.setXaDataSource(mysqlDataSource);
        xadataSource.setUniqueResourceName("test1DataSource");
        xadataSource.setMinPoolSize(dbConfig1.getMinPoolSize());
        xadataSource.setMaxPoolSize(dbConfig1.getMaxPoolSize());
        xadataSource.setBorrowConnectionTimeout(dbConfig1.getBorrowConnectionTimeout());
        xadataSource.setMaxLifetime(dbConfig1.getMaxLifetime());
        xadataSource.setLoginTimeout(dbConfig1.getLoginTimeout());
        xadataSource.setMaintenanceInterval(dbConfig1.getMaintenanceInterval());
        xadataSource.setMaxIdleTime(dbConfig1.getMaxIdleTime());
        return xadataSource;
    }

    //@Primary
    @Bean(name = "test1SqlSessionFactory")
    public SqlSessionFactory sessionFactory(@Qualifier("test1DataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        return bean.getObject();
    }

    //@Primary
    @Bean("test1SqlSessionTemplate")
    public SqlSessionTemplate sqlSessionTemplate(@Qualifier("test1SqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}


@Configuration
@MapperScan(
    basePackages = "cn.willon.test2", 
    sqlSessionTemplateRef = "test2SqlSessionTemplate")
public class DataSourceConfig2 {
    @Bean(name = "test2DataSource")
    public DataSource test2DataSource(DBConfig2 dbConfig2) throws SQLException {
        MysqlXADataSource mysqlDataSource = new MysqlXADataSource();
        mysqlDataSource.setURL(dbConfig2.getUrl());
        mysqlDataSource.setPinGlobalTxToPhysicalConnection(true);
        mysqlDataSource.setUser(dbConfig2.getUsername());
        mysqlDataSource.setPassword(dbConfig2.getPassword());

        AtomikosDataSourceBean xadataSource = new AtomikosDataSourceBean();
        xadataSource.setXaDataSource(mysqlDataSource);
        xadataSource.setUniqueResourceName("test2DataSource");
        xadataSource.setMinPoolSize(dbConfig2.getMinPoolSize());
        xadataSource.setMaxPoolSize(dbConfig2.getMaxPoolSize());
        xadataSource.setBorrowConnectionTimeout(dbConfig2.getBorrowConnectionTimeout());
        xadataSource.setMaxLifetime(dbConfig2.getMaxLifetime());
        xadataSource.setLoginTimeout(dbConfig2.getLoginTimeout());
        xadataSource.setMaintenanceInterval(dbConfig2.getMaintenanceInterval());
        xadataSource.setMaxIdleTime(dbConfig2.getMaxIdleTime());
        return xadataSource;
    }


    @Bean(name = "test2SqlSessionFactory")
    public SqlSessionFactory sessionFactory(@Qualifier("test2DataSource") DataSource dataSource)
     throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        return bean.getObject();
    }

    @Bean("test2SqlSessionTemplate")
    public SqlSessionTemplate sqlSessionTemplate(@Qualifier("test2SqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```
4. Mapper
```java
@Mapper
public interface UserMapper1 {

    @Select("select * from t_user where  id = #{id}")
    User findByid(int id);

    @Select("select * from t_user where name = #{name}")
    User findByName(String name);

    @Insert("insert into t_user(age,name) values (#{age},#{name})")
    void add(User user);
    
    @Select(value = "select * from t_user")
    List<User> findAll();
}
//mapper2类似

```

# 事务管理测试

使用 jta-atomikos 管理事务可以解决问题

```java
@Service
public class UserServiceTest2 {

    @Autowired
    private UserMapper1 userMapper1;
    
    @Autowired
    private UserMapper2 userMapper2;
    
    @Transactional
    public String add(User user) {

        //service2 调用 service1 的业务
        userMapper1.add(user);
        
        //抛出异常，测试 userMapper1 的事务是否成功 
        int i = 1 / 0;
        
        userMapper2.add(user);
        
        return "2_add_";
    }
    
}
```

发送数据测试

```bash
curl -X POST -H "Content-type:application/json" \
--data '{"name":"小明","age":24}' \
 http://localhost:8888/add2
```