---
title: '[Spring4]02_bean属性注入'
tag: Spring4
id: 109
category: Spring4
---

分为几类：
- 普通数据类型属性注入
- 复杂类型属性注入（对象，集合）
直接看代码：

1. User
```
public class User {
    private  String  username;
    private List  list;
    private Map map =new HashMap();
    private Book  book;
	//setter and getter...
	}
```

2. applicationCotext.xml
```

    <bean id="book" class="entity.Book">
		//普通数据类型属性注入
        <property name="bname" value="mybook"/>
    </bean>
	
    <bean id="user1" class="entity.User">
        <property name="username" value="小王"/>
		
		//对象类型注入，ref 指向已经配置的 bean 的 id
        <property name="book" ref="book"/>
		
		//list数据类型属性注入
        <property name="list">
            <list>
                <value>list1</value>
                <value>list2</value>
                <value>list3</value>
            </list>
        </property>
		
		//Map类型属性的注入
        <property name="map">
            <map>
                <entry key="aa" value="aaaaa"/>
                <entry key="bb" value="bbbbb"/>
                <entry key="cc" value="ccccc"/>
            </map>
        </property>
    </bean>
```