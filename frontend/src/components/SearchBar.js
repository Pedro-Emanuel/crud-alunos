// src/components/SearchBar.js
import React from 'react';
import { Form } from 'react-bootstrap';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="text"
        placeholder="Pesquisar alunos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Form.Group>
  );
}

export default SearchBar;