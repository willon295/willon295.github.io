---
title: '[Hadoop]16_MR之多Job串行'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:16:33
---

# 需求分析

当我们的业务逻辑十分复杂时，一个 job 显然不能完成，所以需要多个 MRJOb。

# 举个例子

下面的内容， `：` 冒号左边是用户，右边是该用户的好友，需求 ==>  求两两用户间所有共同好友
```
A:B,C,D,F,E,O
B:A,C,E,K
C:F,A,D,I
D:A,E,F,L
E:B,C,D,M,L
F:A,B,C,D,E,O,M
G:A,C,D,E,F
H:A,C,D,E,O
I:A,O
J:B,O
K:A,C,D
L:D,E,F
M:E,F,G
O:A,H,I,J
```

## 分析



1. 第一次
	- map： (friend1，user)
	- shuffle结果：(friend1，[u1,u2,u3..] ) => 集合内用户两两有共同好友 friend1
	- reduce: 好友两两作key，好友做 value =>（u1#u2,friend1）,(u1#u3,friend1)..
2.  第二次
	-map： (u1#u2,friend1)
	- shuffle结果：(u1#u2,[f1,f2,f3...])
	- reduce: 将好友集合遍历即可


## Coding

具体代码实现

```
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.jobcontrol.ControlledJob;
import org.apache.hadoop.mapreduce.lib.jobcontrol.JobControl;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

public class CommonFriends extends Configured implements Tool {

    //把用户作为 value ， 好友作为 key
    static class StepOneMapper extends Mapper<LongWritable, Text, Text, Text> {

        Text user = new Text();
        Text friend = new Text();

        @Override
        protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            String[] line = value.toString().split(":");
            user.set(line[0]);
            String[] friends = line[1].split(",");
            for (String f : friends) {
                friend.set(f);
                context.write(friend, user);
            }

        }
    }

    static class StepOneReducer extends Reducer<Text, Text, Text, Text> {

        Text twoUsers = new Text();

        //结果是  (   friend ,[u1,u2,u3....]   ), user 两两之间有共同好友
        // 输出结果是  (u1#u2 ,  commonFriend)
        @Override
        protected void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {

            ArrayList<String> userList = new ArrayList<String>();

            for (Text value : values) {
                userList.add(value.toString());
            }
            //避免出现 A#B B#A 重复情况
            Collections.sort(userList);


            for (int i = 0; i < userList.size() - 1; i++) {
                for (int j = (i + 1); j < userList.size(); j++) {
                    twoUsers.set(userList.get(i) + "#" + userList.get(j));
                    context.write(twoUsers, key);
                }
            }
        }
    }


    static class StepTwoMapper extends Mapper<LongWritable, Text, Text, Text> {

        Text twoUsers = new Text();
        Text commonFriend = new Text();


        //将数据  (u1#u2 ,  commonFriend) 放入 map
        // shuffle 输出 结果是   (u1#u2 ,[cf1, cf2, cf3 ....]  )
        @Override
        protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            String[] split = value.toString().split("\t");
            twoUsers.set(split[0]);
            commonFriend.set(split[1]);
            context.write(twoUsers, commonFriend);
        }
    }

    static class StepTwoReducer extends Reducer<Text, Text, Text, Text> {

        Text commonFriends = new Text();

        //将结果直接输出
        @Override
        protected void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {

            StringBuilder sb = new StringBuilder();
            for (Text v : values) {
                sb.append(v.toString()).append(",");
            }
            commonFriends.set(sb.substring(0, sb.length() - 1));
            context.write(key, commonFriends);
        }
    }


    public int run(String[] strings) throws Exception {
        Configuration conf = getConf();
        //文件的输入 输出 ，临时缓存 路径
        Path in = new Path(conf.get("in"));
        Path out = new Path(conf.get("out"));
        Path tmp = new Path("/commonFriendTmp");

        //创建  第 1 步 执行任务 job1
        Job job1 = Job.getInstance(conf, "step-one-job");
        job1.setJarByClass(this.getClass());
        job1.setInputFormatClass(TextInputFormat.class);
        job1.setMapperClass(StepOneMapper.class);
        job1.setReducerClass(StepOneReducer.class);
        job1.setOutputKeyClass(Text.class);
        job1.setOutputValueClass(Text.class);
        job1.setOutputFormatClass(TextOutputFormat.class);
        TextInputFormat.addInputPath(job1, in);
        //将处理结果存入临时文件夹
        TextOutputFormat.setOutputPath(job1, tmp);

        //创建 第 2 步 执行任务 job2
        Job job2 = Job.getInstance(conf, "step-two-job");
        job2.setJarByClass(this.getClass());
        job2.setInputFormatClass(TextInputFormat.class);
        job2.setMapperClass(StepTwoMapper.class);
        job2.setReducerClass(StepTwoReducer.class);
        job2.setOutputKeyClass(Text.class);
        job2.setOutputValueClass(Text.class);
        job2.setOutputFormatClass(TextOutputFormat.class);
        //将上次处理完毕的临时结果作为本次的输入路径
        TextInputFormat.addInputPath(job2, tmp);
        TextOutputFormat.setOutputPath(job2, out);

        //将两个任务转换成  可控制的 ControlledJob
        ControlledJob cjob1 = new ControlledJob(job1.getConfiguration());
        cjob1.setJob(job1);
        ControlledJob cjob2 = new ControlledJob(job2.getConfiguration());
        cjob2.setJob(job2);

        //添加关系 依赖
        cjob2.addDependingJob(cjob1);

        //使用 jobController 控制两个任务
        JobControl jc = new JobControl("G-CommonFriends");
        jc.addJob(cjob1);
        jc.addJob(cjob2);

        //开启一个新的线程 运行 job
        Thread t = new Thread(jc);
        t.start();

        //当所有的任务完成返回0, 如果有失败的 返回 1
        while (true) {

            if (jc.allFinished()) {
                jc.stop();
                return 0;
            }
            if (jc.getFailedJobList().size() > 0) {
                jc.stop();
                return 1;
            }
        }

    }
    public static void main(String[] args) throws Exception {

        System.exit(ToolRunner.run(new CommonFriends(), args));

    }


}
```


# 多job串行的基本步骤

以 2 个 job为例

1. 创建  2 个 job ： job1 ,jo2
2. 设置  2 个 job 相关配置
3. job之间的数据关系，此处 job2 输入为 job1 输出
4. 将 2 个 job 转为 `可控制 ControlledJob`
```
ControlledJob cjob1 = new ControlledJob(job1.getConfiguration());
cjob1.setJob(job1);
ControlledJob cjob2 = new ControlledJob(job2.getConfiguration());
cjob2.setJob(job2);
```
5. 设置 `可控制 job`  依赖关系，此处job2等待job1完成才执行，所以 job2 依赖 job1
```
cjob2.addDependingJob(cjob1);
```
6. 创建 job控制器 `JobControl` （该类实现了 Runnable接口），并将可控job添加进控制器
```
JobControl jc = new JobControl("G-CommonFriends");
jc.addJob(cjob1);
jc.addJob(cjob2);
```
7. 创建新的线程运行控制器
```
Thread t = new Thread(jc);
t.start();
```
8. 后续操作
```
while (true) {
		//判断是否全部完成
        if (jc.allFinished()) {
            jc.stop();
            return 0;
        }
        //判断是否有失败的任务
        if (jc.getFailedJobList().size() > 0) {
            jc.stop();
            return 1;
        }
    }
```

# 总结

代码都是套路代码，精华的是 处理问题的算法和思想， 套路记不住可以看笔记
