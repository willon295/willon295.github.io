---
title: '[Java]08_XML解析'
tag: Java
category: Java
date: 2016-05-12 00:08:00
---


# XML解析

简介： 它是一种标记语言
注意事项：
1. 不能含有特殊符号，需要用实体符如 `&amp;` => `&`
2. 如果需要将特殊内容原样输出，使用 `<![CDATA[ 特殊内容 ]]>`

## 举个例子

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<employees>
    <employee id="1" deptName="教学部">
        <name>tom</name>
        <age>20</age>
        <gender>male</gender>
        <email>tom@briup.com</email>
        <salary>2000</salary>
    </employee>

    <employee id="2" deptName="教学部">
        <name>jack</name>
        <age>25</age>
        <gender>male</gender>
        <email>jack@briup.com</email>
        <salary>3000</salary>
    </employee>

    <employee id="3" deptName="教学管理部">
        <name>rose</name>
        <age>22</age>
        <gender>female</gender>
        <email>rose@briup.com</email>
        <salary>1000</salary>
    </employee>


    <employee id="4" deptName="研发部">
        <name>mark</name>
        <age>26</age>
        <gender>male</gender>
        <email>mark@briup.com</email>
        <salary>4000</salary>
    </employee>


</employees>
```

## 原生API__SAX解析

1. 创建 saxReader对象： `SAXParserFactory.newInstance().newSAXParser();`
2. 解析XML文件，指定自定义的 `Handler`
3. 自定义 `Handler`：
- 继承 `DefaultHandler`
- 重写 `characters()` 、 `startDocument()` 、 `startElement()` 、 `endElement()` 方法

**举个例子**
```java
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class EmployeeSax {

    public static void main(String[] args) throws IOException, SAXException, ParserConfigurationException {
        SAXParser saxParser = SAXParserFactory.newInstance().newSAXParser();

        EmployeeHandler handler = new EmployeeHandler();
        saxParser.parse(ClassLoader.getSystemResourceAsStream("employee.xml"), handler);

        List<Employee> employeeList = handler.getEmployeeList();
        for (Employee employee : employeeList) {

            System.out.println(employee);
        }
    }

}


//XML文件的处理器
class EmployeeHandler extends DefaultHandler {

    private List<Employee> employeeList;

    private Employee employee;

    private String tagName;

    public List<Employee> getEmployeeList() {
        return employeeList;
    }

    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }


    /**
     * 文档开始读取时 相应的操作，一般用于初始化资源
     */
    @Override
    public void startDocument() {
        employeeList = new ArrayList<Employee>();
    }



    /**
     * 读取到字符内容时要执行的逻辑
     * @param ch 读取到的字符
     * @param start 开始索引
     * @param length 长度
     * @throws SAXException
     */
    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {

        String text = String.valueOf(ch, start, length);
        if ("name".equals(tagName)) {
            employee.setName(text);
        } else if ("age".equals(tagName)) {
            employee.setAge(Integer.valueOf(text));
        } else if ("gender".equals(tagName)) {
            employee.setGender(text);
        } else if ("email".equals(tagName)) {
            employee.setEmail(text);
        } else if ("salary".equals(tagName)) {
            employee.setSalary(Integer.valueOf(text));
        }

    }

    /**
     * 读取到 开始标签时  要处理的逻辑
     * @param uri 用不上
     * @param localName 本地空间
     * @param qName  标签名
     * @param attributes 属性
     */
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) {
        if (qName.equals("employee")) {
            employee = new Employee();
            int id = Integer.parseInt(attributes.getValue("id"));
            String deptName = attributes.getValue("deptName");
            employee.setId(id);
            employee.setDeptName(deptName);
        } else {
            tagName = qName;
        }

    }

    /**
     * 读取到 结束标签 要处理的逻辑
     * @param uri 用不上
     * @param localName 本地空间
     * @param qName 标签名
     */
    @Override
    public void endElement(String uri, String localName, String qName) {
        if (qName.equals("employee")) {
            employeeList.add(employee);
        }
        tagName = null;

    }


}
```

## 原生API__DOM解析


1.  创建一个 DocumentBuilder 对象： `DocumentBuilderFactory.newInstance().newDocumentBuilder();` 
2. 通过解析XML文件：`builder.parse(ClassLoader.getSystemResourceAsStream("employee.xml"))`，获取 `Document` 对象。
3. 通过 `Document` 对象获取 `Element` 元素
4. 基本操作

```java
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class EmployeeDOM {

    public static void main(String[] args) throws ParserConfigurationException, IOException, SAXException {
        List<Employee> employeeList = new ArrayList<Employee>();

        //创建一个 DocumentBuilder 对象
        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();

        //解析XML文件
        Document document = builder.parse(ClassLoader.getSystemResourceAsStream("employee.xml"));

        //获取根节点
        Element root = document.getDocumentElement();

        //通过标签 获取所有该标签 子节点
        NodeList employees = root.getElementsByTagName("employee");
        int length = employees.getLength();

        //遍历子节点
        for (int i = 0; i < length; i++) {
            Employee employee = new Employee();
            Element e = (Element) employees.item(i);
            Integer id = Integer.valueOf(e.getAttribute("id"));
            String deptName = e.getAttribute("deptName");
            employee.setId(id);
            employee.setDeptName(deptName);

            //获取子节点
            NodeList attrs = e.getChildNodes();
            int length1 = attrs.getLength();
            for (int j = 0; j < length1; j++) {
                Node item = attrs.item(j);
                if (Node.ELEMENT_NODE == item.getNodeType() ) {
                    String tagName = item.getNodeName();
                    String text = item.getTextContent();
                    if ("name".equals(tagName)) {
                        employee.setName(text);
                    } else if ("age".equals(tagName)) {
                        employee.setAge(Integer.valueOf(text));
                    } else if ("gender".equals(tagName)) {
                        employee.setGender(text);
                    } else if ("email".equals(tagName)) {
                        employee.setEmail(text);
                    } else if ("salary".equals(tagName)) {
                        employee.setSalary(Integer.valueOf(text));
                    }
                }
            }
            employeeList.add(employee);

        }

        for (Employee employee1 : employeeList) {

            System.out.println(employee1);
        }

    }
}

```

## DOM4J解析


**套路**
1. 通过 `SAXReader` 对象读取XML,获取 `Document` 实例
```java
Document document =  new SAXReader().read(ClassLoader.getSystemResourceAsStream("city.xml"));
```
2. 通过 `document` 实例 获取根节点
```
Element root = document.getRootElement();
```
3. 通过root 节点获取所有子节点
```
List elements = root.elements();
```
**element常用方法**
```
e.attribute("id").getValue(); //获取属性内容
e.getText();  //获取开始、结束标签之间的文本内容
```
