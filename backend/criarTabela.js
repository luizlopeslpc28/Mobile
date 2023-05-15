const mysql = require('mysql')
const connection = require('./src/conexao');

const conexao = mysql.createConnection(connection);

conexao.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }

  console.log('Conexão bem-sucedida ao banco de dados');

  const criarTabelaUsuarios = `CREATE TABLE IF NOT EXISTS usuarios (
    idUsuarios INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    CPF VARCHAR(14) NOT NULL,
    telefone VARCHAR(11) NOT NULL,
    apartamento VARCHAR(10) NOT NULL,
    bloco VARCHAR(45)
  )`;
  
  conexao.query(criarTabelaUsuarios, (error) => {
    if (error) {
      console.error('Erro ao criar tabela de usuários:', error);
    } else {
      console.log('Tabela de usuários criada com sucesso');
    }
  });
});