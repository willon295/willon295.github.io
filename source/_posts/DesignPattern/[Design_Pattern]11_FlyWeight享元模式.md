---
title: '[Design_Pattern]11_FlyWeight享元模式'
category: 设计模式
tag: 设计模式
date: 2017-10-11 00:11:00
---

# 个人理解

享元模式是 `结构模式` 的一种。
用一个工厂保存已经存在的对象，若不存在，则创建该对象，并且保存，下次获取时若已经存在则不再创建，从而达到节约资源的目地

# 举个例子


![](/images/dp11_flyweight_00.png)

1. 实体类
```
/**
 * 连接实体类
 */
public class DBConnection {

    private String name;

    public DBConnection(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
```
2. 工厂类
```
/**
 * 一个工厂类
 */
public class DBConnFactory {
    private static final Map<String, DBConnection> map = new HashMap<>();
    /**
     * 获取对象，存在则直接返回，不存在则创建并且加进map中
     * @param type 连接的名字
     * @return 连接对象
     */
    public static DBConnection getDBConnection(String type) {

        DBConnection dbConnection = map.get(type);
        if (dbConnection == null) {
            dbConnection = new DBConnection(type);
            System.out.println("create new "+type);
            map.put(type, dbConnection);
        }

        return dbConnection;
    }

    /**
     * 获取map保存对象的大小
     * @return 对象的个数
     */
    public static int getSize(){
        return map.size();
    }
}
```
3. 测试类
```
public class TestFlyWeight {
    public static void main(String[] args) {
        DBConnection mysql = DBConnFactory.getDBConnection("mysql");
        DBConnection oracle = DBConnFactory.getDBConnection("oracle");
        DBConnection mysql2 = DBConnFactory.getDBConnection("mysql");
        DBConnection habse = DBConnFactory.getDBConnection("hbase");
        DBConnection mysql3 = DBConnFactory.getDBConnection("mysql");

        System.out.println(mysql==mysql2);
        System.out.println(mysql.equals(mysql3));
        System.out.println(DBConnFactory.getSize());

        
        /*运行结果
        create new mysql
        create new oracle
        create new hbase
        true
        true
        3
        * */

    }
}

```