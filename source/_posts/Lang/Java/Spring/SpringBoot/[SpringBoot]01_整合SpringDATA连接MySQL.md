---
title: '[SpringBoot]01_整合SpringDATA连接MYSQL'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:01:00
---

# 什么是Spring Data

一个组件，可以让开发者快速实现各种数据库的操作，不用写多余的代码

## 入门案例

1. maven
```
	<dependencies>

		<!--1. Spring Boot-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
            <version>${boot.version}</version>
		</dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
            <version>${boot.version}</version>
        </dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<version>${boot.version}</version>
			<scope>test</scope>
		</dependency>


        <!--2. 数据库驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.40</version>
        </dependency>

        <!--3. Spring Data-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
            <version>${boot.version}</version>
        </dependency>


    </dependencies>


	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
        </plugins>
	</build>
```
2. application.yml
```
server:
  port: 8888
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test?useSSL=false&useUnicode=true&characterEncoding=utf-8
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
```
3. JavaBean
```

import javax.persistence.*;

/**
 * 一定要写Entity、Table、主键id约束一定要写
 */
@Entity
@Table(name = "t_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String  password;

    public User() {
    }

    public User(int id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
```
4. DAO
```

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO  extends JpaRepository<User,Long> {

}

```
5. Controller
```
@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserDAO userDAO;

    @RequestMapping("")
    public String index() {
        return "Hello ";
    }

    @RequestMapping("list")
    public Object list() {
        return  userDAO.findAll();
    }
}
```
6. 入口
```
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

```
6. 浏览器访问 `http://localhost:8889/user/list`

