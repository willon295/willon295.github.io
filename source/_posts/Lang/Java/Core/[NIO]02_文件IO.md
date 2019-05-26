---
title: '[NIO]02_文件IO'
category: Java
tag: NIO
date: 2018-07-01 00:00:02
---

文件IO的操作依赖：

- Channel： 通道， 负责传输数据
- Buffer： 缓存， 负责存放数据

# Channel

Channel 是程序与操作系统文件传输的通道

## 如何获取Channel？

1. 通过文件流获取

   ```java
   FileChannel fileChannel = new FileOutputStream("a.txt").getChannel();
   ```

2. 通过FileChannel直接打开

   ```java
    FileChannel inChannel = FileChannel.open(Paths.get("1.wmv"), StandardOpenOption.READ);
   ```

3. RandomAccessFile 获取

   ```java
   RandomAccessFile rw = new RandomAccessFile("a.txt", "rw");
   FileChannel channel = rw.getChannel();
   ```

