import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ListaClientes from './components/ClienteList';
import FormularioCliente from './components/ClienteForm';
import DetalhesCliente from './components/ClienteDetails';
import './App.css';

const App = () => {
  const [clientesSelecionados, setClientesSelecionados] = useState([]);

  const handleSelecionarCliente = (clienteId) => {
    setClientesSelecionados((prevClientes) => {
      if (prevClientes.includes(clienteId)) {
        return prevClientes.filter((id) => id !== clienteId);
      } else {
        return [...prevClientes, clienteId];
      }
    });
  };

  const handleAlterarCoordenadas = () => {

    console.log('Alterar coordenadas:', clientesSelecionados);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Gerenciamento de Clientes</h1>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact activeClassName="active-link" className="botao-verde">
                  Lista de Clientes
                </NavLink>
              </li>
              <li>
                <NavLink to="/clientes/novo" activeClassName="active-link" className="botao-verde">
                  Novo Cliente
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={<ListaClientes onSelecionarCliente={handleSelecionarCliente} />}
            />
            <Route path="/clientes/novo" element={<FormularioCliente />} />
            <Route path="/clientes/:id" element={<DetalhesCliente />} />
            <Route path="/alterar-coordenadas" element={<h2>Página de Alterar Coordenadas</h2>} />
            <Route path="*" element={<h2>Página não encontrada</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;