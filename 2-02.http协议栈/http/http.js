const http = require("http")

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
        res.writeHead(200,{
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Max-Age" : "1000000"
        })

        if(req.url == "/a"){
                res.end("121")
        }else{
            res.end("345")
        }
}).listen(3000)