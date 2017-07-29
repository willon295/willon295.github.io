---
title: '[Struts2]05_获取ServletAPI'
tag: Struts2
category: Struts2
---


# 通过ActionContext获取
此方法操作的只是map集合，降低了耦合度。不能操作真正的 HttpServletRequest 等对象
```
ActionContext ctx = ActionContext.getContext();

//在request域操作
ctx.put("requestDate","hahahahha");

//在session 域操作
ctx.getSession().put("sessionData","heheheheh");

//在application域操作
ctx.getApplication().put("applicationData","hhhhhh");

```

# 通过ServletActionContext获取
操作真正的 `HttpServletRequest` 对象

```
//获取 HttpServletRequest ，并且获取session
HttpServletRequest req = ServletActionContext.getRequest();
req.setAttribute("aa","aaaaa");
req.getSession().setAttribute();

//获取application域
ServletActionContext.getServletContext().setAttribute("applicationData","a");

```

# 通过实现接口
不提及