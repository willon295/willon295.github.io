---
title: Shell 变量
tags:
  - shell
  - 学习
id: 37
categories:
  - Linux
  - shell
date: 2016-12-18 00:14:58
---

## 定义变量
定义变量时，变量名不加美元符号（$，PHP语言中变量需要），如：

	your_name="codexz.cn"

<span style="color: #ff0000;">注意，变量名和等号之间不能有空格</span>

## 使用变量
使用一个定义过的变量，只要在变量名前面加美元符号即可，如：

	your_name="qinjx"
	echo $your_name
	echo ${your_name}

	养成一个好习惯，变量用花括号括起来，避免某些问题。当然，变量还可以重新定义赋值
	your_name="tom"
	echo $your_name
	your_name="alibaba"
	echo $your_name

### 只读变量

readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变

	#!/bin/bash
	myUrl="http://www.w3cschool.cc"
	readonly myUrl
	myUrl="http://www.codexz.cn"


### 删除变量

使用 unset 命令可以删除变量。语法：

	unset variable_name
变量被删除后不能再次使用。unset 命令不能删除只读变量

**实例**

	#!/bin/sh
	myUrl="http://www.codexz.cn"
	unset myUrl
	echo $myUrl

### Shell 字符串
	
	your_name='qinjx'
	str="Hello, I know your are \"$your_name\"! \n"
	#单引号与双引号的区别就是双引号可以出现转义字符，可以有变量；
	
	#拼接字符
	your_name="qinjx"
	greeting="hello, "$your_name" !"
	greeting_1="hello, ${your_name} !"
	echo $greeting $greeting_1

### 获取字符串长度
	
	string="runoob is a great site"
	echo ${string:1:4} # 输出 unoo

### 提取子字符串
	
	string="runoob is a great site"
	echo ${string:1:4} # 输出 unoo

## Shell 注释

<div>

每行开头都要用 “<span style="color: #ff0000;">  #</span> ”注释

	
	#--------------------------------------------
	#--------------------------------------------
	##### 用户配置区 开始 #####
	#
	#
	# 这里可以添加脚本描述信息
	# 
	#
	##### 用户配置区 结束  #####