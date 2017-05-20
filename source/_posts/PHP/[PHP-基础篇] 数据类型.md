---
title: '[PHP-基础篇] 数据类型'
tags:
  - PHP
id: 275
categories:
  - PHP
date: 2017-03-15 18:22:27
---
- String（字符串）
- Integer（整型）
- Float（浮点型）
- Boolean（布尔型）
- Array（数组）, Object（对象）
- NULL（空值）

### PHP 数组

数组可以在一个变量中存储多个值。

在以下实例中创建了一个数组， 然后使用 PHP var_dump() 函数返回数组的数据类型和值：

```
<?php 
$cars=array("Volvo","BMW","Toyota");
var_dump($cars);
?>
```
### PHP 对象

对象数据类型也可以用于存储数据。

在 PHP 中，对象必须声明。

首先，你必须使用class关键字声明类对象。类是可以包含属性和方法的结构。

然后我们在类中定义数据类型，然后在实例化的类中使用数据类型：

```
<?php
class Car
{
    var $color;
    function Car($color="green") {
      $this-&gt;color = $color;
    }
    function getColor() {
      return $this-&gt;color;
    }
}
?>
```

实例化以及调用方法

```
<?php
	$carone = new  Car("red");
	echo $carone-&gt;getColor();
?>
```