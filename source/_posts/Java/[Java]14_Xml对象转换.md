---
title: '[Java]14_Xml对象转换'
tag: Java
category: Java
date:  2016-05-12 00:14:00
---



# XML 文件 转 Java 对象



##  XML文件预览



大概的文件结构

```xml
<?xml version="1.0" encoding="UTF-8"?>
    <c c1="0">
        <d d1="101010100" d2="北京" d3="beijing" d4="北京"/>
        <d d1="101010200" d2="海淀" d3="haidian" d4="北京"/>
        <d d1="101010300" d2="朝阳" d3="chaoyang" d4="北京"/>
        <d d1="101010400" d2="顺义" d3="shunyi" d4="北京"/>
        <d d1="101010500" d2="怀柔" d3="huairou" d4="北京"/>
        <d d1="101010600" d2="通州" d3="tongzhou" d4="北京"/>
        <d d1="101010700" d2="昌平" d3="changping" d4="北京"/>
        <d d1="101010800" d2="延庆" d3="yanqing" d4="北京"/>
        <d d1="101010900" d2="丰台" d3="fengtai" d4="北京"/>
        <d d1="101011100" d2="大兴" d3="daxing" d4="北京"/>
        <d d1="101340405" d2="花莲" d3="hualian" d4="台湾"/>
        <d d1="101340406" d2="云林" d3="yunlin" d4="台湾"/>
    </c>
```



## Java代码



1. 建立JavaBean

   ```java
   @Data
   //定义根节点
   @XmlRootElement(name = "d")
   //定义读取的方式
   @XmlAccessorType(XmlAccessType.FIELD)
   public class City  implements Serializable {
       @XmlAttribute(name = "d1")
       private String cityId; //城市id
   
       @XmlAttribute(name ="d2" )
       private String cityName; //城市名称
   
       @XmlAttribute(name = "d3")
       private String cityCode; //城市拼音
   
       @XmlAttribute(name = "d4")
       private String province; //城市所在的省
   }
   
   @Data
   @XmlRootElement(name = "c")
   @XmlAccessorType(XmlAccessType.FIELD)
   public class CityList implements Serializable {
       @XmlElement(name = "d")
       private List<City> cityList;
   }
   
   ```

   

2. 创建工具类

   ```java
   @Slf4j
   public class XmlBuilder {
       /**
        * 将 xml数据  转换成对象
        *
        * @param clazz 对象的类
        * @param file  xml文件名称
        * @return 转换完整的对象
        * @throws JAXBException
        */
       public static Object xmlStr2Object(Class<?> clazz, String file) throws JAXBException {
   
           Object xmlObject = null;
   
           JAXBContext context = JAXBContext.newInstance(clazz);
   
           //转为对象的接口
           Unmarshaller unmarshaller = context.createUnmarshaller();
           xmlObject = unmarshaller.unmarshal(ClassLoader.getSystemResourceAsStream(file));
           return xmlObject;
       }
   
   }
   
   ```

   

3. 测试

   ```java
   
       public static void main(String[] args) throws JAXBException {
   
           CityList cityList = (CityList) XmlBuilder.xmlStr2Object(CityList.class, "city.xml");
           for (City city : cityList.getCityList()) {
   
               System.out.println(city);
           }
   
       }
   ```

   

