---
title: '[Design_Pattern]12_责任链模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:12:00
---

责任链模式是 `行为模式` 的一种。
在责任链模式里，很多对象由每一个对象对其下家的引用而连接起来形成一条链。
请求在这个链上传递，直到链上的某一个对象决定处理此请求。
发出这个请求的客户端并不知道链上的哪一个对象最终处理这个请求，这使得系统可以在不影响客户端的情况下动态地重新组织和分配责任。


# 个人理解

发出一条请求，接收者能处理则处理，不能处理则传递给下一个处理。

# 举个例子

对弹幕的信息进行过滤

结构图：
![图片](/images/dp12_chainOfResp_00.png)

1. 通用接口
```
/**
 * 通用过滤接口
 */
public interface Filter {
    String  doFilter(String msg);
}
```
2. 具体过滤器
- HTML标签过滤器
```

/**
 * Html 字符过滤器
 */
public class HTMLFilter implements Filter {
    @Override
    public String doFilter(String msg) {
        return msg.replace("<", "").replace(">", "");
    }
}
```
- 敏感词过滤器
```
/**
 * 敏感字过滤器
 */
public class SenstiveFilter implements Filter {
    @Override
    public String doFilter(String msg) {
        return msg.replace("敏感","**");
    }
}
```
3. 过滤链
```
/**
 * 过滤链
 */
public class FilterChain implements Filter {

    private List<Filter> filters = new ArrayList<>();

    /**
     * 添加过滤器
     * @param filter 被添加的过滤器
     * @return 过滤链
     */
    public FilterChain addFilter(Filter filter){
        filters.add(filter);
        return this;
    }


    @Override
    public String doFilter(String msg) {

        for (Filter filter : filters) {
            msg = filter.doFilter(msg);
        }
        return msg;
    }
}
```
4. 测试类
```
public class Main {
    public static void main(String[] args) {


        String  msg = "6666, 真厉害，敏感信息，<html>";
        FilterChain filterChain = new FilterChain();

        filterChain.addFilter(new HTMLFilter()).addFilter(new SenstiveFilter());

        String s = filterChain.doFilter(msg);
        System.out.println(s);

        //6666, 真厉害，**信息，html
    }
}


```
