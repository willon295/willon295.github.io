---
title: '[Linux]Curl发送各种请求'
tag: Linux
category: Linux
date: 2018-06-28 00:00:00
---



1. DELETE
```
curl -X DELETE http://127.0.0.1:8080/tv/101
```
2. GET
```
curl -X GET http://127.0.0.1:8080/tv/101
```
3. POST、PUT
- 发送普通 JSON 表单
```
curl -X POST -H "Content-type:application/json" --data '{ "name":"chen","age":23,"gender":"male"}'  http://127.0.0.1:8080/tv/101
```
- 发送文件
```
#`@`表示文件
curl  -X POST -F "photo=@2370.jpg" http://localhost:8080/tv/102/photos

```
