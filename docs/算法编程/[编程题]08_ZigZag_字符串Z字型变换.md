---
title: '[编程题]08_ZigZag_字符串Z字型变换'
category: 编程题
tag: 编程题
date: 2018-03-20 00:08:00
---

# Problems


# Example

**Input:** 

```
ABCDEFGHIJKLM  4
````

**Output:** 
```
A    G   M
B  F H  L
C E  I K
D    J

// 输出最后字符串

AGMBFHLCEIKDJ
```



# Coding



```
    /**
     *
     *
     * @param s 输入的源字符串
     * @param numRows 行数
     * @return  Z字形变换之后的字符串
     */
    public static String convert(String s, int numRows) {
        if (numRows <= 1) {
            return s;
        }

        StringBuilder[] sbs = new StringBuilder[numRows];
        for (int i = 0; i < sbs.length; i++) {
            sbs[i] = new StringBuilder();
        }



        int goDirection = 1; // 记录 走的方向 ， 1 代表向下 ， -1 代表向上
        int index = 0;       // 记录 数组角标 ， 第几个 sb

        for (int i = 0; i < s.length(); i++) {
            sbs[index].append(s.charAt(i));


            if (index == 0) {  //第一行 ， 开始向下走
                goDirection = 1;
            }
            if (index == numRows - 1) { //最后一行， 开始向上走
                goDirection = -1;
            }

            index += goDirection; // 走下一步
        }

        StringBuilder res = new StringBuilder();
        for (StringBuilder sb : sbs) {
            res.append(sb);
        }
        return res.toString();
    }
```
