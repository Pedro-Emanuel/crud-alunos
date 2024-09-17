// src/services/alunoService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/alunos';

export const fetchAlunos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateAluno = async (aluno) => {
  const response = await axios.put(`${API_URL}/${aluno.id}`, aluno);
  return response.data;
};

export const deleteAluno = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const adicionarAluno = async (aluno) => {
    const response = await axios.post(API_URL, aluno);
    return response.data;
  };