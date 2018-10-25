---
title: '[Java]Sort_EasySort'
category: Java
tag: Sort
date: 2015-11-11 00:00:00
---





# EasySort



```java

    /**
     * 冒泡排序
     * 每趟遍历 把最大的值挪到最后
     *
     * @param a 数组
     */
    private static void bubbleSort(int[] a) {
        for (int n = 0; n < a.length; n++) {
            for (int i = 0; i < a.length - n - 1; i++) {
                if (a[i] > a[i + 1]) {
                    a[i] ^= a[i + 1];
                    a[i + 1] ^= a[i];
                    a[i] ^= a[i + 1];
                }
            }
        }
    }


    /**
     * 选择排序
     * 从尾部开始
     * <p>
     * 索引从头开始，找到最大值的 索引，和最后一个交换
     *
     * @param a 数组
     */
    private static void selectSort(int[] a) {


        //从 尾部 开始
        for (int n = a.length - 1; n > 0; n--) {
            int maxIndex = 0;

            // 从头开始遍历
            for (int i = 0; i <= n; i++) {
                maxIndex = a[i] > a[maxIndex] ? i : maxIndex;
            }
            if (maxIndex != n) {
                a[n] ^= a[maxIndex];
                a[maxIndex] ^= a[n];
                a[n] ^= a[maxIndex];
            }

        }
    }


    /**
     * 插入排序
     * 从第二个 元素开始 ， 不停的向前比较， 如果前面的比它大，插入到它前面
     *
     * @param a 数组
     */
    private static void insertSort(int[] a) {
        for (int n = 1; n < a.length; n++) {
            for (int i = n; i > 0; i--) {
                if (a[i] < a[i - 1]) {
                    a[i] ^= a[i - 1];
                    a[i - 1] ^= a[i];
                    a[i] ^= a[i - 1];
                }
            }
        }
    }

```

