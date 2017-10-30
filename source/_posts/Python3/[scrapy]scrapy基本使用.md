---
title: '[scrapy]基本使用'
tag: Python3
category: Python3

---

## 安装

1. 安装Python3-pip
```
sudo    apt-get   install  python3-pip
```
2. 安装scrapy
```
sudo pip3 install  scrapy
```

3. 创建一个项目
```
scrapy startproject  myDemo
```
4. 定义一个简单的item
```
# -*- coding: utf-8 -*-

import scrapy

class OccupationItem(scrapy.Item):
    #定义要爬取的字段
    occupation_name = scrapy.Field()
    occupation_type = scrapy.Field()
    occupation_number = scrapy.Field()
    occupation_address = scrapy.Field()
    publish_time = scrapy.Field()
```

5. 定义一个spider，进入项目后创建

```
#基本语法
scrapy genspider spider_name [spider_url]
```
下面是一个spider的代码

```
# -*- coding: utf-8 -*-
import scrapy
from mm.items import OccupationItem
class OccupationSpider(scrapy.Spider):
    name = 'tencent_occupation'
    allowed_domains = ['hr.tencent.com']
    base_url = "http://hr.tencent.com/position.php?keywords=&lid=0&start="
    offset = 0
    start_urls = [base_url + str(offset)]

    def parse(self, response):
        item = OccupationItem()
        nodelist = response.xpath("//tr[@class='odd'] | //tr[@class='even']")

        for node in nodelist:
            item['occupation_name'] = node.xpath("td[1]/a/text()")[0].extract()

            if len(node.xpath("td[2]/text()")):
                item['occupation_type'] = node.xpath("td[2]/text()")[0].extract()
            else:
                item['occupation_type'] = ""
            item['occupation_number'] = node.xpath("td[3]/text()")[0].extract()
            item['occupation_address'] = node.xpath("td[4]/text()")[0].extract()
            item['publish_time'] = node.xpath("td[5]/text()")[0].extract()
            yield item
        if self.offset < 2210:
            self.offset += 10
            url = self.base_url + str(self.offset)
            yield scrapy.Request(url=url, callback=self.parse)

```
6. 定义管道文件，保存数据

```
# -*- coding: utf-8 -*-
import json


class OccupationPipeline(object):
    def __init__(self):
        self.f = open("occupation.json", "w")
        self.f.write("[\n")

    def process_item(self, item, spider):
        content = json.dumps(dict(item), ensure_ascii=False) + ",\n"
        self.f.write(content)
        return item

    def close_spider(self, spider):
        self.f.write("]")
        self.f.close()
```

7. 在配置文件`settings.py`中启用管道

```
ITEM_PIPELINES = {
   'mm.pipelines.OccupationPipeline': 300,
}
```

8. 执行爬虫

```
#注意名字是spider里面定义的那个
scrapy  crawl tencent_occupation
```

