// src/App.js
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Form, Table, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3001/api/alunos';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const alunosPorPagina = 6;

  useEffect(() => {
    fetchAlunos();
  }, []);

  useEffect(() => {
    const filtered = alunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.curso.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlunos(filtered);
    setCurrentPage(1);
  }, [searchTerm, alunos]);

  const fetchAlunos = async () => {
    try {
      const response = await axios.get(API_URL);
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
      await axios.put(`${API_URL}/${selectedAluno.id}`, selectedAluno);
      fetchAlunos();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
    }
  };

  const handleDeleteAluno = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedAluno.id}`);
      fetchAlunos();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAluno({ ...selectedAluno, [name]: value });
  };

  const indexOfLastAluno = currentPage * alunosPorPagina;
  const indexOfFirstAluno = indexOfLastAluno - alunosPorPagina;
  const currentAlunos = filteredAlunos.slice(indexOfFirstAluno, indexOfLastAluno);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="mx-auto">CRUD Alunos</Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Pesquisar alunos..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
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
        <div className="d-flex justify-content-center">
          {[...Array(Math.ceil(filteredAlunos.length / alunosPorPagina))].map((_, index) => (
            <Button key={index} onClick={() => paginate(index + 1)} className="mx-1">
              {index + 1}
            </Button>
          ))}
        </div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAluno && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={selectedAluno.nome}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>IRA</Form.Label>
                <Form.Control
                  type="number"
                  name="ira"
                  value={selectedAluno.ira}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Curso</Form.Label>
                <Form.Control
                  type="text"
                  name="curso"
                  value={selectedAluno.curso}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteAluno}>
            Deletar
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveAluno}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;