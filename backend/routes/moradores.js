// backend/routes/moradores.js
const db = require('../db');

module.exports = (app) => {
  // Cadastrar novo morador
  app.post('/moradores', (req, res) => {
    const { nome, cpf, telefone, apartamento } = req.body;

    if (!nome || !cpf || !apartamento) {
      return res.status(400).json({ erro: 'Nome, CPF e apartamento são obrigatórios.' });
    }

    const query = 'INSERT INTO moradores (nome, cpf, telefone, apartamento) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, cpf, telefone, apartamento], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao cadastrar morador.' });
      res.status(201).json({ mensagem: 'Morador cadastrado com sucesso!', id: result.insertId });
    });
  });

  // Listar todos os moradores
  app.get('/moradores', (req, res) => {
    db.query('SELECT * FROM moradores ORDER BY id', (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao listar moradores.' });
      res.json(results);
    });
  });

  // Consultar morador por ID
  app.get('/moradores/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM moradores WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao consultar morador.' });
      if (results.length === 0) return res.status(404).json({ erro: 'Morador não encontrado.' });

      res.json(results[0]);
    });
  });

  // Alterar morador
  app.put('/moradores/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cpf, telefone, apartamento } = req.body;

    if (!nome || !cpf || !apartamento) {
      return res.status(400).json({ erro: 'Nome, CPF e apartamento são obrigatórios.' });
    }

    const query = 'UPDATE moradores SET nome = ?, cpf = ?, telefone = ?, apartamento = ? WHERE id = ?';
    db.query(query, [nome, cpf, telefone, apartamento, id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao alterar morador.' });
      res.json({ mensagem: 'Morador alterado com sucesso.' });
    });
  });

  // Excluir morador
  app.delete('/moradores/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM moradores WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao excluir morador.' });
      res.json({ mensagem: 'Morador excluído com sucesso.' });
    });
  });
};