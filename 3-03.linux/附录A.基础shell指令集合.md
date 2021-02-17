## 基础命令命令*11

一个指令可以包含多个选项,操作对象也可以是多个。

**格式：**
$$
命令（commad） + 选项（option）+参数 （params）
$$

### ls  (list)

|      |                                  |                                                              |
| :--- | :------------------------------- | :----------------------------------------------------------- |
| 选项 | 长选项                           | 描述                                                         |
| -a   | --all                            | 列出所有文件，甚至包括文件名以圆点开头的默认会被隐藏的隐藏文件。 |
| -d   | --directory                      | 通常，如果指定了目录名，ls 命令会列出这个目录中的内容，而不是目录本身。 把这个选项与 -l 选项结合使用，可以看到所指定目录的详细信息，而不是目录中的内容。 |
| -F   | --classify                       | 这个选项会在每个所列出的名字后面加上一个指示符。例如，如果名字是 目录名，则会加上一个'/'字符。 |
| -h   | --human-readable                 | 当以长格式列出时，以人们可读的格式，而不是以字节数来显示文件的大小。 |
| -l   | 以长格式显示结果。               |                                                              |
| -r   | --reverse                        | 以相反的顺序来显示结果。通常，ls 命令的输出结果按照字母升序排列。 |
| -S   | 命令输出结果按照文件大小来排序。 |                                                              |
| -t   | 按照修改时间来排序。             |                                                              |

- 用法：#ls -alh
- 含义：列出当前工作目录下的所有文件/文件夹的名称

```bash
➜ ls
Applications        Library             Postman             default.etcd        fonts
```

- 用法：#ls 路径
- 含义：列出指定路径下的所有文件/文件夹的名称

```bash
➜ ls /usr
X11        X11R6      bin        lib        libexec    local
```

- 用法：#ls 选项 路径
- 含义：在列出指定路径下的文件/文件夹的名称，并以指定的格式进行显示。
  - 选项解释：
    	-l：表示list，表示以详细列表的形式进行展示
      	-a：表示显示所有的文件/文件夹（包含了隐藏文件/文件夹）

```bash
➜ ls -al
total 4264
drwxr-xr-x+ 62 inno  staff     1984  2 16 19:12 .
drwxr-xr-x   5 root  admin      160 12  5 16:21 ..
-r--------   1 inno  staff        9  1 21 21:11 .CFUserTextEncoding
-rw-r--r--@  1 inno  staff    18436  2 16 18:18 .DS_Store
```

- 用法4：#ls -lh 路径
- 含义：列出指定路径下的所有文件/文件夹的名称，以列表的形式并且在显示文档大小的时候以可读性较高的形式显示

```bash
➜ ls -lh
total 3896
drwx------@  3 inno  staff    96B  1 26 17:37 Applications
drwx------@  4 inno  staff   128B  2  7 13:08 Desktop
drwx------@ 66 inno  staff   2.1K  1 22 22:14 Library
```

> **drwxr-xr-x**
>
> d：文件类型，rwx：所有者权限，r-x：同组权限，r-x：访客权限。
>
> - 第一列字符表示文档的类型，其中“-”表示改行对应的文档类型为文件，“d”表示文档类型为文件夹，“l”表示软连接。
>
> - 在Linux中隐藏文档一般都是以“.”开头。

### file

在 Linux 系统中，并不要求文件名来反映文件的内容，我们通过file 命令来确定文件的类型。

```bash
[me@linuxbox ~]$ file picture.jpg
picture.jpg: JPEG image data, JFIF standard 1.01
```

### pwd  (print working directory)

- 打印当前工作目录

```bash
➜ pwd
/Users/inno
```

### cd（change directory)

作用：用于切换当前的工作目录的
语法：#cd 路径

- cd ~ 切换到用户目录
- cd .. 切换到上级目录
- cd - 切换到上一个访问的目录
- cd / 切换到跟目录

```bash
~
➜ cd /usr

/usr 
➜
```

### mkdir  (make directory)

- 语法1：#mkdir 路径 【路径，可以是文件夹名称也可以是包含名称的一个完整路径】

