const http = require("http")
const fs = require("fs")

http.createServer((req,res)=>{
        // if(req.headers.host.endsWith("3000")){
        //     res.writeHead(200,{
        //         "Content-Type" : "application/json",
        //         "Access-Control-Allow-Orign" : "http://127.0.0.1:3000"
        //     })
        // }else if(req.headers.host.endsWith("8080")){
        //     res.writeHead(200,{
        //         "Content-Type" : "application/json",
        //         "Access-Control-Allow-Orign" : "http://127.0.0.1:8080"
        //     })
        // }
        
        // res.end(JSON.parse(req))

        // res.writeHead(200,{
        //     "Access-Control-Allow-Orign" : "*"
        // })

        // if(req.url == "/a"){
        //         res.end(123)
        // }else{
        //     res.end(345)
        // }

        fs.readFile("./1.html",function(err,data){
            res.writeHead(200,{"Content-type":"text/html;charset=UTF8"});
			res.end(data);
        })

}).listen(8080)