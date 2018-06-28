---
title: '[SpringBoot]05_基于TOPIC的消息队列'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:05:00
---

利用消息队列实现的功能：


- 生产者：  用户产生日志、订单产生日志、产品产生日志
- 消费者： 接受INFO日志、接受ERROR日志、接受全部日志
1. 生产者 能生成不同级别的日志
2. 实现所有生产者的日志分类

```

用户
   --                            --INFO日志
      --                     --
订单 ------[交换器]---[队列]-----全部日志
      --                    --
    --                         --
产品                                ERROR日志

```

# 原理

1. 生产者发送的 `消息` 包含： `交换器名称`、 `路由键`、`文本内容`
2. `路由器` 接收到 消息之后， 根据其 `路由键` 将消息 `路由` 给对应的 `消息队列`
3. 消费者 从队列读取消息时，也会绑定信息， 包括 `路由器`、`路由的类型` 、`路由键`、`消息队列`，从完全相符的队列中获取消息

# 编码


## 生成路由器

```
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TopicConf {
    @Value("${mq.config.exchange}")
    private String exchange;

    /**
     * 生成相应的路由器
     * @return 生成的路由器
     */
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(this.exchange);
    }
}

```

## 生产者


1.配置文件
```
server.port=9999

spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=willon
spring.rabbitmq.password=willon

#交换器的名称
mq.config.exchange=log.topic
```
2. 具体生产者
```
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class OrderSender {

    @Autowired
    private AmqpTemplate template;

    @Value( "${mq.config.exchange}") //从配置文件读取路由器名称
    private String exchange;

    /**
     * 发送消息的方法
     */
    public void send() {
        //参数：  路由七名称、 路由键、 文本内容
        this.template.convertAndSend(this.exchange, "order.log.debug", "order log debug....");
        this.template.convertAndSend(this.exchange, "order.log.info", "order log info");
        this.template.convertAndSend(this.exchange, "order.log.warn", "order log warn");
        this.template.convertAndSend(this.exchange, "order.log.error", "order log error");
    }
}
```

## 消费者

1. 配置文件
```
server.port=8080

spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=willon
spring.rabbitmq.password=willon

mq.config.exchange=log.topic

#三个消息队列 info、error、logs
mq.config.queue.info=log.info
mq.config.queue.error=log.error
mq.config.queue.logs=log.message

```
2. 具体消费者
```
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class ErrorReceiver {
    @RabbitListener(
            bindings = @QueueBinding(value = @Queue(value = "${mq.config.queue.error}", autoDelete = "true"),
                    exchange = @Exchange(value = "${mq.config.exchange}", type = ExchangeTypes.TOPIC),
                    key = "*.log.error"
            ))
    public void process(String msg) {
        System.out.println("ERROR------日志------" + msg);
    }

}
```

## 测试

1. 消费者先监听
```
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```
2. 生产者发送消息
```
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class ApplicationTest {

    @Autowired
    private UserSender userSender;
    @Autowired
    private OrderSender orderSender;

    @Autowired
    private ProductSender productSender;

    @Test
    public void send() {
        userSender.send();
        orderSender.send();
        productSender.send();
    }
}
```

## 运行结果


```
ALL------日志------ : user log debug....
ALL------日志------ : user log info
ALL------日志------ : user log warn
ALL------日志------ : user log error
ALL------日志------ : order log debug....
ALL------日志------ : order log info
ALL------日志------ : order log warn
ALL------日志------ : order log error
ALL------日志------ : product log debug....
ALL------日志------ : product log info
ALL------日志------ : product log warn
ALL------日志------ : product log error

INFO------日志------ user log info
INFO------日志------ order log info
INFO------日志------ product log info

ERROR------日志------user log error
ERROR------日志------order log error
ERROR------日志------product log error
```
