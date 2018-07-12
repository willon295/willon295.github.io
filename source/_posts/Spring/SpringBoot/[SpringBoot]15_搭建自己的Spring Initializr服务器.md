---
title: ' [SpringBoot]15_搭建自己的Spring Initializr服务器'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:14:00
---



使用 [Spring Initializr]( http://start.spring.io)  创建项目是个不错的选择，但是由于不是天朝的服务器，所以体验不是很好。逛了一逛csdn， 发现千篇一律的文章， 也不知道是谁抄袭谁的， 个人感觉这是一个很不好的现象。发现他们的搭建步骤，可能我运气不好，可能也是因为菜吧， 反正是搭建失败。 于是自己看官方文档摸索出了一个 自认为 是 ` 最简单` 的搭建步骤。

#  开始搭建






1. 安装 maven ： 这个就跳过。
2. 下载  `Spring Initializr`  源码
```
git clone  https://github.com/spring-io/initializr.git
```
3. 比如我克隆的项目在  `~/Others/initializr` 
    因为  `initializr-docs` 项目有问题，构建失败，导致 `initializr-service` 失败，所以删除 `initializr-docs`， 删除 `pom.xml ` 中的 `<module></module>` 中的依赖， 接下来开始构建 ：

  ```bash
  cd ~/Others/initializr
  mvn clean install -Pfull
  ```

  

4. 全部构建完毕之后 ， 把 `需要的jar` 文件,拷贝出来：

   ```
   ~/.m2/repository/io/spring/initializr/initializr-service/0.6.0.BUILD-SNAPSHOT/initializr-service-0.6.0.BUILD-SNAPSHOT.jar
   ```

5. 运行,并且指定 监听端口

   ```
   java -jar initializr-service-0.6.0.BUILD-SNAPSHOT.jar --server.port=9000
   ```

   

# 运行截图



![](/images/spring_boot_inititalizr.png)



分享自己的 Spring initializr

http://willon.cn:9000