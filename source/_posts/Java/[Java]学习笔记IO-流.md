---
title: '[Java]学习笔记IO-流'
tags:
  - java
id: 133
categories:
  - Java
date: 2016-12-23 16:43:34
---

在程序中所有的数据都是以流的方式进行传输或保存的，程序需要数据的时候要使用输入流读取数据，而当程序需要将一些数据保存起来的时候，就要使用输出流完成。

程序中的输入输出都是以流的形式保存的，流中保存的实际上全都是字节文件。

### 字节流与字符流

在java.io包中操作文件内容的主要有两大类：字节流、字符流，两类都分为输入和输出操作。在字节流中输出数据主要是使用OutputStream完成，输入使的是InputStream，在字符流中输出主要是使用Writer类完成，输入流主要使用Reader类完成。（这四个都是抽象类）

### 操作流程

在Java中IO操作也是有相应步骤的，以文件操作为例，主要的操作流程如下：

1.  使用File类打开一个文件
2.  通过字节流或字符流的子类，指定输出的位置
3.  进行读/写操作
4.  关闭输入/输出
IO操作属于资源操作，一定要记得关闭

## 字节流

字节流主要是操作byte类型数据，以byte数组为准，主要操作类就是OutputStream、InputStream

&nbsp;

字节输出流：OutputStream

OutputStream是整个IO包中字节输出流的最大父类，此类的定义如下：

public abstract class OutputStream extends Object implements Closeable,Flushable

从以上的定义可以发现，此类是一个抽象类，如果想要使用此类的话，则首先必须通过子类实例化对象，那么如果现在要操作的是一个文件，则可以使用：FileOutputStream类。通过向上转型之后，可以为OutputStream实例化

Closeable表示可以关闭的操作，因为程序运行到最后肯定要关闭

Flushable：表示刷新，清空内存中的数据

FileOutputStream类的构造方法如下：

public FileOutputStream(File file)throws FileNotFoundException

写数据：
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileOutputStream;
 3 import java.io.IOException;
 4 import java.io.OutputStream;
 5 
 6 public class Test11 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         OutputStream out=new FileOutputStream(f);//如果文件不存在会自动创建
10         String str="Hello World";
11         byte[] b=str.getBytes();
12         out.write(b);//因为是字节流，所以要转化成字节数组进行输出
13         out.close();
14     }
15 }</pre>
</div>
也可以一个字节一个字节进行输出，如下：

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileOutputStream;
 3 import java.io.IOException;
 4 import java.io.OutputStream;
 5 
 6 public class Test11 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         OutputStream out=new FileOutputStream(f);//如果文件不存在会自动创建
10         String str="Hello World";
11         byte[] b=str.getBytes();
12         for(int i=0;i&lt;b.length;i++){
13             out.write(b[i]);
14         }
15         out.close();
16     }
17 }</pre>
</div>
以上输出只会进行覆盖，如果要追加的话，请看FileOutputStream类的另一个构造方法：

public FileOutputStream(File file,boolean append)throws FileNotFoundException

在构造方法中，如果将append的值设置为true，则表示在文件的末尾追加内容。

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileOutputStream;
 3 import java.io.IOException;
 4 import java.io.OutputStream;
 5 
 6 public class Test11 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         OutputStream out=new FileOutputStream(f,true);//追加内容
10         String str="\r\nHello World";
11         byte[] b=str.getBytes();
12         for(int i=0;i&lt;b.length;i++){
13             out.write(b[i]);
14         }
15         out.close();
16     }
17 }</pre>
</div>
**文件中换行为：\r\n**

### 字节输入流：InputStream

既然程序可以向文件中写入内容，则就可以通过InputStream从文件中把内容读取进来，首先来看InputStream类的定义：

public abstract class InputStream extends Object implements Closeable

与OutputStream类一样，InputStream本身也是一个抽象类，必须依靠其子类，如果现在是从文件中读取，就用FileInputStream来实现。

观察FileInputStream类的构造方法：

public FileInputStream(File file)throws FileNotFoundException

读文件：

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileInputStream;
 3 import java.io.IOException;
 4 import java.io.InputStream;
 5 
 6 public class Test12 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         InputStream in=new FileInputStream(f);
10         byte[] b=new byte[1024];
11         int len=in.read(b);
12         in.close();
13         System.out.println(new String(b,0,len));
14     }
15 }</pre>
</div>
但以上方法是有问题的，用不用开辟这么大的一个字节数组，明显是浪费嘛，我们可以根据文件的大小来定义字节数组的大小，File类中的方法：public long length()

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileInputStream;
 3 import java.io.IOException;
 4 import java.io.InputStream;
 5 
 6 public class Test13 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         InputStream in=new FileInputStream(f);
10         byte[] b=new byte[(int) f.length()];
11         in.read(b);
12         in.close();
13         System.out.println(new String(b));
14     }
15 }

</pre>
</div>
我们换种方式，一个字节一个字节读入~

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileInputStream;
 3 import java.io.IOException;
 4 import java.io.InputStream;
 5 
 6 public class Test14 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         InputStream in=new FileInputStream(f);
