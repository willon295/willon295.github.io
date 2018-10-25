---
title: '[Struts2]09_类型转换器'
tag: Struts2
date: 2016-10-13 12:22:33
category: Struts2
---


# 局部类型转换器
1. 创建一个 转换器

```
package converter;
import com.opensymphony.xwork2.conversion.impl.DefaultTypeConverter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
/**
 * 1. 自定义一个转换器，继承`DefaultTypeConverter`
 */
public class DateConverter extends DefaultTypeConverter {

    /**
     * 2. 重写该方法
     *
     * @param value  要转换的资源，数组对象
     * @param toType 转换的类型
     * @return 返回转换后的对象
     */
    @Override
    public Object convertValue(Object value, Class toType) {
        String source = ((String[]) value)[0];
        if (toType == Date.class) {
            try {
                System.out.println("convert调用了");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
                Date date = sdf.parse(source);
                return date;
            } catch (ParseException ignored) {
            }
        }
        return null;
    }
}


```

2. 创建一个`xxx-conversion.properties`文件
    例如 `User` 实体类中有一个 `birthday` 属性是需要转换的.
    新建一个`User-conversion.properties`

    ```
    birthday = converter.DateConverter
    ```

# 全局类型转换器
全局类型转换器仅仅是配置文件不同而已

- 命名:  `xwork-conversion.properties`
- 路径：  `src` 目录下
- 代码： 

```
java.util.Date =  converter.DateConverter
``` 
