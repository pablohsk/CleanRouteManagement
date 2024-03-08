## Gerenciador de Clientes - README

Este projeto consiste em um sistema de gerenciamento de clientes, desenvolvido com React no front-end e Node.js no back-end. Abaixo, você encontrará detalhes sobre a estrutura do projeto, suas funcionalidades, configuração e como executar localmente.

<details>
  <summary><b>Estrutura do Projeto</b></summary>
  <ul>
    <li>
      <details>
        <summary><b>my-node-project</b></summary>
        <ul>
          <li><code>bin</code></li>
          <li>
            <details>
              <summary><b>client</b></summary>
              <ul>
                <li><code>build</code></li>
                <li><code>node_modules</code></li>
                <li><code>public</code></li>
                <li>
                  <details>
                    <summary><b>src</b></summary>
                    <ul>
                      <li>
                        <details>
                          <summary><b>components</b></summary>
                          <ul>
                            <li><code>api.js</code></li>
                            <li><code>ClienteDetails.css</code></li>
                            <li><code>ClienteDetails.js</code></li>
                            <li><code>ClienteForm.css</code></li>
                            <li><code>ClienteForm.js</code></li>
                            <li><code>ClienteList.css</code></li>
                            <li><code>ClienteList.js</code></li>
                          </ul>
                        </details>
                      </li>
                      <li><code>App.css</code></li>
                      <li><code>App.js</code></li>
                      <!-- ... -->
                    </ul>
                  </details>
                </li>
                <li><code>.env</code></li>
                <li><code>package-lock.json</code></li>
                <li><code>package.json</code></li>
              </ul>
            </details>
          </li>
          <li><code>controllers</code></li>
          <li><code>models</code></li>
          <li><code>node_modules</code></li>
          <li><code>public</code></li>
          <li>
            <details>
              <summary><b>routes</b></summary>
              <ul>
                <li><code>clientesRoutes.js</code></li>
                <li><code>users.js</code></li>
              </ul>
            </details>
          </li>
          <li><code>views</code></li>
          <li><code>app.js</code></li>
          <li><code>index.js</code></li>
          <li><code>package-lock.json</code></li>
          <li><code>package.json</code></li>
          <li><code>sequelize-config.js</code></li>
        </ul>
      </details>
    </li>
    <li><code>node_modules</code></li>
    <li><code>package-lock.json</code></li>
    <li><code>package.json</code></li>
  </ul>
</details>

## Funcionalidades

O sistema oferece diversas funcionalidades tanto no front-end quanto no back-end. Abaixo estão as principais:

### Front-end (React)

#### 1. Busca de Clientes

O front-end utiliza os seguintes end-points do back-end para buscar clientes por nome, email ou telefone:

- `GET /clientes`: Obtém todos os clientes.
- `GET /clientes/:id`: Obtém detalhes de um cliente específico.

Essa funcionalidade permite ao usuário pesquisar e visualizar informações detalhadas sobre os clientes cadastrados no sistema.

#### 2. Cálculo de Melhor Rota

Ao selecionar clientes específicos, o front-end utiliza o back-end para calcular a melhor rota otimizada entre esses clientes. Essa rota pode ser útil para otimizar visitas a clientes em um determinado itinerário.

#### 3. Alteração de Coordenadas

O front-end permite a alteração das coordenadas geográficas de um cliente. Ao realizar essa modificação, as novas coordenadas são enviadas ao back-end, que atualiza as informações no banco de dados.

#### 4. Deleção de Cliente

Para deletar um cliente, o front-end utiliza o end-point correspondente no back-end:

- `DELETE /clientes/:id`: Deleta um cliente específico.

Essa funcionalidade é útil para remover clientes que não são mais relevantes para o negócio.

#### 5. Cadastro de Novo Cliente

O front-end interage com o back-end para adicionar novos clientes ao sistema. Através do formulário de cadastro, o usuário pode inserir as informações do cliente, e esses dados são enviados ao back-end para serem armazenados no banco de dados.

### Back-end (Node.js)

O back-end utiliza Express.js como framework para fornecer uma API RESTful, Sequelize como ORM para interação com o banco de dados MySQL, e outras tecnologias.


## Configuração

#### 1. **Instalação de Dependências:** - Execute `npm install` nos diretórios `my-node-project` e `Teste_Programa`.
#### 2. **Configuração do Banco de Dados:** - Certifique-se de ter um banco de dados MySQL em execução. - Edite o arquivo `my-node-project/sequelize-config.js` com as configurações do seu banco de dados.
#### 3. **Execução do Back-end:** - No diretório `my-node-project`, execute `npm start` para iniciar o servidor Node.js.
#### 4. **Execução do Front-end:** - No diretório `Teste_Programa/my-node-project/client`, execute `npm start` para iniciar a aplicação React.
#### 5. **Acesso à Aplicação:** - Abra o navegador e acesse `http://localhost:3000` para utilizar a aplicação. 


## Desenvolvedor

Este projeto foi desenvolvido por Pablo Fidelis Dias. Para mais detalhes, consulte o link: https://github.com/pablohsk/CleanRouteManagement.

Qualquer dúvida ou sugestão, sinta-se à vontade para entrar em contato. Obrigado por utilizar o Gerenciador de Clientes!
