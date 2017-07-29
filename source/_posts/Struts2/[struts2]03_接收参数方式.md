---
title: '[Struts2]03_接收参数'
tag: Struts2
category: Struts2
---

一、 jsp 页面代码

```
<form action="<s:url namespace="/user" action="login"/> " method="post">
  
        <input type="text" name="userName" placeholder="用户名" value="${userName}"><br>

        <input type="text" name="password" placeholder="密码"><br>
   
        <input type="submit">
</form>

```

# 属性驱动

1. 解释及用法：顾名思义，将所有表单提交的内容当做 Action属性使用，有set、get方法。**注意**：`属性名称`必须与表单的`name属性`一致，Struts2会自动对属性进行赋值
2. 举个例子：

```
	private  String  userName;
	private  String  password;
     public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
	
	 public  String  login(){
        System.out.println("login方法调用");
        if (Objects.equals(this.user.getPassword(), "admin") && Objects.equals(this.user.getPassword(), "admin")){
            return "ok";
        }
        return "fail";
    }


```

# 域驱动

1. 解释及用法：单独创建 Model 类封装，然后在Action里写一个 Model 的属性，并设置set、get方法
2. 举个例子：

```
//User 类

package entity;
public class User {
    private  String  userName;
    private  String  password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User() {
    }

    @Override
    public String toString() {
        return  this.getUserName()+"--"+this.getPassword();
    }
}

//Action 代码
    private User user;
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

//jsp 页面代码,name属性写成 user.userName
<form action="<s:url namespace="/user" action="login"/> " method="post">
        <input type="text" name="user.userName" placeholder="用户名" ><br>
        <input type="text" name="user.password" placeholder="密码"><br>
        <input type="submit">
</form>

```


# 模型驱动

1. 解释及用法：Action实现 ModelDriven 接口，实现 `getModel()`方法
2. 举个例子：

```
//Action代码

public class UserAction extends ActionSupport  implements ModelDriven{
    private User user;
    @Override
    public User getModel() {
        if (this.user==null){
            user =new User();
        }
        return  user;
    }

    @Override
    public String execute() throws Exception {
        return super.execute();
    }

    public  String  login(){
        System.out.println("login方法调用");
        if (Objects.equals(this.user.getPassword(), "admin") && Objects.equals(this.user.getPassword(), "admin")){
            
            return "ok";
        }
        return "fail";
    }

//jsp代码与属性驱动一样

```

# 获取 URL 传参

```
//假设 URL传的参数  id
int  id = ServletActionContext.getRequest().getParameter("id");
```