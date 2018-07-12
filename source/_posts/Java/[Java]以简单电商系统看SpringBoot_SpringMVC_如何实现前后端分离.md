---
title: '[Java]以简单电商系统看SpringBoot_SpringMVC_如何实现前后端分离'
tags:
  - Java
  - SpringBoot
category: Java
date: 2018-07-08 00:00:00
---





# 服务端规范、环境

1. 按层次分包 

   | 名称              | 说明               |
   | ----------------- | ------------------ |
   | bean              | 实体类             |
   | common.exception  | 异常类             |
   | common.enu        | 枚举、数据字典     |
   | controller        | 控制器层           |
   | controller.advice | 控制层全局异常处理 |
   | dao               | 数据访问层         |
   | dto               | 数据传输层         |
   | service           | 业务层             |
   | util              | 工具类             |

2. 方法命名

   - 驼峰命名： `动词+形容词+实体类名+副词` ,如  `getValidUserByName()`

3. SpringBoot 2.0.3， jdk-8，maven-3.5，mybatis-3.4 ，MariaDB-10.2.16 

4.  `RESTFUl`  风格 `URI` ，请求类型对应数据操作

   ```json
       GET /users: 逐页列出所有用户    
       HEAD /users: 显示用户列表的概要信息
       POST /users: 创建一个新用户
       GET /users/123: 返回用户 123 的详细信息
       HEAD /users/123: 显示用户 123 的概述信息
       PATCH /users/123 and PUT /users/123: 更新用户123
       DELETE /users/123: 删除用户123
   ```

   



# 前端规范、环境

1. 分包： 根据用户角色不同进行分包 `/user` 、`/admin`
2. H5规范
3. 尽量避免重定向，整个页面重加载
4. Jqery,Ajax



# 前后端交互、职责划分

1. 后端： 接收 JSON 数据 的请求 ---> 处理请求 ---> 返回JSON格式处理结果
2. 前端：  发送JSON，接收JSON ---> 数据解析 --> 页面渲染
3. 必要时使用 cookie、session 

# 注册

1. 监听 `input[name="name"]` 的 `onblur` 事件， `离开输入框` 时发送异步请求 `/isValid/{name}` , 根据返回值 `msg` 判断：
   - OK : 用户名可用
   - 否则： 不可用
2. 根据返回信息异步刷新提示信息
3. 注册信息检查
4. 注册成功直接跳转 `/login.html`





#  登录

1. 登录拦截
2. 自动登录（Cookie）

| url       | type | data           | return          | 前台处理                     |
| --------- | ---- | -------------- | --------------- | ---------------------------- |
| /customer | GET  | 用户信息[JSON] | CustomerMessage | OK：跳转`index`;否则 `login` |



## 登录成功



1. 监听页面加载事件，获取 `cookie ` 用户信息 ， 并显示
2. 请求 `书本信息`
| url   | type | data | return   | 前台处理           |
|---|---|---|---|--- |
| /book | GET  | | List<Book>|显示数据 |


## 修改用户信息

异步请求

| url       | type | data           | return   | 前台处理           |
| --------- | ---- | -------------- | -------- | ------------------ |
| /customer | PUT  | 用户信息[JSON] | Customer | 异步更新显示栏数据 |



# 购物车

## 获取

| 请求路径 | 请求类型 | 返回       | 前台处理   |
| -------- | -------- | ---------- | ---------- |
| /cart    | GET      | Cart{JSON} | cookie保存 |

```json
{
	map: {
			1: 1,
			2: 8,
			3: 9,
			4: 9,
			5: 1,
			6: 18
		},
	total: 46
}
```


## 清空

| 请求路径 | 请求类型 | 返回       | 前台处理   |
| -------- | -------- | ---------- | ---------- |
| /cart    | DELETE   | Cart{JSON} | 删除cookie |

1. 更新session数据
2. 删除 table，更新其显示内容为 `空空如也` 



## 添加

| 请求路径               | 请求类型 | 返回       | 前台处理    |
| ---------------------- | -------- | ---------- | ----------- |
| /cart/{bookid}| POST     | Cart{JSON} | Session保存 |

1. 更新session数据
2. 提示添加成功

##  修改

| 请求路径       | 请求类型 | 返回       |
| -------------- | -------- | ---------- |
| /cart/{bookid} | PUT      | Cart{JSON} |

1. 更新session数据
2. 异步刷新购物车 table数据

## 删除

| 请求路径       | 请求类型 | 返回       | 前台处理    |
| -------------- | -------- | ---------- | ----------- |
| /cart/{bookid} | DELETE   | Cart{JSON} | Session更新 |

1. 更新session数据
2. 异步刷新购物车 table数据





# 订单

## 添加订单

1. 前台点击 `提交订单` 
2. 选择 `付款类型`
3. 封装 `用户信息` 、 `书本id` 、`数量`、  `付款方式`、 `总金额`，为  `data`, 到达控制器之后自动封装成 一个 `Order` 对象

```json
{
    "cost":650,
    "customer":{
        "id":6
     },
    "payway":1,
    "lines":[
        {
            "book":{
                "id":2
            },
            "num":1
        },
        {
            "book":{
                "id":3
            },
            "num":4
        },
        {
            "book":{
                "id":5
            },
            "num":4
        },
        {
            "book":{
                "id":6
            },
            "num":1
        }
    ]
}
```
处理： 

 - 添加订单 `orderform` ,返回 新的  `orderid`
   ```xml
   <insert 
   	id="addWithReturn" 
   	parameterType="Order" 
   	useGeneratedKeys="true" 
   	keyProperty="id">
           insert into 
           orderform (cost, orderDate, customerid, payway)
           values (#{cost}, #{orderDate}, #{customer.id},
   #{payway,typeHandler=com.briup.estore.dao.typeHandler.EnumPaywayHandler})
   </insert>
   ```

   

 - 遍历 `lines` 给每个明细设置 `order` ， 入库。

   > 事物管理， 订单和明细入库要么全失败，要么全成功

