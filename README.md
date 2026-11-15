# Resolve Já

> **Seu relato, nossa solução.**
> Sistema de gestão de solicitações de manutenção urbana.

O **Resolve Já** aproxima o cidadão da prefeitura. Quem encontra um problema na cidade (buraco na rua, árvore caída, lâmpada apagada, lixo acumulado, vazamento, calçada danificada etc.) registra uma ocorrência com descrição, categoria, localização e foto. Depois, acompanha o andamento usando o número da ocorrência e o seu e-mail, sem precisar criar conta.

A equipe da prefeitura usa o **Portal Restrito**, um painel com login. Nele ela vê todas as ocorrências, filtra, define prioridade, atualiza o status (aberta, em análise, em andamento, resolvida ou rejeitada), gerencia os cidadãos cadastrados e consulta um resumo com números.

📄 **Documentação completa do projeto** (requisitos, personas, casos de uso, banco de dados e protótipos):
https://docs.google.com/document/d/1FqUB3A21C7Com3skHdyoplC7_yLm_wP5gc9sfXgIK3g/edit?usp=sharing

**Equipe:** Eduardo de Almeida, Marcos Eduardo Carneiro e Erik Domnick Favero Maciel dos Santos
**Curso:** Aprender & Crescer (SUDOTEC). Dois Vizinhos/PR, 2026

---

## Sumário

