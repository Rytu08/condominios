const express = require('express');
const cors = require('cors');
const path = require('path');
const connection = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos corretamente
app.use(express.static(path.join(__dirname, '..'))); // Serve index.html, css/, js/
app.use('/pages', express.static(path.join(__dirname, '../pages'))); // Serve os HTMLs da pasta pages

// Rota para página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Rotas diretas da API
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

app.get('/api/moradores', (req, res) => {
  connection.query('SELECT * FROM moradores', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar moradores' });
    res.json(results);
  });
});

// Rotas externas
app.use('/moradores', require('./routes/moradores'));
app.use('/blocos', require('./routes/blocos'));
app.use('/apartamentos', require('./routes/apartamentos'));
app.use('/manutencoes', require('./routes/manutencoes'));
app.use('/pagamentos', require('./routes/pagamentos'));
app.use('/tipos-manutencao', require('./routes/tipos-manutencao'));

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});