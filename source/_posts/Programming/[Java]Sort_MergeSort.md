---
title: '[Java]Sort_MergeSort'
category: Java
tag: Sort
date: 2015-11-11 00:00:00
---

# MergeSort



```java

/**
 * Created By willon
 *
 * @author willon
 * @version 1.0
 */
public class MergeSort {
    /**
     * 用于合并两个已经排序的数组,此处将同一个数组通过下标拆分分两个不同的数组
     *
     * @param a     数组
     * @param left  左边开始下标
     * @param mid   中间分割左右两边的下标
     * @param right 右边结束下标
     */
    public static void merge(int[] a, int left, int mid, int right) {

        // 创建一个缓存数组
        int[] tem = new int[right - left + 1];

        // 记录左右两边开始的 fangfa索引

        int i = left, j = mid + 1, k = 0;

        //合并两个数组共同长度的部分
        while (i <= mid && j <= right) {

            tem[k++] = a[i] < a[j] ? a[i++] : a[j++];
        }

        //把两边数组多余的元素放进 tem
        while (i <= mid) {
            tem[k++] = a[i++];
        }
        while (j <= right) {
            tem[k++] = a[j++];
        }


        //放回原来的数组,起点是 left

        k = 0;
        while (k < tem.length) {
            a[left++] = tem[k++];
        }
    }


    /**
     * 用于拆分， 回溯合并数组
     *
     * @param a     数组
     * @param left  左边开始下标
     * @param right 右边结束下标
     */
    public static void mergeSort(int[] a, int left, int right) {

        //如果长度为1 ， 即 left=right, 回溯
        if (left == right) {
            return;
        }
        //开始 拆分  3  5
        int mid = left + (right - left) / 2;
        mergeSort(a, left, mid);

        mergeSort(a, mid + 1, right);
        merge(a, left, mid, right);

    }

    /**
     * 简便调用的方法
     */
    public static void mergeSort(int[] a) {
        mergeSort(a, 0, a.length - 1);
    }

    public static void main(String[] args) {

        int[] a = {6, 4, 3, 5, 7, 9, 2, 8, 1};
        mergeSort(a);
        System.out.println(Arrays.toString(a));
    }
}

```

