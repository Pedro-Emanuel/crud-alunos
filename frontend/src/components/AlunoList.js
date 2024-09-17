// src/components/AlunoList.js
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import AlunoForm from './AlunoForm';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

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

  const indexOfLastAluno = currentPage * alunosPorPagina;
  const indexOfFirstAluno = indexOfLastAluno - alunosPorPagina;
  const currentAlunos = filteredAlunos.slice(indexOfFirstAluno, indexOfLastAluno);

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>IRA</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          {currentAlunos.map((aluno) => (
            <tr key={aluno.id} onClick={() => handleRowClick(aluno)}>
              <td>{aluno.nome}</td>
              <td>{aluno.ira}</td>
              <td>{aluno.curso}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination 
        alunosPerPage={alunosPorPagina}
        totalAlunos={filteredAlunos.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
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