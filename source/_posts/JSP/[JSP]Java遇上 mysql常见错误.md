---
title: '[JSP] 开发笔记--Java遇上 mysql常见错误'
tags:
  - java
  - JSP
  - 学习
id: 30
categories:
  - JSP
date: 2017-01-02 21:51:44
---

首先去mysql官网下载jdbc 的驱动jar 包

Java链接数据库---错误总结：

1、mysql 服务未运行
2、驱动名 写错了 ，驱动包正确的写法是："com.mysql.jdbc.Driver"
3、Connection 包导入错误，正确的是导入 java.sql.Connection包，不是com.mysql.jdbc.Connection
4、数据库 用户名密码输入不正确
5、驱动包未加载并且初始化，在IDEA中 需要在项目的 lib目录中导入 驱动jar包，等待加载完毕
6、驱动 jar 包 未导入JDK安装目录：此项配置需要将 驱动jar包 复制到 D:\JDK\jre\lib\ext\目录中
 

基本上以上错误全部解决就可以正常运行 项目了。


### DBHelper


	package utils;
	import java.sql.*;
	import com.mysql.jdbc.Driver;
	public class DBHelper {
	     //数据库驱动
	    private static final String driver = &quot;com.mysql.jdbc.Driver&quot;;
	     //连接地址
	    private static final String url =&quot;jdbc:mysql://localhost:3306/casell?useUnicon=true&amp;characterEncoding=UTF-8&amp;useSSL=false&quot;;
	    private static final String username = &quot;root&quot;;//数据库用户名
	    private static final String password = &quot;root&quot;;//数据库密码
	    private static Connection conn=null;
	    //静态代码块负责加载驱动
	    static {
	        try {
	            Class.forName(driver);
	        } catch (Exception ex) {
	            ex.printStackTrace();
	        }
	    }
	    //单例模式返回数据库连接对象
	    public static Connection getConnection() throws Exception {
	        if (conn == null) {
	            conn =  DriverManager.getConnection(url, username, password);
	            return conn;
	        }
	        return conn;
	    }
	}
	


### 使用

在另一个 类或者方法中，调用此工具类的方法：

	Connection conn=DBHelper.getConnection();

这样就链接上数据库了。。
如果是执行数据库查询操作：

	
	//创建连接对象
	Connection co = DBHelper.getConnection();
	//SQL语句处理对象
	Statement stat = co.createStatement();
	String sql = &quot;SELECT  * FROM  user&quot;;
	// 结果集储存、操作对象
	ResultSet rs = stat.executeQuery(sql);
	String name = null;
	String pass = null;
	//返回结果集不为空，进行遍历
	while (rs.next()) {
	    name = rs.getString(&quot;name&quot;);
	    pass = rs.getString(&quot;password&quot;);
	}
	//关闭链接
	conn.close();
	//释放资源
	rs.close();
	stat.close();
