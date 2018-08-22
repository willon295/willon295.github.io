---
title: '[Java]Sort_RadixSort'
category: Java
tag: Sort
date: 2015-11-11 00:00:00
---



# RadixSort




```java
import java.util.Arrays;

/**
 * Created By willon
 *
 * @author willon
 */
public class RadixSort {


    /**
     * 找到要最大数组的位数
     *
     * @param a 数组
     * @return 最大数的位数
     */

    private static int findMax(int[] a) {
        int max = -1;
        for (int i : a) {
            max = i > max ? i : max;
        }
        int t = 0;
        while (max != 0) {
            t++;
            max /= 10;
        }
        return t;
    }

    /**
     * 基数排序
     *
     * @param a 数组
     */

    private static void radixSort(int[] a) {

        int times = findMax(a);
        int t = 1, k = 1;

        while (t < times) {
            int[][] bucket = new int[10][a.length];
            for (int i = 0; i < a.length; i++) {
                //求该位的数字
                int b = (a[i] / k) % 10;
                bucket[b][i] = a[i];
            }
            int index = 0;
            //取出 桶内的值，放回数组
            for (int[] ints : bucket) {
                for (int anInt : ints) {
                    if (anInt != 0) {
                        a[index++] = anInt;
                    }
                }

            }

            k *= 10;
            t++;
        }
    }

    public static void main(String[] args) {

        int[] a = {2, 3435, 4546, 7, 7, 43, 666, 34, 57, 879, 56, 9, 87, 4, 5645377, 34};
        radixSort(a);
        System.out.println(Arrays.toString(a));

    }
}

```

