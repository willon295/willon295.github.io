---
title: '[Java]Sort_QuickSort'
category: Java
tag: Sort
date: 2015-11-11 00:00:00
---



# QuickSort



**原理：**   一趟排序，比基准数大的在右边，比基准数小的在左边

1.找一个基准数字， 取出， 此时此基准数处有一个坑；

2.从右往左，找到一个比基准数小的，取出，填上一个坑

3.从左往右，找到一个比基准数大的，取出，填上一个坑

4.当 左==右 ， 填完最后一个坑，结束一轮

5.往中间靠拢，继续1-4



实现代码： 




```java
    public static void sort(int a[], int left, int right) {

        if (left < right) {

            // 0. 取第一个为基准数， 记录下
            int base = a[left];

            // 使用新的角标， 开始移动
            int l = left, r = right;

            // 1. 从右往左，指导找到比基准数小的
            while (l < r && a[r] > base) {
                r--;
            }
            // 代码走到此处， 说明找到比基准数小的， 填上一个坑
            if (l < r) {
                a[l] = a[r];  // 填坑之后，  r 处是新坑
            }


            // 2. 从左往右， 直到找到比基准数大的，填上一个坑
            while (l < r && a[l] < base) {
                l++;
            }
            // 代码走到此处，说明找到一个比基准大的，填上一个 r 处的坑
            if (l < r) {
                a[r] = a[l];
            }

            // 填上最后一个坑 ,将基准数放入
            a[r] = base;

            System.out.println(Arrays.toString(a));
            // 向中间靠拢， 继续
            sort(a, left + 1, right);
            sort(a, left, right - 1);
        }
    }

```

