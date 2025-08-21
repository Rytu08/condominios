const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/blocos', (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'O campo nome é obrigatório.' });
  }

  const query = 'INSERT INTO blocos (nome) VALUES (?)';
  db.query(query, [nome], (err, results) => {
    if (err) {
      console.error('Erro ao inserir bloco:', err);
      return res.status(500).json({ erro: 'Erro ao salvar no banco de dados.' });
    }

    res.status(201).json({ mensagem: 'Bloco cadastrado com sucesso!', id: results.insertId });
  });
});

module.exports = router;