// backend/routes/tipos-manutencao.js
const db = require('../db');

module.exports = (app) => {
  // Cadastrar novo tipo de manutenção
  app.post('/tipos-manutencao', (req, res) => {
    const { descricao } = req.body;

    if (!descricao) {
      return res.status(400).json({ erro: 'Descrição é obrigatória.' });
    }

    db.query('INSERT INTO tipos_manutencao (descricao) VALUES (?)', [descricao], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao cadastrar tipo.' });
      res.status(201).json({ mensagem: 'Tipo cadastrado com sucesso!', id: result.insertId });
    });
  });

  // Listar todos os tipos
  app.get('/tipos-manutencao', (req, res) => {
    db.query('SELECT * FROM tipos_manutencao ORDER BY id', (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao listar tipos.' });
      res.json(results);
    });
  });

  // Consultar tipo por ID
  app.get('/tipos-manutencao/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM tipos_manutencao WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao consultar tipo.' });
      if (results.length === 0) return res.status(404).json({ erro: 'Tipo não encontrado.' });

      res.json(results[0]);
    });
  });

  // Alterar tipo
  app.put('/tipos-manutencao/:id', (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;

    if (!descricao) {
      return res.status(400).json({ erro: 'Nova descrição é obrigatória.' });
    }

    db.query('UPDATE tipos_manutencao SET descricao = ? WHERE id = ?', [descricao, id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao alterar tipo.' });
      res.json({ mensagem: 'Tipo alterado com sucesso.' });
    });
  });

  // Excluir tipo
  app.delete('/tipos-manutencao/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM tipos_manutencao WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao excluir tipo.' });
      res.json({ mensagem: 'Tipo excluído com sucesso.' });
    });
  });
};