# Spotify Search App

Este projeto é uma aplicação de página única (SPA) construída com React, que permite aos usuários buscar faixas na API do Spotify e visualizar os resultados. O aplicativo inclui uma interface moderna usando Material-UI e gerenciamento de estado com Redux.

## Demonstração

Você pode acessar a versão em produção do projeto [aqui](https://spotify-search-five.vercel.app).

## Funcionalidades

- Busca de músicas na API do Spotify.
- Validação de campos obrigatórios antes do envio da busca.
- Mensagens de erro personalizadas antes e após a tentativa de busca.
- Estilização inspirada no tema do Spotify.
- Gerenciamento de estado com React-Redux.
- Autenticação com a API do Spotify.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface.
- **Material-UI**: Framework de componentes para estilização.
- **Redux**: Biblioteca para gerenciamento de estado global.
- **React-Redux**: Integração do Redux com React.
- **fetch API**: Para requisições HTTP à API do Spotify.

## Pré-requisitos

Para rodar o projeto localmente, você precisa ter o **Node.js** instalado.

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/spotify-search-app.git
   cd spotify-search-app

2. Instale as dependências:
   ```bash
   npm install

3. Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
   ```bash
    REACT_APP_SPOTIFY_CLIENT_ID=<seu_client_id>
    REACT_APP_SPOTIFY_CLIENT_SECRET=<seu_client_secret>
