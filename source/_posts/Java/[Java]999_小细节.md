1. 遍历集合问题
```
int len = l.size();
for (int i = 0; i < len; i++) {
    if (i == 10) {
        l.remove(i);
    }
    System.out.println(l.get(i));
}
//java.lang.IndexOutOfBoundsException: Index: 19, Size: 19
```
分析： 用一个变量 len 存储集合的原始长度，但遍历的时候对其中的元素进行了操作，数组长度改变， len 未变，遍历最后一个元素时，抛出异常; 那么如果不用变量保存长度，是否可以解决，答案是可以，因为每次读取一个元素，重新获取集合长度
```
        for (int i = 0; i < l.size(); i++) {
            if (i == 10) {
                l.remove(i);
            }
            System.out.println(l.get(i));

        }
```
2. `if(name=="admin")` 和 `if("admin"==name)` 有区别吗?
答案是有的，前者会发生 `NullPointException` 在比较时，首先会取出变量的值，还没进行 `==` 操作时就会发生空指针异常，而后者不会存在这样的问题。在java中要尽可能的避免空指针异常的问题。

