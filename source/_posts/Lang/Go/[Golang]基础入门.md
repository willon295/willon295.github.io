---
title: '[Golang]基础入门.md'
category: Golang
tag: Golang
date: 2018-12-21 00:00:00

---



# 环境搭建

1. 下载sdk包： `https://dl.google.com/go/go1.12.linux-amd64.tar.gz` , 解压到相应的路径
2. 配置环境变量：
```bash
export  PATH=$PATH:/usr/local/lib/go/bin
```



# HelloWorld

1. 新建一个 Test.go 文件
  ```go
  package main
  
  func main(){
      println("HelloWorld")
  }
  ```
2. 直接运行
  ```bash
  go run  Test.go
  ```
3. 编译并运行go文件

   ```bash
   go build  Test.go
   
   ./Test
   ```


# 文件结构简单说明



1. 第一行代码 **package main** 定义包名
2. 名称为 **main** 的文件表示可以独立运行
3. **import  "fmt" ** import关键字用于导入包
4. **main(){}** 函数是可运行程序的入口
5. 大写字母开头的变量可被外部代码引用，小写只能内部引用



# 变量、常量

1. 方法里的变量，定义之后必须被引用（使用）， 否则编译不通过
2. **`const`** 用于定义常量，常量值不可变
3. `var` 用于定义变量

## 变量定义



```go
var	 name string			// 1. 不赋值， 使用默认值
var  name2 string = "Jack"  // 2. 定义，指定数据类型，并且赋值
var  lastName = "HeHe"      // 3. 不指定数据类型， 赋值（省略数据类型就必须赋值）

firstName := "Will"       // 4. 这种定义只能在函数（方法）里

```

## 变量组



```go
var name, pass, sex  string = "aa", "bb", "cc"  // 相同数据类型，可指定数据类型

var id, name, age = 10001, "Willon", 23   //不同数据类型， 不能指定数据类型

id, name, age := 1001, "willon", 24   // 必须定义方式在方法里，且变量全被引用，否则编译失败


// 变量组定义
var (
	id   = 2001
	name = "s"
	age  = 24
)

```

> 上面的几种定义方式， 变量和后面的值根据顺序一一对应



## 常量

使用 `const` 关键字定义常量， 常量不可改变。

```go
const timeOut = 3600
```

## 常量组

定义： 

```go
const (
	a = "a"
    b = 12
    c = true
)
```

特性一： 自动赋值

```go
const (
	a = "a"
    b = "b"
    c
    d
    e = "e"
    f
)
func main(){
    print(a,b,c,d,e,f)
}
// 输出 abbbee
```
> 此处 c,d ,f 并未手动赋值， 则自动被赋予前一个常量的值

# 总结



1.  `package main` 包表示这个文件 `可独立运行`， 且在文件的 `第一行` 
2.  `func main(){}` 函数是程序执行入口
3.  `函数里面` 的变量， 定义之后必须被使用(引用)， 否则编译不通过
4.  `:=`  的注意点
   - 必须赋值
   - 必须在函数里
   - 不可重复给同一个变量赋值
5.  变量有变量组，常量有常量组
6.  常量组有自动赋值的特性