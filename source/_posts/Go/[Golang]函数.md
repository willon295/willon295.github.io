---
title: '[Golang]函数'
category: Golang
tag: Golang
date: 2018-12-21 00:00:02

---



# 函数定义



```go
//1. 无返回 函数
func fun1() {
   fmt.Print("hello")
}

//2. 有返回 函数
func Add(a, b int) int {
   return a + b
}

//3. 多返回 函数
func get(a, b int) (max, min int) {

   if a > b {
      max = a
      min = b
   } else {
      max = b
      min = a
   }
   // 可以简写成 return
   return max, min
}

// 4. 不定参函数
func p(a ...int) {
	for i := 0; i < len(a); i++ {
		println(a[i])
	}
}
```

# 匿名函数



```go
func main() {
	//1. 定义一个匿名函数
	add := func(a int, b int) int {
		return a + b
	}
	//2. 调用匿名函数
	result := add(1, 3)
	fmt.Print(result)

}
```





# 函数类型



```go
type FuncType func(a int, b int) int  // 自定义函数类型

var f FuncType         // 定义一个变量， 类型是自定义的函数类型

func main() {

	// 定义匿名函数
	add := func(a int, b int) int {
		return a + b
	}
	min := func(a, b int) int {
		if a > b {
			return b
		}
		return a
	}

    // 给未赋值的变量赋值
	f = add
	print(f(12, 13))

	f = min
	print(f(5, 7))

}
```

# 函数参数

将函数作为参数传入， 作为回调函数

```go
package main

// 定义函数类型， 函数变量
type FuncType func(a int, b int) int
var f FuncType

func main() {

	// 定义匿名函数
	add := func(a int, b int) int {
		return a + b
	}
	min := func(a, b int) int {
		if a > b {
			return b
		}
		return a
	}

	f = add
	
    // 调用
	println(cal(1, 24, f))

	f = min
	println(cal(10, 20, f))
}

// 需要传入函数参数的函数
func cal(a int, b int, f FuncType) int {

	println("args: ", a, b)
	var i = f(a, b)
	return i

}

```

# 自执行匿名函数

函数定义之后自动执行



```go

	func(a int, b int) int {

		return a + b

	}(10, 23)

```



# defer 延迟调用



特征一： 被  `defer`  修饰的函数调用会被延迟， 会延迟到main执行完毕之后调用

```go
package main

func main() {
	defer println("1")
	println("2")
}

// 输出 2 1 
```

特征二： 多个defer会按照先进后出的调用顺序（栈顺序）

```
func main() {
	defer println("1")
	defer println("2")
	defer println("3")
	defer println("4")
	println("5")
}
// 输出  5 4 3 2 1
```

