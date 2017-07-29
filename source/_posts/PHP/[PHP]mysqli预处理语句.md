---
title: '[PHP]mysqli预处理语句'
tag: PHP
category: PHP
---

# 增删改的预处理

```
//创建数据库连接
$conn = mysqli_connect($host_name, $db_user, $db_pass, $db_name) or die( "连接失败");

//指定字符编码
mysqli_query($conn,"set names utf8;");

//创建sql 语句，设置占位符 ？
$sql = "insert  into   user  (name ,pass ) values  (?,?);";

//创建预处理执行对象
$prestat = $conn->prepare($sql);

//定义变量
$username = "张三";
$userpass  =  '123456798';

/*将变量与d对应的占位符进行绑定
*第一个参数是字符串 ：表示插入的数据类型
 *   i ： 表示integer
 *   d : 表示double
 *    s : 表示string
 * */
$prestat->bind_param("ss", $username,$userpass);

//执行预处理语句,返回值是 TRUE  , FALSE 
$prestat->execute();
```

# 查询的预处理

```
$conn = mysqli_connect($host_name, $db_user, $db_pass, $db_name) or die( "连接失败");
//指定字符编码
mysqli_query($conn,"set names utf8;");
//创建sql 语句，设置占位符 ？

$sql = "select  * from user   where  name =?";

//创建预处理执行对象
$prestat = $conn->prepare($sql);

//定义变量
$username = "张三";

/*将变量与d对应的占位符进行绑定*/
$prestat->bind_param("s", $username);


//执行预处理语句,返回值是 TRUE  , FALSE 
$prestat->execute();

//储存返回结果
$prestat->store_result();


//将结果集对应的 列 的值  绑定到变量中
$prestat->bind_result($id,$name,$pass);

//取出所有存储的结果
while ($prestat->fetch()){
    echo $id."---".$name."---".$pass."<br>";
}

```