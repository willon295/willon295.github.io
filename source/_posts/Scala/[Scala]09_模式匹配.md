---
title: '[Scala]09_模式匹配'
tag: Scala
category: Scala
date: 2018-01-01 00:09:34
---

# 模式匹配

基本的语法：

```
elem  match{
	case x: XX => {  }
	case y: YY => {   }
	//下划线表示其他
	case _  => {   }

}
```

## 简单匹配

1. 简单的匹配元素的值
```
package day04
//匹配模式一：  匹配元素
object CaseDemo1 extends App {
  val arr  = Array("birds","dog","rabbits","sdfsss","bbbbb")
  val name = arr(Random.nextInt(arr.length))
  println("随机取出："+name)
  name match {
    case "birds" => println("birds")
    case "dog" => println("dog")
    case "rabbits" => println("rabbits")
    case _ => println("other----")
  }

}
```

## 数据类型匹配

1. 匹配 `数据类型`，当 `类型匹配` 时，处理相应的逻辑
2. 传入的值 ，可以通过变量获取
3. 匹配的数据类型可以是 `自定义类型的数据`
4. 举个例子
```
//匹配   数据类型
object CaseDemo2 extends App {

  //自定义的数据类型
  val dog = new  Dog
  val arr = Array(  "names"  ,    11    ,   2.3   , CaseDemo2  , dog)
  val elem = arr(4)

  elem match {
    //引用变量
    case  x:String => println("String:"+x)
    case  y:Int  => println("Int:"+y)
    case z:Double if (z>2.0) => println("double:"+z)
    case  CaseDemo2 => println("casedemo")
    case  d:Dog  => println("dog --- ")
    case _ => println("other")
  }
}
```

## 集合匹配

### List

```
val lst = List(1, 2, 3, 4)

  // :: 代表不同的 集合拼接 ， 单个元素可以直接拼接在集合的前面
  val lst2 = 1 :: lst
  lst2 match {
    case 0 :: x => println(s"0 -- $x")
    //1  ----   List(1, 2, 3, 4)
    case x :: y => println(s"$x  ----   $y")
    case _ => println("other")
```

### tuple

```
  val  tup  = (3,2,6)
  tup match {
    case (1,_,_ ) => println("start with 1")
    case (_ , _ ,3) => println("end with  3 ")
    case  (a ,b ,c) => println(s"$a -  $b -  $c")
  }
```


## 样例匹配

```
//定义 样例 类 和 对象
case class Task(id:Int,name:String )
case  class  HeartBeat(i:Int )
case  object  CheckTimeOut

object CaseDemo4  extends  App {

  val a = Array(Task(1, "t1"), Task(2,"t2"),HeartBeat(100),HeartBeat(200) ,CheckTimeOut)
  val elem  = a(1)
  elem match {

    case Task(id:Int , name:String ) => println(id ,name)
    case  HeartBeat(i:Int ) => println("heart: "+i)
    case  CheckTimeOut  => println("check time ")
    case  _ => println("other")
  }

}
```

## 偏函数&匹配函数

```
  //定义一个方法，匹配字符串返回相应的数字
  def f1(num:String) :Int  = num match{
    case "one" => 1
    case  "two" => 2
    case "three" => 3
    case _ => 0
  }

  //偏函数： 第一个参数化类型表示 传入的数据类型，第二个表示返回的数据类型
  def f2:PartialFunction[String ,Int] ={
    case "one" => 1
    case  "two" => 2
    case "three" => 3
    case _ => 0
  }

  println(f1("one"))

  println(f2("two"))

```
