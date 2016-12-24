module.exports = function(app) {
    app.get("/promocoes/form",function(req,res){
        var connection = app.infra.connectionFactory();
        var productDAO = new app.infra.ProductDAO(connection);

        productDAO.list(function(err, results){
            console.log(results.rows);
            res.render('promocoes/form',{lista: results.rows});
        });
    });
    
   app.post("/promocoes",function(req,res){
        var promocao = req.body;
       app.get('io').emit('novaPromocao',promocao);
       res.redirect('promocoes/form');
    });
}