---
title: '[Hadoop]10_自定义VALUE类型'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:10:33
---

比如现在有一个文件
```
用户手机号  用户IP 用户访问网站  用户上行流量  用户下行流量
13840583165    106.92.75.115	baidu.com	240 34
13826241303    106.85.238.220	jd.com	342	543
13852308726    123.233.137.34	rb.com	564	3432
.......
```
要用mapreduce统计用户的上行流量和下行流量和总流量

# 分析

1. 用户手机号为 KEY
2. 上行，下行，总和为 VALUE
3. 行，下行，总和封装成一个自定义类
4. 形如 `<13840583165, FlowBean@u45eer>`

# 实现

1. 自定义类
```
package flowsum;

import org.apache.hadoop.io.Writable;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;


/**
 * 功能: 封装自定义的 VALUE 数据
 * 注意：
 *      1. 实现 `hadoop` 序列化接口 `Writable`
 *      2. 重写的方法内，属性的顺序要一样
 *      3. 重写 `toString()` 方法
 *      4. 必须要有空参构造函数
 */
public class FlowBean implements Writable {
    private long upFlow;
    private long downFlow;
    private long sumFlow;

    public FlowBean() {
    }

    public FlowBean(long upFlow, long downFlow) {
        this.upFlow = upFlow;
        this.downFlow = downFlow;
        this.sumFlow = downFlow + upFlow;
    }

    public long getUpFlow() {
        return upFlow;
    }

    public void setUpFlow(long upFlow) {
        this.upFlow = upFlow;
    }

    public long getDownFlow() {
        return downFlow;
    }

    public void setDownFlow(long downFlow) {
        this.downFlow = downFlow;
    }

    public long getSumFlow() {
        return sumFlow;
    }

    public void setSumFlow(long sumFlow) {
        this.sumFlow = sumFlow;
    }


    /**
     * @param out 向外输出序列化数据
     */
    public void write(DataOutput out) throws IOException {
        out.writeLong(upFlow);
        out.writeLong(downFlow);
        out.writeLong(sumFlow);
    }

    /**
     * @param in 从外部读取的序列化数据，用于反射生成类
     */
    public void readFields(DataInput in) throws IOException {
        this.upFlow = in.readLong();
        this.downFlow = in.readLong();
        this.sumFlow = in.readLong();
    }

    @Override
    public String toString() {
        return upFlow+" "+downFlow+" "+sumFlow;
    }
}
```
2. FlowMapper
```
package flowsum;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

public class FlowMapper extends Mapper<LongWritable, Text, Text, FlowBean> {

    @Override
    protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {

        String line = value.toString();
        String[] users = line.split("\t");

        long u = Long.parseLong(users[users.length - 1]);
        long d = Long.parseLong(users[users.length - 2]);

        context.write(new Text(users[0]), new FlowBean(u, d));

    }
}
```
3. FlowReducer
```
package flowsum;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;

public class FlowReducer extends Reducer<Text, FlowBean, Text, FlowBean> {
    @Override
    protected void reduce(Text key, Iterable<FlowBean> values, Context context) throws IOException, InterruptedException {

        long u = 0;
        long d = 0;
        long s = 0;
        for (FlowBean flow : values
                ) {
            d += flow.getDownFlow();
            u += flow.getUpFlow();
            s = flow.getSumFlow();
        }
        context.write(key,new FlowBean(u,d));
    }
}
```
4. FlowJobSubmitter
```
package flowsum;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;

public class FlowJobSubmitter {

    public static void main(String[] args) throws Exception {

        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf);

        job.setJarByClass(FlowJobSubmitter.class);

        //设置 Mapper 和 Reducer 的类
        job.setMapperClass(FlowMapper.class);
        job.setReducerClass(FlowReducer.class);


        //设置 Mapper 输出的数据类型
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(FlowBean.class);

        //设置 Reducer 输出的数据类型
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(FlowBean.class);

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
