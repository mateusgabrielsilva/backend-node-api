const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());
server.use(express.json())

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
server.post('/addUser', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const active = req.body.active

    //Executando a query do db

    let queryInsert = "INSERT INTO user (name, email, password, active) VALUES (?, ?, ?, ?)";

    // Criando a query 
    db.query(queryInsert, [name, email, password, active]).spread(function(users) {
        if(users) {
            res.send(users)
            console.log('Usuario inserido com sucesso com id ' + users.insertId)
        } else {
            console.log('Erro ao adicionar usuario')
        }

    });
});

// Atualizar dados do db 
server.put('/editUser', (req, res) => {
    const id = 5
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const active = req.body.active

    // Executando a query do db
    let queryUpdate = 'UPDATE user SET name = ?, email = ?, password = ?, active = ?  WHERE id = ?'

    // Criando a query 
    db.query(queryUpdate, [name, email, password, active, id]).then(function () {
        return db.query('SELECT * FROM user');
    }).spread(function(userUpdate) {
        if(userUpdate) {
            res.send(userUpdate)
            console.log("Usuario atualizado com sucesso!")
        } else {
            console.log("Erro ao atulizar usuario")
        }
    })
});

// Deletar dados do db
server.delete('/deleteUser', (req, res) => {
    const id = 14
    // Executando a query do db 
    let queryDelete = `DELETE FROM user WHERE id = ${id}`

    // Criando a query 
    db.query(queryDelete).spread(function(deleteUser) {
        if(deleteUser) {
            res.send(deleteUser)
            console.log("Usario apagado com sucesso!")
        } else {
            console.log("Erro ao apagar usuario")
        }
    })
});


// Conectando ao servidor
server.listen(4000, () => {
    console.log('Servidor rodando...')
});