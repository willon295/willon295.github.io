---
title: '[Scala]08_继承与实现'
tag: Scala
category: Scala
date: 2018-01-01 00:08:34
---

# 父类的定义

使用 `abstract` 关键字定义的父类，方法可以不用实现，定义方法的名称参数返回值即可
```

abstract  class Animal {

  def  run(): Unit ={
    println("Animal run ---")
  }

  def sayHi():String


}
```

# 继承

继承使用关键字 `extends`


# 接口的定义

1. 接口使用  `trait` 关键字定义
```

trait Flyable {

  def  fly(): String
}
```


# 接口的实现

接口的实现使用关键字 `with` ，多实现使用多个with
```
class Dog extends Animal with Sleepable  with Eatable {

  override def eat(): String = {
    " dog  eat"
  }
  

  override def sayHi(): Unit = {
    println("dog  hi ---")
  }

  override def sleep(): String = {
    "dog sleep "
  }
}

```

# 创建实例时动态实现接口

scala支持创建实例时，动态的实现接口
```
var b = new Bird with Flyable {
   override def fly(): String = {
        "bird fly"
   }
}
```

