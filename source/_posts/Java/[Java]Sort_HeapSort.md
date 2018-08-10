---
title: '[Java]Sort_HeapSort'
category: Java
tag: Sort
date: 2015-11-11 00:00:00
---



# HeapSort



```java

import java.util.Arrays;
/**
 * Created By willon
 *
 * @author willon
 * @version 1.0
 */
public class HeapSort {
	public static void main(String[] args) {
        int[] a = {6, 5, 3, 1, 9, 7, 2, 4,9};
        heapSort(a);
        System.out.println(Arrays.toString(a));
    }
    /**
     * 堆排序
     * 分为三步 ：
     * 1. 使用原始数组 ， 初始化为 最大堆
     * 2. 交换 堆顶、堆尾元素
     * 3. 重新构建最大堆，构建的长度 -1
     * 4. 重复 2，3
     *
     * @param a 数组
     */
    private static void heapSort(int[] a) {
        // 初始化， 构建最大堆
        buildMaxHeap(a, a.length);
        for (int i = a.length - 1; i > 0; i--) {
            //最后一个元素和根节点交换
            a[0] ^= a[i];
            a[i] ^= a[0];
            a[0] ^= a[i];
            //交换完毕， 重新构建 最大堆
            // 因为倒序遍历， 所以 i = 需重构堆的 长度， 所以堆尾 a[i] 不会参与重构
            buildMaxHeap(a, i);
        }
    }

    /**
     * 构建最大堆
     * 直接构建 完全二叉树 ， 如果当前值 大于 父节点，交换， 一直向上比较
     *
     * @param a   数组
     * @param len 调整的长度
     */
    private static void buildMaxHeap(int a[], int len) {
        for (int i = 0; i < len; i++) {
            //当前构建到哪一个元素了？
            int k = i;
            // 获取 当前元素 de 父节点： k==偶数 ? 父亲=k/2-1 : 父亲=k/2
            int fi = k % 2 == 0 ? k / 2 - 1 : k / 2;
            // 一直往上跟父节点 比较
            while (fi >= 0 && a[k] > a[fi]) {
                a[k] ^= a[fi];
                a[fi] ^= a[k];
                a[k] ^= a[fi];
                // 将父节点看成子节点，继续向上比较
                k = fi;
                fi = k % 2 == 0 ? k / 2 - 1 : k / 2;
            }
        }
    }



}


```

