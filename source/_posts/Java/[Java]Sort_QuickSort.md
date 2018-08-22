---
title: '[Java]Sort_QuickSort'
category: Java
tag: Sort
date: 2015-11-11 00:00:00
---



# QuickSort




```java

    /**
     * 快速排序
     *
     * @param a     数组
     * @param left  左边
     * @param right 右边
     */
    private static void quickSort(int[] a, int left, int right) {
        if (left < right) {
            // 取得基准数
            int base = a[left];
            int i = left, j = right;

            //找一个比基准数小的
            while (i < j && a[j] > base) {
                j--;
            }
            if (i < j) {
                // 填坑
                a[i] = a[j];
            }


            //找一个比基准数 大的
            while (i < j && a[i] < base) {
                i++;
            }

            if (i < j) {
                //填坑
                a[j] = a[i];
            }

            //填最后一个坑
            a[j] = base;

            //往中间靠拢
            quickSort(a, left + 1, right);
            quickSort(a, left, right - 1);
        }


    }
	// 重载方法, 简化调用操作
    private static void quickSort(int[] a) {
        quickSort(a, 0, a.length - 1);
    }

    public static void main(String[] args) {
        int[] a = {4, 3, 6, 8, 2, 9, 5, 7};
        quickSort(a);
        System.out.println(Arrays.toString(a));
    }

```

