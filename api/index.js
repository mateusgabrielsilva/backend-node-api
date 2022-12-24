const express = require('express');
const server = express();
var db = require('./src/connection/connectionDb.js');

// Buscando dados no db 
server.get('/users', (req, res) => {
    
    // Executando a query do db

    let querySelect = `SELECT * FROM user`;

    db.query(querySelect, (err, users) => {
        if(err) {
            console.log(err)
        }
        res.send(users)
    });
});

// Inserindo dados no db
server.post('/addUser',(req, res) => {

    //Executando a query do db

    let queryInsert = `INSERT INTO user (name, email, password, active) VALUES (?, ?, ?, ?);`;

    // Valores a serem inseridos
    let userName  = "Theodoro da Silva"
    let userEmail = "theodorosilva@gmail.com"
    let userPassword = "Theodoro"
    let userActive = 1

    // Criando a query 
    con.query(queryInsert, [userName, userEmail, userPassword, userActive],(err, rows) => {
        if (err) throw err;
        console.log("Linha inserida com sucesso!")
        
        res.send(rows)
    });
});


// Conectando ao servidor
server.listen(4000, () => {
    console.log('Servidor rodando...')
});