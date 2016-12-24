var http = require('http');

var conf = {
    hostname : 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept' : 'application/json' //type of file is accepted
//        'Accept' : 'text/html'
        ,
        'Content-type' : 'application/json' // type of file is sending 
        
    }
};

var client = http.request(conf, function(res){
   
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log("Corpo:" + body);
    });
    
});

var product = {
    id : '999',
    name: 'p999'    
};

client.end(JSON.stringify(product));