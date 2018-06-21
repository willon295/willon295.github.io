---
title: '[J2EE]01_Filter过滤器'
tag: J2EE
category: J2EE
date: 2016-12-29 00:01:00
---


# 作用

对相应的请求进行过滤

# 实现

## 自定义 MyFilter类

1. 实现 `Filter` 接口
2. 重载 `init`,`doFilter`,`destroy` 方法
3. 在 `doFilter` 中写处理的逻辑
4. 举个例子
```
public class CommentFilter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain) throws IOException, ServletException {

        String comment = req.getParameter("name");
        if (comment == null || comment.contains("sb") || "".equals(comment)) {
            req.getRequestDispatcher("login.jsp").forward(req, res);
        }
        //继续交给其他过滤器处理
        filterChain.doFilter(req, res);
    }

    public void destroy() {

    }
}

```
## web.xml 配置

```
    <filter>
        <filter-name>myFilter</filter-name>
        <filter-class>filter.MyFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>myFilter</filter-name>
        <!-- 注意是 /*  , 不是 / -->
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```
