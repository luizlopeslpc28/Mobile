// FRAMEWORKS USADOS NO PROJETO 
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const connection = require('./src/conexao');
const app = express();

//CONFIGURAÇÕES PARA CONFIGURARA CORS E PARSER JSON
app.use(cors());
app.use(express.json());

//CONEXAO DO BANCO
const conexao = mysql.createConnection(connection);

//GET PARA ROTA PADRÃO DO MEU BANCO
app.get('/', (req, res) => {
    return res.json({ mensagem: 'API funcionando!' });
  });

//ROTA PARA CRIAR UM USUARIO
app.post('/CadastrarUsuarios', (req, res) => {
    const { nome, email, senha, CPF, telefone, apartamento, bloco } = req.body;
    const newUsuario = { nome, email, senha, CPF, telefone, apartamento, bloco };
    const query = 'INSERT INTO usuarios (nome, email, CPF, senha, telefone, apartamento, bloco) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    const values = [nome, email, CPF, senha, telefone, apartamento, bloco];

  conexao.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao inserir usuário:', error);
      res.status(500).json({ mensagem: 'Erro ao inserir usuário' });
    } else {
      newUsuario.id = results.insertId;
      res.status(201).json(newUsuario);
    }
  });
});

// ROTA PARA LER OS DADOS DO USUARIO E MOSTRAR NA TELA
app.get('/exibirUsuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';

    conexao.query(query, (error, results) => {
        if (error) {
            console.error('Erro ao tentar mostrar usuario na tabela:', error);
            res.status(500).json({ mensagem: 'Erro ao tentar mostrar usuario na tabela'});
        } else {
            res.status(200).json(results);
        }
    });
});

//CRIAÇÃO DA ROTA
app.listen(1234, () => {
    console.log('Servidor Ligado!')
  });