10         byte[] b=new byte[(int) f.length()];
11         for(int i=0;i&lt;b.length;i++){
12             b[i]=(byte) in.read();
13         }
14         in.close();
15         System.out.println(new String(b));
16     }
17 }</pre>
<div class="cnblogs_code_toolbar"></div>
</div>
但以上情况只适合知道输入文件的大小，不知道的话用如下方法：

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileInputStream;
 3 import java.io.IOException;
 4 import java.io.InputStream;
 5 
 6 public class Test15 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         InputStream in=new FileInputStream(f);
10         byte[] b=new byte[1024];
11         int temp=0;
12         int len=0;
13         while((temp=in.read())!=-1){//-1为文件读完的标志
14             b[len]=(byte) temp;
15             len++;
16         }
17         in.close();
18         System.out.println(new String(b,0,len));
19     }
20 }</pre>
<div class="cnblogs_code_toolbar"></div>
</div>

## 字符流

在程序中一个字符等于两个字节，那么java提供了Reader、Writer两个专门操作字符流的类。

### 字符输出流：Writer

Writer本身是一个字符流的输出类，此类的定义如下：

public abstract class Writer extends Object implements Appendable，Closeable，Flushable

此类本身也是一个抽象类，如果要使用此类，则肯定要使用其子类，此时如果是向文件中写入内容，所以应该使用FileWriter的子类。

FileWriter类的构造方法定义如下：

public FileWriter(File file)throws IOException

字符流的操作比字节流操作好在一点，就是可以直接输出字符串了，不用再像之前那样进行转换操作了。

写文件：

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileWriter;
 3 import java.io.IOException;
 4 import java.io.Writer;
 5 
 6 public class Test16 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         Writer out=new FileWriter(f);
10         String str="Hello World";
11         out.write(str);
12         out.close();
13     }
14 }</pre>
<div class="cnblogs_code_toolbar"></div>
</div>
在默认情况下再次输出会覆盖，追加的方法也是在构造函数上加上追加标记

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileWriter;
 3 import java.io.IOException;
 4 import java.io.Writer;
 5 
 6 public class Test17 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         Writer out=new FileWriter(f,true);//追加
10         String str="\r\nHello World";
11         out.write(str);
12         out.close();
13     }
14 }</pre>
<div class="cnblogs_code_toolbar"></div>
</div>

### 字符输入流：Reader

Reader是使用字符的方式从文件中取出数据，Reader类的定义如下：

public abstract class Reader extends Objects implements Readable，Closeable

Reader本身也是抽象类，如果现在要从文件中读取内容，则可以直接使用FileReader子类。

FileReader的构造方法定义如下：

public FileReader(File file)throws FileNotFoundException

以字符数组的形式读取出数据：

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileReader;
 3 import java.io.IOException;
 4 import java.io.Reader;
 5 
 6 public class Test18 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         Reader input=new FileReader(f);
10         char[] c=new char[1024];
11         int len=input.read(c);
12         input.close();
13         System.out.println(new String(c,0,len));
14     }
15 }</pre>
<div class="cnblogs_code_toolbar"></div>
</div>
也可以用循环方式，判断是否读到底：

&nbsp;
<div class="cnblogs_code">
<div class="cnblogs_code_toolbar"></div>
<pre> 1 import java.io.File;
 2 import java.io.FileReader;
 3 import java.io.IOException;
 4 import java.io.Reader;
 5 
 6 public class Test19 {
 7     public static void main(String[] args) throws IOException {
 8         File f = new File("d:" + File.separator+"test.txt");
 9         Reader input=new FileReader(f);
10         char[] c=new char[1024];
11         int temp=0;
12         int len=0;
13         while((temp=input.read())!=-1){
14             c[len]=(char) temp;
15             len++;
16         }
17         input.close();
18         System.out.println(new String(c,0,len));
19     }
20 }</pre>
<div class="cnblogs_code_toolbar"></div>
</div>

### 字节流与字符流的区别

字节流和字符流使用是非常相似的，那么除了操作代码的不同之外，还有哪些不同呢？

字节流在操作的时候本身是不会用到缓冲区（内存）的，是与文件本身直接操作的，而字符流在操作的时候是使用到缓冲区的

字节流在操作文件时，即使不关闭资源（close方法），文件也能输出，但是如果字符流不使用close方法的话，则不会输出任何内容，说明字符流用的是缓冲区，并且可以使用flush方法强制进行刷新缓冲区，这时才能在不close的情况下输出内容

**那开发中究竟用字节流好还是用字符流好呢？**

在所有的硬盘上保存文件或进行传输的时候都是以字节的方法进行的，包括图片也是按字节完成，而字符是只有在内存中才会形成的，所以使用字节的操作是最多的。

**如果要java程序实现一个拷贝功能，应该选用字节流进行操作（可能拷贝的是图片），并且采用边读边写的方式（节省内存）。**