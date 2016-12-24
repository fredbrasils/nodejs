function ProductDAO(connection){
    this._connection = connection;
}

/* Method to list products */
ProductDAO.prototype.list = function(callback){
    
    this._connection.connect(function(err, client, done) {
                
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query('SELECT * from product', function(err, results) {
            done();
            
            callback(err, results);

            if(err) {
              return console.error('error running query', err);
            }

          });
    });

    this._connection.on('error', function (err, client) {
      console.error('idle client error', err.message, err.stack)
    });
    
}

/* Method to save the product */
ProductDAO.prototype.save = function(product,callback){
    
    this._connection.connect(function(err, client, done) {
                
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query('insert into product (id_product, name_product) values ($1,$2)',[product.id,product.name],function(err, results) {
            done();
            
            callback(err, results);

            if(err) {
              return console.error('error running query', err);
            }

          });
    });

    this._connection.on('error', function (err, client) {
      console.error('idle client error', err.message, err.stack)
    });
    
}

module.exports = function(){
    return ProductDAO;
}


