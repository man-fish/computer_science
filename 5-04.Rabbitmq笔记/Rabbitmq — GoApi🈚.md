# 起步💽

## 连接🔌

### 创建连接🔭

要创建和`MQ`服务器的连接，首先要根据`amqp`的规定格式创建连接信息。
$$
"amqp://username:password@host:port/VisualHostName"
$$

```go
const MQURL = "amqp://inno:inno@127.0.0.1:5672/innoVH"
```

之后需要创建一个`RabbitMQ`服务器连接的结构体，并且声明实例化方法，结构体中规定了**队列**名称，**交换器**模式，还有**交换器的`Binding-Key`**，在实例化中我们直接和`MQ`服务器建立连接，并且获取信息交互的`channel（无论是生产还是消费）`。

```go
type RabbitMQ struct {
	conn 		*amqp.Connection
	channel		*amqp.Channel
	//队列名称
	QueueName 	string
	//交换器
	Exchange 	string
	//key，queue的binding key
	Key 		string
	//连接信息,就是我们上面定义的地址
	Mqurl 		string
}

func NewRabbitMQ(queueName string, exchange string, key string) *RabbitMQ {
	rabbitmq :=  &RabbitMQ{
		QueueName:queueName,
		Exchange:exchange,
		Key:key,
		Mqurl:MQURL,
	}
	var err error
	rabbitmq.conn, err = amqp.Dial(rabbitmq.Mqurl)
	rabbitmq.failOnError(err, "连接创建失败")
	rabbitmq.channel, err = rabbitmq.conn.Channel()
	rabbitmq.failOnError(err, "获取channel失败")
	return rabbitmq
}
```

### 断开连接📺

需要关闭通道和连接。

```go
func (r *RabbitMQ) Destory () {
	err := r.channel.Close()
	if err != nil {
		panic(err)
	}
	err = r.conn.Close()
	if err != nil {
		panic(err)
	}
}
```



# 模式🎲

## 简单模式 — Simple🐺

简单模式下生产者，消费者，消息队列都只有一个，程序自动帮你选择则交换器模式`direct`、交换器名称并且指定`key`和`queue的binding-key`，不会阻塞，消息队列有缓存，消息不会本地化，消息传递为点对点的的形式。

![img](F:\我的笔记\52.Rabbitmq笔记\assets\5015984-066ff248d5ff8eed.webp)

### 创建实例🎼

**简单模式**下创建实例，不需要指定**交换器的模式**和**Bind-Key**。

```go
func NewRabbitMQSimple(queueName string) *RabbitMQ {
    //创建简单模式下Rabbitmq的实例
	return NewRabbitMQ(queueName,"","")
}
```

### 生产🐲

**简单模式**下的生产代码分为两个步骤：

- 确认/创建队列`QueueDeclare`
- 消息发布到队列中`Publish`

```go
//简单模式下生产代码
func (r *RabbitMQ) PublishSimple(message string) {
	//1.申请队列如果队列不存在会自动创建，如果存在则跳过创建，保证队列存在消息能够成功的发送
	_, err := r.channel.QueueDeclare(
        Queue:     	r.QueueName,
		Passive:    false,		
		Durable:    false,		//消息是否持久化
		AutoDelete: false,		//客户端断开之后消息是否自动删除
		Exclusive:  false,		//是否具有排他性
		NoWait:     false,		//是否阻塞等待MQ服务器响应
		Arguments:  nil,		//额外属性		
		)			
	if err != nil {
		fmt.Println(err)
	}
	//2.消息发布到消息队列中。
	err = r.channel.Publish(
        exchange:r.Exchange,	//简单模式下程序自动帮你选择则交换器模式direct并且指定key和queue的binding-key
        Queue:r.QueueName,
        mandatory:false,
        //如果参数为true，会根据根据exchange类型和routkey规则，如果找不到符合条件的消息队列会将发送的信息返回给发送者。
        immediate:false,		
        //如果参数为true,消息发送到队列之后发现队列上没有消费者，会将详细返回给发送者。
        msg:amqp.Publishing{
			ContentType:"text/plain",
			Body:[]byte(message),
		})
	if err != nil {
		fmt.Println(err)
	}
}
```

**测试**

```go
package main

import "rabbitmq_learn/RabbitMQ"

func main() {
	rabbitmq := RabbitMQ.NewRabbitMQSimple("innoSimple")
	rabbitmq.PublishSimple("hello inno!")
}
```



### 消费🉐

**消费模式**下的生产代码分为两个步骤：

- 确认/创建队列`QueueDeclare`
- 从消息队列中拿到消息`Consume`

