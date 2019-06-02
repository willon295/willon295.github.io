---
title: '[SpringBoot]03_全局异常捕获_核心注解'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:03:00
---

- `@SpringBootApplication`: Spring boot Application entrance
- `@SpringBootConfiguration`: A replacement of `@Configuraion`, which has the same function as `<bean />` in traditional spring `xml`
- `@enableAutoConfiguration`: Enable  load coonfigurations of `jar` automaticly
- `@ComponemtScan`: An replacement of `<context: component-scan />`
- `@RestController`: Equals to `@Controller` + `@RequestMapping`
- `@Value`: Get the value  defined in `application.yml` 
- `@ControllerAdvice`: Unifid excption handler.

# 全局Controller异常捕获

`@ControllerAdvice`、 can handle all the excption in  `@Controller`

## Example


- custom excption
```java
public class MyExcption extends RuntimeException {

    private String code;
    private String msg;

    public MyExcption(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public MyExcption() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        return "MyExcption{" +
                "code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                '}';
    }
}
```
- ControllerAdvice
```java
@ControllerAdvice
public class MyControllerAdvice {

    /**
     * 全局异常处理， 指定处理的异常的类型
     *
     * @param e 异常
     * @return 统一的处理
     */
    @ResponseBody
    //指定处理异常的类型， 可以是自定义异常
    @ExceptionHandler(value = Exception.class)
    public Map<String, Object> errorHandler(Exception e) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", -1);
        map.put("msg", e.getMessage());
        return map;

    }


    /**
     * 自定义异常类的处理
     * @param me 自定义异常
     * @return 异常处理
     */
    @ResponseBody
    @ExceptionHandler(value = MyExcption.class)
    public Map<String, String> myexcprionHandler(MyExcption me) {
        HashMap<String, String> map = new HashMap<>();
        map.put("code", me.getCode());
        map.put("msg", me.getMessage());
        return map;

    }

}
```



# 全局404处理

404 处理分为两种情况：

1. 返回一个错误的 html
2. 返回 JSON 格式的信息



## 返回 404.html

默认的 404 映射的 请求路径是 `/error`，所以要对这个请求路径进行特殊处理：

1. 自定义 ErrorController, 实现 `ErrorController` 接口

   ```java
   
   @Controller
   public class MyNotFoundController implements ErrorController {
   
       //请求的路径， /error默认
       private static final String ERROR_PATH = "/error";
       
       //返回的 html 文件名
       private static final String FILE_PATH = "404";
   
       /**
        * 404 映射
        * @return 404 文件路径
        */
       @GetMapping(ERROR_PATH)
       public String error() {
           return FILE_PATH;
       }
   
   
       @Override
       public String getErrorPath() {
           return ERROR_PATH;
       }
   }
   
   ```

2. 这里使用 `Thymleaf` 模板， 所以需要引入依赖

   ```xml
   <dependency>
   	<groupId>org.springframework.boot</groupId>
   	<artifactId>spring-boot-starter-thymeleaf</artifactId>
   </dependency>
   ```

3. 新建  `404.html`  放在 `resource/templates/` 目录即可





## 返回JSON信息

1. 在 ControllerAdvice中定义处理 404 异常的方法

   ```java
   @ControllerAdvice
   public class MyControllerAdvice {
       private Map<String, String> map = new HashMap<>();
       
       //NoHandlerFoundException就是 404 异常
       @ResponseBody
       @ExceptionHandler(value = NoHandlerFoundException.class)
       public Map<String, String> notfound(NoHandlerFoundException e) {
           map.put("code", "404");
           map.put("msg", e.getMessage());
           return map;
       }
   }
   
   ```

2. `application.yml` 文件中修改配置

   ```yaml
   spring:
     #404直接抛出
     mvc:
       throw-exception-if-no-handler-found: true
     #不给静态资源创建映射
     resources:
       add-mappings: false
   ```

3. 测试结果

   ```json
   {
   	msg: "No handler found for GET /",
   	code: "404"
   }
   ```