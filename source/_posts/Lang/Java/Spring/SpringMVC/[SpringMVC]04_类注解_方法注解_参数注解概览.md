---
title: '[SpringMVC]04_各种注解'
tag: SpringMVC
category: SpringMVC
date: 2017-10-23 00:04:00
---



# 类注解

1. `@RequestMapping`  限制请求路径，参数，请求类型，处理数据类型等
   属性：

   | 名称     | 作用                                                         |
   | -------- | ------------------------------------------------------------ |
   | value    | 指定请求的路径 可以用正则表达式 value = "/get/{name:^[A-Za-z][A-Za-z1-9_-]+$}" |
   | path     | 和value作用姓同，但是如果path，value同时存在，程序运行报错   |
   | params   | 指定请求的参数必须包含/不包含哪些参数，参数满足什么条件      |
   | headers  | 限制请求头里的内容                                           |
   | consumes | 消费：即能处理什么 `Content-type` 的数据                     |
   | produces | 生产：即返回的数据类型  `Content-type`                       |

2. `@Controller` : 指定这个类是Controller

3. `@RestController` ： 指定它是返回 JSON格式的Controller

4. `@ResponseBody`: 指定它是返回 JSON格式的类

5. `@CrossOrigin` : 允许跨域

6. `@ResponseStatus` ： 该类返回响应状态

7. `@ControllerAdvice` ： 异常通知类，可以在此类中处理全局异常

8. `@RestControllerAdvice` ： 返回JSON的异常通知类

# 方法注解

1. `@XXXMapping` : 各种请求的映射
2. `@CrossOrigin`  : 该方法返回值允许跨域
3. `@ModelAttribute` ： 绑定方法的返回值给一个 model
4. `@ResponseBody`： 返回JSON格式数据
5. `@ResponseStatus`： 返回状态信息
6. `@ExceptionHandler` ： 指定该方法能处理的错误类型 `@ExceptionHandler（value = MyException.class）`  



# 参数注解



1. `@CookieValue` ： 绑定请求 Cookie的值 

   ```java
   @CookieValue(name = "cart",required = false,defaultValue = "null")String  cart
   ```

2. `@PathVariable` ： 将 URL 占位符的参数作为参数

   ```java
   // URL :  /get/{id}
   @PathVariable(name="id") int id
   ```

3. `@RequestParam` : 指定要绑定的参数名 

   ```java
   @RequestParam(name="username") String name
   ```

4. `@RequestHeader` : 绑定请求头信息

   ```java
   @RequestHeader(name="id") int  id
   ```

5. `@RequestBody` : 当请求的内容是JSON格式，需要绑定自定义类型的参数时

   ```java
   @RequestBody User user
   ```

   

6. `@RequestPart` : 绑定文件参数,即表单使用 `multipart/form-data`  且有文件类型参数时

   ```java
    @RequestPart("photo") MultipartFile file
   ```

   >  具体如何操作文件  `上传 /下载`  





# 文件的上传下载



## 上传



1. 在方法注解处 使用 `consumes`   指定 处理的 `Content-type` 为  `multipart/form-data`

2.  使用  `MutipartFile`  接收文件

   ```java
     @PostMapping(name = "/upload/photos"
               , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
       public void upload(@RequestPart(name = "photo") MultipartFile photo) {
   }
   //常量定义如下
   public static final String MULTIPART_FORM_DATA_VALUE = "multipart/form-data";
   ```

   



## 下载

1. 将方法返回类型改成 `byte[]`  字节数组

2. 使用 `produces`  指定返回的 `Content-type` 为具体的文件类型

   ```java
      @GetMapping(value = "/get/{id}",produces = MediaType.IMAGE_JPEG_VALUE)
       public byte[] download(@PathVariable("id") int id) {
       }
   ```



## Demo



```java
    /**
     * 文件上传
     * @param id id
     * @param file 传入的文件
     * @throws IOException 异常
     */
    @PostMapping(value = "/{id}/photos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void upload(@PathVariable int id, @RequestParam("photo") MultipartFile file) throws IOException {
        FileOutputStream fos = new FileOutputStream(file.getOriginalFilename());
        System.out.println("接收到文件： " + file.getOriginalFilename());
        IOUtils.copy(file.getInputStream(), fos);
        fos.close();
    }

    /**
     * 文加的下载
     * @param id id
     * @return 文件的字节数组
     * @throws IOException 异常
     */
    @GetMapping(value = "/{id}/icon", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] download(@PathVariable int id) throws IOException {
        InputStream is = this.getClass().getClassLoader().getResourceAsStream("icon.jpg");
        return IOUtils.toByteArray(is);//使用的是 apache common io 包
    }
```



# 问题

文件的上传 使用注解 `@RequestParam`  和 `@RequestPart` 都行