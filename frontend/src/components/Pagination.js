// src/components/Pagination.js
import React from 'react';
import { Button } from 'react-bootstrap';

function Pagination({ alunosPerPage, totalAlunos, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAlunos / alunosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center">
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={`mb-3 mx-1 ${currentPage === number ? 'btn-primary' : 'btn-secondary'}`}
        >
          {number}
        </Button>
      ))}
    </div>
  );
}

export default Pagination;