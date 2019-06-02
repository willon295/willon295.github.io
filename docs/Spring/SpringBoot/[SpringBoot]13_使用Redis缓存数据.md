---
title: '[SpringBoot]13_使用Redis缓存数据'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:13:00
---



# 基本使用



1. 引入依赖 ， 2.0之后 `spring-boot-starter-data-redis`

   ```xml
   		<!--开启redis缓存-->
   <dependency>
   			<groupId>org.springframework.boot</groupId>
   	<artifactId>spring-boot-starter-data-redis</artifactId>
   </dependency>
   
   ```

2. 配置RedisTemplate 的Bean

   ```java
   
   @Configuration
   public class RedisTemplateConfig {
   
       @Bean
       public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory)
       {
           Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
           ObjectMapper om = new ObjectMapper();
           om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
           om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
           jackson2JsonRedisSerializer.setObjectMapper(om);
           RedisTemplate<String, Object> template = new RedisTemplate<>();
           template.setConnectionFactory(redisConnectionFactory);
           template.setKeySerializer(jackson2JsonRedisSerializer);
           template.setValueSerializer(jackson2JsonRedisSerializer);
           template.setHashKeySerializer(jackson2JsonRedisSerializer);
           template.setHashValueSerializer(jackson2JsonRedisSerializer);
           template.afterPropertiesSet();
           return template;
       }
   }
   
   ```

3. 直接使用，不需要过多配置

   ```java
       @Autowired
       private RedisTemplate<String, WeatherResponse> redisTemplate;
   
       //先查询缓存中的数据， 如果存在直接从缓存中获取内容， 如果不存在， 则调用服务， 并且吧数据寸金redis
       private WeatherResponse getByURI(String uri) {
   
           WeatherResponse weatherResponse = null;
   
           if (redisTemplate.hasKey(uri)) {
               weatherResponse = redisTemplate.opsForValue().get(uri);
               log.info("从缓存中获取内容： " + weatherResponse);
           } else {
               ResponseEntity<String> res = restTemplate.getForEntity(uri, String.class);
               if (res.getStatusCode() == HttpStatus.OK) {
                   String body;
                   body = res.getBody();
                   try {
                       weatherResponse = objectMapper.readValue(body, WeatherResponse.class);
                       redisTemplate.opsForValue().set(uri, weatherResponse, 30, TimeUnit.SECONDS);
                   } catch (IOException e) {
                       log.info(e.getMessage());
                   }
                   log.info("从服务获取内容： " + body);
               }
           }
   
           return weatherResponse;
   
       }
   ```

>  `StringRedisTemplate`  适用于KV都是String的数据

