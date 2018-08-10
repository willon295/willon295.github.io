---
title: '[Java]Sort_QuickSort'
category: Java
tag: Sort
date: 2015-11-11 00:00:00
---



# QuickSort




```java

/**
 * Created By willon
 *
 * @author willon
 * @version 1.0
 */
public class QuickSort {

    /**
     * 快速排序
     *
     * @param a     数组
     * @param left  左边
     * @param right 右边
     */
    public static void quickSort(int[] a, int left, int right) {

        // 如果左右两边开始搜索的下标 l < r 可以回溯
        if (left < right) {

            //记录基准数
            int base = a[left];
            int i = left, j = right;
            while (i < j) {

                //从右边开始遍历，找到比基准数 小 的， 填上一个坑
                while (i < j && a[j] > base) {
                    j--;
                }
                if (i < j) {
                    a[i++] = a[j];
                }


                //从左边开始，找到比基准数  大 的， 填上一个坑
                while (i < j && a[j] < base) {
                    i++;
                }
                if (i < j) {
                    a[j--] = a[i];
                }

            }

            //填上本趟遍历的 最后一个坑
            a[j] = base;

            // 递归排序
            quickSort(a, left + 1, right);
            quickSort(a, left, right - 1);
        }

    }

    public static void quickSort(int[] a) {
        quickSort(a, 0, a.length - 1);
    }


    public static void main(String[] args) {
        int[] a = {6, 4, 3, 5, 7, 9, 2, 8, 1};
        quickSort(a);
        System.out.println(Arrays.toString(a));
    }
}

```

