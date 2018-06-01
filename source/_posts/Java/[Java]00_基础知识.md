---
title: '[Java]反码补码字节'
category: Java
tag: Java
date: 2016-05-12 00:00:00
---


# 源码反码补码

1. 源码
二进制表示
2. 反码
源码的符号位不变其他位 `加1`
3. 补码
源码 `取反加1` ， 内存中的数据用补码保存



# Java的8种数据类型


`byte` ，    `short` ，  `char`  ， `int`  ， `float` ，  `double`  ，`long`


# Java中的字节


|数据类型|字节数|位数|
|---|---|---|
|Byte|1|8|
|Short|2|16|
|Character|2|16|
|Integer|4|32|
|Float|4|32|
|Double|8|64|
|Long|8|64|






# Java异常

1. finally一定会在return之前执行，但是如果finally使用了return或者throw语句，将会使trycatch中的return或者throw失效
2. finally中return语句会覆盖try-catch中的return语句


# Java初始化

1. static 修饰的变量会被默认初始化
2. 方法内的变量必须初始化赋值

# abstract

1. 抽象类不可以被实例化
2. 抽象方法不可以有方法体


# 乱七八糟

1. 不同操作系统的文件的 `换行符` 占有的字节不同
	- Windows: 占 1 个字节[\n]]
	- Linux: 占  2 个字节[\r\n]
2. 读取当前项目的文件
```
InputStream  in = ClassLoader.getSystemResourceAsStream("文件名");
```
3. 如果将对象备份至文件中，应使用对象流
```
User u = new User();
ObjectOutPutStream oos = new ObjectOutputStream(new FileOutputStream("文件名"));
oos.write(u);
```
4. Socket编程
客户端
```
//->表示连接  localhost:9000
Socket client = new Socket("localhost",9000);

//向服务端发送数据
ObjectOutputStream  oos = new ObjectOutputStream(client.getOutputStream());
oos.writeObject(new User());
oos.flush();
```
服务端
```
//监听9000端口
ServerSocket serverSocket = new ServerSocket(9000);
Socket server;
While(true){
	//接收数据
	server= serverSocket.accept();
	//数据流
	ObjectInputStream ois = server.getInputStream();
}
```
5. 在 `java的静态方法` 中，不能使用 `this` 关键字