```
~
➜ mkdir test
```

- 语法2：#mkdir -p 路径

- 含义：递归创建，当一次性创建多层不存在的目录的时候，添加-p参数，否则会报错

```bash
~/test
➜ mkdir -p test1/test2

~/test
➜ ll
total 0
drwxr-xr-x  3 inno  staff    96B  2 16 19:30 test1
```

- 语法3：#mkdir 路径1 路径2 路径3 ….  【表示一次性创建多个目录】

```bash
~/test
➜ mkdir test4 test5

~/test
➜ ll
drwxr-xr-x  2 inno  staff    64B  2 16 19:31 test4
drwxr-xr-x  2 inno  staff    64B  2 16 19:31 test5
```

### touch   

- 作用：创建文件
- 语法：#touch 文件路径	【路径可以是直接的文件名也可以是路径】

```go
~/test
➜ touch /Users/inno/test/test.txt

~/test
➜ ll
total 0
-rw-r--r--  1 inno  staff     0B  2 16 19:32 test.txt
```

### cp  (copy)

这里列举了 cp 命令一些有用的选项（短选项和等效的长选项）：

|               选项 | 意义                                                         |
| -----------------: | :----------------------------------------------------------- |
|      -a, --archive | 复制文件和目录，以及它们的属性，包括所有权和权限。 通常，复本具有用户所操作文件的默认属性。 |
| -i,  --interactive | 在重写已存在文件之前，提示用户确认。如果这个选项不指定， cp 命令会默认重写文件。 |
|    -r, --recursive | 递归地复制目录及目录中的内容。当复制目录时， 需要这个选项（或者-a 选项）。 |
|       -u, --update | 当把文件从一个目录复制到另一个目录时，仅复制 目标目录中不存在的文件，或者是文件内容新于目标目录中已经存在的文件。 |
|      -v, --verbose | 显示翔实的命令操作信息                                       |

- 作用：复制文件/文件夹到指定的位置
- 语法：#cp  被复制的文档路径 文档被复制到的路径

```bash
~/test
➜ cp test.txt test1

~/test
➜ ll test1
-rw-r--r--  1 inno  staff     0B  2 16 19:36 test.txt
```

- 语法：使用cp命令来复制一个文件夹
- 注意：当使用cp命令进行文件夹复制操作的时候需要添加选项“-r”【-r表示递归复制】，否则目录将被忽略

```bash
~/test
➜ cp -r test1 test4

~/test
➜ ll test4
total 0
drwxr-xr-x  4 inno  staff   128B  2 16 19:40 test1
```

**注意**：Linux在复制过程中是可以重新对新位置的文件进行重命名的，但是如果不是必须的需要，则建议保持前后名称一致。

```basg
~/test
➜ cp test.txt test

~/test
➜ ll
total 0
-rw-r--r--  1 inno  staff     0B  2 16 19:35 test
-rw-r--r--  1 inno  staff     0B  2 16 19:32 test.txt
```

### mv  (move)

mv 与 cp 共享了很多一样的选项：

| 选项             | 意义                                                         |
| :--------------- | :----------------------------------------------------------- |
| -i --interactive | 在重写一个已经存在的文件之前，提示用户确认信息。 **如果不指定这个选项，mv 命令会默认重写文件内容。** |
| -u --update      | 当把文件从一个目录移动另一个目录时，只是移动不存在的文件， 或者文件内容新于目标目录相对应文件的内容。 |
| -v --verbose     | 当操作 mv 命令时，显示翔实的操作信息。                       |

- 作用：移动文档到新的位置
- 语法：#mv 需要移动的文档路径 需要保存的位置路径

```bash
~/test
➜ mv test test5

~/test
➜ ll test5
total 0
-rw-r--r--  1 inno  staff     0B  2 16 19:35 test
```

- 作用：使用mv来进行重命名文件。

```bash
~/test/test5
➜ mv test test111

~/test/test5
➜ ll
total 0
-rw-r--r--  1 inno  staff     0B  2 16 19:35 test111
```

- 作用：使用mv来重命名文件夹
- 注意：绝对路径、相对路径都可以

