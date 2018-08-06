---
title: '[Java]10_多线程[待完善]'
tag: Java
category: Java
date: 2016-05-12 00:10:00
---

# 多线程


**基本概念**

1. 程序： 程序是指代码和数据的有序集合
2. 进程： 进程是系统进行资源分配和调度的基本单位，操作系统会给每个程序分配一定的资源。
3. 线程： 程序执行的基本单元
4. 并行： 并发是进程之间的关系 ，多个进程同时运行为并行
5. 并发： 并发是线程之间的关系， 多个线程之间同时运行为并发
6. 主线程和其他线程的关系的平等的，主线程的执行状态不会影响其他线程
7. 只有调用线程对象的 `start()` 方法， 才是真正的启动一个线程。

**关系**
1. 一个进程可以对应多个线程



## 线程的状态

根据 Java8API的介绍：线程的状态为枚举类型  `Thread.State`  State共有 `六种状态` 

1. **NEW** :  线程被创建 ==> new 的时候
2. **RUNNABLE** :  可执行，即就绪状态， `Thread.start()` 调用之后为此状态
3. **BLOCKED** :     阻塞，Object.wait() 方法调用时，等待 锁
4. **WAITING** :    会释放锁，Object.wait(), Thread.jion() ,LockSupport.park(),调用时为此状态 ，通过 `notify()` , `notifyAll()` 唤醒
5. **TIMED_WAITING** : 有时间的等待，不会释放锁 。 
     - `Thread.sleep(long time)`
     - `Object.wait(long time)`
     - `Thread.join()`
     - `LockSupport.parkNanos()`
     - `LockSupport.parkUntil()`
6. **TEMINATED**:  线程执行完毕，被销毁






## 继承Thread类,重写run()方法

1. 需要同步的资源需要将其声明为 `static` , 静态单例，否则会出现读写脏数据

## 实现Runnable接口，重写run()方法


1. 通过重写Runnable接口，运行时需要将该 `类的实例` 放入 `线程` 中，执行线程实例的 `start()` 方法
2. 共享资源可以不声明为静态，因为对像是单例
```java

public class RunnaImpl implements Runnable{

    private static int t = 100;

    public void run() {

        while (t > 0) {
            t--;
            System.out.println(Thread.currentThread().getName()+": "+t);
        }
    }

    public static void main(String[] args) {
        RunnaImpl t = new RunnaImpl();
        new Thread(t).start();
        new Thread(t).start();
        new Thread(t).start();
        new Thread(t).start();

    }

}
```



## 通过Callable和FutureTask创建线程

这个方式创建可以获取 `子线程` 的  `返回值` 

1. 自定义线程类， 实现 `Callable`  接口， 重写  `call()` 方法
2. 使用  `FutureTask` 包装这个线程
3. 将包装完毕的 `FutureTask` 当成线程 放入 `线程池`  或者 `Thread`  中运行



### 举个例子

- 自定义线程类 ，实现 `Callable` 接口，指定返回值类型，重写 `call` 方法

  ```java
  //需要 指定 返回值
  public class MyCallable implements Callable<String> {
      @Override
      public String call() throws Exception {
          return Thread.currentThread().getName();
      }
  }
  
  ```

- 使用 `FutureTask`  包装这个类的实例

  ```java
  MyCallable myCallable = new MyCallable();
  FutureTask<String> ft = new FutureTask<>(myCallable);
  
  //执行这个包装后额任务线程
   new Thread(ft).start();
  ```

  

## 通过线程池创建线程


1. 创建线程池
2. 添加要执行的任务，任务必须是线程类
3. 提交任务
4. 关闭线程池

## 举个例子

一个服务器， 创建线程池处理 N 个 客户端的请求

### 服务端



```java

/**
 * 带有线程池的服务端
 */
public class Server implements Runnable {
    private final ServerSocket serverSocket;
    private final ExecutorService poll;

    public Server(int port, int poolSize) throws IOException {
        this.serverSocket = new ServerSocket(port);
        this.poll = Executors.newFixedThreadPool(poolSize);
    }


    @Override
    public void run() { //run service

        while (true) {
            try {
                poll.execute(new MyHandler(serverSocket.accept()));
            } catch (IOException e) {
                poll.shutdown();
            }
        }

    }


    /**
     * 关闭资源
     *
     * @param es
     */
    void shutdown(ExecutorService es) {

        poll.shutdown();

        try {
            if (!poll.awaitTermination(10, TimeUnit.SECONDS)) {

                poll.shutdown();

            }
        } catch (InterruptedException e) {
            e.printStackTrace();
            poll.shutdown();
            Thread.currentThread().interrupt();
        }
    }
}

/**
 * 处理客户端请求的类
 */
class MyHandler implements Runnable {
    private Socket socket;
    public MyHandler(Socket accept) {
        this.socket = accept;
    }

    @Override
    public void run() {
        InputStream in;
        try {
            in = socket.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            String s = br.readLine();
            System.out.println(Thread.currentThread().getId()+"____"+s);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```



