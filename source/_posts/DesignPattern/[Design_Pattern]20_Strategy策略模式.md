---
title: '[Design_Pattern]20_Strategy策略模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:20:00
---

策略模式 是 `行为模式` 的一种，当一个类的行为或者是算法在运行时可以改变。

举个简单的例子， 使用第三方接口解析数据，但是第三方有JSON、有XML，如果使用if..else就很low
```
if (xml){
    parseXML();
}else if(json){
    parseJSON();
}
```
如果此时需要其他类型的数据，那么扩展则需要修改 if..else结构

# 实现流程

1. 将具体策略与环境分离
2. 建立抽象的策略接口/基类
3. 具体策略实现
4. 让环境持有一个策略的引用
5. 在不同的环境下调用不同的策略并且执行



# DEMO

![](/images/dp20_strategy_00.png)

- 抽象策略接口
```
/**
 * 统一接口
 */
public interface Parser {
    String parse(String msg);
}

```
- 具体实现类
```
/**
 * JSON 解析
 */
public class JSONParser implements Parser {
    @Override
    public String parse(String msg) {
        System.out.println("JSON_"+msg);
        return "JSON_"+msg;
    }
}

/**
 * 普通解析
 */
public class TextParser implements Parser{
    @Override
    public String parse(String msg) {
        System.out.println(msg);
        return msg;
    }
}

/**
 * XML 解析
 */
public class XMLParser implements Parser {
    @Override
    public String parse(String msg) {
        System.out.println("XML__"+msg);
        return "XML_"+msg;
    }
}
```
- 具体环境类
```
/**
 * 具体环境类
 */
public class Context {

    private Parser parser;

    public Context(Parser parser) {
        this.parser = parser;
    }

    /**
     * 需要执行策略方法，根据不同的环境执行不同的策略
     * @param msg 信息
     * @return 解析之后的信息
     */
    public String parse(String msg) {
        return parser.parse(msg);
    }
}

```


- 测试类
```
public class Main {

    public static void main(String[] args) {


        String txt = "Text Message!";
        Context context = new Context(new TextParser());
        context.parse(txt);


        String json="{name:'Li',age:23}";
        context=new Context(new JSONParser());
        context.parse(json);

        String  xml = "<name>Li</name>";
        context= new Context(new XMLParser());
        context.parse(xml);

    }
}
/*

Text Message!
JSON_{name:'Li',age:23}
XML__<name>Li</name>

 */
```

