var postgres = require('pg');

var config_prod = {
  user: 'postgres', //env var: PGUSER 
  database: 'store_control', //env var: PGDATABASE 
  password: '1234', //env var: PGPASSWORD 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

var config_test = {
  user: 'postgres', //env var: PGUSER 
  database: 'store_control_test', //env var: PGDATABASE 
  password: '1234', //env var: PGPASSWORD 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};


function connectPostgres(){    
//    if(!process.end.NODE_ENV){
        console.log("connected postgres prod");
        return new postgres.Pool(config_prod);
//    }
    
//    if(process.end.NODE_ENV == 'test'){
//        console.log("connected postgres teste");
//        return new postgres.Pool(config_test);
//    }
}

module.exports = function(){
    console.log("express load call postgres connection");
    return connectPostgres;
}