// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function Navbar() {
  return (
    <BootstrapNavbar bg="light shadow" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">CRUD</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Alunos" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/adicionar">Adicionar</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gerenciar">Gerenciar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;