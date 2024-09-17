// src/components/AlunoForm.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AlunoForm({ show, aluno, onClose, onSave, onDelete, onChange }) {
  if (!aluno) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Aluno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={aluno.nome}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>IRA</Form.Label>
            <Form.Control
              type="number"
              name="ira"
              value={aluno.ira}
              onChange={onChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Curso</Form.Label>
            <Form.Control
              type="text"
              name="curso"
              value={aluno.curso}
              onChange={onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onDelete}>
          Deletar
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSave}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AlunoForm;