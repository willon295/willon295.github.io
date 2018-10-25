---
title: '[Hadoop]08_MapReduce准备及标准的任务编写'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:08:33
---

# 环境配置

`yarn` 的工作是负责工作，内存调度
`mapreduce` 负责运算

## yarn-site.xml

1. 设置 yarn 服务器的名称
2. 设置 shuffle
```
<configuration>
<property>
        <name>yarn.resourcemanager.hostname</name>
        <value>hdpnn0</value>
</property>

<property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
</property>

</configuration>
~                  
```

## mapre-site.xml

把所有的分布任务交给 `yarn` 处理
```

<configuration>
	<property>
		<name>mapreduce.framework.name</name>
		<value>yarn</value>
	</property>
</configuration>
```

## 启动服务

1. start-dfs.sh
2. start-yarn.sh


# 一个标准的mapreduce任务编写

该任务主要是切割字符，计算第二列字符的出现次数

```

package cn.willon.hadoop.mapreduce;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;

import java.io.IOException;

public class Demo1 extends Configured implements Tool

{

    static class MyMapper extends Mapper<LongWritable, Text, Text, IntWritable> {

        @Override
        protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            String line = value.toString();
            String[] lines = line.split(",");
            context.write(new Text(lines[1]), new IntWritable(1));

        }
    }

    static class MyReducer extends Reducer<Text, IntWritable, Text, IntWritable> {

        @Override
        protected void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
            int sum = 0;
            for (IntWritable value : values) {
                sum += value.get();
            }
            context.write(key, new IntWritable(sum));

        }
    }


    /**
     * 程序执行时，在这里做一系列的作业配置
     *
     * @param strings 参数
     * @return 程序的运行状态
     * @throws Exception 运行异常
     */
    @Override
    public int run(String[] strings) throws Exception {

        //获取配置信息
        Configuration conf = getConf();

        // 设置程序的输入输出路径 ，从输入的 参数获取， 运行程序时 ，需要指定单数  -Din=XXX   -Dout=XXX
        Path input = new Path(conf.get("in"));
        Path output = new Path(conf.get("out"));

        //创建一个 任务
        Job job = Job.getInstance(conf, "cite-mapreduce");
        job.setJarByClass(this.getClass());

        //设置 Mapper 相关配置信息
        job.setMapperClass(MyMapper.class);
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(IntWritable.class);
        job.setInputFormatClass(TextInputFormat.class);
        TextInputFormat.addInputPath(job, input);


        //设置 Reducer 相关配置信息
        job.setReducerClass(MyReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        job.setOutputFormatClass(TextOutputFormat.class);
        TextOutputFormat.setOutputPath(job, output);

        //waitForCompletion() => 因为使用终端提交任务，该方法提交作业并询问 是否等待终端 ， true是等待，false不等待，返回值是程序是否提交成功，0：成功 1：失败
        return job.waitForCompletion(true) ? 0 : 1;
    }


    public static void main(String[] args) throws Exception {
        System.exit(ToolRunner.run(new Demo1(), args));
    }
}

```
