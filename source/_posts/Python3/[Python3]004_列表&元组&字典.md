---
title: '[Python3]004_列表&元组&字典'
tags:
  - python3
id: 316
categories:
  - Python3
date: 2017-04-16 20:53:02
---

### 一、list[ ]列表

列表，可以填入任何类型数据

举个栗子

    L = ["hello", "2017", True]
    print （L）
    `</pre>

    运行结果

    <pre>`['hello', '2017', True]
    `</pre>

    ### 访问元组

    **一、索引访问**

    1、正常索引

    <pre>`print( L[0] ,L[1] )
    #运行结果是 hello 2017
    `</pre>

    2、倒序索引

    <pre>`print( L[-1] )
    #访问倒数第一个，结果 True
    `</pre>

    **二、切片访问**

    举个栗子

    <pre>`str1 = 'abcde'
    #索引 1 之后的所有
    print(str1[1:])
    #索引 1-4（不包含4）
    print(str1[1:4])
    #从开头到结尾，进位数为 2
    print(str1[0:4:2])
    #倒序访问,不包含-4
    print(str1[-4:-1])
    `</pre>

    运行结果

    <pre>`bcde
    bcd
    ace
    bcd
    `</pre>

    **2.1 添加元素**

    1、`append(value)` :末尾添加

    2、 `insert(index，value)` 在索引处插入,之后的元素自动后移

    举个栗子

    <pre>`L = ["hello", "2017", True]
    print(L)
    L.append("Append A")
    print(L)
    L.insert(0,"Insert A")
    print(L)
    `</pre>

    运行结果

    <pre>`['hello', '2017', True]
    ['hello', '2017', True, 'Append A']
    ['Insert A', 'hello', '2017', True, 'Append A']
    `</pre>

    **2.2、删除元素**

    我们可以用以下两种方法删除元素：

*   `pop (index)` : 根据`索引`删除元素
*   `remove(value)` ： 根据`值`删除元素

    举个栗子

    <pre>`L = ["hello", "2017", True]
    print(L)
    L.pop(1)
    print(L)
    L.remove('2017')
    print(L)
    `</pre>

    运行结果

    <pre>`["hello", "2017", True]
    ["hello",  True]
    ["hello"]
    `</pre>

    > 注意： 删除一个元素之后，列表刷新。删除的元素之后的元素索引改变

    **2.3、替换元素**

    可以直接根据元素的索引 ，重新赋值即可；

    举个栗子

    <pre>`L = ["hello", "2017", True]
    L[1]='Python'
    print(L)
    `</pre>

    运行结果

    <pre>`["hello", "Python", True]
    `</pre>

    ### 二、元组( )tuple

    `tuple` 是python中的一种有序列。

    **一、基本特征**

1.  用 `()` 创建，而不用 `[]`
2.  一旦创建并且赋值，不可修改。只能访问
3.  创建的元素只包含1个元素，且为整数。结果为整数

    举个栗子

    <pre>`t = (55)
    print（t）
    t1 = (55,)
    print(t1)
    `</pre>

    运行结果

    <pre>`55
    (55,)
    `</pre>

    > 原因：`()` 是优先级运算符，经过解释器解释后 `(55)` 的运算结果为 `55`

    **二、“可变” tuple?**

    `tuple` 的不可改变是说**每个元素的指向不可改变**，如果`tuple`中有一个元素是列表。那么这个元素是可改变的。

    举个栗子

    <pre>`L=["hello",2017]
    t = (55,'dddd',L)
    print(t)
    L.pop(1)
    print(t)
    `</pre>

    运行结果

    <pre>`(55, 'dddd', ['hello', 2017])
    (55, 'dddd', ['hello'])
    `</pre>

    ### 三、dict{ }字典

    字典用 `{}` 创建，元素以键值对('key-->value')的方式`无序存储`,通过可以获取到相应的值

    举个栗子

    <pre>`dd={'name': 'chen'，'sex': 'man', 'age': 23 }
    print(d)
    print(dd['name'])
    `</pre>

    运行结果

    <pre>`{'sex': 'man','name': 'chen'， 'age': 23 }
    chen
    `</pre>

    **遍历字典**

    1、仅用`key` 遍历

    举个栗子

    <pre>`d = {'sex': 'man','name': 'chen'，'age': 23 }
    for k in d:
        print d[k]
    `</pre>

    运行结果

    <pre>`chen
    man
    23
    `</pre>

    2、`key`、`value` 遍历

    举个栗子

    <pre>`d = {
            'sex': 'man','name': 'chen'，'age':'23 '
            }
    for k ,v in d.items()
        print(k+'--&gt;'+v)
    `</pre>

    运行结果

    <pre>`name--&gt;chen
    sex--&gt;man
    age--&gt;23
    