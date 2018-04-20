---
title: '[Hadoop]18_MapReduce将数据写入MySQL数据库'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:18:33
---

# 注意事项


1. MapReduce 只能将 `Reduce` 的 `key` 写入数据库
2. 所以要将 Reduce 的 `key` 设置为 `自定义类型`
3. 自定义类型需要实现接口 `WritableComparable` , `DBwritable`
4. reduce的输出格式是 `DBOutputFormat.class`
5. 获取的 properties 属性必须使用， 否则报错 `NullPointExcption`
```
Properties p = new Properties();
// this.getClass.getResourceAsStream 和 绝对路径 `/`
p.load(this.getClass().getResourceAsStream("/db.properties"));

```
6. `DBConfiguration.configureDB()` 方法第一个参数的 `configuration` 参数，必须从 `job` 获取，否则 `DBOutPutFormat.getWriter 异常`，运行失败。
```
DBConfiguration.configureDB(job.getConfiguration(), p.getProperty("driver"), p.getProperty("jdbcUrl"), p.getProperty("username"), p.getProperty("password"));
//设置数据表， 要插入的列
DBOutputFormat.setOutput(job, p.getProperty("table"), "uid", "gid", "exp");
```
7. `mysql-xxx.jar` 的驱动包拷贝到 `所有节点` 的 `$HADOOP_HOME/share/hadoop/yarn/lib` 目录

# 自定义 key类型

1. 自定义的key数据类型不许实现 `WritableComparable` , `DBwritable` 接口，实现里面的方法

```
public class ResultKey implements WritableComparable, DBWritable {

    private String uid;
    private String gid;
    private int exp;

    //从数据库结果集  反序列化相应的属性
    public void readFields(ResultSet rs) throws SQLException {
        uid = rs.getString("uid");
        gid = rs.getString("gid");
        exp = rs.getInt("exp");
    }

    //序列化输出  给占位符 填入相应的参数
    public void write(PreparedStatement ps) throws SQLException {
        ps.setString(1, uid);
        ps.setString(2,gid);
        ps.setInt(3, exp);
    }

    public int compareTo(Object o) {
        int res = -1;
        if (o instanceof ResultKey){
            ResultKey r = (ResultKey) o;
            //比较 uid
            int  a = Integer.parseInt(this.getUid());
            int  b = Integer.parseInt(r.getUid());
            res = a > b ? 1 : (a == b) ? 0 : -1;

        }
        return res;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResultKey)) return false;

        ResultKey resultKey = (ResultKey) o;

        if (exp != resultKey.exp) return false;
        if (!uid.equals(resultKey.uid)) return false;
        return gid.equals(resultKey.gid);
    }

    @Override
    public int hashCode() {
        int result = uid.hashCode();
        result = 31 * result + gid.hashCode();
        result = 31 * result + exp;
        return result;
    }

    public void write(DataOutput out) throws IOException {
        out.writeUTF(uid);
        out.writeUTF(gid);
        out.writeInt(exp);
    }

    public void readFields(DataInput in) throws IOException {
        this.uid = in.readUTF();
        this.gid = in.readUTF();
        this.exp = in.readInt();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getGid() {
        return gid;
    }

    public void setGid(String gid) {
        this.gid = gid;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }
}

```

# job配置 Demo

```
public int run(String[] strings) throws Exception {
        Configuration conf = getConf();
        Path in = new Path(conf.get("in"));
        
        //加载数据库配置信息
        Properties p = new Properties();
        p.load(this.getClass().getResourceAsStream("/db.properties"));

        Job job = Job.getInstance(conf, "saveResult2DB");
        job.setJarByClass(this.getClass());
        job.setMapperClass(SaveRecommandResult2DBMapper.class);
        job.setMapOutputKeyClass(Text.class);
        job.setMapOutputValueClass(NullWritable.class);
        job.setInputFormatClass(TextInputFormat.class);
        TextInputFormat.addInputPath(job, in);

        //设置reducer
        job.setReducerClass(SaveRecommandResult2DBReducer.class);
        job.setOutputKeyClass(ResultKey.class);
        job.setOutputValueClass(NullWritable.class);
        job.setOutputFormatClass(DBOutputFormat.class);

        //设置数据库连接信息
        DBConfiguration.configureDB(job.getConfiguration(), p.getProperty("driver"), p.getProperty("jdbcUrl"), p.getProperty("username"), p.getProperty("password"));
        //设置数据表， 要插入的列
        DBOutputFormat.setOutput(job, p.getProperty("table"), "uid", "gid", "exp");

        return job.waitForCompletion(true) ? 0 : 1;
```
