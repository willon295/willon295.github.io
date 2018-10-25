---
title: '[Scala]04_方法_函数'
tag: Scala
category: Scala
date: 2018-01-01 00:04:34
---

# 方法的定义

基本的定义是：
```
def func_name(param:Type, param2:Type2 ...): RETURN_TYPE
{
	statement
	return xxx
}
```

## 方法定义注意点

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
## 可变参数方法定义

Scala 通过在参数的类型之后放一个 `星号（*）` 来设置可变参数(可重复的参数)。例如：
```
def  printStrings(args:String*): Unit ={
    for(arg <- args){
      println(arg)
    }
}
printStrings("aaa","bbb","ccc")
```


# 函数的定义

函数和方法不同，函数可以是一个变量/实例，函数可以作为参数传入方法内，函数的定义有几种

1. 简单明了的定义
```
//注意  =  左边的是函数名及参数的定义，右边是函数体
val f1 = (x: Int , y: Int ) => x+y 
```
2. 完整的定义
```
// f2 是函数，返回值类型是Double
val f2: Int => Double = (a: Int) => Math.pow(a, 4)
// 注解: 传入两个 Int 类型数据，返回值为Double类型
val f2: (Int, Int) => Double =  { (x,y) => (x+y).toDouble}
```
3. new 实例定义
```
// Function2代表传入两个参数的方法，
// [Int,Int,.....,Double] 最后一个代表返回类型，前面的代表传入的参数类型
  val  f3 = new Function2[Int,Int ,Double] {
    override def apply(v1: Int, v2: Int): Double = (v1+v2).toDouble
  }
```

# 方法和函数的说明

方法和函数的几个特点
1. 方法可以转换为函数
2. 函数可以作为参数传入方法
3. 方法也可以作为参数传入方法，但是实际上方法会先会转换成函数
4. 方法转函数
```
//定义一个方法
def addInt(a: Int, b: Int,c:Int): Int = {
     a + b + c
}
//方法转函数,跟一个下划线 "_"

val f = addInt _
```
