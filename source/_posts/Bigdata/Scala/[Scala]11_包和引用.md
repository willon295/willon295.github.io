---
title: '[Scala]11_包和引用'
tag: Scala
category: Scala
date: 2018-01-01 00:11:34
---



# 包

和 java一样， 使用关键字  `package` 定义当前文件的 包路径，包的引用


## 包的引用


```
import java.util.{HashMap => JavaHashMap} // 引入入java的HashMap ， 并且命名为 JavaHashMap
import java.util.{HashSet => _, _}        //  引入 java 的 Util 所有类 ，除了 HashSet
```

## 包对象

- 包对象在当前包的目录下
- 包对象的名字与当前所在包名相同
- 默认情况下 ，包内的所有属性和方法可以被包内的其他类使用


```
package cn.willon

//在 cn.willon包下的所有文件可以 直接调用   属性 和 方法
package object base {
  // [] 可以控制访问的权限 ， 类型为 包的名字
  private[base] val name = "name"
  val defaultName = "defaultName"
  def getConnection(string: String): String = {
    "getConnection...."
  }
}

```
