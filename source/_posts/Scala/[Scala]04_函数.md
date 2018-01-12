---
title: '[Scala]04_函数'
tag: Scala
category: Scala
date: 2018-01-01 00:26:34
---

# 函数的定义

基本的定义是：
```
def func_name(param:Type, param2:Type2 ...): RETURN_TYPE
{
	statement
	return xxx
}
```

## 函数定义注意点

```
def addInt(a: Int, b: Int,c:Int): Int = {
     a + b + c
}
```
**注意**：
1. 传入的参数必须指定数据类型
2. 用 `Unit` 表示无返回，相当于java的 `void`
3. `return` 可以省略
4. 参数可以 `不按照传参顺序` 传入，可以手动指定参数名
```
addInt(b=7,a=12,c=3)
```
## 可变参数函数定义

Scala 通过在参数的类型之后放一个 `星号（*）` 来设置可变参数(可重复的参数)。例如：
```
def  printStrings(args:String*): Unit ={
    for(arg <- args){
      println(arg)
    }
}
printStrings("aaa","bbb","ccc")
```

