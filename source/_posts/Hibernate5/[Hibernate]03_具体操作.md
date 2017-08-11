---
title: '[Hibernate]03_具体操作'
tag: Hibernate
id: 101
category: Hibernate
---

# 具体操作

```
		//1. 加载核心配置文件
        Configuration cfg = new Configuration().configure();
        
        /*还可以这样操作
        StandardServiceRegistry registry = new StandardServiceRegistryBuilder().configure().build();
        SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
        */
        
        //2. 创建sessionFactory
        SessionFactory sessionFactory = cfg.buildSessionFactory();
        
        //3. 创建session对象
        Session session = sessionFactory.openSession();

        //4. 创建transaction事物
        Transaction transaction = session.beginTransaction();
        
        
        //5. 具体逻辑操作
        Course c =new Course();
        c.setCname("软件工程");
        c.setCxi("软件学院");

        session.save(c);
        
        
        //6. 提交事务
        transaction.commit();
        
        //7. 关闭资源
        session.close();
        sessionFactory.close();

```

