---
title: '[Golang]iota'
category: Golang
tag: Golang
date: 2019-01-14 00:00:01

---





# iota

`iota`  是go保留的标识符, 一般在常量定义中使用

 在源代码中， iota的定义是这样的

```go
// iota is a predeclared identifier representing the untyped integer ordinal
// number of the current const specification in a (usually parenthesized)
// const declaration. It is zero-indexed.
const iota = 0 // Untyped int.
```

1. 它是预定义的标识符
2. 默认值是 0
3. 可以计算已经定义常量个数



# 特性



**特性一：**  当 `const` 关键字出现时， `iota` 会被重置为 0

```go
package main

const a = iota
const b = iota
const c = iota
const d = iota

func main() {
	print(a, b, c, d)
}
// 输出 0000
```

**特性二：**  自增性，

```go
package main

const (
	a = iota
	b  // 等价于 b=iota, c=iota, d=iota....
	c
	d
	e
	f
	g
	h
	j
)
func main() {
	print(a, b, c, d, e, f, g, h, j)
}
// 输出 012345678
```

**特性三**： 可用下划线 `_`  抛弃不需要的值

```go
package main

const (
	a = iota
	b
	c
	_
	_
	d
	e
)

func main() {
	println(a, b, c, d, e)
}

// 输出  0 1 2 5 6
```



**特性四：**  如果新的常量出现具体赋值，常量不会被iota赋值, 直到新的iota常量出现, iota 的值随着常量的定义个数自增

```go
package main

const (
	a = iota
	b
	c
	d = "d"
	e
	f
	g
	h = iota
	j
)

func main() {
	print(a, b, c, d, e, f, g, h, j)
}

// 输出  012dddd78
```

**特性五：** iota 只会在下一行才会自增， 取得引用

```go
package main

const (
	a, b = iota, iota
	c, d
	e, f
)

func main() {
	println(a, b, c, d, e,f)
}

// 输出 0 0 1 1 2 2
```



# 使用场景



枚举

```go
package main

const (
	Sunday = iota
	Monday
	Tuesday
	Wednesday
	Thursday
	Friday
	Saturday
)

func main() {
	println(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday)
}
// 输出 0 1 2 3 4 5 6
```

有规律的运算

```go
package main

const (
	a = 1 << iota
	b
	c
	d
)

func main() {
	println(a, b, c, d)
}

// 输出 1 2 4 8
```