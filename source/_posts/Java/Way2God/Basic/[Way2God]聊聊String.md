---
title: '[Way2God_Basic]聊聊String'
category: Way2God
tag: Basic
date: 2019-04-24 00:00:00
---





本文知识点： 

- 字符串的不可变性

-  substring 的原理及区别

- replaceFirst、replaceAll、replace 区别

- String 对“+”的重载、字符串拼接的几种方式和区别

- switch 对 String 的支持


# String不可变？

为什么说  String 是不可变的 ？  都说不可变， 那么String到底什么不可变 ？  表示的字符串值 abcd？ 引用 ？  还是内存地址？ or...... Something else ? 迄今为止， 我没有得到过准确的答案。所以决定探索一番。

## 撸源码

### 字段

个人觉得， 源码能解释所有疑问， 如果不能， 那至少也能解释一半。 以下是JDK8中String的所有字段定义：

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage.  ==> value用于存储字符 */
    private final char value[];

    /** Cache the hash code for the string ==>  string的hash缓存*/
    private int hash; // Default to 0

    /** use serialVersionUID from JDK 1.0.2 for interoperability */
    private static final long serialVersionUID = -6849794470754667710L;
    /**
     * Class String is special cased within the Serialization Stream Protocol.
     */
    private static final ObjectStreamField[] serialPersistentFields =
        new ObjectStreamField[0];
    /**
     * A Comparator that orders {@code String} objects as by
     * {@code compareToIgnoreCase}. This comparator is serializable.
     × ==> string对象的比较器， 忽略大小写， 且此比较器是序列化的。
     */
    public static final Comparator<String> CASE_INSENSITIVE_ORDER= new CaseInsensitiveComparator();
```

可以看出几点： 

1. 所有字段都是 `final` 修饰的
2. String 使用 `char[]` 数组存储字符串， `private final` 修饰，也就是说实际实现就是字符数组， 且  `字符数组不可变` ，外部不可直接访问。

此处我们可以简单猜测： 

-  `value` 一旦赋值，不可改变
- `hash` 一旦赋值， 不可改变

### 构造函数

那么再看看构造函数： 

```java
    //// 构造函数 ////
    public String() {
        this.value = "".value;
    }

    public String(String original) {
        this.value = original.value;
        this.hash = original.hash;
    }
    public String(char value[]) {
        this.value = Arrays.copyOf(value, value.length);
    }
	// 。。。 省略其他 。
