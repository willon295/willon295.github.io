---
title: '[Hibernate]06_本地线程绑定的session'
tag: Hibernate
date: 2016-10-12 12:22:33
category: Hibernate
---

## 1、配置文件

```
        <property name="current_session_context_class">thread</property>
```

## 2、代码

调用sessionFactory.getCurrentSession()获取session对象

```
public class HibernateUtils {
    private static SessionFactory factory;

    static {
        try {
            //读取hibernate.cfg.xml文件  
            Configuration cfg = new Configuration().configure();
            //建立SessionFactory  
            factory = cfg.buildSessionFactory();
        }catch(Exception e) {
            e.printStackTrace();
        }
    }

    public  static  Session getCurrentSession(){
        return  factory.getCurrentSession();
    }

}  
```

## 3、注意

不需要手动关闭 session 对象,实际项目中factory也不关闭
