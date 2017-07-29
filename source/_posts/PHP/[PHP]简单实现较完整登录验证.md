---
title: "[PHP]简单实现较为完整的身份验证"
tag: PHP
category: PHP

---

### check.php

功能：用于检测当前用户是否登录。
- 已登录：不做操作
- 未登录：强制跳转至`login.php`
代码：
```
<?php
session_start();
echo $_SESSION['login'];
if(empty($_SESSION['login'])){
    $url = "login.php";
    header("Location: $url");
}
?>
```

### index.php
功能：显示主要的信息
- include check.php文件

代码：

```
<?php

include "check.php";

?>

```

### login.php文件的验证
功能：登录和跳转
- 已登录：自动跳转index.php
- 未登录：不做任何操作

代码：
```
<?php
session_start();
if (!empty($_SESSION['login'])){
    $url = "index.php";
    header("Location: $url");
}
?>
```
