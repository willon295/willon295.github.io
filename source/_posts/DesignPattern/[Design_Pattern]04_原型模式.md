---
title: '[Design_Pattern]04_原型模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:04:00
---

原型模式简单的说就是，
通过 `克隆` 的方式创建对象，适用于当某个类的 `对象创建过程非常复杂` 或者 `非常消耗资源`



# 原型模式的创建


1. 实现 `Cloneable` 接口
2. 重写 Object 的 `clone()`方法
3. 在需要多次创建该类实例的地方使用克隆创建对象


# 举个例子

这个类的实例在创建时会加载驱动并且连接数据库。

1. 创建实例比较消耗资源的类
```java
public class DBConnection implements Cloneable {
    private String url = "jdbc:mysql://localhost";
    private String username = "root";
    private String driver = "com.mysql.jdbc.Driver";
    private String password = "root";

    private Connection conn;

    public DBConnection() throws Exception {
        Class.forName(driver);
        conn = DriverManager.getConnection(url, username, password);
    }
    @Override
    protected Object clone() {
        Object o = null;
        try {
            o = super.clone();
        } catch (CloneNotSupportedException e) {
            System.out.println("克隆失败");
        }
        return o;
    }
}
```
2. 测试

```java
    public static void main(String[] args) throws Exception {

        //获取这个类的实例  是一个非常消耗资源的操作，所以一般会克隆
        DBConnection dbConnection = new DBConnection();

        for (int i = 0; i < 20; i++) {
            
            DBConnection c = (DBConnection) dbConnection.clone();

        }

    }
```


# 思考

如果需要 `深度拷贝` , 可以使用 `序列化` ,  `反序列化`生成克隆对象