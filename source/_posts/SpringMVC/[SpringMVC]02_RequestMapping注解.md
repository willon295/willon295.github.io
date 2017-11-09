---
title: '[SpringMVC]02_RequestMapping注解'
tag: SpringMVC
category: SpringMVC
date: 2017-10-23 00:00:00
---

# 使用

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


# 
