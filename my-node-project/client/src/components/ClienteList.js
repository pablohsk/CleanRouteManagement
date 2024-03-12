import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ClienteList.css';

const ClienteList = ({ onSelecionarCliente }) => {
  const [clientes, setClientes] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [clientesSelecionados, setClientesSelecionados] = useState([]);
  const [selecaoAnterior, setSelecaoAnterior] = useState([]);
  const [mensagemRota, setMensagemRota] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [novaCoordenadaX, setNovaCoordenadaX] = useState('');
  const [novaCoordenadaY, setNovaCoordenadaY] = useState('');
  const [modalOrdemVisitaIsOpen, setModalOrdemVisitaIsOpen] = useState(false);

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

  const handleBuscarClientes = async () => {
    try {
      // Armazenar a seleção anterior antes de iniciar uma nova pesquisa
      setSelecaoAnterior([...clientesSelecionados]);
  
      const response = await axios.get(`http://localhost:3000/clientes/filtrar?filtro=${termoPesquisa}`);
      if (response.data) {
        const clientesFiltrados = response.data;
  
        // Verificar se há uma seleção anterior
        if (selecaoAnterior.length > 0) {
          // Atualizar a lista de clientes mantendo a seleção anterior
          setClientes(clientesFiltrados.map(cliente => {
            const isSelected = selecaoAnterior.includes(cliente.id);
            return { ...cliente, isSelected };
          }));
        } else {
          // Caso contrário, apenas atualize a lista de clientes
          setClientes(clientesFiltrados);
        }
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
      // Verificar se há clientes selecionados
      if (clientesSelecionados.length === 0) {
        console.log('Nenhum cliente selecionado para calcular a rota.');
        return;
      }
  
      // Construir a URL com os IDs dos clientes
      const clienteIDs = clientesSelecionados.join(',');
      const url = `http://localhost:3000/clientes/rota?clienteIDs=${clienteIDs}`;
  
      // Fazer a chamada de API para calcular a rota otimizada
      const response = await axios.get(url);

      // Atualizar o estado da mensagem da rota
      setMensagemRota(response.data.rota);
      
      // Exibir a resposta da rota no console (ajuste conforme necessário)
      console.log('Rota Calculada:', response.data);
    } catch (error) {
      console.error('Erro ao calcular a rota:', error);
    }
  };

  const handleClickCheckbox = (clienteId) => {
    // Manter a seleção anterior durante a pesquisa
    const selecaoAnteriorAtualizada = [...selecaoAnterior];
  
    // Toggle de seleção do cliente
    setClientesSelecionados((prevClientes) => {
      if (prevClientes.includes(clienteId)) {
        // Remover da seleção atual
        return prevClientes.filter((id) => id !== clienteId);
      } else {
        // Adicionar à seleção atual
        return [...prevClientes, clienteId];
      }
    });
  
    // Atualizar a seleção anterior
    setSelecaoAnterior(selecaoAnteriorAtualizada);
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
  }

  const handleMostrarOrdemVisita = async () => {
    try {
      if (clientesSelecionados.length === 0) {
        console.log('Selecione pelo menos um cliente para mostrar a ordem de visita.');
        setMensagemRota(''); // Limpar a mensagem de rota quando nenhum cliente está selecionado
        return;
      }
  
      const clienteIDs = clientesSelecionados.join(',');
      const url = `http://localhost:3000/clientes/rota?clienteIDs=${clienteIDs}`;
      const response = await axios.get(url);
  
      setModalOrdemVisitaIsOpen(true);
  
      // Verifique se a resposta contém a ordem dos clientes
      if (response.data.ordemVisita) {
        const ordemVisita = response.data.ordemVisita;
  
        // Atualize a ordem de visita no estado local
        setClientes(ordemVisita);
  
        setMensagemRota(response.data.rota);
      } else {
        console.error('A resposta do serviço não contém a ordem de visita.');
      }
    } catch (error) {
      console.error('Erro ao calcular a rota otimizada:', error);
    }
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
          className="button-primary mostrar-ordem-visita-button"
          onClick={handleMostrarOrdemVisita}
          disabled={clientesSelecionados.length === 0}
        >
          Mostrar Ordem de Visita
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
        <ul>
          {clientesSelecionados
            .map((clienteId) => clientes.find((c) => c.id === clienteId))
            .filter((cliente) => cliente) // Remover clientes indefinidos
            .sort((a, b) => {
              // Função para calcular a distância entre dois pontos no plano cartesiano
              const calcularDistancia = (cliente1, cliente2) => {
                const deltaX = cliente1.coordenada_x - cliente2.coordenada_x;
                const deltaY = cliente1.coordenada_y - cliente2.coordenada_y;
                return Math.sqrt(deltaX ** 2 + deltaY ** 2);
              };

              // Ordenar clientes pela distância ao ponto de partida (0,0)
              const distanciaA = calcularDistancia({ coordenada_x: 0, coordenada_y: 0 }, a);
              const distanciaB = calcularDistancia({ coordenada_x: 0, coordenada_y: 0 }, b);
              return distanciaA - distanciaB;
            })
            .map((cliente, index) => (
              <li key={cliente.id}>
                <strong>{cliente.nome}</strong>
                <p>Email: {cliente.email}</p>
                <p>Telefone: {cliente.telefone}</p>
                <p>Coordenada X: {cliente.coordenada_x}</p>
                <p>Coordenada Y: {cliente.coordenada_y}</p>
                <p>Visita: {index + 1}</p>
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
          <strong>{cliente && cliente.nome}</strong>
          <p>Email: {cliente && cliente.email}</p>
          <p>Telefone: {cliente && cliente.telefone}</p>
          <p>Coordenada X: {cliente && cliente.coordenada_x}</p>
          <p>Coordenada Y: {cliente && cliente.coordenada_y}</p>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default ClienteList;