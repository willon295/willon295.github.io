---
title: '[SpringBoot]06_文件的上传下载'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:06:00
---


以一个标准 restful 风格的 controller 为例

```
import cn.willon.bean.TVseries;
import org.apache.commons.io.IOUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/tv")
public class TvseriesController {

    @GetMapping(value = "/{id}")
    public String get(@PathVariable int id) {
        return "Get msg of :" + id;
    }

    @PostMapping(value = "/{id}")
    public String add(@PathVariable int id, @RequestBody TVseries tVseries) {
        tVseries.setId(id);
        return "添加： " + tVseries;
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable int id) {
        return "delete: " + id;
    }


    @PutMapping("/{id}")
    public String update(TVseries tv) {
        return "upate: " + tv;
    }

    /**
     * 文件上传
     * @param id id
     * @param file 传入的文件
     * @throws IOException 异常
     */
    @PostMapping(value = "/{id}/photos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void upload(@PathVariable int id, @RequestParam("photo") MultipartFile file) throws IOException {
        FileOutputStream fos = new FileOutputStream(file.getOriginalFilename());
        System.out.println("接收到文件： " + file.getOriginalFilename());
        IOUtils.copy(file.getInputStream(), fos);
        fos.close();
    }

    /**
     * 文加的下载
     * @param id id
     * @return 文件的字节数组
     * @throws IOException 异常
     */
    @GetMapping(value = "/{id}/icon", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] download(@PathVariable int id) throws IOException {
        InputStream is = this.getClass().getClassLoader().getResourceAsStream("icon.jpg");
        return IOUtils.toByteArray(is);//使用的是 apache common io 包
    }
}
```

