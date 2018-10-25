---
title: '[Hibernate]08_常用的功能性查询'
tag: Hibernate
date: 2016-10-12 12:22:33
category: Hibernate
---

# HQL

HQL  需要使用 `Query` 对象，通过改变该对象内的HQL语句实现各种功能，也是推荐使用的

-  查询所有

```
Query query  = session.createQuery("from Students ");
List<Students> l =  query.list();
```

-  条件查询
```
//可以用 ？ 设置占位符
Query query  = session.createQuery("from Students s where s.name=?");
//注意，传参是从  0  开始的 
query.setParameter(0,"s1");
List<Students> l =  query.list();

```

-  排序查询
```
//asc 是升序，desc 是降序
Query query  = session.createQuery("from Students s order by s.id desc ");
List<Students> l =  query.list();
```

-  分页查询
```
Query query = session.createQuery("from Students ");
//设置查询的起始位置 和 最大的记录数
query.setFirstResult(0);
query.setMaxResults(5);
List<Students> l = query.list();
```

-  投影查询
```
String ss = "select s.id , s.name from  Students  s";
Query query = session.createQuery(ss);
List<Students> l = query.list();
```

-  聚合函数
```
String ss = "select count(*) from  Role ";
Query query = session.createQuery(ss);

//通过此方法获取结果数
Long  size = (Long) query.uniqueResult();
int  ssize =size.intValue();
System.out.println(ssize);

```


# QBC

-  所有查询
```
Criteria criteria = session.createCriteria(Role.class);
List<Role>  list = criteria.list();
```

-  条件查询

```
Criteria criteria = session.createCriteria(Role.class);
//查询 id=2
criteria.add(Restrictions.eq("id",2));
List<Role>  list = criteria.list();
```

-  排序查询
```
Criteria criteria = session.createCriteria(Role.class);
//id 升序查询
criteria.addOrder(Order.asc("id"));
List<Role>  list = criteria.list();
```

-  分页查询

```
Criteria criteria = session.createCriteria(Role.class);
criteria.setFirstResult(0);
criteria.setMaxResults(10);
List<Role>  list = criteria.list();
```

-  离线查询
