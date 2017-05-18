---
title: Shell 变量
tags:
  - shell
  - 学习
id: 70
categories:
  - Linux
  - shell
date: 2016-12-18 00:14:58
---

### 定义变量

定义变量时，变量名不加美元符号（$，PHP语言中变量需要），如：
<pre><span class="pln">your_name</span><span class="pun">=</span><span class="str">"codexz.cn"</span></pre>
<span style="color: #ff0000;">注意，变量名和等号之间不能有空格</span>

### 使用变量

使用一个定义过的变量，只要在变量名前面加美元符号即可，如：
<pre class="prettyprint prettyprinted"><span class="pln">your_name</span><span class="pun">=</span><span class="str">"qinjx"</span><span class="pln">
echo $your_name
echo $</span><span class="pun">{</span><span class="pln">your_name</span><span class="pun">}
</span></pre>
<pre class="prettyprint prettyprinted"><span class="pln">养成一个好习惯，变量用花括号括起来，避免某些问题。当然，变量还可以重新定义赋值
your_name</span><span class="pun">=</span><span class="str">"tom"</span><span class="pln">
echo $your_name
your_name</span><span class="pun">=</span><span class="str">"alibaba"</span><span class="pln">
echo $your_name</span></pre>

### 只读变量

readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变
<pre class="prettyprint prettyprinted"><span class="com">#!/bin/bash</span><span class="pln">
myUrl</span><span class="pun">=</span><span class="str">"http://www.w3cschool.cc"</span>
<span class="kwd">readonly</span><span class="pln"> myUrl
myUrl</span><span class="pun">=</span><span class="str">"http://www.codexz.cn"

</span></pre>

### 删除变量

使用 unset 命令可以删除变量。语法：
<pre class="prettyprint prettyprinted"><span class="pln">unset variable_name
<span style="font-size: 8pt;">变量被删除后不能再次使用。unset 命令不能删除只读变量。</span>
</span></pre>
**实例**
<pre class="prettyprint prettyprinted"><span class="com">#!/bin/sh</span><span class="pln">
myUrl</span><span class="pun">=</span><span class="str">"http://www.codexz.cn"</span><span class="pln">
unset myUrl
echo $myUrl</span></pre>

### Shell 字符串

<pre class="prettyprint prettyprinted"><span class="pln">your_name</span><span class="pun">=</span><span class="str">'qinjx'</span><span class="pln">
str</span><span class="pun">=</span><span class="str">"Hello, I know your are \"$your_name\"! \n"
</span>单引号与双引号的区别就是双引号可以出现转义字符，可以有变量；

**拼接字符
**</pre>
<pre class="prettyprint prettyprinted"><span class="pln">your_name</span><span class="pun">=</span><span class="str">"qinjx"</span><span class="pln">
greeting</span><span class="pun">=</span><span class="str">"hello, "</span><span class="pln">$your_name</span><span class="str">" !"</span><span class="pln">
greeting_1</span><span class="pun">=</span><span class="str">"hello, ${your_name} !"</span><span class="pln">
echo $greeting $greeting_1
</span></pre>

### 获取字符串长度

<pre class="prettyprint prettyprinted"><span class="kwd">string</span><span class="pun">=</span><span class="str">"abcd"</span><span class="pln">
echo $</span><span class="pun">{#</span><span class="kwd">string</span><span class="pun">}</span> <span class="com">#输出 4</span></pre>

### 提取子字符串

<pre class="prettyprint prettyprinted"><span class="kwd">string</span><span class="pun">=</span><span class="str">"runoob is a great site"</span><span class="pln">
echo $</span><span class="pun">{</span><span class="kwd">string</span><span class="pun">:</span><span class="lit">1</span><span class="pun">:</span><span class="lit">4</span><span class="pun">}</span> <span class="com"># 输出 unoo
</span></pre>

## Shell 注释

<div>

每行开头都要用 “<span style="color: #ff0000;">  #</span> ”注释
<pre class="prettyprint prettyprinted"><span class="com">#--------------------------------------------</span>
<span class="com">#--------------------------------------------</span>
<span class="com">##### 用户配置区 开始 #####</span>
<span class="com">#</span>
<span class="com">#</span>
<span class="com"># 这里可以添加脚本描述信息</span>
<span class="com"># </span>
<span class="com">#</span>
<span class="com">##### 用户配置区 结束  #####</span></pre>
</div>