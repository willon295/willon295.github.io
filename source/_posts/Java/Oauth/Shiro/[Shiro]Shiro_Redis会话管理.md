---
title: '[Shiro]Shiro_Redis会话管理'
category: Shiro
tag: Shiro
date: 2018-11-11 01:00:00
---


# Shiro 会话管理


## 简单的redis管理配置

主要实现的是使用 redis保存用户 session 

1. 添加 pom 

```
        <!--redis实现会话管理-->
        <dependency>
            <groupId>org.crazycake</groupId>
            <artifactId>shiro-redis</artifactId>
            <version>2.8.8</version>
        </dependency>
        <!--redis 客户端-->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
        </dependency>
```
2. `ShiroConfig` 类需要写入
```java
    /**
     * 普通模式的redis 配置
     *
     * @return
     */
    @Bean
    public RedisManager redisManager() {
        RedisManager redisManager = new RedisManager();
        redisManager.setHost("localhost");
        redisManager.setPort(6379);
        redisManager.setDatabase(9);
        redisManager.setTimeout(10000);
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(20);
        jedisPoolConfig.setMinIdle(20);
        jedisPoolConfig.setMaxWaitMillis(30000);
        redisManager.setJedisPoolConfig(jedisPoolConfig);
        return redisManager;
    }

    @Bean
    public RedisSessionDAO redisSessionDAO() {
        RedisSessionDAO redisSessionDAO = new RedisSessionDAO();
        redisSessionDAO.setRedisManager(redisManager());
        return redisSessionDAO;
    }

    /**
     * shiro 会话管理
     *
     * @return 会话管理
     */
    @Bean
    public DefaultWebSessionManager sessionManager() {
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        sessionManager.setSessionDAO(redisSessionDAO());
        return sessionManager;
    }

```
3. 在　ＳecurityManager 中启用ｒｅｄｉｓ会话管理
```java

    @Bean
    public SecurityManager securityManager() {
        DefaultWebSecurityManager defaultWebSecurityManager = new DefaultWebSecurityManager();
        defaultWebSecurityManager.setRealm(customRealm());
        
        //加上这行代码
        defaultWebSecurityManager.setSessionManager(sessionManager());
        return defaultWebSecurityManager;
    }
```

## 哨兵模式下的配置


需要配置哨兵模式的管理配置, 在 redisSessionDAO 处设置 RedisSentinelManager
```java

    @Bean
    public RedisSentinelManager redisSentinelManager() {
        RedisSentinelManager redisSentinelManager = new RedisSentinelManager();
        redisSentinelManager.setHost(nodes);
        redisSentinelManager.setMasterName(masterName);
        redisSentinelManager.setDatabase(database);
        redisSentinelManager.setTimeout(timeout);
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(maxIdle);
        jedisPoolConfig.setMinIdle(minIdle);
        jedisPoolConfig.setMaxWaitMillis(maxWait);
        jedisPoolConfig.setTestOnBorrow(testOnBorrow);
        jedisPoolConfig.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRuns);
        redisSentinelManager.setJedisPoolConfig(jedisPoolConfig);
        return redisSentinelManager;
    }
    
    @Bean
    public RedisSessionDAO redisSessionDAO() {
        RedisSessionDAO redisSessionDAO = new RedisSessionDAO();
        redisSessionDAO.setRedisManager(redisSentinelManager());
        return redisSessionDAO;
    }
```

