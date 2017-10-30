---
title: '[Hadoop]03_分布式服务器任务分发'
category: Hadoop
tags: Hadoop
date: 2017-10-28 12:29:33
---

# 简介

小测试，一键给所有分布式服务器安装 `JAVA 环境` 。

1. `hdp0` 服务器负责 ：分发公钥，分发安装脚本，提供资源访问（JDK文件，这里使用httpd）
2. `hdp*` 分布式服务器

# 实现

## 启动服务器配置        

1. `hdp0` ：安装并配置`httpd`，使得 `jdk-9.0.1_linux-x64_bin.tar.gz` 可访问
2. `生成公钥`： 简单测试，使用 `ssh-keygen` 即可生成，生成文件在 `.ssh/` 目录
3. `boot.sh`: 启动脚本，用于分发公钥和执行脚本
4. `install.sh`: 各台服务器需要执行的脚本

## 代码

### `boot.sh`

```
#! /usr/bin/bash

#所有服务器的地址/域名
SERVERS="hdp1 hdp2";

#服务器的密码
PASSWORD=hadoop

#实现输入密码登录
auto_ssh_copy_id(){
	expect -c "set timeout -1;
	spawn ssh-copy-id $1;
	expect {
		*yes/no* {send -- yes\r;exp_continue;}
		*assword:* {send -- $2\r;exp_continue;}
		eof {exit 0;}
	}";
}
#分发公钥到所有服务器
ssh_copy_id_to_all(){
	for SERVER in $SERVERS
	do
		auto_ssh_copy_id $SERVER $PASSWORD
	done
}

#分发公钥、执行脚本到所有服务器
ssh_copy_id_to_all
for SERVER in $SERVERS
do
    scp install.sh root@$SERVER:/root
    ssh root@$SERVER  "sh /root/install.sh"
done
```

### `install.sh`

此处为安装JDK的执行代码
```
#! /usr/bin/bash

yum install -y wget
wget http://hdp0/software/jdk-9.0.1_linux-x64_bin.tar.gz
tar -zxf jdk-9.0.1_linux-x64_bin.tar.gz -C /usr/local/
#解压之后的文件夹名 jdk-9.0.1
cat >> /etc/profile <<EOF
export JAVA_HOME=/usr/local/jdk-9.0.1
export  PATH=\$JAVA_HOME/bin:\$PATH
EOF

#注意美元符号要加 \
source /etc/profile
rm -f jdk-9.0.1_linux-x64_bin.tar.gz install.sh
```
