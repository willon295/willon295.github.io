---
title: '[Hibernate]04_简单语句查询'
tag: Hibernate
date: 2016-10-12 12:22:33
category: Hibernate
---

## 查询语言

HQL是一种变相的语言，尽可能使用它，以免出现移植上的问题。特点

- 面向对象
- `关键字`比如 SELECT ，FROM 和 WHERE 等`不区分大小写`
- `属性`比如`表名`和`列名`是区分大小写的

### FROM 语句

其中 Employee 是类名
```
//指定类名
String hql = "FROM Employee";

//也可以指定完整类名
//String hql = "FROM com.hibernatebook.criteria.Employee";

Query query = session.createQuery(hql);
List results = query.list();
```

### SELECT,AS,WHERE语句

AS 用来给类分配别名[AS可以省略]
```
String hql = "FROM Employee AS E";
//也可以这么写
//String hql = "FROM Employee  E";

Query query = session.createQuery(hql);
List results = query.list();
```

SELECT，WHERE用来限制查询结果

```
//E.firstname的 firstname是属性，不是列名
String hql = "SELECT  E.firstname ,  E.salary  FROM Employee  E  WHERE  E.id=10";
Query query = session.createQuery(hql);
List results = query.list();
```

### ORDER BY,GROUP BY语句

ORDER BY 语句多属性进行排序，用逗号进行分割：
```
String hql = "FROM Employee E WHERE E.id > 10 " +
             "ORDER BY E.firstName DESC, E.salary DESC ";
Query query = session.createQuery(hql);
List results = query.list();
```

GROUP BY 语句的语法:
```
String hql = "SELECT SUM(E.salary), E.firtName FROM Employee E " +
             "GROUP BY E.firstName";
Query query = session.createQuery(hql);
List results = query.list();
```

### 传参

类似于PrepareStateMent的传参，防 SQL 注入。
```
//冒号 + 变量名
String hql = "FROM Employee E WHERE E.id = :e_id";
Query query = session.createQuery(hql);

//setParameter方法传入参数的值
query.setParameter("e_id",10);
List results = query.list();
```


### UPDATE语句

query查询接口包含一个 executeUpdate() 方法，可以执行UPDATE 或 DELETE 或 INSERT语句。
UPDATE 可更新一个或多个对象的一个或多个属性

```
String hql = "UPDATE Employee set salary = :salary "  + 
             "WHERE id = :employee_id";
Query query = session.createQuery(hql);
query.setParameter("salary", 1000);
query.setParameter("employee_id", 10);
int result = query.executeUpdate();
```


### DELETE语句

DELETE 语句可以用来删除一个或多个对象

```
String hql = "DELETE FROM Employee "  + 
             "WHERE id = :employee_id";
Query query = session.createQuery(hql);
query.setParameter("employee_id", 10);
int result = query.executeUpdate();
```


### INSERT语句

只有当记录`从一个对象`插入到`另一个对象`时才支持 INSERT INTO 语句

```
String hql = "INSERT INTO Employee(firstName, lastName, salary)"  + 
             "SELECT firstName, lastName, salary FROM old_employee";
Query query = session.createQuery(hql);
int result = query.executeUpdate();
```

### 分页查询

```
String hql = "FROM Employee";
Query query = session.createQuery(hql);
query.setFirstResult(1);
query.setMaxResults(10);
List results = query.list();
```

### DISTINCT去重复

有时候表中的某条数据可能有多条记录，distinct让它只出现一次
```
String hql = "SELECT count(distinct E.firstName) FROM Employee E";
Query query = session.createQuery(hql);
List results = query.list();
//这里列出所有的姓氏，不重复
```

### 常用的方法

1. avg(propertyName) : 属性的平均值
2. count(propertyName or * )	: 属性在结果中出现的次数
3. max(propertyName)	: 属性值的最大值
4. min(propertyName )	: 属性值的最小值
5. sum(propertyName)	: 属性值的总和


## Criteria查询

```
//已经不推荐使用了
Criteria criteria =session.createCriteria(User.class);
List<User>  list = criteria.list();
```

## SQL查询

```
//已经不推荐使用了
SQLQuery sqlQuery =session.createSQLQuery("select  * from  user;");
sqlQuery.addEntity(User.class);
List<User>  list = sqlQuery.list();
```
