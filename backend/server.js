const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Cadastrar morador com verificação de CPF duplicado
app.post('/api/moradores', (req, res) => {
  const { nome, cpf, telefone, bloco_id } = req.body;

  connection.query('SELECT * FROM moradores WHERE cpf = ?', [cpf], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao verificar CPF' });

    if (results.length > 0) {
      return res.status(400).json({ error: 'CPF já cadastrado' });
    }

    connection.query(
      'INSERT INTO moradores (nome, cpf, telefone, bloco_id) VALUES (?, ?, ?, ?)',
      [nome, cpf, telefone, bloco_id],
      (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao cadastrar morador' });
        res.status(201).json({ message: 'Morador cadastrado com sucesso' });
      }
    );
  });
});

// Listar todos os moradores
app.get('/api/moradores', (req, res) => {
  connection.query('SELECT * FROM moradores', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar moradores' });
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});