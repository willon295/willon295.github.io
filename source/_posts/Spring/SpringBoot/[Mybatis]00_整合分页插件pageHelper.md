---
title: '00_整合分页插件pageHelper'
tag: Mybatis
category: Mybatis
date: 2017-07-01 00:00:00
---



# 如何使用



此项目基于 ` SpringBoot` , 依赖 `pagehelper-spring-boot-starter` , `common-lang3`

1. 依赖
```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.5</version>
</dependency>

<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
</dependency>
```
2. pageHelper配置信息
```yaml
# pageHelper分页配置
pagehelper:
  helper-dialect: mysql
  reasonable: true
  support-methods-arguments: true
  params: count=countSql
  page-size-zero: true
```
3. 业务层使用

```java
    @Transactional
    public PageInfo<User> findAll(int page, int pageSize) {
        PageHelper.startPage(page, pageSize);
        List<User> all = userMapper.findAll();
        return new PageInfo<>(all);
    }

```
4. 测试
```
http://localhost:8888/list1?page=4&pageSize=2
```
5. 返回数据
```json
{
	"total": 8,
	"list": [{
		"id": 19,
		"age": 24,
		"name": "lisi"
	}, {
		"id": 20,
		"age": 24,
		"name": "wanghwh"
	}],
	"pageNum": 4,
	"pageSize": 2,
	"size": 2,
	"startRow": 7,
	"endRow": 8,
	"pages": 4,
	"prePage": 3,
	"nextPage": 0,
	"isFirstPage": false,
	"isLastPage": true,
	"hasPreviousPage": true,
	"hasNextPage": false,
	"navigatePages": 8,
	"navigatepageNums": [1, 2, 3, 4],
	"navigateFirstPage": 1,
	"navigateLastPage": 4,
	"lastPage": 4,
	"firstPage": 1
}
```

# 原理剖析

通过代理,拦截方法,拼接 `limit` 语句,执行查询

过程: 
```java
       PageHelper.startPage(page, pageSize);
       List<User> userList = userMapper.findAll();
       PageInfo<User> pageUserInfo =  new PageInfo<>(userList);
    
```

关键源码: 
```java
public abstract class PageSqlSource implements SqlSource {
 /**
     * 获取正常的BoundSql
     *
     * @param parameterObject
     * @return
     */
    protected abstract BoundSql getDefaultBoundSql(Object parameterObject);
 
    /**
     * 获取Count查询的BoundSql
     *
     * @param parameterObject
     * @return
     */
    protected abstract BoundSql getCountBoundSql(Object parameterObject);
 
    /**
     * 获取分页查询的BoundSql
     *
     * @param parameterObject
     * @return
     */
    protected abstract BoundSql getPageBoundSql(Object parameterObject);
 
    /**
     * 获取BoundSql
     *
     * @param parameterObject
     * @return
     */
    @Override
    public BoundSql getBoundSql(Object parameterObject) {
        Boolean count = getCount();
        if (count == null) {
            return getDefaultBoundSql(parameterObject);
        } else if (count) {
            return getCountBoundSql(parameterObject);
        } else {
            return getPageBoundSql(parameterObject);
        }
    }
}

```
那么也就是说 `userMapper.findAll();` 此时查询出来的结果已经 `不是全部`, 而是分页查询的结果

**new PageInfo<>(userList)干了什么?**


PageInfo源代码:

```java
public class PageInfo<T> extends PageSerializable<T> {
    private int pageNum;
    private int pageSize;
    private int size;
    private int startRow;
    private int endRow;
    private int pages;
    private int prePage;
    private int nextPage;
    private boolean isFirstPage;
    private boolean isLastPage;
    private boolean hasPreviousPage;
    private boolean hasNextPage;
    private int navigatePages;
    private int[] navigatepageNums;
    private int navigateFirstPage;
    private int navigateLastPage;

    // 传入一个带有类型的 list 的构造器
    public PageInfo(List<T> list) {
        this(list, 8);
    }
}
```


