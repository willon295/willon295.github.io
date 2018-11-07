---
title: '[Linux]Sed语句的用法'
tag: Linux
category: Linux
date: 2015-10-11  10:00:00
---

# 基本用法

-  `-i`  ： 直接操作原文件
- `-n`  : 取消自动打印
-  `-e` : 执行脚本，可以多个



## 输出

```bash
sed  -n  ' 1,3  p  '  aa.txt  #输出文件的 1-3 行  p 代表 print
sed  -n  '1~2  p ' aa.txt   #从第一行开始， 每个两行输出一次 ==> 打印奇数行
sed  -n  ' 1, /^ma/  p' aa.txt  #从 第一行 到  以 ma 开头的行，  /  /  里面写正则表达式

```



## 插入



```bash
# -e 表示多个自命令， 会全部执行
sed -e '2 i helloWorld' aa.txt  #在第 2 行 插入数据 ，并标准输出，不会写入文件
sed  -ne '2 i HelloWorld ' -ne '1,3 p' aa.txt #掺入数据并且输出 

#原文件 第 2 行掺入数据  i 表示插入数据
sed  -i '2 i Helloworld'  aa.txt 
```





## 替换

1. 替换指定行的内容

   ```bash
   sed -n -e '2 c thisisnewline'  aa.txt
   ```

   

2. 替换指定文本
   语法

   ```bash
   sed '位置参数 s/pattern/replaced/[flag]'
   ```

   【falg】:

   - g : 全局匹配
   - n: 数字，匹配到的第 n 个
   - w: 替换第 1 个匹配结果， 并写入文件
   - p : 替换第 1 个匹配结果， 并控制台输出
   - 不填: 替换第 1 个匹配结果

## 删除

```bash
#直接操作原文件的
sed  -i '2 d ' aa.txt
```

