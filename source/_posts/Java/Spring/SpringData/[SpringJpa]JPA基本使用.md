---
title: '[Spring]SpringDataJPA的基本使用'
date: 2019-03-02 00:00:00
tag: Spring
category: Java
---



# 什么是 JPA

JPA（Java Persistance API） Java持久化API



# SpringBoot整合JPA

在SpringBoot工程中添加JPA依赖，数据库驱动

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.47</version>
</dependency>
```

# 常用注解

SpringDataJPA中可以使用Java的注解
```java
package cn.willon.springjpa.bean;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data // lombok  注解
@Entity
@Table(name = "user2")  // 指定表名
public class User {

    @Id  // 主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 自动生成，指定生成策略
    private Integer id;

    @NotBlank(message = "name不能为空")
    @Column(name = "name")
    private String name;

    @NotBlank(message = "firstName不能为空")
    @Column(name = "firstName")
    private String firstName;

    @NotBlank(message = "lastName不能为空")
    @Column(name = "lastName")
    private String lastName;

    @NotBlank(message = "password不能为空")
    @Column(name = "password")
    private String password;
}
```





# 常用接口

接口的关系

**Repository** ： 顶层接口
**CrudReposiroty**:   定义了简单的 CRUD 方法, 返回集合类型： `Iterable<T>` 
**PagingAndSortingRepository**: CRUD基础上增加了分页、排序的方法
**JpaRespository**:  常用的JPA接口， 返回的集合为 `List<T>` 类型

简单实现： 

```java
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
```


# 如何使用接口

## 新增自定义的查询接口

SpringJPA是根据方法的命名来翻译查询逻辑， 如
```java
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByName(@NotBlank(message = "name不能为空") String name);

    List<User> findDistinctByFirstName(@NotBlank(message = "firstName不能为空") String firstName);

    List<User> findByNameStartingWithAndIdGreaterThan(@NotBlank(message = "name不能为空") String name, Integer id);

}
```

## 简单CRUD

```java
    @Resource
    UserRepository userRepository;

	    @Test
    public void contextLoads() {
        User user = new User();
        user.setPassword("111");
        user.setName("tets");
        user.setFirstName("f");
        user.setLastName("l");
        
        // 返回带自增主键的用户信息
        User save = userRepository.save(user);
    
        PageRequest of = PageRequest.of(0, 2);
        Page<User> userPage = userRepository.findAll(of);
        System.out.println(JSON.toJSONString(userPage));
    }
```


# 注意事项

1. SpringJPA中 `实体类字段` 默认对应的策略是 `驼峰` | `a_b_c`  ---> `a_b_c` 策略， 如 `firstName` 解析成数据库对应的字段 `first_name`, 且 `@Column` 不生效.

2. 如果需要数据库字段与实体字段相同， 则需要配置
   ```yaml
   spring:
     jpa:
        hibernate:
          naming:
            physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
   ```
   开启此项配置之后， 可以使用 `@Column(name = "数据库字段")`  注解手动指定，

3. 实体类参数设置问题

   ```java
           User user = new User();
           user.setPassword("111");
           user.setName("tets");
           User save = userRepository.save(user);  // 执行成功，返回正确数据  
   
   
           User user = new User() {{
               setLastName("lst");
               setFirstName("lst");
               setName("s");
               setPassword("a");
           }};
           User save = userRepository.save(user); 
   		// 执行失败， java.lang.IllegalArgumentException: Unknown entity:xxx
   ```

   
