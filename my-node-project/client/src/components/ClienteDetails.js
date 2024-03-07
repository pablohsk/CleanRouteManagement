import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Adicionado para obter o parâmetro da URL
import './ClienteDetails.css';

const ClienteDetails = () => {
  const { id } = useParams(); // Obtendo o parâmetro da URL
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const fetchDetalhesCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/clientes/${id}`);
        setCliente(response.data);
      } catch (error) {
        console.error('Erro ao obter detalhes do cliente:', error);
      }
    };

    fetchDetalhesCliente();
  }, [id]);

  if (!cliente) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="cliente-details-container">
      <h2>Detalhes do Cliente</h2>
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Telefone:</strong> {cliente.telefone}</p>
      <p><strong>Coordenada X:</strong> {cliente.coordenada_x}</p>
      <p><strong>Coordenada Y:</strong> {cliente.coordenada_y}</p>
    </div>
  );
};

export default ClienteDetails;