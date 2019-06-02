---
title: '[编程题]07_Subdomain_Visit_Count'
category: 编程题
tag: 编程题
date: 2018-03-20 00:07:00
---

# Problems

`count-paired domain` ： 带有 `访问次数` 的域名 => ["900 email.google.com" ] （次数与域名之间用 `空格` 隔开），当我们访问域名时 ， 像  `email.google.com` ，实际上会访问二级域名 `google.com` 以及顶级域名 `com` ,而且都是 900 次，现在有一个数组，包含多个 `count-paired domain`, 比如：
```
["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
```

实际各域名访问情况：以 `com` 访问次数举例  `com = 900+50+1`，得出新数列

```
["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
```


设计一个算法，输入为 `count-paired domain` 的数组，输出完整的访问情况的 `count-paired domain` 的 `List`

# Example

**Input:** 

```
["9001 discuss.leetcode.com"]
````
**Output:** 
```
["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]
```



# Coding

思路: 
1. 单个 `count-paired domain` 用空格切割
2. 域名、访问次数用 Map 保存
3. 将三级域名遍历切割，从顶级域名开始，拼接成新的域名


```
    /**
     * @param cpdomains 输入 count-paired 域名
     * @return 次数统计的集合
     */
    public static List<String> subdomainVisits(String[] cpdomains) {

        Map<String, Integer> map = new HashMap<>();

        int count; //用于记录访问次数


        for (String cpdomain : cpdomains) {
            String[] line = cpdomain.split(" ");

            count = Integer.parseInt(line[0]);

            String  [] domains =  line[1].split("\\."); //将原始域名按 。 切割
            String tmp ="";
            for (int i = domains.length -1; i>-1 ; i--) {   //由短到长，从顶级域名开始，拼接域名， z ,  y.z  , x.y.z
                tmp = domains[i] + (tmp.equals("") ? tmp:"."+tmp);
                map.put(tmp, map.containsKey(tmp)?map.get(tmp)+count:count);
            }
        }
        List<String> ls = new ArrayList<>();
        for (Map.Entry<String, Integer> se : map.entrySet()) {
            ls.add(se.getValue()+" "+se.getKey());
        }

        return ls;
    }
```
