---
title: '[Struts2]IDEA构建项目注意事项'
tag: Struts2
category: Struts2
date: 2016-10-13 12:22:33
---

# Struts2项目

## Struts2搭建

1. 自动挡
- 选择webAPP
- 点上Struts2
- 选择外部Struts2库
2. 手动挡
- 选择webAPP
- 导入 jar 包
- `web.xml` 文件,添加Struts过滤器
- src 里new 一个`struts.xml文件`
- 将 所有的Struts 的 xml 配置文件 添加进 `facet`

## struts2项目部署运行

artifact不能包含 lib的一堆 jar 库，否则编译时直接报错。

## 打包Javaweb项目

选择 `artifact-achieve` ，然后build
> 注意不能包含jar包,否则程序提示无法找到 `struts-default.xml`


# JUnit单元测试

1. 导入`junit-4.9.jar` 和 `hamcrest-core-1.3.jar`
2. 项目根目录 新建 文件夹 `juniu-test`
3. 选择 `Mark As --> Test  Folder`
4. 新建 `Test.java` 类
5. 写代码
```
@Before
 public void init() throws Exception {
	//这里写初始化代码
 }
 
@Test
public void test() {
	//这里写test代码段
}

@After
public void destroy(){
	//这里写结束代码
}
```
6. run 起来


## 解决Tomcat包引起的问题

1. 将所有需要的jar包放进 项目/WEB-INF/lib 目录

## 注意事项

1. 在`input标签`的`value属性`里面，`<s:property value="" /> `之后`不要留有空格`，否则所有的值都有`空格`，无法调用action。
