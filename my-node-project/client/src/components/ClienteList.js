import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ClienteList.css';

const ClienteList = ({ onSelecionarCliente }) => {
  const [clientes, setClientes] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [clientesSelecionados, setClientesSelecionados] = useState([]);
  const [mensagemRota, setMensagemRota] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [novaCoordenadaX, setNovaCoordenadaX] = useState('');
  const [novaCoordenadaY, setNovaCoordenadaY] = useState('');
  const [modalOrdemVisitaIsOpen, setModalOrdemVisitaIsOpen] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [clientesOrdenados, setClientesOrdenados] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleCheckboxChange = () => {
    // Não precisa fazer nada aqui, a lista de clientes selecionados é atualizada diretamente ao clicar na checkbox
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
    }
  };

  const handleBuscarClientes = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/clientes/filtrar?filtro=${termoPesquisa}`);
      if (response.data) {
        setClientes(response.data);
      } else {
        // Lógica para quando não há dados de resposta
      }
    } catch (error) {
      console.error('Erro ao pesquisar clientes:', error);
    }
  };

  const handleDeletarCliente = async () => {
    try {
      // Verificar se há clientes selecionados
      if (clientesSelecionados.length === 0) {
        console.log('Nenhum cliente selecionado para deletar.');
        return;
      }

      // Fazer a chamada de API para deletar os clientes selecionados
      for (const clienteId of clientesSelecionados) {
        await axios.delete(`http://localhost:3000/clientes/${clienteId}`);
      }

      // Atualizar a lista de clientes após a exclusão
      fetchClientes();

      // Limpar os clientes selecionados após a exclusão
      setClientesSelecionados([]);
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };
  
  const handleCalcularRota = async () => {
    try {
      // Chamar a rota do backend para calcular a rota otimizada
      const response = await axios.get('http://localhost:3000/clientes/rota', {
        params: { clienteIDs: clientesSelecionados.join(',') }
      });
  
      // Exibir a resposta da rota em um modal
      setModalOrdemVisitaIsOpen(true);
  
      // Verificar se a mensagem da rota está no formato esperado
      if (response.data.rota) {
        // Dividir a mensagem da rota para obter o custo total
        const mensagemDividida = response.data.rota.split('R$');
        if (mensagemDividida.length >= 2) {
          const custoTotal = mensagemDividida[1];
          // Atualizar o estado do custo total
          setTotalCost(parseFloat(custoTotal));
        } else {
          console.error('Formato de mensagem de rota inválido:', response.data.rota);
        }
  
        // Atualizar o estado da mensagem da rota
        setMensagemRota(response.data.rota);

        // Definir os clientes ordenados conforme o retorno do backend
        setClientesOrdenados(response.data.clientesOrdenados);
      } else {
        console.error('Resposta de rota inválida:', response.data);
      }
    } catch (error) {
      console.error('Erro ao calcular a rota:', error);
    }
  };

  const handleClickCheckbox = (clienteId) => {
    const cliente = clientes.find((c) => c.id === clienteId);
  
    if (!cliente) {
      console.error(`Cliente com ID ${clienteId} não encontrado. Lista de clientes:`, clientes);
      return;
    }
  
    setClientesSelecionados((prevClientes) => {
      if (prevClientes.includes(clienteId)) {
        // Remover da seleção atual
        const updatedSelection = prevClientes.filter((id) => id !== clienteId);
        return updatedSelection;
      } else {
        // Adicionar à seleção atual
        return [...prevClientes, clienteId];
      }
    });
  
    // Atualizar a lista de clientes ao marcar ou desmarcar a checkbox durante uma busca
    if (termoPesquisa) {
      fetchClientes();
    }
  };

  const handleAlterarCoordenadas = () => {
    try {
      // Verificar se há clientes selecionados
      if (clientesSelecionados.length !== 1) {
        console.log('Selecione exatamente um cliente para alterar as coordenadas.');
        return;
      }
  
      const clienteId = clientesSelecionados[0];
      const clienteSelecionado = clientes.find(cliente => cliente.id === clienteId);
  
      if (clienteSelecionado) {
        // Abrir o modal para alterar coordenadas
        setModalIsOpen(true);
  
        // Preencher as coordenadas atuais no estado do modal
        setNovaCoordenadaX(clienteSelecionado.coordenada_x.toString());
        setNovaCoordenadaY(clienteSelecionado.coordenada_y.toString());
      }
    } catch (error) {
      console.error('Erro ao alterar coordenadas:', error);
    }
  };

  const handleSalvarCoordenadas = async () => {
    try {
      const clienteId = clientesSelecionados[0];

      // Fazer a chamada de API para alterar as coordenadas
      await axios.put(`http://localhost:3000/clientes/${clienteId}`, {
        coordenada_x: novaCoordenadaX,
        coordenada_y: novaCoordenadaY,
      });

      // Fechar o modal
      setModalIsOpen(false);

      // Atualizar a lista de clientes após a alteração
      fetchClientes();

      // Limpar os clientes selecionados após a alteração
      setClientesSelecionados([]);
    } catch (error) {
      console.error('Erro ao salvar coordenadas:', error);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalOrdemVisitaIsOpen(false);
  };

  return (
    <div className="cliente-list-container">
      <h2>Lista de Clientes</h2>
      <div className="filtro-container">
        <input
          type="text"
          placeholder="Procurar cliente"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
        />
        <button className="button-primary" onClick={handleBuscarClientes}>
          Buscar
        </button>
        <button className="button-primary calcular-rota-button" onClick={handleCalcularRota}>
          Calcular Rota
        </button>
        <button
          className="button-primary alterar-coordenadas-button"
          onClick={handleAlterarCoordenadas}
          disabled={clientesSelecionados.length !== 1}
        >
          Alterar Coordenadas
        </button>
        <button
          className="button-primary delete-button"
          onClick={handleDeletarCliente}
          disabled={clientesSelecionados.length === 0}
        >
          Deletar Cliente
        </button>
      </div>
      <div className="mensagem-rota">
        <strong>Melhor Rota:</strong> {mensagemRota}
      </div>

      {/* Modal para exibir a ordem de visita */}
      <Modal
        isOpen={modalOrdemVisitaIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Ordem de Visita"
      >
        <h2>Ordem de Visita</h2>
        <div className="mensagem-rota-modal">
          <strong>Melhor Rota:</strong> {mensagemRota}
        </div>
        <ul>
          {clientesOrdenados.map((cliente) => (
            <li key={cliente.id}>
              <strong>{cliente.nome}</strong>
              <p>Email: {cliente.email}</p>
              <p>Telefone: {cliente.telefone}</p>
              <p>Coordenada X: {cliente.coordenada_x}</p>
              <p>Coordenada Y: {cliente.coordenada_y}</p>
            </li>
          ))}
        </ul>
        <button onClick={handleCloseModal}>Fechar</button>
      </Modal>

      {/* Modal para alterar coordenadas */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Alterar Coordenadas"
      >
        <h2>Alterar Coordenadas</h2>
        <label>
          Nova Coordenada X:
          <input
            type="text"
            value={novaCoordenadaX}
            onChange={(e) => setNovaCoordenadaX(e.target.value)}
          />
        </label>
        <label>
          Nova Coordenada Y:
          <input
            type="text"
            value={novaCoordenadaY}
            onChange={(e) => setNovaCoordenadaY(e.target.value)}
          />
        </label>
        <button onClick={handleSalvarCoordenadas}>Salvar</button>
        <button onClick={handleCloseModal}>Cancelar</button>
      </Modal>

      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id} onClick={() => onSelecionarCliente(cliente.id)}>
            <input
              type="checkbox"
              onChange={() => handleClickCheckbox(cliente.id)}
              checked={clientesSelecionados.includes(cliente.id)}
            />
            <strong>{cliente.nome}</strong>
            <p>Email: {cliente.email}</p>
            <p>Telefone: {cliente.telefone}</p>
            <p>Coordenada X: {cliente.coordenada_x}</p>
            <p>Coordenada Y: {cliente.coordenada_y}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteList;
