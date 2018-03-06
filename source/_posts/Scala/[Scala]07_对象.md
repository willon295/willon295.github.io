---
title: '[Scala]07_对象'
tag: Scala
category: Scala
date: 2018-01-01 00:07:34
---

# object

1. 静态对象
```
object Student(){
	//对象里面的 变量为静态变量，可以通过对象直接调用
	val CONSTANT="demo"
	
	//private修饰的变量 在其他对象中不可访问
	private val PASSWORD = "333444"
	
	//对象里面的方法为静态方法，可以通过对象直接调用
	def sayHi(){
		println("Hi~")
	}
}
```
2. 伴生对象 
=> 和类名相同，且在同一个文件中
3. 单例对象，scala的对象就是单例对象
4. 当对象继承 `App` 对象时，不需要 `main` 方法即可执行


# 静态对象的 apply 方法

1. 相当于类的构造方法，有返回值
```
//定义apply方法
object Demo {

  def apply(): Unit = {
    println("run apply")
  }
  def apply(i:String  ): String  = {
    "run apply"+i
  }
  def apply(i: Int, j: Int): Int  = {
    i + j
  }
}

//测试
object HelloWorld {
  def main(args: Array[String]): Unit = {

    val a = Demo
    val a1 =Demo("sss")
    val a2 = Demo(1,5)

    println(a)
    println(a1)
    println(a2)
  }


}

```
