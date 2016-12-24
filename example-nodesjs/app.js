var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var routes = require('./app/routes/products')(app);

app.set('io',io);


var porta = process.env.PORT || 3000;
http.listen(porta,function(){
    console.log("starting server");
});