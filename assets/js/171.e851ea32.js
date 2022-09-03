(window.webpackJsonp=window.webpackJsonp||[]).push([[171],{540:function(i,v,e){"use strict";e.r(v);var t=e(13),_=Object(t.a)({},(function(){var i=this,v=i.$createElement,e=i._self._c||v;return e("ContentSlotsDistributor",{attrs:{"slot-key":i.$parent.slotKey}},[e("p",[i._v("Git常用操作命令：")]),i._v(" "),e("h3",{attrs:{id:"一、远程仓库相关命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一、远程仓库相关命令"}},[i._v("#")]),i._v(" 一、远程仓库相关命令")]),i._v(" "),e("ul",[e("li",[e("p",[i._v("检出仓库：$ git clone git://github.com/jquery/jquery.git")])]),i._v(" "),e("li",[e("p",[i._v("查看远程仓库：$ git remote -v")])]),i._v(" "),e("li",[e("p",[i._v("添加远程仓库：$ git remote add [name] [url]")])]),i._v(" "),e("li",[e("p",[i._v("删除远程仓库：$ git remote rm [name]")])]),i._v(" "),e("li",[e("p",[i._v("修改远程仓库：$ git remote set-url --push [name] [newUrl]")])]),i._v(" "),e("li",[e("p",[i._v("拉取远程仓库：$ git pull [remoteName] [localBranchName]")])]),i._v(" "),e("li",[e("p",[i._v("推送远程仓库：$ git push [remoteName] [localBranchName]")])])]),i._v(" "),e("blockquote",[e("p",[i._v("如果想把本地的某个分支test提交到远程仓库，\n并作为远程仓库的master分支，或者作为另外一个名叫test的分支，如下：")])]),i._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[i._v("$git push origin test:master         \n#提交本地test分支作为远程的master分支\n\n$git push origin test:test              \n#提交本地test分支作为远程的test分支\n")])])]),e("BR",[e("h3",{attrs:{id:"二、分支-branch-操作相关命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二、分支-branch-操作相关命令"}},[i._v("#")]),i._v(" 二、分支(branch)操作相关命令")]),i._v(" "),e("ul",[e("li",[e("p",[i._v("查看本地分支：$ git branch")])]),i._v(" "),e("li",[e("p",[i._v("查看远程分支：$ git branch -r")])]),i._v(" "),e("li",[e("p",[i._v("创建本地分支：$ git branch [name]")])]),i._v(" "),e("li",[e("p",[i._v("切换分支：$ git checkout [name]")])]),i._v(" "),e("li",[e("p",[i._v("创建新分支并立即切换到新分支：$ git checkout -b [name]")])]),i._v(" "),e("li",[e("p",[i._v("删除分支：$ git branch -d [name]")])]),i._v(" "),e("li",[e("p",[i._v("合并分支：$ git merge [name]")])]),i._v(" "),e("li",[e("p",[i._v("本地分支push到远程：$ git push origin [name]")])]),i._v(" "),e("li",[e("p",[i._v("删除远程分支：$ git push origin :heads/[name] 或 $ gitpush origin :[name]")])])]),i._v(" "),e("blockquote",[e("p",[i._v("*创建空的分支：(执行命令之前记得先提交你当前分支的修改，否则会被强制删干净没得后悔)")])]),i._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[i._v("$git symbolic-ref HEAD refs/heads/[name]\n$rm .git/index\n$git clean -fdx\n")])])]),e("h3",{attrs:{id:"git常用指令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git常用指令"}},[i._v("#")]),i._v(" git常用指令")]),i._v(" "),e("ul",[e("li",[e("code",[i._v("git init")]),i._v(" #初始化本地git仓库（创建新仓库）")]),i._v(" "),e("li",[e("code",[i._v('git config --global user.name "xxx"')]),i._v(" #配置用户名")]),i._v(" "),e("li",[e("code",[i._v('git config --global user.email "xxx@xxx.com"')]),i._v(" #配置邮件")]),i._v(" "),e("li",[e("code",[i._v("git config --global color.ui true")]),i._v(" #git status等命令自动着色")]),i._v(" "),e("li",[e("code",[i._v("git config --global color.status auto")])]),i._v(" "),e("li",[e("code",[i._v("git config --global color.diff auto")])]),i._v(" "),e("li",[e("code",[i._v("git config --global color.branch auto")])]),i._v(" "),e("li",[e("code",[i._v("git config --global color.interactive auto")])]),i._v(" "),e("li",[e("code",[i._v("git clone git+ssh://git@192.168.53.168/VT.*git")]),i._v("  #clone远程仓库")]),i._v(" "),e("li",[e("code",[i._v("git status")]),i._v(" #查看当前版本状态（是否修改）")]),i._v(" "),e("li",[e("code",[i._v("git add xyz")]),i._v(" #添加xyz文件至index")]),i._v(" "),e("li",[e("code",[i._v("git add .")]),i._v("#增加当前子目录下所有更改过的文件至index")]),i._v(" "),e("li",[e("code",[i._v("git commit -m 'xxx'")]),i._v(" #提交")]),i._v(" "),e("li",[e("code",[i._v("git commit --amend -m 'xxx'")]),i._v("#合并上一次提交（用于反复修改）")]),i._v(" "),e("li",[e("code",[i._v("git commit -am 'xxx'")]),i._v("#将add和commit合为一步")]),i._v(" "),e("li",[e("code",[i._v("git rm xxx")]),i._v("#删除index中的文件")]),i._v(" "),e("li",[e("code",[i._v("git rm -r *")]),i._v("#递归删除")]),i._v(" "),e("li",[e("code",[i._v("git log")]),i._v("#显示提交日志")]),i._v(" "),e("li",[e("code",[i._v("git log -1")]),i._v("#显示1行日志 -n为n行")]),i._v(" "),e("li",[e("code",[i._v("git log -5")])]),i._v(" "),e("li",[e("code",[i._v("git log --stat")]),i._v(" #显示提交日志及相关变动文件")]),i._v(" "),e("li",[e("code",[i._v("git log -p -2")]),i._v("#显示最近两次日志")]),i._v(" "),e("li",[e("code",[i._v("git show dfb02e6e4f2f7b573337763e5c0013802e392818")]),i._v("#显示某个提交的详细内容")]),i._v(" "),e("li",[e("code",[i._v("git show dfb02")]),i._v(" #可只用commitid的前几位")]),i._v(" "),e("li",[e("code",[i._v("git show HEAD")]),i._v(" #显示HEAD提交日志")]),i._v(" "),e("li",[e("code",[i._v("git show HEAD^")]),i._v("#显示HEAD的父（上一个版本）的提交日志 ^^为上两个版本 ^5为上5个版本")]),i._v(" "),e("li",[e("code",[i._v("git tag #显示已存在的tag")])]),i._v(" "),e("li",[e("code",[i._v("git tag -a v2.0 -m 'xxx'")]),i._v("#增加v2.0的tag")]),i._v(" "),e("li",[e("code",[i._v("git show v2.0")]),i._v("#显示v2.0的日志及详细内容")]),i._v(" "),e("li",[e("code",[i._v("git log v2.0")]),i._v("#显示v2.0的日志")]),i._v(" "),e("li",[e("code",[i._v("git diff")]),i._v(" #显示所有未添加至index的变更")]),i._v(" "),e("li",[e("code",[i._v("git diff --cached")]),i._v(" #显示所有已添加index但还未commit的变更")]),i._v(" "),e("li",[e("code",[i._v("git diff HEAD^")]),i._v("#比较与上一个版本的差异")]),i._v(" "),e("li",[e("code",[i._v("git diff origin/master..master")]),i._v(" #比较远程分支master上有本地分支master上没有的")]),i._v(" "),e("li",[e("code",[i._v("git diff origin/master..master --stat")]),i._v("#只显示差异的文件，不显示具体内容")]),i._v(" "),e("li",[e("code",[i._v("git remote add origin git+ssh://git@192.168.53.168/VT.git")]),i._v("#增加远程定义（用于push/pull/fetch）")]),i._v(" "),e("li",[e("code",[i._v("git branch")]),i._v("#显示本地分支")]),i._v(" "),e("li",[e("code",[i._v("git branch --contains 50089")]),i._v(" #显示包含提交50089的分支")]),i._v(" "),e("li",[e("code",[i._v("git branch -a")]),i._v(" #显示所有分支")]),i._v(" "),e("li",[e("code",[i._v("git branch -r")]),i._v(" #显示所有原创分支")]),i._v(" "),e("li",[e("code",[i._v("git branch --merged")]),i._v(" #显示所有已合并到当前分支的分支")]),i._v(" "),e("li",[e("code",[i._v("git branch --no-merged")]),i._v(" #显示所有未合并到当前分支的分支")]),i._v(" "),e("li",[e("code",[i._v("git branch -m master master_copy")]),i._v("#本地分支改名")]),i._v(" "),e("li",[e("code",[i._v("git checkout -b master_copy")]),i._v(" #从当前分支创建新分支master_copy并检出")]),i._v(" "),e("li",[e("code",[i._v("git checkout -b master master_copy")]),i._v(" #上面的完整版")]),i._v(" "),e("li",[e("code",[i._v("git checkout features/performance")]),i._v(" #检出已存在的features/performance分支")]),i._v(" "),e("li",[e("code",[i._v("git checkout --track hotfixes/BJVEP933")]),i._v(" #检出远程分支hotfixes/BJVEP933并创建本地跟踪分支")]),i._v(" "),e("li",[e("code",[i._v("git checkout v2.0")]),i._v(" # 检出版本v2.0")]),i._v(" "),e("li",[e("code",[i._v("git checkout -b devel origin/develop")]),i._v(" #从远程分支develop创建新本地分支devel并检出")]),i._v(" "),e("li",[e("code",[i._v("git checkout -- README")]),i._v("#检出head版本的README文件（可用于修改错误回退）")]),i._v(" "),e("li",[e("code",[i._v("git merge origin/master")]),i._v("#合并远程master分支至当前分支")]),i._v(" "),e("li",[e("code",[i._v("git cherry-pick ff44785404a8e")]),i._v(" #合并提交ff44785404a8e的修改")]),i._v(" "),e("li",[e("code",[i._v("git push origin master")]),i._v("#将当前分支push到远程master分支")]),i._v(" "),e("li",[e("code",[i._v("git push origin :hotfixes/BJVEP933")]),i._v(" # 删除远程仓库的hotfixes/BJVEP933分支")]),i._v(" "),e("li",[e("code",[i._v("git push --tags")]),i._v("#把所有tag推送到远程仓库")]),i._v(" "),e("li",[e("code",[i._v("git fetch")]),i._v("#获取所有远程分支（不更新本地分支，另需merge）")]),i._v(" "),e("li",[e("code",[i._v("git fetch --prune")]),i._v("#获取所有原创分支并清除服务器上已删掉的分支")]),i._v(" "),e("li",[e("code",[i._v("git pull origin master")]),i._v("#获取远程分支master并merge到当前分支")]),i._v(" "),e("li",[e("code",[i._v("git mv README README2")]),i._v(" #重命名文件README为README2")]),i._v(" "),e("li",[e("code",[i._v("git reset --hard HEAD")]),i._v("#将当前版本重置为HEAD（通常用于merge失败回退）")]),i._v(" "),e("li",[e("code",[i._v("git rebase")])]),i._v(" "),e("li",[e("code",[i._v("git branch -d hotfixes/BJVEP933")]),i._v("#删除分支hotfixes/BJVEP933（本分支修改已合并到其他分支）")]),i._v(" "),e("li",[e("code",[i._v("git branch -D hotfixes/BJVEP933")]),i._v("#强制删除分支hotfixes/BJVEP933")]),i._v(" "),e("li",[e("code",[i._v("git ls-files")]),i._v(" #列出git index包含的文件")]),i._v(" "),e("li",[e("code",[i._v("git show-branch")]),i._v("#图示当前分支历史")]),i._v(" "),e("li",[e("code",[i._v("git show-branch --all")]),i._v(" #图示所有分支历史")]),i._v(" "),e("li",[e("code",[i._v("git whatchanged")]),i._v("#显示提交历史对应的文件修改")]),i._v(" "),e("li",[e("code",[i._v("git ls-tree HEAD")]),i._v("#内部命令：显示某个git对象")]),i._v(" "),e("li",[e("code",[i._v("git rev-parse v2.0")]),i._v("#内部命令：显示某个ref对于的SHA1 HASH")]),i._v(" "),e("li",[e("code",[i._v("git reflog")]),i._v("#显示所有提交，包括孤立节点")]),i._v(" "),e("li",[e("code",[i._v("git show HEAD@{5}")])]),i._v(" "),e("li",[e("code",[i._v("git show master@{yesterday}")]),i._v("#显示master分支昨天的状态")]),i._v(" "),e("li",[e("code",[i._v("git log --pretty=format:'%h %s' --graph")]),i._v(" #图示提交日志")]),i._v(" "),e("li",[e("code",[i._v("git show HEAD~3")])]),i._v(" "),e("li",[e("code",[i._v("git show -s --pretty=raw 2be7fcb476")])]),i._v(" "),e("li",[e("code",[i._v("git stash")]),i._v("#暂存当前修改，将所有至为HEAD状态")]),i._v(" "),e("li",[e("code",[i._v("git stash list")]),i._v(" #查看所有暂存")]),i._v(" "),e("li",[e("code",[i._v("git stash show -p stash@{0}")]),i._v(" #参考第一次暂存")]),i._v(" "),e("li",[e("code",[i._v("git stash apply stash@{0}")]),i._v("#应用第一次暂存")]),i._v(" "),e("li",[e("code",[i._v('git grep "delete from"')]),i._v(" #文件中搜索文本“delete from”")])])])],1)}),[],!1,null,null,null);v.default=_.exports}}]);