### 客户端

```java
//客户端
public class Client implements Runnable {

    private Socket socket;
    private String content;

    public Client(String host, int port, String content) throws IOException {
        this.socket = new Socket(host, port);
        this.content = content;
    }


    //客户端一运行， 向服务端发送消息
    @Override
    public void run() {
        try {
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            bw.write(content);
            bw.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```



### 具体使用

```java
//创建具有 20 个线程的服务端
public class TestServer {
    public static void main(String[] args) throws IOException {

        //创建 只有 20 个线程的 服务器
        Server server = new Server(9999, 20);
        new Thread(server).start();
    }
}

//创建 1000个客户端 发送请求
public class TestClient {
    public static void main(String[] args) throws IOException {

        //创建 1000 个线程 代表1000客户端访问服务器
        for (int i = 0; i < 1000; i++) {
            Client client = new Client("127.0.0.1", 9999, "client_" + i);
            new Thread(client).start();
        }

    }
}
```







# 线程同步


1. `synchronized` 关键字
- 修饰方法： 该方法是同步方法，调用是会有内置锁。(同步资源消耗较大，不建议同步整个方法)
- 修饰代码块: 该段代码块被执行时，会被加锁
2. 举个例子

```java

public class Account {
    private int balance;

    public Account(int balance) {
        this.balance = balance;
    }

    public Account() {
    }

    public synchronized void withdraw(int money) {
        if (money > balance) {
            System.out.println(Thread.currentThread().getName() + "消费：" + money + "，余额：" + balance + "，不可消费");
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } else {
            balance -= money;
            System.out.println(Thread.currentThread().getName() + "消费：" + money + "，余额：" + balance);
        }


    }

    public synchronized void deposit(int money) {
        balance += money;
        System.out.println(Thread.currentThread().getName() + "存入：" + money + "，余额：" + balance);
        notifyAll();
    }


    public static void main(String[] args) {
        final Account account = new Account();


        
        //消费的线程 一
        new Thread(new Runnable() {
            public void run() {
                while (true) {
                    int  m = ((int) (Math.random() * 1000));
                    account.withdraw(m);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                }
            }
        },"lili").start();

        
        //消费的线程 二
        new Thread(new Runnable() {
            public void run() {

                while (true) {
                    int  m = ((int) (Math.random() * 1000));
                    account.withdraw(m);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                }
            }
        },"rose").start();

        new Thread(new Runnable() {
            public void run() {
                while (true){
                    int  m = ((int) (Math.random() * 100));
                    account.deposit(m);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        },"jack").start();
        
    }
}

```





# 线程池

优点： 初始化时创建固定线程的线程池， 当有新的任务进入时，直接从线程池获取线程执行任务，而不是创建线程（因为线程创建是十分耗费资源的）

1. 创建的方式， 通常情况下，可以通过  `Executors.newXXXXXThreadPool()`  创建



## 自定义的线程池创建



看源码： 

```java
   //源代码中，默认的拒绝策略处理（直接丢弃）
 private static final RejectedExecutionHandler defaultHandler =
        new AbortPolicy();

//构造器
public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue,
                              ThreadFactory threadFactory) {
        this(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue,
             threadFactory, defaultHandler);
    }

```



- corePoolSize: 核心线程数量，创建后不会被回收
- maximumPoolSize： 线程池允许的最大线程数量
- keepAliveTime： 线程存活时间（核心线程之外）
- unit :  存活的时间单位（枚举类型 `Timeunit`）
- workQueue: 队列，当任务数超过maximumPoolSize时， 任务会进入此队列; 但是不同的队列 线程池处理的方式不同
  - LinkedBlockQueue: 如果使用此队列，maximumPoolSize失效，所有等待的任务都会进入此队列
  - ArrayBlockingQueue<>(int capacity,boolean fair): FIFO调度策略的队列，需要指定容量、自定义拒绝策略, 可以设置 `公平` 或者 `不公平` 获得锁
    - 公平： 按照等待的时间竞争锁
    - 非公平： 自由竞争，可以提高程序并发能力



# 拒绝策略

- ` ThreadPoolExecutor.AbortPolicy`  
  **直接拒绝策略** ：默认的拒绝策略， 直接抛出异常 

  ```
  A handler for rejected tasks that throws a RejectedExecutionException.
  ```

- `ThreadPoolExecutor.CallerRunsPolicy` 
  **调用者执行任务策略** ： 在执行 `execute()` 方法的 `调用者` 中执行 `被拒绝的任务` ， 谁调用的就在谁那运行

- `ThreadPoolExecutor.DiscardOldestPolicy`
  **丢弃最老任务策略** ： 

  ```
  1. 丢弃最老的 未执行的 任务
  2. 执行新来的任务
  ```

- `ThreadPoolExecutor.DiscardPolicy` 
  **静默丢弃策略**：
  直接丢弃，不会抛出异常,程序正常运行