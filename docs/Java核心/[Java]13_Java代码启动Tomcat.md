---
title: '[Java]13_Java代码启动Tomcat'
tag: Java
category: Java
date:  2016-05-12 00:13:00
---

使用  java 代码实现 tomcat容器的启动 , 并且完成url 与请求的映射,
通过此代码理解 SpringBoot 内置 Tomcat 的原理


1. 依赖
```
    <dependencies>
        <!--引入 tomcat容器, 以及jsp支持-->
        <dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-core</artifactId>
            <version>8.5.31</version>
        </dependency>

        <dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-jasper</artifactId>
            <version>8.5.31</version>
        </dependency>

    </dependencies>
```

2. IndexServlet
```
public class IndexServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().print("this is tomcat index... ");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}

```
3.  入口文件

```
import cn.willon.servlet.IndexServlet;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.core.StandardContext;
import org.apache.catalina.startup.Tomcat;

public class App {

    //监听端口
    public static final int PORT = 8080;
    //必须以  "/" 开头
    public static final String CONTEXT_PATH = "/myProject";
    public static final String SERVLET_NAME = "IndexServlet";

    public static void main(String[] args) throws LifecycleException {
        //创建一个tomcat容器
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(PORT);
        //关闭自动部署
        tomcat.getHost().setAutoDeploy(false);
        //创建上下文对象, 设置上下文路径
        StandardContext context = new StandardContext();
        context.setPath(CONTEXT_PATH);
        //设置上下文监听器
        context.addLifecycleListener(new Tomcat.FixContextListener());
        //将上下文对象添加进 tomcat
        tomcat.getHost().addChild(context);
        
//以上都是 死代码

        //tomcat添加servlet, 包括:  上下文路径, Servlet名称 ,Servlet实例
        tomcat.addServlet(CONTEXT_PATH, SERVLET_NAME, new IndexServlet());
        //上下文添加映射   <URL路径->Servlet名称> , pattern 必须用 "/" 开头
        context.addServletMappingDecoded("/index", SERVLET_NAME);


        //启动并且监听
        tomcat.start();
        tomcat.getServer().await();

    }
}
```
4. 如何访问?
```
http://127.0.0.1:8080/myProject/index
```
