---
title: '[Scala]07_对象_特质'
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


## 静态对象的 apply 方法

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

# 特质 trait

特质相当于java中的接口

1. 特质的所有方法和成员可以都是抽象的，不需要abstract
2. 特质可以混入 类、对象、特质、实例中
3. 实例混入特质的构造顺序
    - 超特质 -> 父特质 -> 类 -> 从左往右特质
4. 如果 `多个特质` 重写 `同一个特质` 的 `同一个方法`，方法前必须要 `override`
    
## 贴代码

```
trait Log {
  println("LOG")
  def log()
}

trait FileLog extends Log {
  println("FILE_LOG")
  override def log(): Unit = {
    println("File log ...")
  }
}

trait ConsleLog extends Log {
  println("CONSLE_LOG")
  override def log(): Unit = {
    println("Consle log ...")
  }
}

trait IOlog extends Log {
  println("IO_LOG")
  override def log(): Unit = {
    println("IO log...")
  }
}




class TestLog extends Log {
  println("INSTANCE ---  INIT")
  override def log(): Unit = {
    println("IO  log")
  }
}

object TestLog {
  def main(args: Array[String]): Unit = {
    val log = new TestLog with ConsleLog with FileLog
    log.log()
  }
}



```

1. 当创建实例时，混入多个特质，那么那些特质中的相同方法名之前 override 关键字不能省略，省略会产生二异性


## 如果特质需要传递参数怎么办？

```

import java.io.{InputStream, PrintStream}

//父类特质
trait Logger {
  def log()
}

//特质，需要传入两个参数 ， 一个文件名 ，一个文件内容
trait FileLogger extends Logger {
  val fielname: String
  val content:String
  lazy val os = new PrintStream(fielname)
  override def log(): Unit = {
    os.write(content.getBytes())
  }
}


//没有任何东西的 类
class DynamicClassExtention {
  
  
}




object DynamicClassExtention {
  def main(args: Array[String]): Unit = {
    //对 类进行功能扩展 ，传入参数
    val d = new DynamicClassExtention with FileLogger {
      override val fielname: String = "a.txt"
      override val content: String = "file error"
    }
    d.log()

  }
}

```

1. 为了避免特质构造时发生空指针异常，将其被调用处资源 申明为 `lazy`
2. 在混入特质时，需要重写其属性，并且赋值


## super调用

如果 `多个特质` 重写了 `同一个方法` ，且该方法中都调用了父类的方法， 那么具体的调用是 从右往左 开始

举个例子


```
//定义一个抽象类和子类
abstract class CharBuffer {
  def get: Char
  def put(c: Char)
}

class Overlay extends CharBuffer{
  val buf = new ArrayBuffer[Char]
  override def get: Char = {
    if (buf.length != 0) buf(0) else '@'
  }
  override def put(c: Char): Unit = {
    buf.append(c)
  }
}


//定义两种对输入字符进行操作的特质:
//此处继承了 CharBuffer ，只有CharBuffer子类菜可以使用 该特质
trait ToUpper extends CharBuffer {
    // 特质中重写抽象方法  abstract override
    abstract override def put(c: Char) = super.put(c.toUpper)
}
trait ToLower extends CharBuffer {
    abstract override def put(c: Char) = super.put(c.toLower)
}


//测试
object TestOverlay extends App {
  val cb1 = new Overlay with ToLower with ToUpper
  val cb2 = new Overlay with ToUpper with ToLower

  cb1.put('A')
  println(cb1.get)

  cb2.put('a')
  println(cb2.get)

}




```
