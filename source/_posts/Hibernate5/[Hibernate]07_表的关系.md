---
title: '[Hibernate]07_表的关系'
tag: Hibernate
date: 2016-10-12 12:22:33
category: Hibernate
---

# 一对多

比如：班级和学生，一个班级有多个学生。数据库实现是在学生表增加外键，指向班级的主键

## 一对多的映射配置

### 实体类

实体类之间要相互表示

1. Students

```
public class Students {
    private Integer id;
    private String sid;
    private String name;
    private Integer age;
	
	//学生添加一个班级属性
    private  CourseClass courseClass;

	//setter and  getter
	}
```


2. CourseClass

```
public class CourseClass {

    private  Integer  ccid;
    private  String  ccname;
	
	//一个班级有多个学生，用set 表示
	//注意 ，一定要 new HashSet<>() 否则空指针异常
    private Set<Students> students = new HashSet<>();
	
	//setter and  getter
	}
```

### 映射文件

映射文件之间也要相互表示

1. CourseClass.hbm.xml
```
<hibernate-mapping>
    <class name="entity.CourseClass" table="courseclass" >
        <id name="ccid" column="ccid">
            <generator class="native"/>
        </id>
        <property name="ccname" column="ccname"  />
		
		
        <!--使用set标签，name属性写实体类set集合的属性名，-->
        <set name="students" cascade="save-update">

            <!--一对多建表，key对应的是外键，column名称随意，但在多的那方必须是一样的-->
            <key column="csid"/>
			
            <!--一对多关系，class 写对应的多的那方类的全路径-->
            <one-to-many class="entity.Students"/>
			
        </set>
    </class>
</hibernate-mapping>
```

2. Students.hbm.xml
```
<hibernate-mapping>
    <class name="entity.Students" table="students" >
        <id name="id">
            <generator class="native"/>
        </id>
        <property name="name" column="name" />
        <property name="age" column="age" />
        <property name="sid" column="sid"/>
		<!-- 指定属性和其对应的类，并且指定列名，和一的那方保持一致 -->
        <many-to-one name="courseClass" class="entity.CourseClass" column="csid"/>
    </class>
</hibernate-mapping>
```

## 一对多的级联保存

### 配置

在一的那方加入属性`cascade="save-update"`
```
        <set name="students" cascade="save-update">

            <!--一对多建表，key对应的是外键，column名称随意，但在多的那方必须是一样的-->
            <key column="csid"/>
			
            <!--一对多关系，class 写对应的多的那方类的全路径-->
            <one-to-many class="entity.Students"/>
			
        </set>
```
### 代码实战

保存时只需将 `多的一方`添加进`一的那方`，然后`只需`保存`一的那方`就行了
```

        Session  session  = HibernateUtils.getSesion();
        Transaction transaction = session.beginTransaction();
		
		//创建班级
        CourseClass courseClass = new CourseClass();
        courseClass.setCcname("软工2班");

		//创建学生对象
        Students students = new Students();
        students.setName("zhanss");
        students.setSid("20155178786");


		//将学生添加进班级
        courseClass.getStudents().add(students);
		
		//保存班级
        session.save(courseClass);

        transaction.commit();
```

## 一对多的级联删除和修改

### 删除

默认情况下，删除 一 的这方，多的那方的外键会被设置成 null;
(删除某个班级，该班级学生的班级属性会被设置成null)。

如果有一个需求，客户有多个联系人，删除客户之后，客户对应的所有联系人也删除，这个时候需要级联删除
在一的那方加入属性`cascade="delete"`
```
        <set name="students" cascade="save-update,delete">
```

### 修改

默认情况下，外键是双向维护，当多的那方发生修改时，一的那方也会对外键进行一次维护。这样就造成了效率性能的问题。
解决：让一的那方 放弃维护，`set` 标签里的 `inverse` 属性设置为`true`()意思是放弃维护

```
   <set name="students" cascade="save-update,delete" inverse="true">
```

# 多对多

学 生  和 角 色

## 多对多的映射配置

### 实体类

1. Sudents
```
public class Students {
    private Integer id;
    private String name;
    private Set<Role> roleSet =new HashSet<>();
	//setter and getter
	}
```

2. Role
```
public class Role {
    private  Integer  rid;
    private  String rname ;
    private Set<Students> studentsSet  = new HashSet<>();
	//setter and getter
}
```

### 映射文件

1. Students.hbm.xml

```
<hibernate-mapping>
    <class name="entity.Students">
        <id name="id">
            <generator class="native"/>
        </id>
        <property name="name" column="name" />
		
        <!--对应的属性 和第三张表的名称-->
        <set name="roleSet" table="t_rs" cascade="save-update">

            <!--key 属性表示当前实体类Studets  在  第三张表的外键-->
            <key column="sid"/>
            
            <!--many  指定的class 为 role 对应的类和 在 第三张表的外键-->
            <many-to-many class="entity.Role" column="rid"/>
        </set>
    </class>
</hibernate-mapping>
```


2. Role.hbm.xml

```
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-mapping PUBLIC
    "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping>
    <class name="entity.Role" table="role" >
        <id name="rid">
            <generator class="native"/>
        </id>
        <property name="rname"/>
		
		  <!--对应的属性 和第三张表的名称-->
        <set name="studentsSet" table="t_rs">
		
			<!--key 属性表示当前实体类 Role  在  第三张表的外键-->
            <key column="rid"/>
			
			<!--many  指定的 class 为 Students 对应的类和 在 第三张表的外键-->
            <many-to-many class="entity.Students" column="sid"/>
        </set>
    </class>
</hibernate-mapping>
```

## 多对多的级联保存

在经常操作的那方加入属性`cascade="save-update"`

> 多对多一般不会使用级联删除

## 第三张表的维护

1. 让学生拥有某个角色
- 通过id 查询出 学生 和角色
- 将 角色 添加进 学生
- 保存

2. 让学生没有某个角色
- 通过id 查询出 学生 和 角色
- 把 角色 从 学生 set 中 remove 删除
