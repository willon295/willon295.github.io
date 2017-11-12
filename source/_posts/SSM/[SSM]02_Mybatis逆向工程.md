# Mybatis逆向工程

逆向工程就是通过数据库生成相应的 POJO 类， 对应的 DAO 接口，Mapper映射文件

## 引入jar包

```
        <dependency>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-core</artifactId>
            <version>1.3.5</version>
        </dependency>
```
## 编写 mbg.xml文件

特别注意把 `mbg.xml` 文件放在 `项目根路径`，注意 `斜线` 和 `反斜线` ，Linux是用斜线，windows反斜线
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>

    <context id="DB2Tables" targetRuntime="MyBatis3">
		<!--不要注释-->
        <commentGenerator>
            <property name="suppressAllComments" value="true" />
        </commentGenerator>
        <!--数据库连接信息-->
        <jdbcConnection
                driverClass="com.mysql.jdbc.Driver"
                connectionURL="jdbc:mysql://localhost/test?useSSL=false"
                userId="root"
                password="root">
        </jdbcConnection>

        <javaTypeResolver>
            <property name="forceBigDecimals" value="false"/>
        </javaTypeResolver>

        <!--bean-->
        <javaModelGenerator
                targetPackage="cn.willon.entity"
                targetProject="./src/main/java">
            <property name="enableSubPackages" value="true"/>
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>

        <!--sql映射文件生成-->
        <sqlMapGenerator
                targetPackage="mapper"
                targetProject="./src/main/resources">
            <property name="enableSubPackages" value="true"/>
        </sqlMapGenerator>


        <!--指定dao接口生成的位置，mapper接口-->
        <javaClientGenerator
                type="XMLMAPPER"
                targetPackage="cn.willon.dao"
                targetProject="./src/main/java">
            <property name="enableSubPackages" value="true"/>
        </javaClientGenerator>


        <!--指定 table 和 类名-->
        <table tableName="user" domainObjectName="User"/>


    </context>
</generatorConfiguration>

```

## run

写个测试类，直接run
```

public class MBGtest {
    public static void main(String[] args) throws Exception {
        List<String>warnings = new ArrayList<String>();
        boolean overwrite =true;
        File configFile = new File("mbg.xml");
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = cp.parseConfiguration(configFile);
        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config,
                callback,warnings);
        myBatisGenerator.generate(null);
    }
}

```
