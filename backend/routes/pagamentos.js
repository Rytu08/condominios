// backend/routes/pagamentos.js
const db = require('../db');

module.exports = (app) => {
  // Cadastrar novo pagamento
  app.post('/pagamentos', (req, res) => {
    const { morador, referencia, valor, vencimento, data_pagamento } = req.body;

    if (!morador || !referencia || !valor || !vencimento || !data_pagamento) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const query = `
      INSERT INTO pagamentos (morador, referencia, valor, vencimento, data_pagamento)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [morador, referencia, valor, vencimento, data_pagamento], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao registrar pagamento.' });
      res.status(201).json({ mensagem: 'Pagamento registrado com sucesso!', id: result.insertId });
    });
  });

  // Listar todos os pagamentos
  app.get('/pagamentos', (req, res) => {
    db.query('SELECT * FROM pagamentos ORDER BY id', (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao listar pagamentos.' });
      res.json(results);
    });
  });

  // Consultar pagamento por ID
  app.get('/pagamentos/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM pagamentos WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao consultar pagamento.' });
      if (results.length === 0) return res.status(404).json({ erro: 'Pagamento não encontrado.' });

      res.json(results[0]);
    });
  });

  // Alterar pagamento
  app.put('/pagamentos/:id', (req, res) => {
    const { id } = req.params;
    const { morador, referencia, valor, vencimento, data_pagamento } = req.body;

    if (!morador || !referencia || !valor || !vencimento || !data_pagamento) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const query = `
      UPDATE pagamentos
      SET morador = ?, referencia = ?, valor = ?, vencimento = ?, data_pagamento = ?
      WHERE id = ?
    `;
    db.query(query, [morador, referencia, valor, vencimento, data_pagamento, id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao alterar pagamento.' });
      res.json({ mensagem: 'Pagamento alterado com sucesso.' });
    });
  });

  // Excluir pagamento
  app.delete('/pagamentos/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM pagamentos WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao excluir pagamento.' });
      res.json({ mensagem: 'Pagamento excluído com sucesso.' });
    });
  });
};