```

此处建议读者可以自行阅读源码，  得出的结论， `有且仅有` 下面这个构造函数是 `直接` 给 `hash`  赋值的， 其他构造函数都只给`value` 赋值。

```java
public String(String original) {
	this.value = original.value;
	this.hash = original.hash;
}
```



### hashCode

那么再看整个String源码， 与 `hash` 字段有关的只有 `hashCode()` 方法：

```java
public int hashCode() {
        int h = hash;
        if (h == 0 && value.length > 0) {
            char val[] = value;
            for (int i = 0; i < value.length; i++) {
                h = 31 * h + val[i];
            }
            hash = h;
        }
        return h;
}
```

可以看出： 除了String为参的构造函数， 其他情况下，`只有在需要` 使用  `hash` 时， 即调用`hashCode()` 方法时， hash才会被赋值  。 且赋值后 `不可变` 。

## 撸源码结论

目前至少可以简单得出几个 `不可变` 的几个结论：

- 所有字段都是 `private final`  修饰 , 外部不可 `直接访问` ，所有字段赋值后 `不可变` 
- 如果是String之间的赋值， `值`  和 `hashCode` 都是相同的
- hashCode 会依赖于使用方， 被调用时会被赋值， 赋值后 `不可变` 



# String 是引用类型 ？

在弄清楚这个问题之前， 先简单运行了以下代码：

```java
public class Learn {
    public static void main(String[] args) {
        String a = "123";
        String b = "456";
        a = b;
        System.out.println(a);
    }
}
```

运行结果是：

```
456
```

也就是说 a  变量的字面值确实是 `发生变化` 了。 在反编译字节码文件后， 截取以下关键的片段：

```java
Constant pool:
   #1 = Methodref          #7.#24         // java/lang/Object."<init>":()V
   #2 = String             #25            // 123
   #3 = String             #26            // 456
  #25 = Utf8               123
  #26 = Utf8               456
  ... ...
{
  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=3, args_size=1
         0: ldc           #2                  // String 123
         2: astore_1
         3: ldc           #3                  // String 456
         5: astore_2
         6: aload_2
         7: astore_1
         8: getstatic     #4                  // Field java/lang/System.out:Ljava/io/PrintStream;
        11: aload_1
        12: invokevirtual #5                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
        15: return
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      16     0  args   [Ljava/lang/String;
            3      13     1     a   Ljava/lang/String;
            6      10     2     b   Ljava/lang/String;
}
```



通过阅读反编译的字节码文件， 发现以下几个问题： 

- 没有 new String 对象实例的代码
- a、b的初始值都是从常量池加载的

那么解释其中几个关键属性： `Constant Pool` 常量池 、 `LocalVariableTable` 局部变量表 ，根据字节码指令， main方法中的前三行代码如下：

![step_01](/images/string_step_01.png)
![step_02](/images/string_step_02.png)
![step_03](/images/string_step_03.png)

那么就目前的情况而言， 我们没有看到 实例对象的产生， 即没有涉及到  JVM 中的 `堆`

# substring方法实现



关于value 赋值后不可变， 还可以通过 `substring()` , `replace()` 等方法的源码证实这一点：

```java
public String substring(int beginIndex, int endIndex) {
        if (beginIndex < 0) {
            throw new StringIndexOutOfBoundsException(beginIndex);
        }
        if (endIndex > value.length) {
            throw new StringIndexOutOfBoundsException(endIndex);
        }
        int subLen = endIndex - beginIndex;
        if (subLen < 0) {
            throw new StringIndexOutOfBoundsException(subLen);
        }
		// 如果子串不是整个string， 就 new 一个新的String对象
        return
            ((beginIndex == 0) && (endIndex == value.length)) ? this
                : new String(value, beginIndex, subLen);
    }


public String substring(int beginIndex) {
        if (beginIndex < 0) {
            throw new StringIndexOutOfBoundsException(beginIndex);
        }
        int subLen = value.length - beginIndex;
        if (subLen < 0) {
            throw new StringIndexOutOfBoundsException(subLen);
        }
		// 如果子串不是整个string， 就 new 一个新的String对象
        return (beginIndex == 0) ? this : new String(value, beginIndex, subLen);
    }

```



# replace,replaceAll

这些方法都可以侧面论证String的值不可变， 但是此处侧重看几个方法的实现。



## replaceAll

直接使用正则表达式实现：

```java
public String replaceAll(String regex, String replacement) {
	return Pattern
    	 .compile(regex)
        .matcher(this)
        .replaceAll(replacement);
}
```

最后还是调用了 `Matcher` 对象的 `replaceAll` , 此处对 Matcher 源码不做过多分析， 之后会探索。

## replace

第一种是单个字符的替换：

```java

public String replace(char oldChar, char newChar) {
        if (oldChar != newChar) {
            int len = value.length;
            int i = -1;
            char[] val = value; 
            
            // 一直遍历寻找 oldChar
            while (++i < len) {
                if (val[i] == oldChar) {
                    break;
                }
            }
            // 找到了 第一个 oldChar ，进行下一步
            if (i < len) {
                // 创建一个缓冲数组 buf ， 长度与原数组相同
                char buf[] = new char[len];
                // 第一个 oldChar 之前的， 直接 copy 至 buf
                for (int j = 0; j < i; j++) {
                    buf[j] = val[j];
                }
                // 从第一个 oldchar 开始，一直往后寻找， 找到oldChar就替换，并放进 buf
                while (i < len) {
                    char c = val[i];
                    buf[i] = (c == oldChar) ? newChar : c;
                    i++;
                }
                // new 一个String 对象， 将 buf 放进其中
                return new String(buf, true);
            }
        }
        return this;
    }
```

第二种是子字符串的替换：

```java
public String replace(CharSequence target, CharSequence replacement) {
        return Pattern.compile(target.toString(), Pattern.LITERAL).matcher(
                this).replaceAll(Matcher.quoteReplacement(replacement.toString()));
    }
```

简单说还是使用正则工具替换的， 替换之后生成的还是新的String对象



# String加号+重载

直接运行代码， 然后反编译即可说明问题



## 定义时拼接

源代码：

```java
String a = "hello"+" world";
```

字节码反编译片段：

```java
Constant pool:
   #1 = Methodref          #4.#20         // java/lang/Object."<init>":()V
   #2 = String             #21            // hello world
  ... ...
  #21 = Utf8               hello world
  #22 = Utf8               Learn
  #23 = Utf8               java/lang/Object
{
  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=1, locals=2, args_size=1
         0: ldc           #2                  // String hello world
         2: astore_1
         3: return
}
```

我们看到并没有多个String对象产生，  `常量池` 只有 `hello world`, 可以简单得出结论：

- String 对加号做了重载，按顺序直接拼接

- `定义时` 直接使用加号拼接， 在编译时期就会被优化， 常量池也只生成最后的一个常量。





## 定义后拼接

源代码：

```java
String a = "hello";
a += " world";
```

字节码片段：

```java
0: ldc           #2	// String hello
2: astore_1
3: new           #3	// class java/lang/StringBuilder
6: dup
7: invokespecial #4	// Method java/lang/StringBuilder."<init>":()V
10: aload_1
11: invokevirtual #5	// Method java/lang/StringBuilder.append(Ljava/lang/String;)
14: ldc           #6	// String  world
16: invokevirtual #5	// Method java/lang/StringBuilder.append:(Ljava/lang/String;)
19: invokevirtual #7	// Method java/lang/StringBuilder.toString:()Ljava/lang/String;
```

简单得出的结论是： 

- 实际上String 的加号的重载是通过生成 `StringBuilder` 对象， 调用 `append` 方法完成的
- 最后通过 StringBuilder 的 `toString` 方法得到最终结果

# switch 对 String 的支持

在 JDK1.7 之后， switch 增加了对String的支持， 那么如果究其原理， 可以通过例子， 反编译得出结论

```java
    public static void main(String[] args) {
        
        Scanner scanner = new Scanner(System.in);
        String status = scanner.next();
        
        switch (status) {
            case "aa":
                System.out.println("11");
                break;
            case "bb":
                System.out.println("22");
                break;
            case "cc":
                System.out.println("33");
                break;
            case "dd":
                System.out.println("44");
                break;
            default:
                System.out.println("no");
        }
    }
```

反编译之后得到的代码是：

```java

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String status = scanner.next();
        byte var4 = -1;
        switch(status.hashCode()) {
        case 3104:
            if (status.equals("aa")) {
                var4 = 0;
            }
            break;
        case 3136:
            if (status.equals("bb")) {
                var4 = 1;
            }
            break;
        case 3168:
            if (status.equals("cc")) {
                var4 = 2;
            }
            break;
        case 3200:
            if (status.equals("dd")) {
                var4 = 3;
            }
        }

        switch(var4) {
        case 0:
            System.out.println("11");
            break;
        case 1:
            System.out.println("22");
            break;
        case 2:
            System.out.println("33");
            break;
        case 3:
            System.out.println("44");
            break;
        default:
            System.out.println("no");
        }

    }
```

看反编译的代码 ， 很显然， 大概的步骤就是：

1. 立一个 flag 
2. switch 只对 String的 `hashCode`  进行操作， 再判断 `字符串字面值`  （字符数组）是否相同 ， 相同则重新给 flag 赋不同值
3. switch flag ， 根据不同的结果执行相应的代码

