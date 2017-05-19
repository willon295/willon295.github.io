---
title: 测试代码高亮
tag: git
category: 笔记
---
指定语言的代码

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

非特定语言
```
language: node_js
node_js: stable

#S: Build Lifecycle
install:
  - npm install

#before_script:
 #- npm install -g gulp

script:
  - hexo clean
  - hexo g

after_script:
  - cd ./public
  - git init
  - git config user.name "willon295"
  - git config user.email "chenlong951126@gmail.com"
  - git add .
  - git commit -m "Update docs"
  - git push --force --quiet "https://${github_token}@${GH_REF}" master:master
#E: Build LifeCycle
branches:
  only:
    #设置博客源码所在分支
    - blog-source
env:
 global:
   - GH_REF: github.com/willon295/willon295.github.io.git
    #这里是项目地址
```

不指定语言

```
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

### 各种标题下的语言
```
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
### 带4个空格
```
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

### 列表下的

1. 有序列表
```
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
2. 第二段空一行，带table

	```
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