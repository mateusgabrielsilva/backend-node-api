
var db = require('mysql2-promise')();
 
db.configure({
    "host": "us117-cp.valueserver.com.br",
    "user": "risesoft_mateus_node",
    "password": "9puFfM2KW}L,",
    "database": "risesoft_teste_node"
});

module.exports = db