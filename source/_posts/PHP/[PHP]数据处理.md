---
title: '[PHP]表单，编码，跳转操作'
category: PHP
tag: PHP

---

# PHP表单处理、页面跳转、编码
## 获取表单元素
1. GET数据获取：使用全局变量`_GET`
    
    ```
    #举个栗子
    $name=_GET['name'];
    $pass=_GET['pass'];
    ```
    直接获取get提交的数据，`a`标签也是get提交

2. POST数据获取：使用全局变量`_POST`
    ```
    #举个栗子
    $name=_POST['name'];
    $pass=_POST['pass'];
    ```

## 页面跳转
1. 使用`header()`函数
    ```
    #举个栗子
    $url = "../view/index.php";
    header( "Location: $url" );
    ```
2. 使用`<meta>`标签
    ```
    <meta http-equiv="Refresh" content="0;url=other.html">
    ```

3. 使用`js` 脚本
    ```
    <script>
    window.onload.href="other.html";
    </script>
    ```

## 编码

1. `view`文件的编码：`<meta charset="utf-8">`
2. 非`view`文件的编码：
    - 页面编码：
        ```
        header("Content-type: text/html; charset=utf-8");
        ```
    - mysql数据查询编码
        ```
        #注意这里是 utf8 不是utf-8
        mysqli_query($link, "set names utf8");
        ```
