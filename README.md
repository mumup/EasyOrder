# Tips:
刚入行写的代码, 太烂了, 有空重做一版才行 
# EasyOrder
> 项目初衷

公司提供午餐,每天的流程是行政发布菜单>>同事们在今目标上发送菜名>>人事一一记录。

公司差不多100号人,这样很很容易出错,修改起来也麻烦。然后碰巧最近折腾node.js,想着不如帮忙折腾个订单系统出来吧,然后就,你们懂的。

注:Node.js入门作,前方各种高能

### 导航

1. [系统要求](#A1)
2. [安装](#A2)
3. [计划](#A3)
4. [实例](#A4)



<a name="A1"></a>

## 系统要求

Git             > 任意版本

NodeJs      > 4.X

MongoDB >= 3.2.10



<a name="A2"></a>

## 安装

clone

```
$ git clone git@github.com:mumup/EasyOrder.git
```

npm install

国内环境,npm下载速度慢到令人发指,推荐使用淘宝的[cnpm](http://npm.taobao.org//)

```
$ cnpm install
```

装完之后到根目录下的config设置下参数然后就可以跑起来了

```
$ gulp dev
```

这样就以开发模式跑起来了,实际上线可以使用forever

```
$ npm install -g forever
$ forever start ./bin/www
```

端口问题可以用nginx转发,或者防火墙nat什么的,总之你开心就好.

<a name="A3"></a>

## 计划

目前已经完成基本的一个流程

员工：登录》点餐:修改订单

管理员：发布菜单》截止菜单》导出Excel

接下来会继续挖坑

1.接入企业QQ,一键登录(港真这个是必备的)

2.定时任务,定时截止订餐

3.首页可以帮别人订餐

4.首页随机订餐

<a name="A4"></a>

## 实例
[猛击这里](http://eo.pmumu.com/)账号admin密码admin
