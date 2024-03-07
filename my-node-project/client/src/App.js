import React from 'react';
import { MemoryRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ListaClientes from './components/ClienteList';
import FormularioCliente from './components/ClienteForm';
import DetalhesCliente from './components/ClienteDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Gerenciamento de Clientes</h1>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact activeClassName="active-link">
                  Lista de Clientes
                </NavLink>
              </li>
              <li>
                <NavLink to="/clientes/novo" activeClassName="active-link">
                  Novo Cliente
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ListaClientes />} />
            <Route path="/clientes/novo" element={<FormularioCliente />} />
            <Route path="/clientes/:id" element={<DetalhesCliente />} />
            <Route path="*" element={<h2>Página não encontrada</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;