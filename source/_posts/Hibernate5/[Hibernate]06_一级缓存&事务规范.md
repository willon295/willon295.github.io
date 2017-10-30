---
title: '[Hibernate]05_一级缓存&事务规范'
tag: Hibernate
date: 2016-10-12 12:22:33
category: Hibernate
---

# 一级缓存

由于数据库的操作耗费系统资源，Hibernate提供缓存机制。

1. 查询时
- 数据库查询
- 将查询结果保存在一级缓存中
- 同时创建快照并放入快照区
- 再次查询时 先访问一级缓存，若无此对象则查询，有则直接返回
2. 修改时
- 修改一级缓存对象
- 不会修改快照区的对象
- 提交事务时，会比较一级缓存和快照区的内容：不相同，将一级缓存内容更新到数据库。相同则不会

# 事务规范

```
SessionFactory sf = null;
Session session = null;
Transaction ta = null;
try {
	sf = HibernateUtils.getSessionFactory();
	session = sf.openSession();
	User  u = new  User();
	u.setName("xiaowang");
	session.save(u);
	ta.commit();
}catch (Exception e){

	//若是提交失败，则回滚
	session.rollBack();
}finally{

	//最终关闭资源
	session.close();
	sf.close();

}
```
