---
title: '[SpringBoot]03_Annotations_全局捕获异常'
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

# 全局捕获异常

`@ControllerAdvice`、 can handle all the excption in  `@Controller`

## Example


- custom excption
```
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
```
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
