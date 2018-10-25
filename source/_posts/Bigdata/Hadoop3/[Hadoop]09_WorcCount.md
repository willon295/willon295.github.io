---
title: '[Hadoop]09_WorcCount'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:09:33
---

在代码编写前，先引入依赖
```
    <dependencies>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>2.8.2</version>
        </dependency>
    </dependencies>
```

# CODING


1. `WcMapper`
```
package wc;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

/**
 * 参数解释：
 * KEYIN: 读取的数据的偏移量数据类型
 * VALUEIN： 读取的数据的数据类型
 * KEYOUT： 输出给框架的返回值的KEY的数据类型
 * VALUEOUT： 输出给框架的返回只的 VALUE 的数据类型
 * 注意; 由于java自带的数据类型序列化比较臃肿，所以hadoop采用了自己的包装类
 * TEXT--String
 * IntWritable--Integer
 */
public class WcMapper extends Mapper<LongWritable, Text, Text, IntWritable> {

    /**
     * mapper方法只负责提取有用的信息
     *
     * @param key     读取数据的偏移量，一般不需要处理
     * @param value   读取完的一行内容，这里是文本类型的数据
     * @param context 上下文对象，用于将数据返回给框架
     */
    @Override
    protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {

        //将数据转换成String类型
        String line = value.toString();

        //将内容进行切割
        String[] words = line.split(" ");

        //把读取到的每个单词 作为 key，value为 1
        for (String word : words
                ) {
            context.write(new Text(word), new IntWritable(1));
        }

    }
}

```
2. `WcReducer`
```
package wc;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import java.io.IOException;


/**
 * 参数解释：
 * KEYIN: mapper阶段设置的 KEY 数据类型
 * VALUEIN： mapper阶段设置的 VALUE 数据类型
 * KEYOUT： 输出给框架的返回值的 KEY 的数据类型
 * VALUEOUT： 输出给框架的返回只的 VALUE 的数据类型
 */
public class WcReducer extends Reducer<Text, IntWritable, Text, IntWritable> {

    /**
     * 负责将一组结果进行处理，汇总 处理完一组之后，继续下一组
     * 收到的数据是mapper之后经过shuffle处理的一组数据,比如：<hello,<1,1,1>>
     *
     * @param key     比如：<hello,<1,1,1>>中的 `hello`
     * @param values  比如：<hello,<1,1,1>>中的`<1,1,1>`
     * @param context 上下文对象
     */
    @Override
    protected void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
        int count = 0;
        for (IntWritable value : values
                ) {
            //将 `<1,1,1,1,1>遍历相加
            count += value.get();
        }

        //将处理完的数据返回给框架这里是 `<hello,5>`
        context.write(key, new IntWritable(count));

    }
}
```
3. `WcJobSubmmiter`
```
package wc;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;

/**
 * 其实是一个 yarn 的客户端
 * 功能： 将jar 文件提交给yarn ，yarn再分发到服务器
 */
public class WcJobSubmiter {

    public static void main(String[] args) throws Exception {

        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf);

        job.setJarByClass(WcJobSubmiter.class);

        //设置 Mapper 和 Reducer 的类
        job.setMapperClass(WcMapper.class);
        job.setReducerClass(WcReducer.class);


        //设置 Mapper 输出的数据类型
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(IntWritable.class);

        //设置 Reducer 输出的数据类型
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        //设置 输入的 数据类型 和 路径
        job.setInputFormatClass(TextInputFormat.class);
        FileInputFormat.setInputPaths(job, new Path(args[0]));


        //设置 输出的 数据类型 和 路径
        job.setOutputFormatClass(TextOutputFormat.class);
        FileOutputFormat.setOutputPath(job, new Path(args[1]));

        boolean res = job.waitForCompletion(true);
        System.exit(res ? 0 : 1);

    }
}
```
4. 打包 `mvn package`, 生成的jar 文件为改名为 `wc.jar`

# RUN

1. 随便找一台 `非sourceManager` 的机器，上传 `wc.jar`, 
2. 输入
```
hadoop jar wc.jar wc.WcJobSubmiter  /aa.txt  /wc/output
```
3. 查看结果 `hadoop fs -cat /wc/output/part-r-00000`
```
aaaa    1
dfe     1
eee     2
eeerr   1
hello   2
lll     1
me      1
oooe    1
sss     1
world   1
wwe     1
www     1
```
