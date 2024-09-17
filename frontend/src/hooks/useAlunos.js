// src/hooks/useAlunos.js
import { useState, useEffect } from 'react';
import { fetchAlunos, updateAluno, deleteAluno, adicionarAluno } from '../services/alunoService';

function useAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAlunos().then(setAlunos).catch(console.error);
  }, []);

  useEffect(() => {
    const filtered = alunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.curso.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlunos(filtered);
  }, [searchTerm, alunos]);

  const fetchAlunosData = async () => {
    const alunosData = await fetchAlunos();
    setAlunos(alunosData);
  }

  const handleRowClick = (aluno) => {
    setSelectedAluno(aluno);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAluno(null);
  };

  const handleSaveAluno = async () => {
    try {
      await updateAluno(selectedAluno);
      const updatedAlunos = await fetchAlunos();
      setAlunos(updatedAlunos);
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
    }
  };

  const handleDeleteAluno = async () => {
    try {
      await deleteAluno(selectedAluno.id);
      const updatedAlunos = await fetchAlunos();
      setAlunos(updatedAlunos);
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  const handleCreateAluno = async (aluno) => {
    try {
      await adicionarAluno(aluno);
      const updatedAlunos = await fetchAlunos();
      setAlunos(updatedAlunos);
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAluno({ ...selectedAluno, [name]: value });
  };

  return {
    alunos,
    fetchAlunosData,
    filteredAlunos,
    searchTerm,
    setSearchTerm,
    handleRowClick,
    showModal,
    selectedAluno,
    handleCloseModal,
    handleSaveAluno,
    handleDeleteAluno,
    handleInputChange,
    handleCreateAluno
  };
}

export default useAlunos;