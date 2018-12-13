---
title: '[Shiro]原理剖析'

---

1. 认证(authentication): 对用户身份进行验证
2. 授权(authorization):  对用户进行授权,如该用户拥有什么角色 , 拥有什么权限
3. 角色(role)的定义: 开发者自定义的角色 , 如 `admin` , `vip` , `user`
4. 权限(permission)的定义:  应该符合一定的规则, 但是规则也可以自己定义: 
```
资源标识符：操作动作：对象实例ID

user:view:1001    => 拥有查看 id 为 1001 的user的权限
user:view         => 拥有查看所有user的权限,等价于 user:view:*
user:*            =>  拥有所有user的所有操作权限
```
