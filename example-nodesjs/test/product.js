
var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProductController',function(){
    
    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query("delete from product", function(ex, result){
            if(!ex){
                done();
            }
        })
    });
    
    it('#listagem json', function(done){
               
       request.get('/produtos')
       .set('Accept','application/json')
       .expect('Content-Type',/json/)
       .expect(200,done);
    });
    
    it('#cadastro de novo produto com dados invalidos', function(done){
               
       request.post('/produtos')
       .send({id:'', name:'produto teste'})
       .expect(400,done);
    });
    
    it('#cadastro de novo produto com dados validos', function(done){
               
       request.post('/produtos')
       .send({id:9999, name:'produto do teste 9999'})
       .expect(302,done);
    });
    
});

//var http = require('http');
//var assert = require('assert');
//describe('#ProductController',function(){
//    it('#listagem json', function(done){
//       console.log("Teste de verificação"); 
//        var conf = {
//            hostname : 'localhost',
//            port: 3000,
//            path: '/produtos',
//            headers: {
//                'Accept' : 'application/json'
//            }
//        };
//        
//        http.get(conf, function(res){
//            assert.equal(res.statusCode, 200);
//            assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
//            done();
//        });
//    });
//});