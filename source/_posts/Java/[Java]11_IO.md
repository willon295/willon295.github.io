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
**举个例子**
```

    
```

# 字节流

**适用场景**

字节流几乎可以处理所有类型的数据

**常用类**
```
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
