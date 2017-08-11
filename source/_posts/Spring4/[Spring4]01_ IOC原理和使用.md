---
title: '[Spring4]01_ IOC原理和使用.md'
tag: Spring4
id: 108
category: Spring4
---

`Spring` 通过一种称作`控制反转（IoC）`的技术促进了低耦合

## IOC原理

1. xml配置
2. doc4j解析xml
3. 工厂设计模式
4. 反射

大概的步骤是这样的：

1. 进行 xml 文件配置
```
    <bean id="user1" class="entity.User"/>
```
2. 通过doc4j解析xml，得到类的名称

3. 在工厂里通过反射创建类的实例，并返回

```
public  class UserFactory{
	public  User  getUser(){
	
	//1. 通过doc4j解析xml，得到class属性值
	String className = "class属性值";
	
	//2. 通过反射得到类对象
	Class  userclass = Class.forName(className);
	
	//3. 创建实例
	User  user  = userclass.newInstance();

	//4. 返回
	return  user;
	}
}
```

## 基本使用

1. 导入 jar 包
- `core` 、 `beans`、`context`、`expression`、`common-logging`(这个包不导入会报错)
2. 引入xml 约束，配置bean
```
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

	   //scope： singeton 单例，prototype 多例
    <bean id="user1" class="entity.User" scope="prototype" />
	
</beans>
```
3. bean 的规范
- 有setget方法
- 有无参构造函数
4. 单元测试
```
   @org.junit.Test
    public void  run(){
		//1. 加载xml配置文件
       ApplicationContext context = new  ClassPathXmlApplicationContext("applicationContext");
	   
	   //2. 通过 id 获取实例 
       User  user = (User) context.getBean("user1");
       user.run();
   }
```