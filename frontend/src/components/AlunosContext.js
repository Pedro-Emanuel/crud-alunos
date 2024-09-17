// src/contexts/AlunosContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import { fetchAlunos } from '../services/alunoService';

const AlunosContext = createContext();

export const AlunosProvider = ({ children }) => {
  const [alunos, setAlunos] = useState([]);

  const atualizarAlunos = useCallback(async () => {
    try {
      const alunosAtualizados = await fetchAlunos();
      setAlunos(alunosAtualizados);
    } catch (error) {
      console.error('Erro ao atualizar alunos:', error);
    }
  }, []);

  return (
    <AlunosContext.Provider value={{ alunos, atualizarAlunos }}>
      {children}
    </AlunosContext.Provider>
  );
};

export const useAlunos = () => useContext(AlunosContext);