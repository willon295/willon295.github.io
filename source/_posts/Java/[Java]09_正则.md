---
title: '[Java]09_正则'
tag: Java
category: Java
date: 2016-05-12 00:09:00
---

# 元字符

- `\d`: 表示数字
- `\D`: 非数字
- `\w`: 数字字母下划线[a-zA-Z0-9_]
- `\W`: 非数字字母下划线
- `\s`: 空格，换行，回车符
- `\S`: 非 空格，换行，回车符


# 量词

- `+`: 一次或多次
- `*`: 0 次 或 多次
- `?`: 0 次 或 1 次
- `{m,n}`: m 到 n次
- `{m,}`: 大于m次
- `{,n}`: 小于n次

# 分组与范围


- `[ ]`： 中括号内的元素表示范围，内部元素为 `或` 关系
```
[abc0-9]: 匹配 a,b,c，数字，匹配任意一个返回true
```
- `()`: 分组

# Example


```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class Main {
    public static void main(String[] args) {
        String text = "This computer cost me $3000 , in act it was $6000 ,and it performance very well!";
        Pattern pattern = Pattern.compile("(\\d+)");
        Matcher matcher = pattern.matcher(text);

        //用匹配的结果 作为分隔符 ,将源字符串分组
        String[] results = pattern.split(text);
        for (String result : results) {
            System.out.println(result);
        }

        System.out.println("----------------------");
        // find()方法执行过程
        // 1. find() 方法一执行，立马执行一次查找，
        // 2. 将匹配结果封装成String类型对象，通过group() 方法可获取值
        // 3. 返回true/false：是否查找到
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
        System.out.println("----------------------");



        //替换
        String s = matcher.replaceAll("#");
        System.out.println(s);

    }
}

```