```bash
~/go/src
➜ mv $(pwd)/7days-golang $(pwd)/gee
```

### rm  (remove)

下表是一些普遍使用的 rm 选项：

| 选项              | 意义                                                         |
| :---------------- | :----------------------------------------------------------- |
| -r, --recursive   | 递归地删除文件，这意味着，如果要删除一个目录，而此目录 又包含子目录，那么子目录也会被删除。要删除一个目录，必须指定这个选项。 |
| -f, --force       | 忽视不存在的文件，不显示提示信息。这选项颠覆了“--interactive”选项。 |

- 作用：移除/删除文档

- 语法：#rm 选项 需要移除的文档路径
  - 选项：
    - -f：force，强制删除，不提示是否删除
    - -r：表示递归

```bash
~
➜ rm -rf test
```

- 好用的命令：其中\*称之为通配符，意思表示任意的字符，Linux*，则表示只要文件以Linux开头的所有匹配项

```bash
~
➜ rm -rf /* 
```

> **注意：**
>
> 小心 rm！类 Unix 的操作系统，比如说 Linux，没有复原命令。一旦你用 rm 删除了一些东西， 它就消失了。Linux 假定你很聪明，你知道你在做什么。尤其要小心通配符。
>
> 思考一下这个经典的例子。假如说，你只想删除一个目录中的 HTML 文件。输入：
>
> ```bash
> rm *.html
> ```
>
> 这是正确的，如果你不小心在 “*” 和 “.html” 之间多输入了一个空格，就像这样：
>
> ```bash
> rm * .html
> ```
>
> 这个 rm 命令会删除目录中的所有文件，还会抱怨没有文件叫做 “.html”。所以我们最好使用 ls 命令来测试通配符。这会让你看到要删除的文件列表。

### cat

- 作用：cat有直接打开一个文件的功能。
- 语法：#cat 文件的路径

```bash
~/.ssh
➜ cat id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQCyT2KCMa/01nDBEUOHan/nxGXFGlZ6FxckVN4lzC+DuHvifaTAfEH9r4dHO8Jwg690PMB1PGKV02Rt+xhDwIOhwrLD8TPAybWmJg4L/vkhNq/lWB10nrSZftsbOBGxpIQrPBOTIWrOzid8T8EXxFxvAE9WD/a0YoAuOFqsmNNBPw==
```

### \> && >> 

- 作用：输出重定向
- 说明；一般命令的输出都会显示在终端中，有些时候需要将一些命令的执行结果想要保存到文件中进行后续的分析/统计，则这时候需要使用到的输出重定向技术。 
  - \> ：覆盖输出，会覆盖掉原先的文件内容
  - \>>：追加输出，不会覆盖原始文件内容，会在原始内容末尾继续添加

- 语法：#正常执行的指令 > / >> 文件的路径
- 注意：文件可以不存在，不存在则新建

```bash
~
➜ ll > ls.txt
```

## 进阶指令*10

### df  (disk field)

- 作用：查看磁盘的空间
- 语法：#df -H		
- 参数：-H 表示以可读性较高的形式展示大小

```bash
➜ df -h
#物理分区																															挂载点
Filesystem      Size   Used  Avail Capacity iused      ifree %iused  Mounted on
/dev/disk1s1   466Gi   10Gi  413Gi     3%  484286 4881968594    0%   /
devfs          185Ki  185Ki    0Bi   100%     642          0  100%   /dev
/dev/disk1s2   466Gi   41Gi  413Gi     9%  729261 4881723619    0%   /System/Volumes/Data
/dev/disk1s5   466Gi  1.0Gi  413Gi     1%       1 4882452879    0%   /private/var/vm
map auto_home    0Bi    0Bi    0Bi   100%       0          0  100%   /System/Volumes/Data/home
```

### free

- 作用：查看内存使用情况
- 语法：#free -m  
- 参数： -m表示以mb为单位查看

```bash
[root@inno ~]# free -m
              total        used        free      shared  buff/cache   available
Mem:           1839          77         819           0         942        1568
Swap:             0           0           0
```

> Swap：用于临时内存，当系统真实内存不够用的时候可以临时使用磁盘空间来充当内存。

