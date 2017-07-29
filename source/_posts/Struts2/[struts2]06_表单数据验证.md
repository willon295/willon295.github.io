---
title: [Struts2]06_表单验证
tag: Struts2
category: Struts2

---


# 手工Java代码数据验证 

## 验证所有的方法

1. 用法：重写 Action 里面的 `validate() ` 方法
	在 `execute()` 内不需要调用此方法，`validate() ` 方法会自动调用，在方法体内写验证的逻辑。

> 注意：此方法默认会验证Action里的所有方法（即Action内的所有方法都会`自动`调用`validate() `法.

2. 举个例子

```
package action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import entity.User;

import java.util.Objects;

public class UserAction extends ActionSupport  implements ModelDriven{
    private User user;
    @Override
    public Object getModel() {
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
            ActionContext.getContext().getSession().put("userState","yes");
            return "logined";
        }
        return "fail";
    }

    @Override
    public void validate() {
        if (Objects.equals(this.user.getUserName(), "")){
			//抛出一个错误，在转发后的界面可以显示 
            addFieldError("name","用户名不能为空");
        }else if(this.user.getPassword().equals("")){
            addFieldError("password","密码不能为空");
        }
    }
}

```

## 验证指定方法

1. 用法：将 `validate` 重命名为 `validate+要验证的方法名`

> 注意：这个方法的也会被自动调用，但只是在指定的方法内调用

2. 举个例子

	```
	 //只验证 login方法内的数据
	 public void validateLogin() {
        if (Objects.equals(this.user.getUserName(), "")){
            addFieldError("name","用户名不能为空");
        }else if(this.user.getPassword().equals("")){
            addFieldError("password","密码不能为空");
        }
    }
	
	```
## 验证错误结果处理

上面的代码中出现了使用了

```
addFieldError("name","用户名不能为空");
```

这句话是抛出错误，先指定一个 `result` 处理它，`name`指定为 `input`

```
  <result name="input" >/error.jsp</result>
```

在 `error.jsp` 中写入一下代码,可以显示抛出的信息

```
<s:fielderror />
```


# XML文件进行数据验证

## 验证所有方法

如果需要使用XML进行数据验证，假如验证 `UserAction` 这个文件


1. 新建  `UserAction-validation.xml` (命名一定是`ActionClassName-validation.xml`)
2. `UserAction-validation.xml` 代码如下

```

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE validators PUBLIC
        "-//Apache Struts//XWork Validator 1.0.3//EN"
        "http://struts.apache.org/dtds/xwork-validator-1.0.3.dtd">
<validators>
    <field name="user.userName">
        <field-validator type="requiredstring">
            <message>名字不能为空</message>
        </field-validator>
    </field>
<field name="user.password">
    <field-validator type="regex">
        <param name="regexExpression"><![CDATA[^1[358]\d{9}]]></param>
        <message>密码号不正确</message>
    </field-validator>
</field>
</validators>

```


##  验证指定方法

与验证所有的方法的XML配置文件相似，只需将文件名称改为

` UserAction-login-validation.xml` (命名一定是`ActionClassName-ActionMethodName-validation.xml`

## 注意事项

1. XML文件中字符串的赋值必须用  `<![CDATA[^1[358]\d{9}]]> ` 中括号内的字符串数据才会被正确解析
2. xml 文件的定义可以查看dtd文件，注释里有代码
