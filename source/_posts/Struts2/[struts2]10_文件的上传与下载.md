---
title: '[Struts2]10_文件上传下载'
tag: Struts2
date: 2016-10-13 12:22:33
category: Struts2
---

## 文件的上传

### model 的封装

- File 类型的属性: photo
- File 类型属性的拓展： photoFileName，photoContentType;

举个例子：
```

public class User {
    private  int  id ;
    private  String username;
    private  String  password;

    //定义 photo 文件属性
    private File  photo;

    //定义 文件名 属性 --> 属性名+ FileName
    private  String  photoFileName;

    //定义 文件类型  属性-->属性名+ ContentType
    private  String  photoContentType;
	
	}
```
### JSP 表单

```
<!-- 加入 enctype="multipart/form-data"  ，方法必须是post-->
<form action="login.action" method="post" enctype="multipart/form-data">
    <s:token/>
    <input type="text" name="username" placeholder="用户名" ><br>
    <input type="text" name="password" placeholder="密码" ><br>
	
	<!-- type 改成 file -->
    <input type="file" name="photo" placeholder="选择照片"> <br>
    <input type="submit" ><br>
</form>

```

### Action 处理

```
	//获取真实项目路径，此处需要 javax.servlet.jar 包支持
    String path = ServletActionContext.getServletContext().getRealPath("upload/");
	
	
    if (this.user.getPhoto()!=null){
	
	//使用 FileUtils  写入文件
        File desFile = new File(path + this.user.getPhotoFileName());
        FileUtils.copyFile(this.user.getPhoto(), desFile);
    }
    return SUCCESS;

```

###  限制文件的大小和文件的类型

添加拦截器即可

```
            <interceptor-ref name="fileUpload">
                <param name="allowedTypes">
                    image/jpeg,image/png
                </param>
                <param name="maximumSize">
				<!-- 这里的单位是字节 -->
                    1024000
                </param>
            </interceptor-ref>
```

## 文件的下载

### jsp 代码

```
<a href="download.action">下载</a>

```

###  配置文件

```
        <action name="download" class="actions.DownLoadAction" >
			//类型是stream类型
            <result name="success" type="stream">
				//参数：文件名  和 文件流
                <param name="filename">${filename}</param>
				
				//加上这句才是以文件形式下载，而不是直接打开
                <param name="contentDisposition">attachment;filename=${filename}</param>
            </result>
        </action>
```

###  Action 代码

```
public class DownLoadAction extends ActionSupport {
    private InputStream inputStream;
    private String filename;

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }


    @Override
    public String execute() throws Exception {
	

	//获取文件的路径，病转成流的形式
        inputStream= ServletActionContext.getServletContext().getResourceAsStream("/upload/"+filename);
		
		//文件名进行重新编码
        filename = URLEncoder.encode(filename,"UTF-8");
        return SUCCESS;
    }

```
