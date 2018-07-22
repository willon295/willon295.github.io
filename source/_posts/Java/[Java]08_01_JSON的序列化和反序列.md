---
title: '[Java]08_01_JSON的序列化和反序列.md'
tag: Java
category: Java
date: 2016-05-12 00:08:01
---

# 使用的技术

json序列化的工具有很多，但是目前最好用的应该是 `jackson`

1. 依赖文件
```
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.9.6</version>
        </dependency>
```
2. Bean
```
public class Student {

    private String id;
    private String name;
    private String age;
    private String gender;
}
```
3. 测试类
```
public class JSONTest {
    private ObjectMapper mapper;

    @Before
    public void init() {
        mapper = new ObjectMapper();
    }


	/*将对象转成json文件/json字符串*/
    @Test
    public void object2JSON() throws IOException, JAXBException {
        //从xml文件解析出学生的信息
        StudentList studentList = (StudentList) XmlParserBuilder.xml2Object(StudentList.class, "student.xml");
        List<Student> students = studentList.getStudents();
        for (Student student : students) {
            System.out.println(student);
        }

        //将对象写入文件
        mapper.writeValue(new File("src/main/student.json"), students);

        //将对象转化成字符串
        String s = mapper.writeValueAsString(students);
        System.out.println(s);
    }
    
       @Test
       /*将JSON转换成对象*/
    public void json2Object() throws IOException {

        List<Student> s = mapper.readValue(new File("src/main/resources/student.json"), new TypeReference<List<Student>>() {
        });
        for (Student student : s) {
            System.out.println(student);
        }
    }
}
}
```
4. student.json
```
[
  {
    "id": "1001",
    "name": "chen",
    "age": "23",
    "gender": "male"
  },
  {
    "id": "10012",
    "name": "jakc",
    "age": "23",
    "gender": "male"
  },
  {
    "id": "1003",
    "name": "lucu",
    "age": "22",
    "gender": "female"
  }
]
```

# 总结

JSON  转对象的时候， 分为以下两种情况
1. JSON 对应的是一个简单的对象，那么在解析时直接使用
```
        mapper.readValue(文件路径, 对应的BeanClass);
```
2. JSON 文件对应的是复杂类型的数据， 比如 JSON 数组里的每一个对象 再次封装成自定义的对象， 则需要使用 `TypeReference<自定义类型数据>(){}` 
```
        mapper.readValue(
        new File("src/main/resources/student.json"),
        new TypeReference<List<Student>>(){}
       
        );

```