### head

- 作用：查看一个文件的前n行，如果不指定n，则默认显示前10行。
- 语法：#hea
- d -n 文件路径   【n表示数字】

```bash
➜ head -1 see
this is a file to head
```

### tail

- 作用1：查看一个文件的未n行，如果n不指定默认显示后10行

- 语法：#tail -n 文件的路径    n同样表示数字

```bash
➜ tail  see
this is a file to head
```

- 作用2：可以通过tail指令来查看一个文件的动态变化内容【变化的内容不能是用户手动增加的】
- 语法：#tail -f 文件路径
- 该命令一般用于查看系统的日志比较多。

```bash
/var/log 
➜ tail system.log
Feb 17 16:43:24 yujinyangdeMacBook-Pro xpcproxy[45291]: libcoreservices: _dirhelper_userdir: 557: bootstrap_look_up returned (ipc/send) invalid destination port
Feb 17 16:43:24 yujinyangdeMacBook-Pro xpcproxy[45292]: libcoreservices: _dirhelper_userdir: 557: bootstrap_look_up returned (ipc/send) invalid destination port
```

### less

less 命令是一个用来浏览文本文件的程序，很多软件的终端脚本的一些命令都用到了less阅读器，比如`git branch`。

```bash
[me@linuxbox ~]$ less /etc/passwd
```

一旦 less 程序运行起来，我们就能浏览文件内容了。如果文件内容多于一页，那么我们可以上下滚动文件。按下“q”键， 退出 less 程序，下表列出了 less 程序最常使用的键盘命令。

| 命令               | 行为                                                     |
| :----------------- | :------------------------------------------------------- |
| Page UP or b       | 向上翻滚一页                                             |
| Page Down or space | 向下翻滚一页                                             |
| UP Arrow           | 向上翻滚一行                                             |
| Down Arrow         | 向下翻滚一行                                             |
| G                  | 移动到最后一行                                           |
| 1G or g            | 移动到开头一行                                           |
| /charaters         | 向前查找指定的字符串                                     |
| n                  | 向前查找下一个出现的字符串，这个字符串是之前所指定查找的 |
| h                  | 显示帮助屏幕                                             |
| q                  | 退出 less 程序                                           |

- 作用：查看文件，以较少的内容进行输出，按下辅助功能键（数字+回车、空格键+上下方向键）查看更多
- 语法：#less 需要查看的文件路径

```bash
/var/log  took 6s
➜ less system.log
```

>  **less 就是 more（禅语：色即是空）**
>
> less 程序是早期 Unix 程序 more 的改进版。“less” 这个名字，对习语 “less is more” 开了个玩笑， 这个习语是现代主义建筑师和设计者的座右铭。

### wc

- 作用：统计文件内容信息（包含行数、单词数、字节数）

- 语法：#wc -lwc 需要统计的文件路径
  - -l：表示lines，行数
  - -w：表示words，单词数   依照空格来判断单词数量
  - -c：表示bytes，字节数

```bash
➜ wc system.log
    4610   69677  836779 system.log
```

### date

- 作用：表示操作时间日期（读取、设置）
- 语法1：#date			输出的形式：2018年 3月 24日 星期六 15:54:28

```bash
/var/log 
➜ date
2020年 2月17日 星期一 17时08分31秒 CST
```

- 语法2：#date  +%F	（等价于`#date  "+%Y-%m-%d"` ）	输出形式：2018-03-24

```bash
/var/log 
➜ date +%F
2020-02-17
```

- 语法3：`#date  "+%F %T"` ， 引号表示让“年月日与时分秒”成为一个不可分割的整体
  - 等价操作#date  “+%Y-%m-%d %H:%M:%S”
  - 输出的形式：2018-03-24 16:01:00

```bash
/var/log 
➜ date "+%F %T"
2020-02-17 17:11:46
```

- 语法4：获取之前或者之后的某个时间（备份）
- #date  -d  “-1 day”  “+%Y-%m-%d %H:%M:%S”

 ```bash
/var/log 
➜ date -d "-1 day" "+%Y-%m-%d %H:%M:%S"
 ```

