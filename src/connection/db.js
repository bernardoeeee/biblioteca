//importar pacote do mysql
 
const mysql = require("mysql2");
 
// Criar conexão com o mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'biblioteca',
});
 
connection.connect((err) => {
    if(err){
        throw err;
    } else{
        console.log(`Banco conectado`);
    }
});
 
//
module.exports = connection;