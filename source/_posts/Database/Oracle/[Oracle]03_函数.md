
---
title: '[Oracle]03_函数'
category: Oracle
tag: Oracle
date: 2018-05-12 00:03:00
---


# 字符操作



1. `upper(exp1)` : 结果转换成大写,exp1 可以是 列名/字符串
2. `lower(exp1)`: 结果转成小写,exp1 可以是 列名/字符串
3. `initcap(exp1)` : 每个单词首字母大写,exp1 可以是 列名/字符串
4. `concat(exp1,exp2)` : 将两个表达式的连接,exp1 ，exp2 可以是 列名/字符串
5. `substring(exp1,startIndex,endIndex)`: 取子串,exp1 可以是 列名/字符串
6. `length(exp1)`: 取长度,,exp1 可以是 列名/字符串
7. `replace(char,search_char,replace_char)`: 替换



# 数字操作

1. `round()` : 四舍五入
2. `mod(num1,num2)` : num1%num2
3. `abs(n)`: 绝对值



# 转换函数

1. `to_date(字符串，格式字符串)`: 将字符串转化成日期
2. `to_char(字符串|列，格式字符串)`：转化成格式化的字符串
3. `to_number(字符串)`： 将字符转化成数字


# 通用函数


- `USER`：获取当前用户名
- `SYSDATE`： 获取当前的日期

## NVL() 函数

给字段默认值，如果为空，给他默认值

```
NVL(exp1,exp2)
```
> 如果 exp1 表达式的值为空，则显示 exp2 的值；如果exp1 不为空， 显示其本来的值

```
select last_name , NVL(bonus , 0)  from s_emp; 
```
