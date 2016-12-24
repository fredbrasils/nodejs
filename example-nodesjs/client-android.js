var http = require('http');

var conf = {
    hostname : 'localhost',
    port: 3000,
    path: '/produtos',
    headers: {
        //'Accept' : 'application/json'
        'Accept' : 'text/html'
    }
};

http.get(conf, function(res){
   
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log("Corpo:" + body);
    });
    
});