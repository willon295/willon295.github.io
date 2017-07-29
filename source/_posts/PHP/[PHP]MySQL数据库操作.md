---
title: '[PHP]mysql数据库操作'
tag: PHP
category: PHP

---


# PHP数据库操作
## 连接数据库
```
#连接数据库
$host_name = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "db_test";
$link = mysqli_connect($host_name, $db_user, $db_pass, $db_name) or die("failed to  connect ");

```

## 设置字符编码
```
#解决中文乱码
mysqli_query($link, "set names utf8");

```


## 执行SQL语句
```
#创建并且执行sql语句
$sql = "SELECT  * FROM user; ";
$result = $link->query($sql, 1);
```

## 返回值说明

1. 增删改的返回值
    - true ：执行成功
    - false: 执行失败
2. 查询的返回值
    返回一个`mysqli_result`对象

3. 获取`mysqli_result`对象内容；
    ```
    #根据对应的列名获取相应的值
    while ($ss = $result->fetch_array()) {
            $ss['id'];
            $ss['name'];
            $ss['pass'];
    }
    ```

