---
title: '[MySQL]主从复制配置'
category: MySQL
tag: MySQL
date: 2018-02-02 00:00:00
---

# master配置

1. master修改配置文件 `/etc/my.cnf`

```
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
symbolic-links=0
character-set-server=utf8
server-id=1
log-bin=log
binlog-do-db=test   #如果不指定， 则默认会备份所有的库
binlog-ignore-db=mysql #忽略哪些数据库
```

2. master授权slave并且刷新权限

```sql
GRANT REPLICATION SLAVE,FILE ON *.* TO 'willon'@'10.0.0.14' IDENTIFIED BY '123456';

flush    privileges;
```

3. 重新登陆master ， 查看master 状态

```
MariaDB [(none)]> show  master  status  \G; 

*************************** 1. row ***************************
            File: log.000002
        Position: 245
    Binlog_Do_DB: test
Binlog_Ignore_DB: mysql

```





# slave配置

1. slave修改配置文件 `/etc/my.cnf`

```
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
symbolic-links=0
character-set-server=utf8
server-id=2  #配置server-id
relay-log=/var/lib/mysql/relay-bin
```

2. 指定master的备份文件， 以及登陆所需要的信息
```
CHANGE MASTER TO MASTER_HOST='10.0.0.13',MASTER_USER='willon', MASTER_PASSWORD='123456', MASTER_LOG_FILE='log.000001', MASTER_LOG_POS= 245;
start slave ; 
```

# 测试

1. 在master的test库中新建表
2. 在slave中可以查询到新的表