符号的可选值：+（之后） 或者 - （之前）

单位的可选值：day（天）、month（月份）、year（年）

>  %F：表示完整的年月日
>
> %T：表示完整的时分秒
>
> %Y：表示四位年份
>
> %m：表示两位月份（带前导0）
>
> %d：表示日期（带前导0）
>
> %H：表示小时（带前导0）
>
> %M：表示分钟（带前导0）
>
> %S：表示秒数（带前导0）

### cal

- 作用：用来操作日历的
- 语法1：#cal	  等价于 #cal  -1		直接输出当前月份的日历

```bash
/var/log 
➜ cal
      二月 2020
日 一 二 三 四 五 六
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
```

- 语法2：#cal  -3			表示输出上一个月+本月+下个月的日历

```bash
/var/log 
➜ cal -3
                            2020
         一月                    二月                    三月
日 一 二 三 四 五 六  日 一 二 三 四 五 六  日 一 二 三 四 五 六
          1  2  3  4                     1   1  2  3  4  5  6  7
 5  6  7  8  9 10 11   2  3  4  5  6  7  8   8  9 10 11 12 13 14
12 13 14 15 16 17 18   9 10 11 12 13 14 15  15 16 17 18 19 20 21
19 20 21 22 23 24 25  16 17 18 19 20 21 22  22 23 24 25 26 27 28
26 27 28 29 30 31     23 24 25 26 27 28 29  29 30 31
```

- 语法3：#cal  -y 年份  		表示输出某一个年份的日历

### clear/ctrl + L指令

- 作用：清除终端中已经存在的命令和结果（信息）。
- 语法：clear		或者快捷键：ctrl + L

>  需要注意的是，该命令并不是真的清除了之前的信息，而是把之前的信息的隐藏到了最上面，通过滚动条继续查看以前的信息。

### 管道  "|"

- 作用：管道一般可以用于“过滤”，“特殊”，“扩展处理”。

- 语法：管道不能单独使用，必须需要配合前面所讲的一些指令来一起使用，其作用主要是辅助作用。
  - 以管道作为分界线，前面的命令有个输出，后面需要先输入，然后再加工操作，最后再输出，通俗的讲就是管道前面的输出就是后面指令的输入；

- 用法1：#ls / | grep y
  - **grep指令：主要用于过滤**
  - **参数：-v  不包含**
  - **参数：-i 忽略大小写**

```bash
/var/log 
➜ ls -al |grep y
drwxr-xr-x   2 root             wheel                 64  2  6 05:50 com.apple.wifivelocity
-rw-r--r--   1 root             wheel              32645  2 17 09:52 daily.out
drwxr-xr-x   5 _displaypolicyd  _displaypolicyd      160  2  7 20:08 displaypolicy
```

- 用法：#cat 路径|less

```bash
/var/log 
➜ cat system.log |less
```

- 用法：#ls / | wc -l

```bash
➜ ls /|wc -l
      16
```

## 高级命令*18

### hostname

- 作用：操作服务器的主机名（读取、设置）
- 语法1：#hostname			含义：表示输出完整的主机名
- 语法2：#hostname  -f			含义：表示输出当前主机名中的FQDN（全限定域名）

```bash
➜ hostname -f
yujinyangdeMacBook-Pro.local
```

### id

- 作用：查看一个用户的一些基本信息（包含用户id，用户组id，附加组id…），该指令如果不指定用户则默认当前用户。
- 语法1：#id		默认显示当前执行该命令的用户的基本信息
- 语法2：#id  用户名		显示指定用户的基本信息

```bash
[root@inno ~]# id
uid=0(root) gid=0(root) 组=0(root)
```

验证上述信息是否正确？

- 验证用户信息：通过文件/etc/passwd
- 验证用户组信息：通过文件/etc/group

### whoami

- 作用：“我是谁？”显示当前登录的用户名，一般用于shell脚本，用于获取当前操作的用户名方便记录日志。
- 语法：#whoami

```bash
/ 
➜ whoami
inno

/
➜ su root
sh-3.2# whoami
root
```

### ps -ef

