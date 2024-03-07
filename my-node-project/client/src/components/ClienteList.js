import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ClienteList.css';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate(); // Criando uma instância de useNavigate

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
    }
  };

  const renderClienteDetails = (cliente) => {
    // Utilizando a instância de useNavigate para navegar para a página de detalhes do cliente
    navigate(`/clientes/${cliente.id}`);
  };

  return (
    <div className="cliente-list-container">
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id} onClick={() => renderClienteDetails(cliente)}>
            <strong>{cliente.nome}</strong>
            <p>{cliente.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteList;