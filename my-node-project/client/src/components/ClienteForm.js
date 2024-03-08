import React, { useState } from 'react';
import axios from 'axios';

const FormularioCliente = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    coordenada_x: '',
    coordenada_y: '',
  });

  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fazer a chamada de API para adicionar o novo cliente
      await axios.post('http://localhost:3000/clientes', cliente);

      // Atualizar o estado para exibir a mensagem de sucesso
      setMensagemSucesso('Cliente cadastrado com sucesso!');
      setErro('');
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);

      // Atualizar o estado para exibir a mensagem de erro
      setErro('Erro ao cadastrar cliente. Tente novamente.');
      setMensagemSucesso('');
    }
  };

  return (
    <div style={{ paddingTop: '20px', textAlign: 'center' }}>
      <h2>Novo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Nome:
            <br />
            <input type="text" name="nome" value={cliente.nome} onChange={handleChange} />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Email:
            <br />
            <input type="text" name="email" value={cliente.email} onChange={handleChange} />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Telefone:
            <br />
            <input type="text" name="telefone" value={cliente.telefone} onChange={handleChange} />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Coordenada X:
            <br />
            <input type="text" name="coordenada_x" value={cliente.coordenada_x} onChange={handleChange} />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Coordenada Y:
            <br />
            <input type="text" name="coordenada_y" value={cliente.coordenada_y} onChange={handleChange} />
          </label>
        </div>
        <div>
          <button type="submit">Adicionar Cliente</button>
        </div>
      </form>

      {/* Exibir a mensagem de sucesso ou erro */}
      {mensagemSucesso && <p style={{ color: 'green' }}>{mensagemSucesso}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
};

export default FormularioCliente;