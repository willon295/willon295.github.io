---
title: '[Java]线程池管理'
category: Java
tag: Java
date: 2018-11-22 00:00:00
---



一般一个工程需要维护一个属于该工程线程池 ， 也可以认为是 `一个服务需要维护一个线程池`  ，  而且这个线程池应该是 `单例` 的 ， 不可被修改

我们可以使用  `google guava`  工具来辅助管理一个线程池



```java
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * ThreadPoolManager
 * 使用： 
 * ThreadPoolManager.INSTANCE.newTask( () -> {业务代码} );
 *
 * @author Willon
 */

public enum ThreadPoolManager {

    /**
     * 唯一实例
     */
    INSTANCE;

    public static final int CORE_POOL_SIZE = 30;
    public static final int MAXIMUM_POOL_SIZE = 100;
    public static final int KEEP_ALIVE_TIME = 180;
    public static final int BLOCK_QUEUE_SIZE = 200;
    private  ListeningExecutorService listeningExecutorService;

    ThreadPoolManager() {
        // 初始化线程池
        final ThreadPoolExecutor executor =
                new ThreadPoolExecutor(CORE_POOL_SIZE, MAXIMUM_POOL_SIZE, KEEP_ALIVE_TIME, TimeUnit.SECONDS, new ArrayBlockingQueue<>(BLOCK_QUEUE_SIZE), new MyTaskThreadFactory("mytask_thredPool"), new ThreadPoolExecutor.DiscardPolicy());
        listeningExecutorService = MoreExecutors.listeningDecorator(executor);
    }


    /**
     * 向线程池添加任务securityManager
     *
     * @param task 任务
     * @return 返回数据
     */
    public <T> ListenableFuture<T> addTask(Callable<T> task) {
        return listeningExecutorService.submit(task);
    }

    /**
     * 线程工厂类
     */
    private class MyTaskThreadFactory implements ThreadFactory {

        private final ThreadGroup threadGroup;
        private final String prefix;
        private final AtomicInteger atomicInteger = new AtomicInteger();

        MyTaskThreadFactory(String poolName) {
            SecurityManager securityManager = System.getSecurityManager();
            threadGroup = securityManager != null ? securityManager.getThreadGroup() : Thread.currentThread().getThreadGroup();
            prefix = "pool-" + poolName + "-thread-";
        }

        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(threadGroup, r, prefix + atomicInteger.getAndIncrement());
            // 不允许守护线程
            if (t.isDaemon()) {
                t.setDaemon(false);
            }
            // 不允许优先级
            if (t.getPriority() != Thread.NORM_PRIORITY) {
                t.setPriority(Thread.NORM_PRIORITY);
            }
            return t;
        }
    }

}


```

