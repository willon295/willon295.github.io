---
title: '[OAuth2]入门篇_理论基础与架构分析【待完善】'
category: OAuth2
tag: OAuth2
date: 2018-12-20 10:00:00
---



# 使用场景

用微信注册钉钉账号：

1. 用微信账号注册钉钉
2. 钉钉会唤起微信账号授权页面
3. 用户确定授权
4. 返回钉钉注册页面
5. 钉钉读取用户微信基本信息

# 角色划分

那么我们对以上场景进行  **角色划分** 

- 用户 （User、Resource Owner）： 微信账号的拥有者（如：张三）
- 资源服务器 （Resource Server）： 微信存放用户信息的服务器
- 客户端 （Client）： 钉钉
- 授权服务器 （Authorization Server）： 微信控制客户端访问授权的服务器，负责授权码、token管理

那么使用 `OAuth2 ` ， 上面的交互场景工作流程如下：

```
     +--------+                               +---------------+
     |        |----A--是否授权 -------------->|   用户确认    |
     |        |                               |   微信授权    |
     |        |<---B---授权码code-------------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |-----C----授权码code---------->|    微信授权   |
     | 钉钉   |                               |     服务器    |
     |        |<----D---发放Token-------------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |----E------Token-------------->|    微信资源   |
     |        |                               |     服务器    |
     |        |<---F------用户信息------------|               |
     +--------+                               +---------------+
```

# 流程分析

对以上流程每步进行分析

**A流程** ：  用户点击钉钉上的 `用微信注册` ， 钉钉唤起微信， 发出授权请求携带以下信息

```properties
client_id: dingdingxxxxxxx           #表明请求来自钉钉
response_type: authorization_code    #表明返回类型是授权码
scope: user                          #表明需要的授权范围为user
redirect_uri: https://dingtalk.com/register/callback  #表明用户确认后回调的URL
```

**B流程** : 用户在微信上确定授权后， 微信携带 `授权码code`  向  `redirect_uri` 发起 请求， 其他参数封不动的返回

```
https://dingtalk.com/register/callback?code=AAA123456&scope=user
```

此时微信会唤起钉钉， 并且钉钉已获取到授权code， A、B流程结束

**C流程** ： 钉钉携带授权code再次向微信 `授权服务器` 发起请求， 发起的请求数据大致：

```properties
client_id: dingdingxxxxxxx           #表明请求来自钉钉
client_secret: dingdingXXXXX         #客户端加密信息 【可选】
grant_type: authorization_code       #表明凭证类型是授权码
code: AAA123456							 #授权code
scope: user                          #表明需要的授权范围为user
```

**D流程** ： 微信授权服务器返回授权信息，包括
```properties
access_token: er2rsersdf4534sds     #授权token
refresh_token: 9834892sfsdfsf324    #刷新token 
expire_in: 864000						#失效时间
```

**E流程**： 钉钉拿着token请求微信资源服务器 

**F流程**： 微信资源服务器返回钉钉用户信息

 refresh_token 作用：

```
  +--------+                                           +---------------+
  |        |--(A)------- Authorization Grant --------->|               |
  |        |                                           |               |
  |        |<-(B)----------- Access Token -------------|               |
  |        |               & Refresh Token             |               |
  |        |                                           |               |
  |        |                            +----------+   |               |
  |        |--(C)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(D)- Protected Resource --| Resource |   | Authorization |
  | Client |                            |  Server  |   |     Server    |
  |        |--(E)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(F)- Invalid Token Error -|          |   |               |
  |        |                            +----------+   |               |
  |        |                                           |               |
  |        |--(G)----------- Refresh Token ----------->|               |
  |        |                                           |               |
  |        |<-(H)----------- Access Token -------------|               |
  +--------+           & Optional Refresh Token        +---------------+
```