- [Tecnologias usadas](#-tecnologias-usadas)
- [Como o projeto está organizado](#-como-o-projeto-está-organizado)
- [Passo a passo para rodar o projeto](#-passo-a-passo-para-rodar-o-projeto)
  - [1. Instale os programas necessários](#1-instale-os-programas-necessários)
  - [2. Baixe o projeto](#2-baixe-o-projeto)
  - [3. Abra o terminal](#3-abra-o-terminal)
  - [4. Configure e rode o Back-end](#4-configure-e-rode-o-back-end)
  - [5. Configure e rode o Front-end](#5-configure-e-rode-o-front-end)
  - [6. Use o sistema](#6-use-o-sistema)
- [Variáveis de ambiente (.env)](#-variáveis-de-ambiente-env)
- [Rodando de novo depois](#-rodando-de-novo-depois)
- [Problemas comuns](#-problemas-comuns)

---

## 🧰 Tecnologias usadas

O sistema tem duas partes que trabalham juntas:

- o **Front-end**, que é o site que a pessoa vê e usa no navegador;
- o **Back-end**, que é o servidor que recebe os dados, aplica as regras e guarda tudo no banco de dados.

Os dois conversam por uma **API REST**: o front faz pedidos ao back pela internet (ou pela própria máquina) e recebe as respostas em formato **JSON**.

```
Navegador (Front-end React)  ──pedidos HTTP / JSON──▶  API (Back-end Express)  ──▶  Banco SQLite (via Prisma)
```

### Back-end (pasta `Backend/`)

| Tecnologia | Para que serve no projeto |
|---|---|
| **Node.js** | Permite rodar JavaScript fora do navegador. É o "motor" do servidor. |
| **Express** | Biblioteca que cria a API: define as rotas (ex.: `POST /api/ocorrencias`) e o que acontece em cada uma. |
| **Prisma** | ORM: deixa o código ler e gravar no banco usando JavaScript, sem escrever SQL na mão. Também cria as tabelas a partir do arquivo `prisma/schema.prisma` (migrations). |
| **SQLite** | Banco de dados guardado em **um único arquivo** (`prisma/dev.db`). Não precisa instalar nem configurar servidor de banco. |
| **Zod** | Valida os dados que chegam (ex.: e-mail válido, descrição com tamanho mínimo) antes de salvar. |
| **JSON Web Token (jsonwebtoken)** | Gera o "crachá digital" (token) que a equipe recebe ao fazer login no Portal Restrito. |
| **cors** | Diz quais sites podem fazer pedidos à API. Aqui, só o nosso front-end. |
| **dotenv** | Lê as configurações do arquivo `.env`. |

### Front-end (pasta `Frontend/`)

| Tecnologia | Para que serve no projeto |
|---|---|
| **React** | Biblioteca para montar a interface em **componentes** reaproveitáveis (formulários, cartões de ocorrência, filtros etc.). |
| **Vite** | Ferramenta que roda o site em modo de desenvolvimento (com atualização automática ao salvar) e gera a versão final. |
| **React Router DOM** | Cuida da navegação entre páginas (`/relatar`, `/acompanhar`, `/portal`...) sem recarregar o site. |
| **CSS Modules** | Cada componente tem seu próprio arquivo `.module.css`, e o estilo de um não interfere no outro. |
| **ESLint / Prettier** | Ferramentas que mantêm o código padronizado e apontam erros comuns. |

> **Sobre o protótipo:** antes do código, as telas foram prototipadas no **Figma Make**. O protótipo serviu de base visual para o MVP.
> **Sobre a documentação:** o documento do projeto descreve uma proposta de arquitetura para o futuro (Flutter, Spring Boot e PostgreSQL). **Esta versão do código** foi feita com React, Node.js e SQLite, mas segue a mesma ideia de três camadas: apresentação, regras de negócio e dados.

---

## 📁 Como o projeto está organizado

```
Resolve_Ja/
├── Backend/                  ← servidor (API)
│   ├── prisma/
│   │   ├── schema.prisma     ← desenho das tabelas (User e Ocorrencia)
│   │   └── migrations/       ← histórico de criação das tabelas
│   ├── src/
│   │   ├── server.js         ← ponto de partida do servidor
│   │   ├── app.js            ← configuração do Express (CORS, JSON, rotas)
│   │   ├── routes/           ← endereços da API
│   │   ├── controllers/      ← recebem o pedido e devolvem a resposta
│   │   ├── services/         ← regras de negócio e acesso ao banco
│   │   ├── validators/       ← regras de validação (Zod)
│   │   └── middlewares/      ← autenticação e tratamento de erros
│   ├── .env.example          ← modelo das configurações
│   └── package.json
│
└── Frontend/                 ← site (interface)
    ├── src/
    │   ├── pages/            ← uma pasta por página
    │   ├── components/       ← componentes + seus .module.css
    │   ├── services/         ← única parte que conversa com a API
    │   ├── hooks/            ← hooks próprios (useTitulo, useLocalStorage)
    │   └── utils/            ← constantes, formatação, compressão de foto
    ├── vite.config.js        ← porta do site (9998)
    ├── .env.example          ← modelo das configurações
    └── package.json
```

---

## 🚀 Passo a passo para rodar o projeto

Este guia foi escrito para quem **nunca programou**. Siga na ordem e não pule etapas.

### 1. Instale os programas necessários

#### Node.js (obrigatório)

O Node.js é o que faz o projeto funcionar. Junto com ele vem o **npm**, o programa que baixa as bibliotecas do projeto.

1. Acesse **https://nodejs.org**.
2. Baixe a versão marcada como **LTS** (é a mais estável). Use a versão **22 ou mais recente**.
3. Instale clicando em "Avançar" em todas as telas. As opções padrão já servem.
4. Para conferir se deu certo, abra um terminal (veja o [passo 3](#3-abra-o-terminal)) e digite:

   ```bash
   node -v
   npm -v
   ```

   Se aparecerem números de versão (ex.: `v22.12.0` e `10.9.0`), está tudo certo.
   Se aparecer "comando não encontrado", **feche e abra o terminal de novo** ou reinicie o computador.

#### Visual Studio Code (recomendado)

Editor de código gratuito que facilita abrir as pastas, criar os arquivos `.env` e usar o terminal.
Baixe em **https://code.visualstudio.com**.

#### Git (opcional)

Só é necessário se você for baixar o projeto pelo GitHub com o comando `git clone`. Baixe em **https://git-scm.com**.

### 2. Baixe o projeto

Escolha **uma** das opções:

- **Arquivo .zip:** baixe o zip e clique com o botão direito → **Extrair tudo**. Guarde a pasta em um lugar fácil de achar, como a Área de Trabalho.
- **Pelo Git:** em um terminal, rode `git clone <link-do-repositório>`.

> 💡 Evite pastas com caminhos muito longos ou dentro do OneDrive. Isso às vezes causa erros na instalação.

### 3. Abra o terminal

O terminal é uma janela onde você digita comandos. O jeito mais fácil é pelo VS Code:

1. Abra o VS Code → **File / Arquivo → Open Folder / Abrir Pasta** → escolha a pasta do projeto (a que contém `Backend` e `Frontend`).
2. No menu de cima, clique em **Terminal → New Terminal / Novo Terminal**. Ele abre na parte de baixo da tela.

Você vai precisar de **dois terminais abertos ao mesmo tempo**: um para o back-end e outro para o front-end. Para abrir o segundo, clique no **+** no canto do painel do terminal.

> **Comandos básicos:**
> - `cd NomeDaPasta` entra em uma pasta.
> - `cd ..` volta uma pasta.
> - Para **parar** um servidor que está rodando, clique no terminal e aperte **Ctrl + C**.

---

### 4. Configure e rode o Back-end

Faça tudo isto no **primeiro terminal**.

#### 4.1 Entre na pasta do back-end

```bash
cd Backend
```

#### 4.2 Instale as dependências

```bash
npm install
```

Esse comando lê o `package.json` e baixa todas as bibliotecas que o back-end usa (Express, Prisma etc.) para a pasta `node_modules`. Pode levar alguns minutos. **Só precisa ser feito na primeira vez** (ou quando alguém adicionar uma biblioteca nova).

> ⚠️ O `npm install` precisa ser feito **separadamente no Backend e no Frontend**. Cada um tem suas próprias bibliotecas.

#### 4.3 Crie o arquivo `.env` do back-end

O `.env` guarda as configurações do servidor (porta, senha do administrador etc.). Ele **não vem no projeto** por segurança, então você precisa criá-lo:

1. Dentro da pasta `Backend`, ache o arquivo **`.env.example`**.
2. Faça uma **cópia** dele e renomeie a cópia para **`.env`** (só isso: ponto + env, sem `.txt` no final).
   - No VS Code: clique com o botão direito em `.env.example` → **Copy** → botão direito na pasta `Backend` → **Paste** → renomeie para `.env`.
   - Ou pelo terminal: `copy .env.example .env` (Windows) ou `cp .env.example .env` (Mac/Linux).
3. Abra o `.env` e preencha assim:

```env
PORT=9999
DATABASE_URL="file:./dev.db"

# URL do front. Para mais de uma, separe por vírgula.
CORS_ORIGIN=http://localhost:9998,http://127.0.0.1:9998

# Chave que assina o token do Portal Restrito
JWT_SECRET=troque-por-uma-frase-longa-e-secreta
JWT_EXPIRES_IN=8h

# Login da equipe administrativa (Portal Restrito)
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=Admin123
```

O que cada variável faz está explicado em [Variáveis de ambiente](#-variáveis-de-ambiente-env).

#### 4.4 Crie o banco de dados

```bash
npx prisma migrate dev
```

Esse comando:

1. lê o arquivo `prisma/schema.prisma`;
2. cria o arquivo do banco de dados SQLite (`prisma/dev.db`) com as tabelas `User` e `Ocorrencia`;
3. gera o **Prisma Client**, o código que o back-end usa para conversar com o banco.

Se ele pedir um nome para a migration (`Enter a name for the new migration`), digite algo como `inicial` e aperte Enter.

> Rode esse comando **na primeira vez** e sempre que o arquivo `schema.prisma` for alterado.

#### 4.5 Inicie o servidor

```bash
npm run dev
```

Se aparecer a mensagem:

```
API rodando em http://localhost:9999
```

o back-end está funcionando. **Deixe esse terminal aberto.** Se fechar, o servidor para.

> Para testar, abra **http://localhost:9999/health** no navegador. Deve aparecer `{"status":"ok"}`.

---

### 5. Configure e rode o Front-end

Abra o **segundo terminal** (botão **+**). Ele começa na pasta principal do projeto.

#### 5.1 Entre na pasta do front-end

```bash
cd Frontend
```

> Se o terminal estiver dentro de `Backend`, use `cd ../Frontend`.

#### 5.2 Instale as dependências

```bash
npm install
```

Mesma ideia do back-end, agora baixando React, Vite, React Router etc.

#### 5.3 Crie o arquivo `.env` do front-end

Igual ao back-end: dentro da pasta `Frontend`, copie o **`.env.example`**, renomeie a cópia para **`.env`** e deixe assim:

```env
VITE_API_URL=http://localhost:9999
```

#### 5.4 Inicie o site

```bash
npm run dev
```

Vai aparecer algo como:

```
  VITE  ready in 500 ms
  ➜  Local:   http://localhost:9998/
```

Abra **http://localhost:9998** no navegador (Chrome, Edge, Firefox...). Pronto, o Resolve Já está rodando! 🎉

---

### 6. Use o sistema

| Endereço | O que é | Quem acessa |
|---|---|---|
| `/` | Página inicial | qualquer pessoa |
| `/relatar` | Registrar uma ocorrência (com foto e localização opcionais) | qualquer pessoa |
| `/acompanhar` | Consultar o andamento pelo número da ocorrência + e-mail | qualquer pessoa |
| `/portal` | Login da equipe da prefeitura | equipe |
| `/portal/painel` | Lista de ocorrências, filtros, status, prioridade e resumo | equipe (logada) |
| `/portal/usuarios` | Cadastro de cidadãos | equipe (logada) |

**Para entrar no Portal Restrito**, use o e-mail e a senha que você colocou em `ADMIN_EMAIL` e `ADMIN_PASSWORD` no `.env` do back-end.

**Dica:** para ver o conteúdo do banco de dados em uma tela amigável, rode no terminal do back-end (com o servidor parado, ou em um terceiro terminal dentro de `Backend`):

```bash
npx prisma studio
```

---

## 🔐 Variáveis de ambiente (.env)

O arquivo `.env` guarda configurações que **mudam de máquina para máquina** ou que são **secretas** (como senhas). Por isso ele não vai para o GitHub. Quem baixa o projeto cria o seu a partir do `.env.example`.

> ⚠️ Depois de alterar um `.env`, **pare o servidor (Ctrl + C) e rode `npm run dev` de novo**. O arquivo só é lido quando o servidor inicia.

### Back-end (`Backend/.env`)

| Variável | Exemplo | Para que serve |
|---|---|---|
| `PORT` | `9999` | Porta onde a API vai rodar. O endereço da API fica `http://localhost:PORT`. Se mudar aqui, mude também o `VITE_API_URL` do front. Se ficar vazia, o servidor usa `2000`. |
| `DATABASE_URL` | `"file:./dev.db"` | Onde fica o banco de dados. No SQLite é só o caminho do arquivo, contado a partir da pasta `prisma/`, então o banco fica em `Backend/prisma/dev.db`. |
| `CORS_ORIGIN` | `http://localhost:9998,http://127.0.0.1:9998` | Endereço(s) do front-end que **têm permissão** para usar a API. O navegador bloqueia pedidos vindos de sites que não estão nessa lista. Precisa ser igual ao endereço onde o front roda (a porta está em `Frontend/vite.config.js`). Para mais de um, separe por vírgula. |
| `JWT_SECRET` | `uma-frase-longa-e-secreta` | "Senha" usada para assinar os tokens de login do Portal Restrito. Sem ela ninguém consegue falsificar um token. Use um texto longo e difícil de adivinhar, e **nunca compartilhe**. **Obrigatória:** o servidor não liga sem ela. |
| `JWT_EXPIRES_IN` | `8h` | Por quanto tempo o login no portal vale antes de pedir para entrar de novo. Aceita `30m` (minutos), `8h` (horas), `7d` (dias). Se ficar vazia, vale `8h`. |
| `ADMIN_EMAIL` | `admin@gmail.com` | E-mail usado para entrar no Portal Restrito. **Obrigatória.** |
| `ADMIN_PASSWORD` | `Admin123` | Senha para entrar no Portal Restrito. **Obrigatória.** Em uso real, troque por uma senha forte. |

### Front-end (`Frontend/.env`)

| Variável | Exemplo | Para que serve |
|---|---|---|
| `VITE_API_URL` | `http://localhost:9999` | Endereço da API (back-end) que o site vai chamar. Precisa usar a **mesma porta** do `PORT` do back-end, **sem barra no final**. No Vite, toda variável que o site enxerga precisa começar com `VITE_`. |

---

## 🔁 Rodando de novo depois

Depois da primeira vez, você **não precisa** repetir `npm install`, criar os `.env` nem rodar `prisma migrate`. Basta abrir dois terminais:

```bash
# Terminal 1
cd Backend
npm run dev
```

```bash
# Terminal 2
cd Frontend
npm run dev
```

E abrir **http://localhost:9998**.

---

## 🛠️ Problemas comuns

**"Não foi possível conectar ao servidor. Confira se o back-end está rodando."**
1. Confira se o terminal do back-end mostra `API rodando em http://localhost:9999`.
2. Confira se o `VITE_API_URL` do front tem a mesma porta do `PORT` do back.
3. Confira se o `CORS_ORIGIN` do back contém o endereço exato do front (`http://localhost:9998`). Para confirmar, aperte **F12** no navegador → aba **Console**. Se aparecer *"blocked by CORS policy"*, o problema é este.
4. Depois de mexer em qualquer `.env`, reinicie o servidor correspondente.

**"Defina no .env: JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD"**
O `.env` do back-end não foi criado, está com outro nome (ex.: `.env.txt`) ou essas variáveis estão vazias.

**"@prisma/client did not initialize yet"**
Faltou gerar o Prisma Client. Rode `npx prisma migrate dev` (ou `npx prisma generate`) dentro da pasta `Backend`.

**Erro na migration / banco com tabelas antigas**
Como é um banco de testes, dá para recriá-lo do zero (⚠️ **apaga todos os dados**):
```bash
npx prisma migrate reset
```

**"Port 9999 (ou 9998) is already in use" / "EADDRINUSE"**
Já tem algo rodando nessa porta, geralmente o próprio projeto aberto em outro terminal. Feche o outro terminal ou aperte **Ctrl + C** nele.

**`npm` ou `node` não é reconhecido**
O Node.js não foi instalado ou o terminal foi aberto antes da instalação. Feche e abra o terminal (ou o VS Code) de novo.

**Fui deslogado do portal sozinho**
O token expirou. Aumente o tempo em `JWT_EXPIRES_IN` no `.env` do back-end.
