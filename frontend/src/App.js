// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import AlunoList from './components/AlunoList';
import AdicionarAluno from './components/AdicionarAluno';
import useAlunos from './hooks/useAlunos';

function App() {
  const alunosHook = useAlunos();

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Container className="flex-grow-1 mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gerenciar" element={<AlunoList {...alunosHook} />} />
            <Route path="/adicionar" element={<AdicionarAluno />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;