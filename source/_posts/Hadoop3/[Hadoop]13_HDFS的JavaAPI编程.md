---
title: '[Hadoop]13_HDFS的JavaAPI编程'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:13:33
---


# 环境准备


1. 创建 maven 项目，添加依赖
```
    <dependencies>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-common</artifactId>
            <version>2.8.2</version>
        </dependency>

        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-hdfs-client</artifactId>
            <version>2.8.2</version>
        </dependency>
    </dependencies>
```
2. 将 `core-site.xml` , `hdfs-site.xml` 复制到项目 `resource`目录


# Coding

加载所有需要导入的类都是 `org.apache.hadoop` 中的

```
package cn.willon.hadoop.hdfs;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.util.Tool;
import java.io.IOException;
public class Client  {

    /**
     * 将本地文件上传
     *
     * @param localInput 本地文件
     * @param remotePath hdfs文件路径
     * @throws IOException s
     */
    public void putLocalFileToHDFS(Path localInput, Path remotePath) throws IOException {

        //1. 获取配置文件
        Configuration configuration = new Configuration();


        //2. 获取集群文件系统
        FileSystem remoteFS = FileSystem.get(configuration);


        //3. 获取本地文件系统
        LocalFileSystem localFS = FileSystem.getLocal(configuration);


        //4. 通过remoteFS 获取文件输出流
        FSDataOutputStream fsDataOutputStream = remoteFS.create(remotePath);

        //5. 通过 localFS 获取文件输入流
        FSDataInputStream fsDataInputStream = localFS.open(localInput);

		//通过 IOUtils将数据流对接
        IOUtils.copyBytes(fsDataInputStream, fsDataOutputStream, 1024, true);
        localFS.close();
        remoteFS.close();
    }


}
```
