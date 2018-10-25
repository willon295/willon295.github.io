---
title: '[Oracle]07_JDBC'
category: Oracle
tag: Oracle
date: 2018-05-12 00:07:00
---

# 一般步骤



## 准备

**驱动包**

一般在 `$ORACLE_HOME/jdbc/lib/` 目录，比如11g存在一个 `ojdbc6.jar` 的jar包

**把jar包安装到本地maven仓库**

```
mvn install:install-file -DgroupId=myOracle  -DartifactId=ojdbc6 -Dversion=11.2.0 -Dpackaging=jar -Dfile=ojdbc6.jar
```

**启动oracle实例以及监听**
```
$ sqlpus / as sysdba
SQL> startup

$ lsnrctl  start
```

**driver叫什么？jdbcUrl怎么写？**
```
driver=oracle.jdbc.driver.OracleDriver
jdbcUrl=jdbc:oracle:thin:@127.0.0.1:1521:oracleSID
```

## 注意事项

1. SQL语句不能有结束符 `;` 分号，否则报错 `无效字符`
2. 如果出现 `connect refused`, 检查用户名密码，是否启动监听
3. 如果出现 `TNS:listener does not currently know of SID given in connect descriptor`，说明监听配置不正确，参考第一篇 `[Oracle]00_安装及启动`

## 批处理


```
        Connection connction = ConnectionFactory.getConnction();
        
        // Statement 的批处理,批处理许多不同的 SQL 语句
        String sql1 = "INSERT INTO student VALUES(3,'rose','rosepwd')";
        String sql2 = "INSERT INTO student VALUES(4,'lucy','lucypwd')";
        Statement stat = connction.createStatement();
        stat.addBatch(sql1);
        stat.addBatch(sql2);
        stat.executeBatch();

        // PrepareStatement 批处理 适用于相同的语句，不同的参数
        String sql = "INSERT INTO student VALUES(?,?,?)";
        PreparedStatement pre = connction.prepareStatement(sql);
        for (int i = 0; i < 520; i++) {
            pre.setInt(1, i);
            pre.setString(2, "user_" + i);
            pre.setString(3, "" + i + "_pwd");
            pre.addBatch();

            if (i % 100 == 0) {
                //每100条记录执行一次
                pre.executeBatch();
                //执行完毕，清空缓存池
                pre.clearBatch();
            }
        }

        pre.executeBatch();
```
