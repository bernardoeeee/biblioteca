const express = require('express')
const cors = require('cors')
const app = express()

const port = 3002

app.use(cors())
app.use(express.json());

const connection = require('./connection/db')

app.listen(port, () => console.log(`Rodando na porta ${port}`))

//ROTA POST CADASTRO DE USUÁRIOS TER ( CREATE, READ, UPDATE AND DELETE)

app.post('/usuario/cadastrar', async (request, response) => {
    const { nome, email, senha} = request.body;

    if (!nome || !email || !senha) {
        response.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro"
        });
    }

    // Criar os parâmetros para a consulta SQL
    const params = Array(nome, email, senha,)

    const query = `INSERT INTO Usuario(nome, email, senha) VALUES(?,?,?);`;
    connection.query(query, params, (err, result) => {
        if (err) {
            response.status(400).json({
                success: false,
                message: "Erro ao cadastrar o usuário",
                data: err
            });
        } else {
             response.status(201).json({
                success: true,
                message: "Usuário cadastrado com sucesso",
                data: result
            });
        }
    });
});

app.post('/usuario/login', async (request, response) => {
     const { email, senha } = request.body;

    // verificar se os campos estão preenchidos
     if (!email || !senha) {
          return response.status(400).json({
             success: false,
             message: "Email e senha são obrigatórios"
        });
     }

    // Buscar no banco de dados se existe o email e a digitada
     const query = 'SELECT * FROM Usuario WHERE email = ? AND senha = ?';
     connection.query(query, [email, senha], async (err, result) => {
        // primeiro lidar com o erro do mySQL se existir
         if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar usuário",
                data: err
            })
        }   
        
        if (result.length > 0){
            return response.status(200).json({
                message: "Login realizado com sucesso",
                success: true,
                data: result
            })
        } else {
            return response.status(400).json({
                success: false,
                message: "E-mail ou senha estão incorretos!",
                data: err
            })
        } 
     })
 });

 app.post('/livro/cadastrar', (request, response) => {
    let params = Array(
        request.body.titulo,
        request.body.autor,
        request.body.descricao,
        request.body.anoPublicacao,
        request.body.id_usuario
    )

    if (!params[0] || !params[1] || !params[2] || !params[3]){
        return response .status(400).json({
            message: "Alguns campos então vazios, prencha todos os campos!",
            success: false,
        })
    }

    let query = 'INSERT INTO livros(titulo, autor, descricao, anoPublicacao, id_usuario) VALUES(?, ?,?,?,?)'
    connection.query(query, params, (err, result) => {
        if (result) {
            return response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso ao adicionar os produtos",
                    data: result
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "erro ao adicionar os produtos",
                    data: err
                })
        }
    })
})
app.get('/livro/exibir', (request, response) => {
    let params = Array(
        request.body.titulo,
        request.body.autor,
        request.body.descricao,
        request.body.anoPublicacao
    )

    let query = 'SELECT * FROM livros'
    connection.query(query, params, (err, result) => {
        if (result) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: result
                })
        } else {
            response
                .status(401)
                .json({
                    success: false,
                    message: "erro",
                    data: err
                })
        }
    })
})
app.put('/livro/editar/:id', (request, response) => {
    let id_livros = request.params.id
    connection.query('SELECT * FROM livros WHERE id_livros = ?', id_livros , (err, result) => {
        // verificar possivel erro ao buscar no Banco
        if (err){
            return response.status(500).json({
                message: `Erro ao buscar produto.`,
                success: false,
                data: err
            })
        }
        console.log(err)

        // verificar se caso não existir o produto com base no id digitado
        if (result.length === 0){
            return response.status(400).json({
                message: `Erro ao encontrar o produto de id ${id_livros} no nosso Estoque.`,
                success: false,
                data: err
            })

        }
        const {titulo, autor, descricao, anoPublicacao} = request.body
    
    
    
        let query = `UPDATE livros 
        SET titulo = ?, autor = ?, descricao = ?, anoPublicacao = ? WHERE id_livros = ?`
        connection.query(query, [titulo, autor, descricao, anoPublicacao, id_livros], (err, result) => {
            if (result) {
                response
                    .status(201)
                    .json({
                        success: true,
                        message: `Sucesso ao alterar os dados do Id: ${id_livros}!`,
                        data: result
                    })
            } else {
                response
                    .status(401)
                    .json({
                        success: false,
                        message: `Não foi possivel alterar os dados do Id: ${id_livros}.`,
                        data: err
                    })
            }
        })
    })
})
app.delete('/livro/deletar/:id', (request, response) => {
    const id_livros = request.params.id 
    
    connection.query(`DELETE FROM livros WHERE id_livros = ?`, id_livros, (err,result) => {
        if (err){
            return response.status(500)
            .json({
                success: true,
                message: "Erro ao consultar se conectar com o servidor",
                data: err
            })
        }

        // verificar se existe o produto com base no Id
        if (result.affectedRows === 0){
            return response.status(401)
            .json({
                success: false,
                message: `O Produto com o id: ${id_livros} não existe.`,
                data: err
            })
        } 
        return response
            .status(201)
            .json({
                success: true,
                message: `Sucesso ao remover o produto com o id: ${id_livros}`,
                data: result
            })
    })
})