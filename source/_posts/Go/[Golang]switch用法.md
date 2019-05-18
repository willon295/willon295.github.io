---
title: '[Golang]switch用法'
category: Golang
tag: Golang
date: 2019-05-18 00:00:00
---



# 基本用法



```go
num := 0
switch num {
case 1:
	println("1")
case 2:
	println("2")
default:
	println("other")
}
```



# 多个case合并



```go
day := 0
month := 5
switch month {
	case 1, 3, 5, 7, 8, 10, 12:
		day = 31
	case 4, 6, 9, 11:
		day = 30
}
println(day)
```





# true/false

注意，这种写法在switch之后没有变量， 直接跟代码块



```go
score := 60
switch {
case score < 60:
	println("不及格")
case score >= 60 && score < 72:
	println("及格")
case score >= 72 && score < 80:
	println("良好")
case score >= 80:
	println("优秀")
}
```



# 表达式;变量

这种用法可以用于初始化一些数据， 是最基本用法的一种扩展

```go
switch month := 5; month {
case 1, 3, 5, 7, 8, 10, 12:
	println(31)
case 4, 6, 9, 11:
	println(30)
}

```



# break

`break ` 会在匹配的case语句中起作用，break之后的语句不会被执行

```go
	num := 2
	switch num {
	case 1:
		println("1")
		println("1")
		println("1")
	case 2:
		println("2")
		println("2")
		break
		println("2")  // 这行不会执行
	case 3:
		println("3")
		println("3")
		println("3")
	default:
		println("other")
	}
```

# fallthrough

穿透，在匹配的case中：

-  fallthrough之后的语句不会被执行。

- 紧跟本case之后的另一个case， 无需匹配，直接执行。



```go
	num := 2
	switch num {
	case 1:
		println("1")
	case 2:
		println("2")
		fallthrough
		println("2") // 这句不会被执行， 会直接报错
	case 3:
		println("3") // 这个case会被直接执行
	default:
		println("other")
	}

// 2 3
```

