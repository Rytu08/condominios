const express = require('express');
const router = express.Router();
const db = require('../db');

// Cadastrar apartamento com nome do bloco
router.post('/', (req, res) => {
  const { numero, bloco } = req.body;

  if (!numero || !bloco) {
    return res.status(400).json({ erro: 'Número e bloco são obrigatórios.' });
  }

  // Buscar o ID do bloco pelo nome
  db.query('SELECT id FROM blocos WHERE nome = ?', [bloco], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar bloco.' });
    if (results.length === 0) return res.status(404).json({ erro: 'Bloco não encontrado.' });

    const bloco_id = results[0].id;

    // Inserir apartamento com o bloco_id
    const query = 'INSERT INTO apartamentos (numero, andar, bloco_id) VALUES (?, ?, ?)';
    db.query(query, [numero, 0, bloco_id], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao cadastrar apartamento.' });
      res.status(201).json({ mensagem: 'Apartamento cadastrado com sucesso!', id: result.insertId });
    });
  });
});

// Listar apartamentos com nome do bloco
router.get('/', (req, res) => {
  const query = `
    SELECT a.id, a.numero, b.nome AS bloco
    FROM apartamentos a
    JOIN blocos b ON a.bloco_id = b.id
    ORDER BY a.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao listar apartamentos.' });
    res.json(results);
  });
});

module.exports = router;