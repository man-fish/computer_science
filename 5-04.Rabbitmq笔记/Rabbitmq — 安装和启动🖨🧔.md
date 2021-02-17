# RabbitMQ 安装和启动💾

## window🌆

#### 下载地址：

Erlang：http://www.erlang.org/download.html
RabbitMQ ：http://www.rabbitmq.com/download.html

#### 安装RabbitMQ：

RabbitMQ Service默认是自动勾选中的，这里我们取消勾选。如选中启动RabbitMQ服务时会报如下图错误：

![这里写图片描述](F:\我的笔记\52.Rabbitmq笔记\assets\20170308143551445.png)

安装完成后，Erlang和RabbitMQ环境变量是没有配置的，需要自己手动去配置，如下图：

![image-20191217211053883](F:\我的笔记\52.Rabbitmq笔记\assets\image-20191217211053883.png)

变量名分别为：ERLANG_HOME 、RABBITMQ_SERVER；同时把变量为配置在path环境变量中即可。

![img](F:\我的笔记\52.Rabbitmq笔记\assets\20190328184150328.png)



## 启动⌛

#### 启动RabbitMQ Server：

1、以应用方式启动

- 后台启动：rabbitmq-server -detached 
- 直接启动：Rabbitmq-server，如果你关闭窗口或者需要在改窗口使用其他命令时应用就会停止
- 关闭：rabbitmqctl stop

2、以服务方式启动（安装完之后在任务管理器中服务一栏能看到RabbtiMq）

- rabbitmq-service install 安装服务

- rabbitmq-service start 开始服务

- Rabbitmq-service stop  停止服务

- Rabbitmq-service enable 使服务有效

- Rabbitmq-service disable 使服务无效

- rabbitmq-service help 帮助

- 当rabbitmq-service install之后默认服务是enable的，如果这时设置服务为disable的话，rabbitmq-service start就会报错。

- 当rabbitmq-service start正常启动服务之后，使用disable是没有效果的

- 关闭:rabbitmqctl stop



#### 可视化界面启动：

![image-20191217211643435](F:\我的笔记\52.Rabbitmq笔记\assets\image-20191217211643435.png)

## 插件管理📫

#### 查看所有插件：

`rabbitmq-plugins list`

```cmd
C:\>rabbitmq-plugins list
Listing plugins with pattern ".*" ...
 Configured: E = explicitly enabled; e = implicitly enabled
 | Status: * = running on rabbit@DESKTOP-GHUNFQ0
 |/
[  ] rabbitmq_amqp1_0                  3.8.1
[  ] rabbitmq_auth_backend_cache       3.8.1
[  ] rabbitmq_auth_backend_http        3.8.1
[  ] rabbitmq_auth_backend_ldap        3.8.1
[  ] rabbitmq_auth_backend_oauth2      3.8.1
[  ] rabbitmq_auth_mechanism_ssl       3.8.1
[  ] rabbitmq_consistent_hash_exchange 3.8.1
[  ] rabbitmq_event_exchange           3.8.1
[  ] rabbitmq_federation               3.8.1
[  ] rabbitmq_federation_management    3.8.1
[  ] rabbitmq_jms_topic_exchange       3.8.1
[E*] rabbitmq_management               3.8.1
[e*] rabbitmq_management_agent         3.8.1
[  ] rabbitmq_mqtt                     3.8.1
[  ] rabbitmq_peer_discovery_aws       3.8.1
[  ] rabbitmq_peer_discovery_common    3.8.1
[  ] rabbitmq_peer_discovery_consul    3.8.1
[  ] rabbitmq_peer_discovery_etcd      3.8.1
[  ] rabbitmq_peer_discovery_k8s       3.8.1
[  ] rabbitmq_prometheus               3.8.1
[  ] rabbitmq_random_exchange          3.8.1
[  ] rabbitmq_recent_history_exchange  3.8.1
[  ] rabbitmq_sharding                 3.8.1
[  ] rabbitmq_shovel                   3.8.1
[  ] rabbitmq_shovel_management        3.8.1
[  ] rabbitmq_stomp                    3.8.1
[  ] rabbitmq_top                      3.8.1
[  ] rabbitmq_tracing                  3.8.1
[  ] rabbitmq_trust_store              3.8.1
[e*] rabbitmq_web_dispatch             3.8.1
[  ] rabbitmq_web_mqtt                 3.8.1
[  ] rabbitmq_web_mqtt_examples        3.8.1
[  ] rabbitmq_web_stomp                3.8.1
[  ] rabbitmq_web_stomp_examples       3.8.1
```

#### 启动/禁用插件：

`rabbitmq-plugins enable plugin_name`

##### 开启可视化插件支持：

输入命令`rabbitmq-plugins enable rabbitmq_management`，这样就可以添加可视化插件了，这样就添加了rabbitmq界面，只要启动rabbitmq，然后在浏览器输入 http://127.0.0.1:15672/ 就可以访问了。

![img](F:\我的笔记\52.Rabbitmq笔记\assets\2018071215161432.png)

##### 开启日志的支持：

```cmd
C:\>rabbitmq-plugins enable rabbitmq_tracing
Enabling plugins on node rabbit@DESKTOP-GHUNFQ0:
rabbitmq_tracing
The following plugins have been configured:
  rabbitmq_management
  rabbitmq_management_agent
  rabbitmq_tracing
  rabbitmq_web_dispatch
Applying plugin configuration to rabbit@DESKTOP-GHUNFQ0...
The following plugins have been enabled:
  rabbitmq_tracing

started 1 plugins.
```

