---
title: '[JS]基础篇--removeAttribute取消style'
tags:
  - JS
id: 181
categories:
  - JS
date: 2016-12-28 01:05:39
---

这是一个JS的一个 小练习，顺便讲讲removeAttribute

### DEMO

<pre>
&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="txttent-Type" txttent="text/html; charset=utf-8" /&gt;
&lt;title&gt;javascript&lt;/title&gt;
&lt;style type="text/css"&gt;
body{font-size:12px;}
#txt{
 height:400px;
 width:600px;
 border:#333 solid 1px;
 padding:5px;}
p{
 line-height:18px;
 text-indent:2em;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
 &lt;h2 id="con"&gt;JavaScript课程&lt;/H2&gt;
 &lt;div id="txt"&gt; 
 &lt;h5&gt;JavaScript为网页添加动态效果并实现与用户交互的功能。&lt;/h5&gt;
 &lt;p&gt;1\. JavaScript入门篇，让不懂JS的你，快速了解JS。&lt;/p&gt;
 &lt;p&gt;2\. JavaScript进阶篇，让你掌握JS的基础语法、函数、数组、事件、内置对象、BOM浏览器、DOM操作。&lt;/p&gt;
 &lt;p&gt;3\. 学完以上两门基础课后，在深入学习JavaScript的变量作用域、事件、对象、运动、cookie、正则表达式、ajax等课程。&lt;/p&gt;
 &lt;/div&gt;
 &lt;form&gt;
 &lt;!--当点击相应按钮，执行相应操作，为按钮添加相应事件--&gt;
 &lt;input type="button" value="改变颜色" onclick="set.changeColor()"&gt; 
 &lt;input type="button" value="改变宽高" onclick="set.changeSize()"&gt;
 &lt;input type="button" value="隐藏内容" onclick="set.objHide()"&gt;
 &lt;input type="button" value="显示内容" onclick="set.objShow()"&gt;
 &lt;input type="button" value="取消设置" onclick="set.offSet()"&gt;
 &lt;/form&gt;
 &lt;script type="text/javascript"&gt;
 var txt=document.getElementById("txt");
 var set={
 changeColor:function(){
 txt.style.color="red";
 txt.style.backgroundColor="#ccc";
 },
 changeSize:function(){
 txt.style.width="300px";
 txt.style.height="300px";
 },
 objHide:function(){
 txt.style.display="none";
 },
 objShow:function(){
 txt.style.display="block";
 },
 offSet:function(){
 var message=confirm("你确定要重置所有设置么？");
 if(message==true){
 txt.removeAttribute('style');
 }
 }
 }
 &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>