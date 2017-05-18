---
title: '[Python3]003_布尔类型详解'
tags:
  - python3
id: 314
categories:
  - Python3
date: 2017-04-16 20:51:31
---

### 布尔类型详解

先来看一段代码

    a = "A"
    b = "B"
    c = ""
    d = 0
    print( a or b)
    print ( a or c )
    print (c or a )
    print  (d or a )
    print (a and  b)
    print (c or  a   and  b)
    `</pre>

    运行结果

    <pre>`A
    A
    A
    A
    B
    B
    `</pre>

    **讲解**

    1、  `0` 和 空值 `""` 表示 `False`

    2、逻辑运算是，字符不为空即为 `True`

    3、`and` , `or` ,  `not`逻辑运算

    <pre>`#--------and--------
    True and True   # ==&gt; True
    True and False   # ==&gt; False
    False and True   # ==&gt; False
    False and False   # ==&gt; False
    #--------or---------
    True or True   # ==&gt; True
    True or False   # ==&gt; True
    False or True   # ==&gt; True
    False or False   # ==&gt; False
    #--------not--------
    not True   # ==&gt; False
    not False   # ==&gt; True
    