- 指令：ps	
- 作用：主要是查看服务器的进程信息
- 选项含义：
  - ​	-e：等价于“-A”，表示列出全部的进程
  - ​	-f：显示全部的列（显示全字段）

```bash
/etc
➜ ps -A |grep 9286
 9286 ??         1:14.96 /Applications/wpsoffice.app/Contents/MacOS/wpsoffice -psn_0_540804
10457 ttys001    0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn 9286

/etc 
➜ ps
  PID TTY           TIME CMD
 9378 ttys002    0:00.03 expect /Users/inno/.ssh/aliyun_login_aide
 9379 ttys003    0:00.03 ssh -p 22 root@47.98.38.67

/etc 
➜ ps -f
  UID   PID  PPID   C STIME   TTY           TIME CMD
  501  9378  9377   0  4:44下午 ttys002    0:00.03 expect /Users/inno/.ssh/aliyun_login_aide
  501  9379  9378   0  4:44下午 ttys003    0:00.03 ssh -p 22 root@47.98.38.67
```

**列的含义：**

- UID：该进程执行的用户id；

- PID：进程id；

- PPID：该进程的父级进程id，如果一个程序的父级进程找不到，该程序的进程称之为僵尸进程（parent process ID）；

- C：Cpu的占用率，其形式是百分数；

- STIME：进行的启动时间；

- TTY：终端设备，发起该进程的设备识别符号，如果显示“?”则表示该进程并不是由终端设备发起；

- TIME：进程的执行时间；

- CMD：该进程的名称或者对应的路径；

注意使用grep过滤时，会产生一个带搜索内容的进程，也会显示出来。

```bash
➜ ps -ef | grep "login -fp inno"
  501 10594   383   0  5:14下午 ttys000    0:00.04 /Applications/iTerm.app/Contents/MacOS/iTerm2 --server login -fp inno
    0 10595 10594   0  5:14下午 ttys000    0:00.02 login -fp inno
  501 11096 10596   0  5:23下午 ttys000    0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn login -fp inno
```

### kill（重点）

- 作用：表示杀死进程		（当遇到僵尸进程或者出于某些原因需要关闭进程的时候）
- 语法：#kill  进程PID		（语法需要配合ps一起使用）
- 案例：需要kill掉Apache的进程

```bash
~
➜ kill 376
```

- 作用：彻底杀死进程

- 参数：-9

```bash
~
➜ kill -9 123456
```

- 拓展：杀死指定用户所有进程

```
#kill -9 $(ps -ef | grep hnlinux) //方法一 过滤出hnlinux用户进程 
#kill -u hnlinux 	//方法二
```

- 与kill命令作用相似但是比kill更加好用的杀死进程的命令：killall
- 语法：#killall 进程名称

```bash
~
➜ killall qq
No matching processes belonging to you were found
```

### top（重点）

- 作用：查看服务器的进程占的资源（100%使用）
- 语法：
  - 进入命令：#top			（动态显示）
  - 退出命令：按下q键

> **表头含义：**
>
> PID：进程id；
>
> USER：该进程对应的用户；
>
> PR：优先级；
>
> VIRT：虚拟内存；
>
> RES：常驻内存；
>
> SHR：共享内存；
>
> ​	计算一个进程实际使用的内存 = 常驻内存（RES）- 共享内存（SHR）
>
> S：表示进程的状态status（sleeping，其中S表示睡眠，R表示运行）；
>
> %CPU：表示CPU的占用百分比；
>
> %MEM：表示内存的占用百分比；
>
> TIME+：执行的时间；
>
> COMMAND：进程的名称或者路径

**在运行top的时候，可以按下方便的快捷键：**

M：表示将结果按照内存（MEM）从高到低进行降序排列；

P：表示将结果按照CPU使用率从高到低进行降序排列；

1：当服务器拥有多个cpu的时候可以使用“1”快捷键来切换是否展示显示各个cpu的详细信息；

### du -sh

- 作用：查看目录的真实大小
- 语法：#du -sh 目录路径
- 选项含义：
  - -s：summaries，只显示汇总的大小
  - -h：表示以高可读性的形式进行显示

