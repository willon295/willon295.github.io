---
title: '[Oracle]06_事务'
category: Oracle
tag: Oracle
date: 2018-05-12 00:06:00
---


# commit


`commit` : 提交事务，当在sqlplus执行了许多命令之后，如果没有执行 `commit`，事务就没有执行，此时在新的会话当中，查询不到相应的改变。


# rollback

**事务回滚注意事项：**
- 只有在事务题提交之前可以回滚
- 提交之后数据持久化，不可回滚，所有回滚点失效
- 回滚点 `之后` 的语句会全部失效，之前的语句不会失效

**回滚步骤**
- 记录回滚点： `savepoint A` 
- 回滚至点: `rollback to A`


**举个例子**

```
insert into  user values (1,'KIM',23);
savepoint A;
update user set name='KK' where id=12;
savepoint B;
rollback to A;
```
