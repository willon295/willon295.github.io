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
     *
     * 1. 使用原始数组 ， 初始化为 最大堆
     *
     * 2. 交换 堆顶、堆尾
     * 3. 重新构建最大堆，构建的长度 -1
     *
     * 4. 重复 2，3
     *
     * @param a 数组
     */
    private static void heapSort(int[] a) {
        // 初始化， 构建最大堆
        buildMaxHeap(a, a.length);
        
        //开始交换元素
        for (int i = a.length - 1; i > 0; i--) {
            //堆顶最大元素  和 堆尾元素交换
            a[0] ^= a[i];
            a[i] ^= a[0];
            a[0] ^= a[i];
            //交换完毕， 重新构建 最大堆 , 堆尾 a[i] 不参与重构
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
        
			//从第一个元素开始 , 将数组看成一个 完全二叉树
        for (int i = 0; i < len; i++) {
            int c = i;
            // 获取 当前元素 de 父节点： k==偶数 ? 父亲=k/2-1 : 父亲=k/2
            int fi = c % 2 == 0 ? c / 2 - 1 : c/ 2;
            // 一直往上跟父节点 比较
            while (fi >= 0 && a[c] > a[fi]) {
                a[c] ^= a[fi];
                a[fi] ^= a[c];
                a[c] ^= a[fi];
                // 将父节点看成子节点，继续向上比较
                c = fi;
                fi = c % 2 == 0 ? c / 2 - 1 : c/ 2;
            }
        }
    }

}


```