```bash
➜ du -sh blog
8.4M	blog

~
➜ du -h blog
4.0K	blog/archetypes
  0B	blog/resources/_gen/images
  0B	blog/resources/_gen/assets
  0B	blog/resources/_gen
  0B	blog/resources
156K	blog/content/post
```

### service（重点）

- 作用：用于控制一些软件的服务启动/停止/重启
- 语法：#service 服务名 start/stop/restart

- 例如：需要启动本机安装的Apache（网站服务器软件），其服务名httpd

### ifconfig（重点）

- 作用：用于操作网卡相关的指令。
- 简单语法：#ifconfig		（获取网卡信息）

```bash
[root@inno ~]# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.16.23.65  netmask 255.255.240.0  broadcast 172.16.31.255
        ether 00:16:3e:0a:9b:2f  txqueuelen 1000  (Ethernet)
        RX packets 2271268  bytes 350387402 (334.1 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1694416  bytes 432620771 (412.5 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1  (Local Loopback)
        RX packets 121  bytes 6838 (6.6 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 121  bytes 6838 (6.6 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

Eth0表示Linux中的一个网卡，eth0是其名称。Lo（loop，本地回还网卡，其ip地址一般都是127.0.0.1）也是一个网卡名称。

> 注意：inet addr就是网卡的ip地址。

### reboot

- 作用：重新启动计算机		
- 语法1：#reboot		重启
- 语法2：#reboot  -w   模拟重启，但是不重启（只写关机与开机的日志信息）

### shutdow（慎用）

- 语法1：#shutdown -h now	“关机提示”  或者  #shutdown  -h 15:25  “关机提示”
- 案例：设置Linux系统关机时间在12:00

- 如果想要取消关机计划的话，则可以按照以下方式去尝试：
  - 针对于centos7.x之前的版本：ctrl+c
  - 针对于centos7.x（包含）之后的版本：#shutdown  -c

> 除了shutdown关机以外，还有以下几个关机命令：
>
> \#init 0
>
> \#halt
>
> \#poweroff

### uptime

- 作用：输出计算机的持续在线时间（计算机从开机到现在运行的时间）
- 语法：#uptime

```bash
[root@inno ~]# uptime
 20:25:29 up 85 days,  4:56,  2 users,  load average: 0.00, 0.01, 0.05
```

### uname

- 作用：获取计算机操作系统相关信息
- 语法1：#uname			获取操作系统的类型
- 语法2：#uname  -a		all，表示获取全部的系统信息（类型、全部主机名、内核版本、发布时间、开源计划）

```bash
[root@inno ~]# uname
Linux
[root@inno ~]# uname -a
Linux inno 3.10.0-514.26.2.el7.x86_64 #1 SMP Tue Jul 4 15:04:05 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux
```

### man

- 作用：manual，手册（包含了Linux中全部命令手册，英文）
- 语法：#man 命令			（退出按下q键）
  - 案例：通过man命令查询cp指令的用法 #man cp

### netstat -tnlp

- 作用：查看网络连接状态
-  语法：#netstat -tnlp

```bash
[root@inno ~]# netstat -tnlp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      2044/sshd
```

> 选项说明：
>
> ​	-t：表示只列出tcp协议的连接；
>
> ​	-n：表示将地址从字母组合转化成ip地址，将协议转化成端口号来显示；
>
> ​	-l：表示过滤出“state（状态）”列中其值为LISTEN（监听）的连接；
>
> ​	-p：表示显示发起连接的进程pid和进程名称；

### lsof解除端口占用

- 语法：#lsof -i -P | grep -i "8080"

```bash
~ took 8s
➜  lsof -i -P | grep -i "8080"
QQ        12919 inno   15u  IPv4 0x51e0284ea89f8f6f      0t0  TCP 192.168.1.104:55114->109.244.170.159:8080 (ESTABLISHED)
QQ        12919 inno   16u  IPv4 0x51e0284ea89f8f6f      0t0  TCP 192.168.1.104:55114->109.244.170.159:8080 (ESTABLISHED)
```

- 语法：task/taskall

```bash
~ 
➜ killall QQ
# 或者
～
kill -2 12919
```

