---
title: '[Maven]Maven使用规范'
tag: Maven
category: Maven
date: 2018-11-07 00:00:00
---


# 使用规范

1. 一般使用公司的nexus私服, 通用的settings 文件
2. 对外暴露的client项目需要在 `pom.xml`  添加 maven 部署插件, 主要作用是为了在deploy  jar包的同时打source接口源码也打到仓库中
```
<build>
 <plugins>
 <plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-compiler-plugin</artifactId>
 <version>2.3.2</version>
 <configuration>
 <source>1.7</source>
 <target>1.7</target>
 <showWarnings>true</showWarnings>
 <encoding>UTF-8</encoding>
 <debug>true</debug>
 </configuration>
 </plugin>
 <plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-dependency-plugin</artifactId>
 <executions>
 <execution>
 <id>install</id>
 <phase>install</phase>
 <goals>
 <goal>sources</goal>
 </goals>
 </execution>
 </executions>
 </plugin>
 <plugin>
 <groupId>org.apache.maven.plugins</groupId>
 <artifactId>maven-source-plugin</artifactId>
 <executions>
 <execution>
 <id>attach-sources</id>
 <goals>
 <goal>jar</goal>
 </goals>
 </execution>
 </executions>
 </plugin>

 </plugins>
</build>
```



# 包版本控制

1. 版本:  `1.0.2`  <  `1.0.11`  <  `1.0.20` , 不应该出现 `1.0.02` 这种版本号
2. 在项目 `未上线` 的情况下, 开发时打 `版本号-分支名-SNAPSHOT`  快照包 
3. 在项目准备上线时, 从最底层开始打正式包(不带SNAPSHOT), 正式包在原有的版本之上递增
4. 正式包发布之后需告知上层调用者新包版本号