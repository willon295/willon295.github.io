---
title: '[SpringBoot]12_RestTemplate中文乱码问题'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:12:00
---



# 问题

在 RestTemplate 调用网络中其他接口时， 发送和接受的数据均不是 `UTF-8` 编码，所以就会出现乱码问题



# 解决办法

看代码 解释

```java
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {

        RestTemplate build = new RestTemplateBuilder().build();
        //重新设置编码
        StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter(Charset.forName("UTF-8"));

        List<HttpMessageConverter<?>> list = new ArrayList<HttpMessageConverter<?>>();

        list.add(stringHttpMessageConverter);
        build.setMessageConverters(list);

        return build;
    }

}
```



# 关于JSON返回数据自动封装

可以使用 `ObjectMapper` 工具封装。

```java
    private WeatherResponse getByURI(String uri) {
		//返回的是响应对象，并不只是json数据
        ResponseEntity<String> res = restTemplate.getForEntity(uri, String.class);

        if (res.getStatusCode() == HttpStatus.OK) {
            //这里才是响应的文本内容
            String body = res.getBody();
            try {
                
                //objectMapper实现转换
                return objectMapper.readValue(body, WeatherResponse.class);
            } catch (IOException e) {
                log.info(e.getMessage());
            }

        }
        return null;
    }
```

