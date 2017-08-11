---
title: '[PHP]02_PHP 变量作用域'
tags:
  - PHP
id: 49
categories:
  - PHP
date: 2017-03-15 17:36:26
---

PHP 有四种不同的变量作用域：

- local
- global
- static
- parameter
&nbsp;

## 局部和全局作用域

- `局部变量`：在 PHP 函数内部声明的变量，仅能在函数内部访问：

- `全局变量`：可以被脚本中的任何部分访问，要在一个函数中访问一个全局变量，需要使用 global 关键字。

```
<?php 
$x=5; // 全局变量 

function myTest() 
{ 
    $y=10; // 局部变量 
    echo "&lt;p&gt;测试函数内变量:&lt;p&gt;"; 
    echo "变量 x 为: $x"; 
    echo "&lt;br&gt;"; 
    echo "变量 y 为: $y"; 
}  

myTest(); 

echo "&lt;p&gt;测试函数外变量:&lt;p&gt;"; 
echo "变量 x 为: $x"; 
echo "&lt;br&gt;"; 
echo "变量 y 为: $y"; 
?>
```
### global 关键字

global 关键字用于函数内访问全局变量。

在函数内调用函数外定义的全局变量，我们需要在函数中的变量前加上 global 关键字：

```
<?php
$x=5;
$y=10;

function myTest()
{
global $x,$y;
$y=$x+$y;
}

myTest();
echo $y; // 输出 15
?>
```

### Static 作用域

当一个函数完成时，它的所有变量通常都会被删除。然而，有时候您希望某个局部变量不要被删除。要做到这一点，请在您第一次声明变量时使用 `static` 关键字：

```
<?php

function myTest()
{
static $x=0;
echo $x;
$x++;
}

myTest();
myTest();
myTest();
?>
```

> 然后，每次调用该函数时，该变量将会保留着函数前一次被调用时的值。