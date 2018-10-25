---
title: '[Design_Pattern]08_composite组合模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:08:00
---


# 专业表述

组合模式是 `结构模式` 的一种，将对象组合成树状结构以表示 `部分-整体` 的层次结构。


# 个人理解

1. 比如文件系统的目录，目录本身就是一个实体（部分），但是一个目录又包含许多子目录（整体），子目录又有子目录。。
2. 专业表述所谓的 `部分-整体` 大概就是这个意思。


# 举个例子


1. 上图
![图片](/images/dp08_composite_01.png)
2. 上代码

```java
import java.util.ArrayList;
import java.util.List;

/**
 * 目录实体类
 */
public class Directory {

    private String name;

    private List<Directory> subDirs;

    public Directory(String name) {
        this.name = name;
        subDirs = new ArrayList<>();

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public List<Directory> getSubDirs() {
        return subDirs;
    }

    public void setSubDirs(List<Directory> subDirs) {
        this.subDirs = subDirs;
    }


    /**
     * 添加子目录，对用户屏蔽细节
     * @param d 子目录
     */
    public void add(Directory d) {
        subDirs.add(d);
    }

    /**
     * 删除子目录，对用户屏蔽细节
     * @param d 子目录
     */
    public void delete(Directory d) {
        subDirs.remove(d);
    }

    @Override
    public String toString() {
        return "Directory{" +
                "name='" + name + '\'' +
                '}';
    }
}


```

