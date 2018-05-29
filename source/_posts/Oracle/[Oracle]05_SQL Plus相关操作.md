---
title: '[Oracle]05_SQL Plus相关操作'
category: Oracle
tag: Oracle
date: 2018-05-12 00:05:00
---
# 文件相关命令

## save,get,start,@ 命令

`save /home/root/a.txt`:  将命令行的缓存命令 存入文件
`get  /home/root/a.txt`: 将文件中的命令行，读取到缓存中
`start /home/summ.sql` : 执行 sql 文件
`@ /home/summ.sql `： 执行sql

## spool 命令

spool 将 `命令` 和 `查询结果` 保存到文件中
```
spool  /home/a.txt //spool 开始，并指定文件

//执行其他命令
...
spool off //结束，写入文件

```


# 查询结果显示列操作 column

- `column last_name FORMAT a10;`    => 将以后查询的列名为 last_name 的列，显示宽度为 10
- `column last_name HEADING name `  => 将查询的列名 为 last_name 的列，以后都用 name显示
- `column salary format $99,999.99` => 将查询的工资加上 `$` 符号，并且将其格式化
- `column salary format L99,999.99`  => L代表本地的意思，这里就会显示 `￥`
- `column  bonus null  'not bonus'`  => 如果bonus对应的值为 null ,则以 'not bonus'显示
- `COLUMN last_name `  => 查看当前列的显示设置
- `COLUMN last_name CLEAR` => 清空当前列的设置




# 交互式插入值


```
//使用占位符 `&` 设置一个变量，在执行语句的时候交互式的输入相应的值
insert into user values(&u_id , '&u_name' );
```


# SQLPLLUS Editor

SQLplus会缓存当前会话的所有命令，按 `数字键` 可以选中某一条命令，执行

```
A[PPEND] text  //命令之后追加
C[HANGE] / old/ new //替换
CL[EAR] BUFF[ER]  //清空缓存
DEL                //删除
I[NPUT] text       //插入
L[IST] n
n text
```
