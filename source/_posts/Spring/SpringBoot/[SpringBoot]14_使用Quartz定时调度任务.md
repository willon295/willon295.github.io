---
title: '[SpringBoot]14_使用Quartz定时调度任务'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:14:00
---

# Quartz能做什么？

能够在SpringBoot应用中设置定时任务，定时执行。实例： 定期的刷新数据，定时的检测用户状态等等

# 基本使用



1. 引入依赖 ， 2.0之后 `spring-boot-starter-quartz`

   ```xml
           <!--定时调度工具-->
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-quartz</artifactId>
           </dependency>
   		<dependency>
   
   ```

2. 编写 JOB类

   ```java
   
   @Slf4j
   public class WeatherAsyncJob extends QuartzJobBean {
   
       @Autowired
       private WeatherService weatherService;
   
       @Override
       protected void executeInternal(JobExecutionContext jobExecutionContext) {
   
           //这里写要定时执行的业务
           try {
               weatherService.save2Redis();
           } catch (IOException e) {
               log.info("同步失败");
           }
   
       }
   }
   
   
   ```

3. 编写 Quartz任务调度类

   ```java
   
   @Configuration
   public class QuartzConfig {
       
       //执行JOB的时间间隔
       public static final int INTERVAL_IN_SECONDS = 1800;
   
       //JobDetail 任务明细
       @Bean
       public JobDetail jobDetail() {
           JobBuilder weatherAsyncJob =
                   JobBuilder.newJob(WeatherAsyncJob.class) //定义要执行的JOB
                           .withIdentity("weatherAsyncJob");
           return weatherAsyncJob.storeDurably().build();
       }
   
       //Trigger 触发器, 何时触发
       @Bean
       public Trigger weatherTrigger() {
   
           SimpleScheduleBuilder scheduleBuilder =
                   SimpleScheduleBuilder
                   .simpleSchedule()
                           .withIntervalInSeconds(INTERVAL_IN_SECONDS). //设置间隔时间
                           repeatForever();   //表示永远重复
   
           return TriggerBuilder.newTrigger().
                   forJob(jobDetail())
                   .withIdentity("weatherTrigger")  //设置名称
                   .withSchedule(scheduleBuilder).build(); //设计schedule
       }
   }
   
   ```

当SpringBoot应用启动之后每隔 1800 秒会执行一次自定义JOB里面的 `executeInternal()` 

