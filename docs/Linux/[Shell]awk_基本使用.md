---
title: '[Shell]awk_基本使用'
category: Shell
tag: awk
date: 2016-08-28 00:01:33
---

# 什么是 awk

AWK是一种处理文本文件的语言，是一个强大的文本分析工具。

# awk命令

## 基本说明

```
awk [参数]  '{语句}'  操作文件
```
1. 参数
	- `-F` ： 指定分割符，如： `awk -F',' '{print $1,$2}'  a.txt` => 用逗号分割
	- `-v`: 指定变量，如： `awk  -va=10  '{print $1+a}' a.txt`  => 指定一个变量 a=10
	- `-f` : 读取另一个 `awk脚本` ，如： `awk -f 'aa.awk' '{print $1}'  a.txt`
2. 语句解释
	- `print`： 终端打印，可以用 ',' 分割要输出的多个内容，输出的内容以空格分开
	- `$0`: 读取到完整的内容
	- `$n`: n 代表 1,2,3,4.... 表示分割后的第 n 个字段
3. 内置变量
|变量|含义|
|----|----|
|$0  |  完整的输入记录  |
| $n |  当前记录的第n个字段，字段间由FS分隔  |
| FILENAME |  当前文件名  |
|  NF | 一条记录的字段数   |
|  NR  | 当前行号   |
|  FS  |    字段分隔符 |
|  OFS  |   输出记录字段间分隔符 |


## 正则，字符串匹配

1. 正常的匹配
```
awk '内容  ～  /正则/  {语句} ' 文件
```
2. 忽略大小写
```
awk 'BEGIN{IGNORECASE=1}  /t/ ' passwd
```
3. 模式取反
```
awk '内容  !~  /正则/  {语句} ' 文件
awk '!/正则/  {语句} ' 文件
```
4.解释：
	- 内容： 要匹配的字段=> $2
	- `~`: 模式匹配开始
	- `//`： 要匹配的字符表达式
	

### 简单实例

`num.txt` 文件内容为 1-100 数字

1. 将文件每个数字加10,打印
```
awk  -va=10   '{print $1+a}' num.txt
```
2. 获取Linux系统所有用户的用户名和家目录
```
awk -F':'  '{print $1,$6 }'  /etc/passwd
```
3. 显示第 20到30行的文本信息
```
awk '{if( NR>=20 && NR<=30 ) print $1}' /etc/passwd
```
4. 查找用户名含有 't' 的用户名及家目录
```
awk  -F: '$1 ~ /t/  {print $1,$6}' /etc/passwd 
```
5. 将所有用户名及其家目录用 => 分割输出
```
awk  -F: '  {print $1,$6}' OFS='=>' passwd
```


# awk脚本

一个简单脚本定义如下：

```
#！/bin/awk -f

#运行前
BEGIN{
	pi=3.14
	r=4
	s=0
	printf "This is the begin line"
}

#运行中
{

	r+=$1
	s=pi*r*r

}

#运行后
END{
	print  "Result:",r,s
	printf "This is the  end line"
}
```

# awk 简单实现 wordcount

```
awk -F" "  '{for(i=1;i<=NF;i++) print $i}' ./* | sort | uniq  -c | awk '{print $2,$1}' | cat >> ../out1/res.txt
```
