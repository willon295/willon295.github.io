
---
title: '[JQery]00_基本操作'
tag: JavaScript
category: JavaScript
date: 
---

# 解释

```
<a href="" style="color: #333"> 点击 </a>

```
- href : 属性 attr
- 点击: 文本 text
- style里面的东西：样式 css

# 基本语法_用法

```
$(selector).action()
```

## 选择器

- $("#test"): 根据id选对象
- $(".test")： 根据类 选对象，
- $(":text"): 选择type为 text的对象
- $("table"): 选择table


##  动作(常用)

### 设置内容相关

- `text("content")`: 设置文本内容
- `html("<p>Ha!</p>")`: 设置html
- `val("vv")` : 设置表单的值
- `remove()` 、`remove("#tt")`: 删除元素，属性
- `attr("href","http://baidu.com")`: 设置属性
- `css("color","#fff")`: 设置样式、不传参数则返回样式
- `removeClass`、`addClass()` 、`toggleClass()`: 删除增加类


### 动画相关

- `hide()` 、`show()`: 隐藏/显示
- `slideDown()`、`slideUp()` 、 `slideToggle()`: 上下滑动
- `fadeOut()` 、`fadeIn()` 、`fadeToggle()`: 淡出淡入



### 取值相关

- `text()`: 获取文本内容
- `html()`: 获取html
- `val()` : 获取表单的值
- `serializable()`: 表单内容序列化

### 鼠标事件

- `mouseover()`、`mouseenter()`: 鼠标经过
- `mousedown()`: 鼠标按下
- `mouseup()`: 鼠标松开
- `mouseleave()`、`mouseout()`: 鼠标离开
- `mousemove()`: 鼠标移动，全局监听 
