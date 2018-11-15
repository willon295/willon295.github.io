---
title: '[Java]创建excel表格'
category: Java
tags:
  - Java
  - Excel
date: 2017-11-11 00:00:00
---

使用java创建excel表格

# 主要流程

1. 需要使用 Apache 的开源工具
```xml
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>3.5-FINAL</version>
        </dependency>
```
2. 创建的主要流程
```java
// 1. 创建表格wb
HSSFWorkbook wb = new HSSFWorkbook();

// 2. wb创建多个sheet
HSSFSheet sheet = wb.createSheet("工作表1");
HSSFSheet sheet2 = wb.createSheet("工作表2");

// 3. shee创建行row , (行,列 都是从 下标 0 开始的)
HSSFRow row = sheet.createRow(0);

// 4. row 创建了列单元格 cell , 并且设置内容 , 单元格的下标也是从 0 开始
HSSFCell cell = row.createCell(0);
cell.setCellValue("HelloWord");


//  5. 通过表格wb 创建样式
HSSFCellStyle cellStyle = wb.createCellStyle();
cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);

// 6. 给单元格cell 设置样式
cell.setCellStyle(cellStyle);


// 7. 设置sheet表格的列宽度自适应, i 传的是行的下标
sheet.autoSizeColumn(i, true);
```


# 注意事项

1. 单元格样式最好通过   `HSSFWorkbook` 的对象的 `wb.createCellStyle()`  方法创建
2. 一个单元格可以有多个 `sheet`
3. sheet 里的 row 和 cell 下标从 0 开始
4. 如果需要每个cell的宽度根据内容自适应 , 需要调用 `sheet.autoSizeColumn(i, true);`, i 是行号



# 通用代码封装

**实现功能:** 
1. 有标题
2. 每个 JavaBean 对应 sheet 的一行数据, 每个字段一一对应
3. 支持第一行是序列号

**代码:**

```java

    /**
     * 到处一张工作表
     *
     * @param sheetName           sheet表名称
     * @param title               标题
     * @param content             内容
     * @param isFirstColSerialNum 第一列是否为序列号
     * @return excel 表格
     */
    public HSSFWorkbook exportExcel(String sheetName, List<String> title, List content, boolean isFirstColSerialNum) {

        // 创建 excel
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet(sheetName);

        HSSFCellStyle cellStyle = wb.createCellStyle();
        cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);

        fillHeader(sheet, cellStyle, title);
        fillSheet(sheet, cellStyle, content, isFirstColSerialNum);

        return wb;
    }


    /**
     * 填充标题信息
     *
     * @param sheet  sheet
     * @param header 头部文字列表
     */
    private void fillHeader(HSSFSheet sheet, HSSFCellStyle cellStyle, List<String> header) {
        HSSFRow row = sheet.createRow(0);
        for (int i = 0; i < header.size(); i++) {
            HSSFCell cell = row.createCell(i);
            cell.setCellValue(header.get(i));
            cell.setCellStyle(cellStyle);
        }
    }

    /**
     * 填充工作表内容
     *
     * @param sheet              sheet
     * @param content            内容
     * @param isFirstColNumOrder 第一列是否为序号
     */
    private void fillSheet(HSSFSheet sheet, HSSFCellStyle cellStyle, List content, boolean isFirstColNumOrder) {

        // 如果第一列是序号
        if (isFirstColNumOrder) {
            for (int i = 1; i <= content.size(); i++) {
                // 创建行
                HSSFRow row = sheet.createRow(i);
                HSSFCell cell = row.createCell(0);
                cell.setCellValue(i);
                cell.setCellStyle(cellStyle);
                // 将每一行的宽度自适应
                sheet.autoSizeColumn(i, true);
            }
            for (int i = 1; i <= content.size(); i++) {
                HSSFRow row = sheet.getRow(i);
                fillRow(row, content.get(i - 1), cellStyle, true);
                sheet.autoSizeColumn(i, true);
            }
        } else {
            for (int i = 1; i <= content.size(); i++) {
                // 创建行
                HSSFRow row = sheet.createRow(i);
                // 填充每行的数据
                fillRow(row, content.get(i - 1), cellStyle, false);
                // 将每一行的宽度自适应
                sheet.autoSizeColumn(i, true);
            }
        }
    }

    /**
     * 根据POJO类, 按字段顺序 填充每一行的数据
     *
     * @param row  行
     * @param data 每行需要填充内容 , 对应一个 POJO类的各字段
     */
    private void fillRow(HSSFRow row, Object data, HSSFCellStyle cellStyle, boolean isFirstColNumOrder) {

        Class aClass = data.getClass();
        Field[] fields = aClass.getDeclaredFields();
        if (fields != null && fields.length > 0) {
            int startCol = isFirstColNumOrder ? 1 : 0;
            for (int i = startCol; isFirstColNumOrder ? i <= fields.length : i < fields.length; i++) {
                HSSFCell cell = row.createCell(i);
                String name = isFirstColNumOrder ? fields[i - 1].getName() : fields[i].getName();
                String getMethodName = "get" + name.substring(0, 1).toUpperCase() + name.substring(1);
                Method getMethod;
                try {
                    getMethod = aClass.getMethod(getMethodName);
                    Object result = getMethod.invoke(data);
                    if (!StringUtils.isEmpty(result.toString())) {
                        if (isNum(result.toString())) {
                            cell.setCellValue(Double.valueOf(result.toString()));
                        } else {
                            cell.setCellValue(result.toString());
                        }
                    } else {
                        cell.setCellValue("");
                    }
                    cell.setCellStyle(cellStyle);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

        }
    }


    private boolean isNum(String src) {
        try {
            Integer.parseInt(src);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
``` 



