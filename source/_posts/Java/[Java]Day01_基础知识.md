---
title: '[Java]反码补码字节'
category: Java
tag: Java
date: 2018-05-12 00:00:00
---


# 源码反码补码

1. 源码
二进制表示
2. 反码
源码的符号位不变其他位 `加1`
3. 补码
源码 `取反加1` ， 内存中的数据用补码保存



# Java的8种数据类型


`byte` ，    `short` ，  `char`  ， `int`  ， `float` ，  `double`  ，`long`


# Java中的字节


|数据类型|字节数|位数|
|---|---|---|
|Byte|1|8|
|Short|2|16|
|Character|2|16|
|Integer|4|32|
|Float|4|32|
|Double|8|64|
|Long|8|64|




# Java运算符优先级


比较 > 异或 > 赋值

# a++ , ++a

a++ ,先运算，后++，给a赋值;
++a ,先++,给a赋值 ，后做其他运算;

# Java异常

1. finally一定会在return之前执行，但是如果finally使用了return或者throw语句，将会使trycatch中的return或者throw失效
2. finally中return语句会覆盖try-catch中的return语句


# Java初始化

1. static 修饰的变量会被默认初始化
2. 方法内的变量必须初始化赋值

# abstract

1. 抽象类不可以被实例化
2. 抽象方法不可以有方法体
