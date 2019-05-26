---
title: '[SpringMVC]02_RequestMapping注解'
tag: SpringMVC
category: SpringMVC
date: 2017-10-23 00:00:00
---

# @RequestMapping 注解

## 使用

1. 可以在 `类之前` 使用
2. 可以再 `方法前` 使用
```
@Controller
@RequestMapping("/springmvc")
public class HelloHandler {

    @RequestMapping(value = "/hello")
    public  String  hello(){
        System.out.println("走到hello");
        return "success";
    }
}
```
这样就必须使用访问  `http://localhost:8080/springmvc/hello` 


## 参数 

1. value: 映射的url
2. method: 分为 `RequestMethod.GET` , `RequestMethod.POST` , `RequestMethod.DELETE` , `RequestMethod.PUT`,分别对应 `查增删改`
3. params: 后面传入一个数组 `{"name","age!=12"}` 解释为必须有 name 参数，而且age!= 12 的参数
  例子：
4. headers: 绑定请求头信息
5. consumes ： 能接受/处理的 `Content-type`
6. produces: 返回的数据 `Content-type`
```
@RequestMapping(value = "/hello",method = RequestMethod.GET,params ={"name","age!=12"} )
```

# @PathVariable

一般用于方法参数之前 ， 可用于 `value` 中 `占位符`--`{name}` 的传值。

## 支持 Ant 风格

- `/*/hello`: 映射 /aa/hello , /bbb/hello 
- `/**/hello`: 映射 /aa/bbb/c/hello 
- `/?/hello`: 映射 /a/hello , /d/hello 

## 支持 Rest 风格

可以实现 rest 风格的url和参数传递
```
    @RequestMapping(value = "/hello/{name}/{id}",method = RequestMethod.GET )
    public  String  hello(@PathVariable("name") String name ,@PathVariable("id") int id){
        System.out.println(id+"---------"+name);
        System.out.println("走到hello");
        return "success";
    }
```
注意，要实现REST风格的url需要一个过滤器

```
    <!--2.REST风格URI过滤器-->
    <filter>
        <filter-name>hiddenHttpFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>hiddenHttpFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    <!--2.REST风格URI过滤器-->
```
