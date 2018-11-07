---
title: '[J2EE]02_servlet创建的几种方式'
tag: J2EE
category: J2EE
date: 2016-12-29 00:02:00
---

1. 实现 `Servlet` 接口，重载方法
```java
public class FirstServlet implements Servlet {
    public void init(ServletConfig servletConfig) throws ServletException {

        System.out.println("first init ...");
    }

    public ServletConfig getServletConfig() {
        return null;
    }

    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {

        System.out.println("first service.. --  .. ");
    }

    public String getServletInfo() {
        return null;
    }

    public void destroy() {

    }
}
```
2. 继承 `GenericServlet` 类，重写 `service`方法
```java
public class SecondServlet extends GenericServlet {


    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {

        System.out.println("second service .. ");
    }
}

```
3. 继承 `HttpServlet` 类
```

public class LoginServlet extends HttpServlet {


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
  

    }

}
```
