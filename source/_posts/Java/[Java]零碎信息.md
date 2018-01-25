---
title: '[Java]零碎小知识'
tag: Java
category: Java
date: 2016-10-11 12:22:00
---



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
