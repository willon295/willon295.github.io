---
title: '[Design_Pattern]07_Filter过滤器模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:07:00
---

# 概念_使用场景

概念： 属于 `结构模式` ，对目标对象进行一系列的`条件筛选/过滤`，得到 `想要的结果`
适用场景： 跟筛选有关，弹幕内容敏感字过滤等等


# 举个实例

1. 高考出成绩了
2. 筛选出所有女生信息
3. 筛选出所有男生信息
4. 筛选出总分大于580的同学信息
5. 筛选出总分大于580的女同学信息


## 代码

![](/images/dp07_filter_00.png)

1. 学生类
```
public class Student {
    private String name;
    private int score;
    private String gender;

    public Student(String name, String gender, int score) {
        this.name = name;
        this.score = score;
        this.gender = gender;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Student() {
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", score=" + score +
                ", gender='" + gender + '\'' +
                '}';
    }
}

```
2. 过滤器
- 接口标准
```
public interface Filter {
     List<Student> doFilter(List<Student> students);
}
```
- male过滤器
```
/**
 * 男生信息过滤器
 */
public class MaleFilter implements Filter {


    @Override
    public List<Student> doFilter(List<Student> students) {

        ArrayList<Student> males = new ArrayList<>();

        for (Student student : students) {
            if (Objects.equals("male", student.getGender())) {
                males.add(student);
            }
        }
        return males;
    }
}

```
- female过滤器
```
public class FemaleFilter implements Filter {
    @Override
    public List<Student> doFilter(List<Student> students) {

        ArrayList<Student> females = new ArrayList<>();

        for (Student student : students) {
            if (Objects.equals("female", student.getGender())) {
                females.add(student);
            }
        }
        return females;

    }
}
```
- 高分过滤器
```
public class HighScoreFilter implements Filter {
    @Override
    public List<Student> doFilter(List<Student> students) {

        ArrayList<Student> highs = new ArrayList<>();

        for (Student student : students) {

            if (student.getScore() >= 580) {
                highs.add(student);
            }
        }
        return highs;
    }
}

```
- 联合条件过滤器
```

/**
 * 联合过滤器
 */
public class AndFilter implements Filter {

    //持有两个过滤器
    private Filter filter;
    private Filter filter2;

    public AndFilter(Filter filter, Filter filter2) {
        this.filter = filter;
        this.filter2 = filter2;
    }

    @Override
    public List<Student> doFilter(List<Student> students) {

        //联合过滤
        List<Student> students1 = filter.doFilter(students);
        return filter2.doFilter(students1);
    }
}

```
- 测试类
```

public class TestFilter {
    public static void main(String[] args) {

        ArrayList<Student> students = new ArrayList<>();

        for (int i = 530; i < 600 ; i++) {
            students.add(new Student("stu_"+i,i%2==0?"male":"female",i));
        }


        MaleFilter maleFilter = new MaleFilter();
        FemaleFilter femaleFilter = new FemaleFilter();
        HighScoreFilter highScoreFilter = new HighScoreFilter();

        List<Student> males = maleFilter.doFilter(students);
        System.out.println(males);

        List<Student> females = femaleFilter.doFilter(students);
        System.out.println(females);

        List<Student> highs = highScoreFilter.doFilter(students);

        System.out.println(highs);


        AndFilter andFilter = new AndFilter(femaleFilter, highScoreFilter);
        List<Student> and = andFilter.doFilter(students);
        System.out.println(and);

    }
}



```