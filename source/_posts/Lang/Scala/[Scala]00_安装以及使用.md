---
title: '[Scala]00_Scala安装'
tag: Scala
category: Scala
date: 2018-01-01 00:00:34
---


# 简介

`Scala` 是一门类基于JVM面向对象、多范式的语言，开发十分便捷，大数据处理中的 `Spark` 框架是使用Scala编写的


# 安装

1. 下载 [Scala SDK](http://www.scala-lang.org/download/) 源码包
2. 解压 `tar -zxf scala-xxx.tgz -C /usr/local/lib/scala`
3. 配置环境变量，编辑 `~/.bashrc` 或者 `/etc/profile`,加入
```
export SCALA_HOME=/usr/local/lib/scala
```
4. 测试
```
scala -v
//出现Scala相关信息则表示成功
```

# IDEA搭建Scala环境

IDEA现已支持 Scala，简单配置
1. `File->Settings->Plugins` ,搜索并且安装 `Scala` 插件
2. 创建项目 `New->Project->Scala(idea) -> 选择Scala SDK目录-> 完成`

# 简单的测试

1. HelloWorld.scala
```
class HelloWorld {
  def hello(): Unit ={
    print("Hello")
  }
}
```
2. 测试类 `Test.java`
```
import org.junit.Test;
public class HelloWorldTest {
    @Test
    public void main() throws Exception {
       HelloWorld h= new HelloWorld();
       h.hello();
    }
}
```
