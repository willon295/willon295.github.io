---
title: '[Maven]项目打包最佳实践'
category: Maven
tag: Maven
date: 2018-12-22 00:00:00
---



# 最初的打包方式、问题

在项目不大的情况下， 我们通常会将SpringBoot项目整个项目打成一个jar包， 这个jar包里面包括

1. 编译后的 class 文件
2. yml、properties 配置文件
3. 依赖的jar包

那么这这么做有几个问题
1. jar 包会十分臃肿
2. 一旦涉及修改配置， 需要修改jar包， 重新打包



# 改变传统

现在我们想要的结果是

```bash
└── test-app-final       #项目
    ├── conf/            #存放SpringBoot的yml配置文件
    ├── lib/             #存放项目依赖jar包
    └── test-app-final.jar   #只存放编译的class文件
```

并且实现程序运行时： 

1. 自动加载  `conf`  目录的配置文件 
2. 自动加载 `lib` 目录 的依赖包

# 动手实现

## pom文件修改

```xml
    <build>
        <plugins>
            <!--jar包插件-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.0.2</version>
                <configuration>
                    <archive>
<!--设置程序启动： 入口类，加载lib下jar包 ，加载conf配置文件-->
                        <manifest>
                            <mainClass>cn.willon.test.Application</mainClass>
                            <addClasspath>true</addClasspath>
                            <classpathPrefix>lib/</classpathPrefix>
                        </manifest>
                        <manifestEntries>
                            <class-path>conf/</class-path>
                        </manifestEntries>
                    </archive>
                    <excludes>
                        <exclude>**/*.yml</exclude>
                    </excludes>
                </configuration>
            </plugin>

            <!--文件打包assembly插件-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-assembly-plugin</artifactId>
                <version>2.6</version>
                <configuration>
                    <descriptor>src/main/assembly/assembly.xml</descriptor>
                    <!--项目文件夹名称-->
                    <finalName>test-app-final</finalName>
                    <appendAssemblyId>false</appendAssemblyId>
                    <outputDirectory>../</outputDirectory>
                    <tarLongFileMode>posix</tarLongFileMode>
                </configuration>
                <executions>
                    <execution>
                        <id>make-assembly</id>
                        <phase>package</phase>
                        <goals>
                            <goal>single</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <!--这个插件需要放在最后-->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

## 文件打包插件assembly

```xml
<assembly>
    <id>assembly</id>
    <formats>
        <!-- 最终文件为 tar.gz 格式 -->
        <format>tar.gz</format>
    </formats>
    <includeBaseDirectory>true</includeBaseDirectory>
    <fileSets>
        <!-- 文件主体jar包 -->
        <fileSet>
            <directory>${basedir}/${project.build.directory}/</directory>
            <includes>
                <include>${project.build.finalName}.${project.packaging}</include>
            </includes>
            <outputDirectory>/</outputDirectory>
        </fileSet>
        <!-- 将resources目录下的所有配置文件放在 conf目录 -->
        <fileSet>
            <directory>${basedir}/${project.build.directory}/classes</directory>
            <includes>
                <include>**/*.yml</include>
                <include>**/*.xml</include>
            </includes>
            <outputDirectory>/conf</outputDirectory>
        </fileSet>
    </fileSets>
    <dependencySets>
        <dependencySet>
            <scope>runtime</scope>
            <excludes>
                <exclude>${groupId}:${artifactId}</exclude>
            </excludes>
            <outputDirectory>/lib</outputDirectory>
        </dependencySet>
    </dependencySets>
</assembly>
```