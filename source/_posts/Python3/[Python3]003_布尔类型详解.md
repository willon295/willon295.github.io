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

```
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
     

   #运行结果

    A
    A
    A
    A
    B
    B
```  
### 讲解

1.  `0` 和 空值 `""` 表示 `False`

2. 逻辑运算是，字符不为空即为 `True`

3. `and` , `or` ,  `not`逻辑运算

	```
	    #--------and--------
	    True and True   # ==> True
	    True and False   # ==> False
	    False and True   # ==> False
	    False and False   # ==> False
	    #--------or---------
	    True or True   # ==> True
	    True or False   # ==> True
	    False or True   # ==> True
	    False or False   # ==> False
	    #--------not--------
	    not True   # ==> False
	    not False   # ==> True
    ```