4. 请求  

   | 请求路径 | 请求类型 | 请求数据   | 返回         |
   | -------- | -------- | ---------- | ------------ |
   | /order   | POST     | 封装的data | OrderMessage |

   前台处理：

   - 失败： 提示失败，保留购物车信息
   - 成功： 清空购物车， 生成订单，跳转订单列表



## 根据用户id查询订单



| 请求路径                     | 请求类型 | 请求数据   | 返回              |
|---|---|---|---|
| /customer/{customerid}/order | GET      | customerid | List<Order> |


包括： `订单id` ， `订单金额` ，`订单日期`， `订单详情`，`书本信息` ，`用户信息`，`支付方式`  ， `订单状态`
```json
[
    {
        "id":69,
        "cost":776,
        "orderDate":"2018-07-12T03:33:06.000+0000",
        "lines":[
            {
                "id":190,
                "num":11,
                "order":null,
                "book":{
                    "id":2,
                    "name":"Effective Java中文版",
                    "price":39,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            },
            {
                "id":191,
                "num":1,
                "order":null,
                "book":{
                    "id":3,
                    "name":"精通Spring",
                    "price":39,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            },
            {
                "id":192,
                "num":2,
                "order":null,
                "book":{
                    "id":4,
                    "name":"深入浅出Hibernate",
                    "price":59,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            },
            {
                "id":193,
                "num":2,
                "order":null,
                "book":{
                    "id":5,
                    "name":" JAVA编程思想：第3版",
                    "price":95,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            }
        ],
        "customer":{
            "id":6,
            "name":"chen",
            "password":null,
            "zip":"3324444",
            "address":"中国安徽中国",
            "telephone":"188876666",
            "email":"willon@163.com",
            "orders":[

            ]
        },
        "state":"payed",
        "payway":"YJHK"
    },
    {
        "id":72,
        "cost":650,
        "orderDate":"2018-07-12T03:34:55.000+0000",
        "lines":[
            {
                "id":202,
                "num":1,
                "order":null,
                "book":{
                    "id":2,
                    "name":"Effective Java中文版",
                    "price":39,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            },
            {
                "id":203,
                "num":4,
                "order":null,
                "book":{
                    "id":3,
                    "name":"精通Spring",
                    "price":39,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            },
            {
                "id":204,
                "num":4,
                "order":null,
                "book":{
                    "id":5,
                    "name":" JAVA编程思想：第3版",
                    "price":95,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            },
            {
                "id":205,
                "num":1,
                "order":null,
                "book":{
                    "id":6,
                    "name":"Java 2核心技术（第6版） 卷I：基础知识",
                    "price":75,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            }
        ],
        "customer":{
            "id":6,
            "name":"chen",
            "password":null,
            "zip":"3324444",
            "address":"中国安徽中国",
            "telephone":"188876666",
            "email":"willon@163.com",
            "orders":[

            ]
        },
        "state":"payed",
        "payway":"YJHK"
    }
]
```



## 根据 订单id查询明细



| 请求路径    | 请求类型 | 请求数据 | 返回         |
| ----------- | -------- | -------- | ------------ |
| /order/{id} | GET      | oid      | OrderMessage |

包括  `查询结果` 、 `订单id` ， `订单金额` ，`订单日期`，`支付类型`、   `详情id`，`书本信息`

```json
{
    "msg":"OK"，
    "order":{
        "id":69,
        "cost":776,
        "orderDate":"2018-07-12T03:33:06.000+0000",
        "lines":[
            {
                "id":190,
                "num":11,
                "order":null,
                "book":{
                    "id":2,
                    "name":"Effective Java中文版",
                    "price":39,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            },
            {
                "id":191,
                "num":1,
                "order":null,
                "book":{
                    "id":3,
                    "name":"精通Spring",
                    "price":39,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            },
            {
                "id":192,
                "num":2,
                "order":null,
                "book":{
                    "id":4,
                    "name":"深入浅出Hibernate",
                    "price":59,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            },
            {
                "id":193,
                "num":2,
                "order":null,
                "book":{
                    "id":5,
                    "name":" JAVA编程思想：第3版",
                    "price":95,
                    "author":null,
                    "publisher":null,
                    "pageNum":null,
                    "desc":null,
                    "img":null,
                    "type":null
                }
            }
        ],
        "customer":null,
        "state":"payed",
        "payway":"YJHK"
    }
    
}
```



## 删除订单

| 请求路径    | 请求类型 | 请求数据 | 返回         |
| ----------- | -------- | -------- | ------------ |
| /order/{id} | DELETE   | oid      | OrderMessage |

```json
{
	msg: "OK"，
	order: 
		{
			id: 69
		}
}
```

> 订单明细 级联删除

```sql
CREATE TABLE `orderline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` int(11) NOT NULL,
  `orderid` int(11) DEFAULT NULL,
  `bookid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bookid` (`bookid`),
  KEY `orderid` (`orderid`),
  CONSTRAINT `bookid` 
    	FOREIGN KEY (`bookid`) 
    		REFERENCES `book` (`id`) 
    			ON DELETE NO ACTION
    			ON UPDATE CASCADE,
  CONSTRAINT `orderid` 
    	FOREIGN KEY (`orderid`) 
    		REFERENCES `orderform` (`id`) 
    			ON DELETE CASCADE 
    			ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8 
```

