---
title: '[Linux]常见的加解密'
tags:
  - Linux
id: 145
categories:
  - Linux
date: 2016-12-23 18:00:16
---

事实告诉我们加密是非常重要的一件事，Linux下常见的几种加密方式。这里以加密一个sh脚本为例列举几种常见加密和解密方法

### 常见的加密

> **1、gzexe**> 
> 
> *   简介：这是一个 linux 自带的压缩工具，但是事实上他也可以用来加密。
> *   加密：<span style="color: #ff6600;"> gzexe  test.sh</span>
> *   结果：生成 加密的<span style="color: #ff6600;"> test.sh</span> 和<span style="color: #ff6600;">test.sh~</span> 备份文件
> *   解密：<span style="color: #ff6600;">gzexe <span style="color: #ff0000;">-d</span> test.sh </span>
> **2、SHC**> 
> 
> *   简介：shc是一个脚本编译工具, 使用RC4加密算法,官网：[点击进入](http://www.datsi.fi.upm.es/)
> *   安装：> 
> <span style="color: #ff6600;">wget [http://www.datsi.fi.upm.es/%7Efrosal/sources/shc-3.8.7.tgz](http://www.datsi.fi.upm.es/~frosal/sources/shc-3.8.7.tgz)</span>> 
> <span style="color: #ff6600;"> tar vxf shc-3.8.7.tgz</span>> 
> <span style="color: #ff6600;"> cd shc-3.8.7</span>> 
> <span style="color: #ff6600;"> make test</span>> 
> <span style="color: #ff6600;"> make strings</span>> 
> <span style="color: #ff6600;"> make install</span>
> *   加密：<span style="color: #ff6600;">shc [-option]  filename</span> 。例如 ：<span style="color: #ff6600;">shc -vf test.sh</span>
> *   结果：生成<span style="color: #ff6600;">test.sh.x</span> 和 <span style="color: #ff6600;">test.sh.x.c</span>> 
> <span style="color: #ff6600;">test.sh.x</span>：为二进制文件，赋予执行权限后，可直接执行。> 
> <span style="color: #ff6600;">test.sh.x.c</span> ：是c源文件。基本没用，可以删除
> *   参数：> 
> -e:指定过期时间为2010年10月20日> 
> -m:过期后打印出的信息；> 
> -v: verbose> 
> -r: 可在相同操作系统的不同主机上执行> 
> -f: 指定源shell
> *   解密：使用unshc.sh解密> 
> <span style="color: #ff0000;">chmod 777 unshc.sh &amp;&amp; ./unshc.sh  test.sh.x</span>> 
> unshc.sh下载地址：[点击下载](http://pan.codexz.cn/sh/unshc.sh)
> **3、UPX**> 
> 
> *   简介：UPX也是一款轻量级的压缩工具;官网：[点击进入](https://upx.github.io/)
> *   安装：从官网下载文件即可。
> *   加密： <span style="color: #ff0000;">upx test.sh</span>
> *   结果：生成 加密的 test.sh .sh
> *   解密：<span style="color: #ff0000;">upx -d test.sh .sh</span>
> **4、openssl**> 
> 
> *   简介：想使用OpenSSL对文件进行加密，其实就跟对消息进行加密一样简单。唯一的区别在于，我们不是使用echo命令，而是使用-in选项，后面跟以我们想进行加密的实际文件，并使用-out选项，这会指令OpenSSL将经过加密的文件存储到某个名称的文件中：
> *   加密： <span style="color: #ff0000;">$ openssl enc -aes-256-cbc -in /etc/services -out services.dat</span>
> *   解密：<span style="color: #ff0000;"><span style="color: #ff0000;">$ openssl enc -aes-256-cbc -d -in services.dat &gt; services.txt> 
> </span>enter aes-256-cbc decryption password:</span>
> **4、GNU**> 
> 
> *   不知道，暂时还没用过

### 总结

还有其他的很多加密 方式，各种加密方式是可以嵌套用的，比如我曾经就碰到过 gz+shc+upx加密的，解密步骤就是高清出它加壳的顺序，一层一层脱。