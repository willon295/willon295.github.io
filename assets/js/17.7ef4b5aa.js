(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{321:function(n,r,e){"use strict";e.r(r);var a=e(13),t=Object(a.a)({},(function(){var n=this,r=n.$createElement,e=n._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("p",[n._v("利用消息队列实现的功能：")]),n._v(" "),e("ul",[e("li",[n._v("生产者：  用户产生日志、订单产生日志、产品产生日志")]),n._v(" "),e("li",[n._v("消费者： 接受INFO日志、接受ERROR日志、接受全部日志")])]),n._v(" "),e("ol",[e("li",[n._v("生产者 能生成不同级别的日志")]),n._v(" "),e("li",[n._v("实现所有生产者的日志分类")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("\n用户\n   --                            --INFO日志\n      --                     --\n订单 ------[交换器]---[队列]-----全部日志\n      --                    --\n    --                         --\n产品                                ERROR日志\n\n")])])]),e("h1",{attrs:{id:"原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#原理"}},[n._v("#")]),n._v(" 原理")]),n._v(" "),e("ol",[e("li",[n._v("生产者发送的 "),e("code",[n._v("消息")]),n._v(" 包含： "),e("code",[n._v("交换器名称")]),n._v("、 "),e("code",[n._v("路由键")]),n._v("、"),e("code",[n._v("文本内容")])]),n._v(" "),e("li",[e("code",[n._v("路由器")]),n._v(" 接收到 消息之后， 根据其 "),e("code",[n._v("路由键")]),n._v(" 将消息 "),e("code",[n._v("路由")]),n._v(" 给对应的 "),e("code",[n._v("消息队列")])]),n._v(" "),e("li",[n._v("消费者 从队列读取消息时，也会绑定信息， 包括 "),e("code",[n._v("路由器")]),n._v("、"),e("code",[n._v("路由的类型")]),n._v(" 、"),e("code",[n._v("路由键")]),n._v("、"),e("code",[n._v("消息队列")]),n._v("，从完全相符的队列中获取消息")])]),n._v(" "),e("h1",{attrs:{id:"coding"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#coding"}},[n._v("#")]),n._v(" Coding")]),n._v(" "),e("h2",{attrs:{id:"生成路由器"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#生成路由器"}},[n._v("#")]),n._v(" 生成路由器")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('import org.springframework.amqp.core.TopicExchange;\nimport org.springframework.beans.factory.annotation.Value;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\n\n@Configuration\npublic class TopicConf {\n    @Value("${mq.config.exchange}")\n    private String exchange;\n\n    /**\n     * 生成相应的路由器\n     * @return 生成的路由器\n     */\n    @Bean\n    public TopicExchange exchange() {\n        return new TopicExchange(this.exchange);\n    }\n}\n\n')])])]),e("h2",{attrs:{id:"生产者"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#生产者"}},[n._v("#")]),n._v(" 生产者")]),n._v(" "),e("p",[n._v("1.配置文件")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("server.port=9999\n\nspring.rabbitmq.host=127.0.0.1\nspring.rabbitmq.port=5672\nspring.rabbitmq.username=willon\nspring.rabbitmq.password=willon\n\n#交换器的名称\nmq.config.exchange=log.topic\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[n._v("具体生产者")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('import org.springframework.amqp.core.AmqpTemplate;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.beans.factory.annotation.Value;\nimport org.springframework.stereotype.Component;\n\n@Component\npublic class OrderSender {\n\n    @Autowired\n    private AmqpTemplate template;\n\n    @Value( "${mq.config.exchange}") //从配置文件读取路由器名称\n    private String exchange;\n\n    /**\n     * 发送消息的方法\n     */\n    public void send() {\n        //参数：  路由七名称、 路由键、 文本内容\n        this.template.convertAndSend(this.exchange, "order.log.debug", "order log debug....");\n        this.template.convertAndSend(this.exchange, "order.log.info", "order log info");\n        this.template.convertAndSend(this.exchange, "order.log.warn", "order log warn");\n        this.template.convertAndSend(this.exchange, "order.log.error", "order log error");\n    }\n}\n')])])]),e("h2",{attrs:{id:"消费者"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#消费者"}},[n._v("#")]),n._v(" 消费者")]),n._v(" "),e("ol",[e("li",[n._v("配置文件")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("server.port=8080\n\nspring.rabbitmq.host=127.0.0.1\nspring.rabbitmq.port=5672\nspring.rabbitmq.username=willon\nspring.rabbitmq.password=willon\n\nmq.config.exchange=log.topic\n\n#三个消息队列 info、error、logs\nmq.config.queue.info=log.info\nmq.config.queue.error=log.error\nmq.config.queue.logs=log.message\n\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[n._v("具体消费者")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('import org.springframework.amqp.core.ExchangeTypes;\nimport org.springframework.amqp.rabbit.annotation.Exchange;\nimport org.springframework.amqp.rabbit.annotation.Queue;\nimport org.springframework.amqp.rabbit.annotation.QueueBinding;\nimport org.springframework.amqp.rabbit.annotation.RabbitListener;\nimport org.springframework.stereotype.Component;\n\n@Component\npublic class ErrorReceiver {\n    @RabbitListener(\n            bindings = @QueueBinding(value = @Queue(value = "${mq.config.queue.error}", autoDelete = "true"),\n                    exchange = @Exchange(value = "${mq.config.exchange}", type = ExchangeTypes.TOPIC),\n                    key = "*.log.error"\n            ))\n    public void process(String msg) {\n        System.out.println("ERROR------日志------" + msg);\n    }\n\n}\n')])])]),e("h2",{attrs:{id:"测试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#测试"}},[n._v("#")]),n._v(" 测试")]),n._v(" "),e("ol",[e("li",[n._v("消费者先监听")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("import org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[n._v("生产者发送消息")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("@RunWith(SpringRunner.class)\n@SpringBootTest(classes = Application.class)\npublic class ApplicationTest {\n\n    @Autowired\n    private UserSender userSender;\n    @Autowired\n    private OrderSender orderSender;\n\n    @Autowired\n    private ProductSender productSender;\n\n    @Test\n    public void send() {\n        userSender.send();\n        orderSender.send();\n        productSender.send();\n    }\n}\n")])])]),e("h2",{attrs:{id:"运行结果"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#运行结果"}},[n._v("#")]),n._v(" 运行结果")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("ALL------日志------ : user log debug....\nALL------日志------ : user log info\nALL------日志------ : user log warn\nALL------日志------ : user log error\nALL------日志------ : order log debug....\nALL------日志------ : order log info\nALL------日志------ : order log warn\nALL------日志------ : order log error\nALL------日志------ : product log debug....\nALL------日志------ : product log info\nALL------日志------ : product log warn\nALL------日志------ : product log error\n\nINFO------日志------ user log info\nINFO------日志------ order log info\nINFO------日志------ product log info\n\nERROR------日志------user log error\nERROR------日志------order log error\nERROR------日志------product log error\n")])])])])}),[],!1,null,null,null);r.default=t.exports}}]);