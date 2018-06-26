---
title: '[AJAX]01_异步表单'
tag: AJAX
category: AJAX
date: 2017-05-24 00:01:00
---

# 方式一

## HTML

表单设置一个 `id`, 将 `提交按钮` 与表单 `分离` ，提交按钮添加一个 `id` 

- 表单不需要 `method` 、 `action`
- 监听按钮的 `click`

```
<form id="loginForm" >
    <input type="text" name="name"/> <br>
    <input type="password" name="pwd"/> <br>
</form>
<button id="submit" type="submit">登录</button>
```

## AJAX

```

    <script>
        $(document).ready(function () {
                $('#submit').click(function () {
                        $.ajax({
                            async: true,
                            type: 'POST',
                            url: '${pageContext.request.contextPath}/user/login',
                            data: $("#loginForm").serialize(),
                            success: function (result) {
                                var id = result.id;
                                if (id == null) {
                                    alert("信息填写错误");
                                } else {
                                    alert(result.name+"_"+result.pwd)
                                }
                            },
                            error: function () {
                                alert("信息有误")
                            }
                        })
                    }
                )
            }
        )
    </script>
```


# 方式二

