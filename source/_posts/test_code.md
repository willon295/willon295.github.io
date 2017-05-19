---
title: 测试代码高亮
tag: git
category: 笔记
---
下面开始写代码

```java
public class TestSingeTon2 {
	public static void main(String[] args) {
        SingleTon2  s1 = SingleTon2.getInstance();
        SingleTon2 s2 = SingleTon2.getInstance();
        if (s1==s2){
            System.out.println("yes");
        }else{
            System.out.println("no");
        }
      }
	}
	//运行结果==> yes

```

测试完毕