```go
//简单模式下消费代码
func (r *RabbitMQ) ConsumeSimple() {
	//1.申请队列如果队列不存在会自动创建，如果存在则跳过创建，保证队列存在消息能够成功的发送
	_, err := r.channel.QueueDeclare(
        Queue:     	r.QueueName,
		Passive:    false,		
		Durable:    false,		//消息是否持久化
		AutoDelete: false,		//客户端断开之后消息是否自动删除
		Exclusive:  false,		//是否具有排他性
		NoWait:     false,		//是否阻塞等待MQ服务器响应
		Arguments:  nil,		//额外属性		
		)
	if err != nil {
		fmt.Println(err)
	}
	//2.从消息队列中拿到消息。
	msgs, err := r.channel.Consume(
		r.QueueName,
		"",					//用来区分多个消费者,simple模式就是点对点，没有一个以上的消费者。
        autoAck:true,		//自动回应rabbitmq
        exclusive:false,	//是否具有排他性
        noLocal:false,		//如果为true，不能将同一个Connection中发送的消息传递给这个Connection中的消费者，
        noWait:false,		//队列消费是否阻塞
        args:nil,			//其他参数
	)
	if err != nil {
		fmt.Println(err)
	}

	forever := make(chan bool)
	//使用协程处理消息。
	go func() {
		for d := range msgs {
			fmt.Println(d.Body)
		}
	}()
	log.Printf("[*] waiting for message, To exit press CTRL + C.")
	<-forever
}
```

**测试**

```go
package main

import "rabbitmq_learn/RabbitMQ"

func main() {
	rabbitmq := RabbitMQ.NewRabbitMQSimple("innoSimple")
	rabbitmq.ConsumeSimple()
}
```



## 工作模式 — Work🦅

简单模式下生产者，消息队列都只有一个，多个消费端消费同一个队列中的消息，队列采用轮询的方式将消息是平均发送给消费者。程序自动帮你选择则交换器模式`direct`并且指定`key`和`queue的binding-key`，不会阻塞，消息队列有缓存，消息不会本地化，消息传递为点对点的的形式，工作模式一般用于负载均衡。

![img](F:\我的笔记\52.Rabbitmq笔记\assets\1553771-20190924215139078-298897177.png)

### 创建实例📊

**工作模式**下创建实例，不需要指定**交换器的模式**和**Bind-Key**，工作模式的实例和简单模式是相同的。

```go
func NewRabbitMQSimple(queueName string) *RabbitMQ {
    //创建简单模式下Rabbitmq的实例
	return NewRabbitMQ(queueName,"","")
}
```

### 生产🚵‍♀️

**工作模式**下的生产代码和简单模式相同分为两个步骤：

- 确认/创建队列`QueueDeclare`
- 消息发布到队列中`Publish`

```go
//简单模式下生产代码
func (r *RabbitMQ) PublishSimple(message string)
```

**测试**

```go
package main

import (
	"fmt"
	"rabbitmq_learn/RabbitMQ"
	"strconv"
	"time"
)

func main() {
	rabbitmq := RabbitMQ.NewRabbitMQSimple("innoSimple")

	for i := 0;i <= 100 ;i++  {
		rabbitmq.PublishSimple("hello inno"+strconv.Itoa(i))
		time.Sleep(1*time.Second)
		fmt.Println(i)
	}
}
```



### 消费🤗

**工作模式**下的消费代码也和简单模式相同分为两个步骤：

- 确认/创建队列`QueueDeclare`
- 从消息队列中拿到消息`Consume`

```go
//简单模式下消费代码
func (r *RabbitMQ) ConsumeSimple() 
```

**测试**

只不过工作模式会有多个消费者轮询的方式拿数据，数据平均有序分配实现负载均衡

```go
package main

import "rabbitmq_learn/RabbitMQ"

func main() {
	rabbitmq := RabbitMQ.NewRabbitMQSimple("innoSimple")
	rabbitmq.ConsumeSimple()
}
```

```go
package main

import "rabbitmq_learn/RabbitMQ"

func main() {
	rabbitmq := RabbitMQ.NewRabbitMQSimple("innoSimple")
	rabbitmq.ConsumeSimple()
}
```

##### 结果

```cmd
2019/12/18 09:39:49 [*] waiting for message, To exit press CTRL + C.
hello inno1
hello inno3
hello inno5
hello inno7
hello inno9
hello inno11
hello inno12

2019/12/18 09:39:45 [*] waiting for message, To exit press CTRL + C.
hello inno0
hello inno2
hello inno4
hello inno6
hello inno8
hello inno10
```

