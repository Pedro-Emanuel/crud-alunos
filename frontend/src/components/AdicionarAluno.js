// src/components/AdicionarAluno.js
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { adicionarAluno } from '../services/alunoService';

function AdicionarAluno() {
  const [aluno, setAluno] = useState({ nome: '', ira: '', curso: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adicionarAluno(aluno);
      setAlertVariant('success');
      setAlertMessage('Aluno adicionado com sucesso!');
      setShowAlert(true);
      setAluno({ nome: '', ira: '', curso: '' });
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
      setAlertVariant('danger');
      setAlertMessage('Erro ao adicionar aluno. Por favor, tente novamente.');
      setShowAlert(true);
    }
  };

  return (
    <div>
      <h2>Adicionar Novo Aluno</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={aluno.nome}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>IRA</Form.Label>
          <Form.Control
            type="number"
            name="ira"
            value={aluno.ira}
            onChange={handleInputChange}
            min="0"
            max="10"
            step="0.01"
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            placeholder='Número entre 0.0 e 10.0'
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Curso</Form.Label>
          <Form.Control
            type="text"
            name="curso"
            value={aluno.curso}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Adicionar Aluno
        </Button>
      </Form>
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible className="mt-3">
          {alertMessage}
        </Alert>
      )}
    </div>
  );
}

export default AdicionarAluno;