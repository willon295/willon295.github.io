---
title: '[Java]11_IO.md'
tag: Java
category: Java
date: 2016-05-12 00:11:00
---

# 接口

- `Serializable`： 序列化接口，如果某个类需要在网络传输，应实现此接口
- `DataInput`： 将数据读取成java原始数据类型接口
- `DataOutput`： 将java原始数据转换成二进制数据输出接口

# 字符流

**适用场景**
比较适合处理 `文本类型` 数据
**常用类**
```
|Reader
|--BufferedReader
|--InputStreamReader--FileReader
|Writer
|--BufferedWriter
|--OutputStreamWriter--FileWriter
```

# 字节流

**适用场景**

字节流几乎可以处理所有类型的数据

**常用类**
```java
|InputStream
|--FileInputStream
|----BufferedInputStream
|----DataInputStream
|--ObjectInputStream
|OutputStream
|--FileOutputStream
|----BufferedOutputStream
|----DataOutputStream
|--ObjectOutputStream
```



# 具体细节

1. 什么是比特流？ 什么是字节流？ 什么是字符流？

   - Bit（中文管它叫 `位` ）是最小的二进制，比特流传输的是0101
   - 一个字节Byte由 8 位 组成，取值-128-127
   - 一个字符占2个字节，所以由 16 位（比特）

2. Java 流分为哪几类
   字节流，字符流

   1. 字节流父类： InputStream, OutputStream
      常用：ByteInputStream, BufferedInputStream,FileInputStream,SequenceInputStream，ObjectInputStream

   2. 字符流父类： Writer，Reader
      常用： BufferedReader,InputStreamReader,FileReader,StringReader

   3. **字节流 转 字符流** 

      ```java
              new OutputStreamWriter(new FileOutputStream("file"));
              new InputStreamReader(new FileInputStream("file"));
      ```

   4. 字符流 转 字节流，不存在的！！  原因：字节流应用广泛，字符流操作方便，一个操作更加方便的流为什么还有转换成不方便的？ 如果就是要转，刚开始就可以直接使用字节流操作，为何还有用字符流再转回字节流？ 

      

3. InputStream的 read() , read(byte[] b), 作用

   - read(): 一个字节一个字节读取，返回的是下一个字节的  int 类型，可以强整为 `char` 查看 其原  字节， -1 表示已经读完
   - read(byte[] b): 将读取的字节存进这个缓冲数组,返回值，本次写入数组的字节个数， -1 如果读完

4. readLine() 方法
   BufferedReader的方法，读取一行，返回 本次读取 String 数据，原理是 使用将字节转换成String，将String放进StringBuffer（线程安全） 

5. 为了提高读写性能，一般会采用 缓冲流 `BufferedXXX`

6. 对 `基本数据类型`  包括 String 的读写，可以采用 `DataInputStream` , `DataOutputStream`

7. RandomAccessFile, 只实现了 DataInput, DataOutput ，Closeable 接口，集 读取和输出功能为一身，可读取写入 基本数据类型的数据,也可以实现跳过的功能

   ```java
           RandomAccessFile rw = new RandomAccessFile(FILE, "rw");//指定打开文件的方式
           rw.readLine();
   		rw.seek(100L); //跳过 100 个字节
           rw.writeUTF("aaa");
           rw.writeInt(3);
   ```