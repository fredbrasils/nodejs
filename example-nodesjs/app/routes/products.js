
//var connectionFactory = require('../infra/connectionFactory');

module.exports = function(app){
    
    var listProducts = function(req,res,next){
//            var connection = connectionFactory();
        var connection = app.infra.connectionFactory();
        var productDAO = new app.infra.ProductDAO(connection);

        productDAO.list(function(err, results){
            
            if(err){            
                return next(err);
            }

            res.format({
                html: function(){
                   res.render('products/list',{lista:results.rows}); 
                },
                json: function(){
                    res.json(results.rows);
                }
            });
            
        });
    }
                            
    app.get('/produtos',listProducts);
         
    
    app.get('/produtos/form',function(req,res){
          res.render('products/form',{errosValidacao:{},
                                      produto:{}
                                     }); 
        }
    );
    
    app.post('/produtos',function(req,res){
          
            var produto = req.body;
            
            var validatorId = req.assert('id','Id é obrigatório').notEmpty();
            var validatorName = req.assert('name','Nome é obrigatório').notEmpty();
        
            var erros = req.validationErrors();
            if(erros){
                console.log(erros);
                
                res.format({
                    html: function(){
                       res.status(400).render('products/form',{errosValidacao:erros, 
                                            produto:produto
                                           }); 
                    },
                    json: function(){
                        res.status(400).json(erros);
                    }
                });
                
                
                return;
            }
        
            var connection = app.infra.connectionFactory();
            var productDAO = new app.infra.ProductDAO(connection);
            
            productDAO.save(produto,function(err, results){
                res.redirect('/produtos');
            });
        }
    );
}

//connection.connect(function(err, client, done) {
                
//if(err) {
//return console.error('error fetching client from pool', err);
//}
//
//productDAO.list(client, function(err, results) {
//done();
////                res.send(results.rows);
//res.render('products/list',{lista:results.rows});
//
//if(err) {
//  return console.error('error running query', err);
//}
//
//});
//});
//
//connection.on('error', function (err, client) {
//console.error('idle client error', err.message, err.stack)
//});