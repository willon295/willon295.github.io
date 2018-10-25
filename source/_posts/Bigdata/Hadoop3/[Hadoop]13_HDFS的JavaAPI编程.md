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

加载所有需要导入的类都是 `org.apache.hadoop.*`

## 简单的几个例子

上传下载文件，压缩上下载文件，查看文件内容

```
package cn.willon.hadoop.hdfs;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.io.compress.CompressionCodec;
import org.apache.hadoop.io.compress.CompressionCodecFactory;
import org.apache.hadoop.io.compress.CompressionInputStream;
import org.apache.hadoop.io.compress.CompressionOutputStream;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Client  {

    /**
     * 将本地文件上传
     *
     * @param localInput 本地文件
     * @param remotePath hdfs文件路径
     * @throws IOException 文件读写异常
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


    /**
     * 查看HDFS文件内容
     * @param filePath 文件路径
     * @throws IOException 读取文件异常
     */
    public  void  catHDFSFileContent(String  filePath) throws IOException {
        String  line  ;
        Path  path = new Path(filePath);

        Configuration conf = new Configuration();

        FileSystem f = FileSystem.get(conf);

        FSDataInputStream open = f.open(path);

        BufferedReader b = new BufferedReader(new InputStreamReader(open));
        while (( line  = b.readLine()) != null){
            System.out.println(line);

        }

    }


    /**
     * 获取 HDFS文件 到本地
     * @param remotePath HDFS文件
     * @param localPath 本地文件
     * @throws IOException 文件读写异常
     */
    public  void  getHDFSFileToLocal(String remotePath , String localPath) throws IOException {

        Configuration conf = new Configuration();
        FileSystem rfs = FileSystem.get(conf);
        LocalFileSystem lfs = FileSystem.getLocal(conf);

        FSDataInputStream ris = rfs.open(new Path(remotePath));
        FSDataOutputStream los = lfs.create(new Path(localPath));

        IOUtils.copyBytes(ris,los,1024,true);
        ris.close();
        los.close();
    }


    /**
     * 将本地文件进行压缩，上传至 HDFS
     * @param localFile 本地文件
     * @param remoteFile 存放到 HDFS的文件如： hadoop.gz
     * @throws IOException 文件读写异常
     */
    public  void  putFileByCompressor(String localFile,String remoteFile) throws IOException {


        Configuration configuration  = new Configuration();

        //获取 远程和本地文件系统
        FileSystem rfs = FileSystem.get(configuration);
        LocalFileSystem lfs  = FileSystem.getLocal(configuration);

        //创建文件输出流 ， 本地文件读取流
        FSDataOutputStream fos = rfs.create(new Path(remoteFile));
        FSDataInputStream fis = lfs.open(new Path(localFile));


        //创建压缩工厂对象
        CompressionCodecFactory factory = new CompressionCodecFactory(configuration);

        //工厂对象通过 文件名 获取相应的压缩格式  的压缩对象
        CompressionCodec codec = factory.getCodec(new Path(remoteFile));


        //压缩对象创建压缩的文件输出流
        CompressionOutputStream cos = codec.createOutputStream(fos);

        //通过工具类 将文件惊醒读写
        IOUtils.copyBytes(fis,cos,1024,true);


        fis.close();
        fos.close();
        cos.close();
        lfs.close();
        rfs.close();
    }


    /**
     * 将HDFS压缩文件读取到本地
     * @param remotePath 远程文件
     * @param localFile 本地文件
     * @throws IOException 文件读写异常
     */
    public  void   getCompressedFileToLocal(String remotePath,String  localFile) throws IOException {


        Configuration  configuration = new Configuration();

        //获取 远程和本地文件系统
        FileSystem rfs = FileSystem.get(configuration);
        LocalFileSystem lfs  = FileSystem.getLocal(configuration);

        FSDataInputStream rfis = rfs.open(new Path(remotePath));
        FSDataOutputStream lfos = lfs.create(new Path(localFile));

        CompressionCodecFactory factory = new CompressionCodecFactory(configuration);
        CompressionCodec codec = factory.getCodec(new Path(remotePath));
        //读取压缩文件，创建输出流，输出流是解压缩后的流
        CompressionInputStream cis = codec.createInputStream(rfis);
        IOUtils.copyBytes(cis,lfos,1024,true);


    }

    public static void main(String[] args) throws IOException {

         Client c = new Client();
        // c.putLocalFileToHDFS(new Path("/home/willon/tmp/num.txt"),new Path("/num.txt"));

        //c.getHDFSFileToLocal("/num.txt","/home/willon/num.txt");
        c.getCompressedFileToLocal(" /20180310/p0010_cite/input/hadoop.gz","/home/willon/hadoop.txt");
    }
}

```
