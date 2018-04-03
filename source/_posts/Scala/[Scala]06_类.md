---
title: '[Scala]06_类'
tag: Scala
category: Scala
date: 2018-01-01 00:06:34
---

# 类的定义

1. 类名可以和文件名不同
2. 类可以有一个伴生对象

```
package day02

class Student {

  // val 修饰的属性  不可改变，相当于 用 final 修饰
  val name = "tom"
  var age = 10

  //  var 修饰的实行 可以改变 相当于有 set get 方法的属性
  val id: Int = 100

  //private 修饰的属性 只能在 本类、伴生对象 进行访问和操作，在类之外不可以
  private var sex = "man"
  
  
  //private[this] 修饰的变量只能在 类的内部 使用
  private[this] var password = "333444"
  
  
  def  printName(): Unit ={
    println(age)
  }
}

//伴生对象 ， 根类名相同 且在同一个文件中
object Student{


  //定义在 object 里面的方法相当于 java里面的 static 方法
  def main(args: Array[String]): Unit = {

    val s = new Student
    s.printName()

  }
}
```

# 构造器

1. 在类名定义的构造器叫主构造器，一般主构造器为无参构造器
```
//主构造器的  变量 会变成成员变量
//如果构造器定义一个没有 val ,var修饰的变量，相当于用 private[this] 修饰
class Teacher(val id: Int, var name: String, var age: Int, var position: String) {
  
  //主构造器之外的成员  初始值 设置为 null 或者 _
  var gender: String = _
  
  //辅助构造器 名称都为 this(...)
  def this(id: Int, name: String, age: Int, position: String, gender: String) {
    
    //必须先调用主构造器
    this(id, name, age, position)
    //给其他成员赋值
    this.gender = gender
  }
}
```
2. 在类内部定义的构造器叫辅助构造器
3. 主构造器用 `private` 修饰时（class Teacher private(....) ），只能在伴生对象中使用
4. `class` 之前用 `private[day02]`=> 只能在 day02 包内访问
```
private[day02] class Teacher(){}
```



# case class

基本的语法

```
case class Demo(v:A,v2:B....){...}
```

举个例子
```
//属性默认使用 val 修饰
case class Student(id:Int,name:String)

//可以new实例，也可以不用 new 
val s1 = Student(1,"Lilei")
val s2 = new Student(2,"Jili")


//可以获取属性的值,但是不可赋值改变
s1.id

//可以通过cpoy方法改变某个属性的值，返回一个新的对象

val s3 = s2.copy(name="ZhangSan")

//s3 = Student(2,"ZhangSan")


```


# 抽象类

```
package ooad

abstract class Father {
  def run():String
  var name:String
  val age:Int
  var birthDay:Int = 1992
}

class Son extends Father {
   def run(): String = {
    println("son run ")
    "yes"
  }

  var name = "sdf"
  val age: Int = 23
  birthDay = 2019
}


object Son {

  def main(args: Array[String]): Unit = {
    val son: Son = new Son
    println(son.age, son.name, son.run(), son.birthDay)
  }
}
```





1. 抽象类默认所有 属性和 方法都是抽象的
2. 子类重写父类的属性时
    - var , val 要相同
    - 可以不使用关键字 override
    - 父类中有具体值的属性，不能使用override重写，直接重写,不需要 val和var修饰
3. 子类重写父类方法时
    - 可以不使用override关键字
    - 返回值和函数名称参数列表都要相同
