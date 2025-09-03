// backend/routes/blocos.js
const db = require('../db');

module.exports = (app) => {
  // Cadastrar novo bloco
  app.post('/blocos', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Nome do bloco é obrigatório.' });
    }

    db.query('INSERT INTO blocos (nome) VALUES (?)', [nome], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao cadastrar bloco.' });
      res.status(201).json({ mensagem: 'Bloco cadastrado com sucesso!', id: result.insertId });
    });
  });

  // Listar todos os blocos
  app.get('/blocos', (req, res) => {
    db.query('SELECT * FROM blocos ORDER BY id', (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao listar blocos.' });
      res.json(results);
    });
  });

  // Consultar bloco por ID
  app.get('/blocos/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM blocos WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao consultar bloco.' });
      if (results.length === 0) return res.status(404).json({ erro: 'Bloco não encontrado.' });

      res.json(results[0]);
    });
  });

  // Alterar nome do bloco
  app.put('/blocos/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Novo nome é obrigatório.' });
    }

    db.query('UPDATE blocos SET nome = ? WHERE id = ?', [nome, id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao alterar bloco.' });
      res.json({ mensagem: 'Bloco alterado com sucesso.' });
    });
  });

  // Excluir bloco
  app.delete('/blocos/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM blocos WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao excluir bloco.' });
      res.json({ mensagem: 'Bloco excluído com sucesso.' });
    });
  });
};