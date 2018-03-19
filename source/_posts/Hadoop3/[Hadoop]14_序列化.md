---
title: '[Hadoop]14_序列化'
category: Hadoop
tag: Hadoop
date: 2017-08-28 00:14:33
---

# 自定义类的序列化

1. JAVA原生的序列化并不是非常理想，可以说是臃肿，Hadoop 对序列化进行优化
2. 在 Hadoop 的序列化中，所有的数据应该可以比较大小所以自定义的类 需要实现 `Comparable`


## 接口介绍

Hadoop 有以下接口

### Writable

该接口有两个方法需要重载， `readFileds()` , `write()`


### Comparable

方法 `compareTo()`,而为了避免歧义，通常也会重写 `equals()` 和 `hashCode()`


# SequenceFile文件序列化

Hadoop序列化文件SequenceFile可以用于解决大量小文件（所谓小文件：泛指小于block大小的文件）问题，SequenceFile是Hadoop API提供的一种二进制文件支持。这种二进制文件直接将<key,value>对序列化到文件中，一般对小文件可以使用这种文件合并，即将文件名作为key，文件内容作为value序列化到大文件中。

## 序列化写入


```
String [] DATA = {"aa","bb","cc "}
Configuration conf = new Configuration();
Path path  =  new Path("/a.seq");
IntWritable key = new IntWritable();  
Text value = new Text();  
Writer writer = SequenceFile.createWriter(conf, Writer.file(path), Writer.keyClass(key.getClass()),  
                    Writer.valueClass(value.getClass()), Writer.compression(CompressionType.BLOCK));  
for (int i = 0; i < 4; i++) {  
	value.set(DATA[i]);  
	key.set(i);  
	System.out.printf("[%s]\t%s\t%s\n", writer.getLength(), key, value);  
	writer.append(key, value);  
}  

```

## 序列化读取(待完善)


