import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import AlunoForm from './AlunoForm';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { useEffect } from 'react';

function AlunoList({
  filteredAlunos,
  searchTerm,
  setSearchTerm,
  handleRowClick,
  showModal,
  selectedAluno,
  handleCloseModal,
  handleSaveAluno,
  handleDeleteAluno,
  handleInputChange
}) {
  const alunosPorPagina = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('nome');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showColors, setShowColors] = useState(false);
  const [totalAverage, setTotalAverage] = useState(0.0);
  const [pageAverage, setPageAverage] = useState(0.0);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAlunos = [...filteredAlunos].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastAluno = currentPage * alunosPorPagina;
  const indexOfFirstAluno = indexOfLastAluno - alunosPorPagina;
  const currentAlunos = sortedAlunos.slice(indexOfFirstAluno, indexOfLastAluno);

  useEffect(() => {
    const calculateAverage = () => {
      if (filteredAlunos.length === 0) return 0;
      
      const total = filteredAlunos.reduce((sum, aluno) => sum + Number(aluno.ira), 0);
      return (total / filteredAlunos.length).toFixed(2);
    };

    setTotalAverage(calculateAverage());
  }, [filteredAlunos]);

  useEffect(() => {
    const calculateAverage = () => {
      if (currentAlunos.length === 0) return 0;
      
      const total = currentAlunos.reduce((sum, aluno) => sum + Number(aluno.ira), 0);
      return (total / currentAlunos.length).toFixed(2);
    };

    setPageAverage(calculateAverage());
  } , [currentAlunos]);

  const getSortIcon = (field) => {
    if (field === sortField) {
      return sortDirection === 'asc' ? '▲' : '▼';
    }
    return null;
  };

  const tableStyles = {
    tableLayout: 'fixed',
    width: '100%'
  };

  const columnStyles = {
    nome: { width: '40%' },
    ira: { width: '20%' },
    curso: { width: '40%' }
  };

  return (
    <>
      <h5 className='mb-2'>Gerencie os alunos</h5>
      <h6 className='mb-4 text-secondary'>~ Clique em uma linha para mais opções</h6>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Form.Check 
        type="checkbox" 
        label="Habilitar cores na tabela" 
        checked={showColors}
        onChange={(e) => setShowColors(e.target.checked)}
        className="mb-3"
      />
      <Pagination
        alunosPerPage={alunosPorPagina}
        totalAlunos={filteredAlunos.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
      <div className="table-responsive">
        <Table hover style={tableStyles}>
          <thead>
            <tr>
              <th style={columnStyles.nome} onClick={() => handleSort('nome')}>
                Nome {getSortIcon('nome')}
              </th>
              <th style={columnStyles.ira} onClick={() => handleSort('ira')}>
                IRA {getSortIcon('ira')}
              </th>
              <th style={columnStyles.curso} onClick={() => handleSort('curso')}>
                Curso {getSortIcon('curso')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAlunos.map((aluno) => (
              <tr
                className={showColors ? (
                  aluno.ira >= 7 ? 'table-success'
                  : 'table-danger'
                ) : ''}
                key={aluno.id}
                onClick={() => handleRowClick(aluno)}
                style={{cursor: 'pointer'}}
              >
                <td style={columnStyles.nome}>{aluno.nome}</td>
                <td style={columnStyles.ira}>{aluno.ira}</td>
                <td style={columnStyles.curso}>{aluno.curso}</td>
              </tr>
            ))}
            <tr className='table-dark'>
              <td className="text-center">
                IRA médio da página: {pageAverage}
              </td>
              <td colSpan="3" className="text-center">
                IRA médio total: {totalAverage}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <AlunoForm
        show={showModal}
        aluno={selectedAluno}
        onClose={handleCloseModal}
        onSave={handleSaveAluno}
        onDelete={handleDeleteAluno}
        onChange={handleInputChange}
      />
    </>
  );
}

export default AlunoList;