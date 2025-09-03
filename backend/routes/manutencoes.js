// backend/routes/manutencoes.js
const db = require('../db');

module.exports = (app) => {
  // Cadastrar nova manutenção
  app.post('/manutencoes', (req, res) => {
    const { tipo, data, local } = req.body;

    if (!tipo || !data || !local) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO manutencoes (tipo, data, local) VALUES (?, ?, ?)';
    db.query(query, [tipo, data, local], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao registrar manutenção.' });
      res.status(201).json({ mensagem: 'Manutenção registrada com sucesso!', id: result.insertId });
    });
  });

  // Listar todas as manutenções
  app.get('/manutencoes', (req, res) => {
    db.query('SELECT * FROM manutencoes ORDER BY id', (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao listar manutenções.' });
      res.json(results);
    });
  });

  // Consultar manutenção por ID
  app.get('/manutencoes/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM manutencoes WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao consultar manutenção.' });
      if (results.length === 0) return res.status(404).json({ erro: 'Manutenção não encontrada.' });

      res.json(results[0]);
    });
  });

  // Alterar manutenção
  app.put('/manutencoes/:id', (req, res) => {
    const { id } = req.params;
    const { tipo, data, local } = req.body;

    if (!tipo || !data || !local) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const query = 'UPDATE manutencoes SET tipo = ?, data = ?, local = ? WHERE id = ?';
    db.query(query, [tipo, data, local, id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao alterar manutenção.' });
      res.json({ mensagem: 'Manutenção alterada com sucesso.' });
    });
  });

  // Excluir manutenção
  app.delete('/manutencoes/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM manutencoes WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao excluir manutenção.' });
      res.json({ mensagem: 'Manutenção excluída com sucesso.' });
    });
  });
};