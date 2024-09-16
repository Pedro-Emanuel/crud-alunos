// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Base de dados em memória
let alunos = [];

// Rotas
// Listar todos os alunos
app.get('/api/alunos', (req, res) => {
  res.json(alunos);
});

// Criar um novo aluno
app.post('/api/alunos', (req, res) => {
  const novoAluno = req.body;
  novoAluno.id = alunos.length + 1; // Gera um ID simples
  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});

// Recuperar um aluno específico
app.get('/api/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).json({ mensagem: 'Aluno não encontrado' });
  }
});

// Atualizar um aluno
app.put('/api/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex(a => a.id === id);
  if (index !== -1) {
    alunos[index] = { ...alunos[index], ...req.body, id };
    res.json(alunos[index]);
  } else {
    res.status(404).json({ mensagem: 'Aluno não encontrado' });
  }
});

// Deletar um aluno
app.delete('/api/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex(a => a.id === id);
  if (index !== -1) {
    alunos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ mensagem: 'Aluno não encontrado' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});