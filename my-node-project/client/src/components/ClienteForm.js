import React, { useState } from 'react';
import axios from 'axios';
import './ClienteForm.css';

const ClienteForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [coordenadaX, setCoordenadaX] = useState('');
  const [coordenadaY, setCoordenadaY] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/clientes', {
        nome,
        email,
        telefone,
        coordenada_x: coordenadaX,
        coordenada_y: coordenadaY,
      });
      // Atualizar a lista de clientes após cadastrar um novo
      // Exemplo: fetchClientes();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <div className="cliente-form-container">
      <h2>Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Telefone:
          <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </label>
        <label>
          Coordenada X:
          <input type="number" value={coordenadaX} onChange={(e) => setCoordenadaX(e.target.value)} />
        </label>
        <label>
          Coordenada Y:
          <input type="number" value={coordenadaY} onChange={(e) => setCoordenadaY(e.target.value)} />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default ClienteForm;