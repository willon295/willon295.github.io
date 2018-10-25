---
title: '[Maven]01_maven基本使用'
category: maven
tag: maven
date: 2017-10-08 00:00:51
---

# 安装

1. 下载相应的压缩包
2. 解压
3. 配置环境变量
```
	export M2_HOME=/usr/local/lib/maven3.1
	export PATH=$M2_HOME/bin:$PATH
```
4. 测试
```
	mvn -v
```

# 基本命令

- `mvn -v` ：查看版本号
- `mvn compile`： 编译
- `mvn test`：测试
- `mvn package`： 打包项目
- `mvn clean`： 删除target目录
- `mvn install`： 安装jar包到本地仓库

# 使用国内镜像源

1. 修改maven安装目录下的`conf/settings.xml` 文件，使用阿里云镜像
```
  <mirrors>
	 <mirror>
		<id>nexus-public-snapshots</id>
		 <mirrorOf>public-snapshots</mirrorOf>
		 <name>Aliyun Maven</name>
		 <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    	</mirror>
  </mirrors>
```
2. 如果用户目录下存在 `.m2/settings.xml`文件，同样要修改

# 开始使用

## java项目的自动构建

按照提示进行项目的构建
```
mvn archetype:generate
```
构建会按照提示，需要以下的信息

```
[INFO]package： cn.willon.maven02（代码所在的包）
[INFO]groupId: cn.willon.maven02（组织名，公司网址反写+项目名）
[INFO]artifactId: maven02-service（项目名-模块名）
[INFO]packageName: cn.willon.maven02
[INFO]version: 1.0-SNAPSHOT（版本号）

```
或者直接使用参数构建：
```
mvn archetype:generate -DgroupId=组织名 -DartifactId=项目名-模块  -Dversion=版本号 -Dpackage=包名
```

构建完成之后项目的结构

```
└── maven02-service
    ├── pom.xml
    └── src
        ├── main
        │   └── java
        │       └── cn
        │           └── willon
        │               └── maven02
        │                   └── App.java
        └── test
            └── java
                └── cn
                    └── willon
                        └── maven02
                            └── AppTest.java

```
## JavaWeb项目的自动构建

```
mvn archetype:generate  -DgroupId=cn.willon.maven03 -Dpackage=cn.willon.maven03  -DartifactId=maven03-demo  -Dversion=0.0.1-SNAPSHOT -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false

```
构建完成之后的项目基本结构是

```
├── pom.xml
└── src
    └── main
        ├── resources
        └── webapp
            ├── index.jsp
            └── WEB-INF
                └── web.xml

```


# 解决问题

1. 如果出现了编译失败，版本小于1.6的可以手动配置编译器的版本
```
  <properties>
  <--这里是解决中文乱码 -->
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    
    <-- 修改编译器版本号-->
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>
```
