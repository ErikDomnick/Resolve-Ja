# Resolve Já — Front-end

React (JSX) + Vite + CSS Modules + react-router-dom, ligado à API do `Backend/` (mesma estrutura de pastas do projeto Negoney's Cafeterias).

## Rodando

```bash
# 1) Back-end (outro terminal) — http://localhost:2000
cd Backend && npm install && cp .env.example .env && npx prisma migrate dev && npm run dev

# 2) Front-end — http://localhost:1000
cd Frontend
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:2000
npm run dev
```

No `.env` do **back-end**, `CORS_ORIGIN` precisa conter a origem do front: `http://localhost:1000`
(o padrão do back é `http://localhost:5173`, que é a porta padrão do Vite, não a deste projeto).

## Telas

| Rota | Tela | Acesso |
|---|---|---|
| `/` | Início | público |
| `/relatar` | Formulário de relato (foto e localização opcionais) | público |
| `/acompanhar` | Consulta por número + e-mail (aceita `?id=1&email=...`) | público |
| `/portal` | Login da equipe (`ADMIN_EMAIL` / `ADMIN_PASSWORD` do back) | público |
| `/portal/painel` | Resumo, filtros, status/prioridade, exclusão | admin |
| `/portal/usuarios` | CRUD de cidadãos | admin |

## Pastas

```
src/
  main.jsx, App.jsx            entrada, menu e rotas (o token de login mora no App)
  pages/                       uma pasta por página (Relatar, Acompanhar, PortalPainel...)
  components/<area>_components/<nome>/   componente + .module.css
  hooks/                       useTitulo, useLocalStorage
  services/                    ÚNICA camada que fala com a API (fetch)
  utils/                       constantes, formatação de datas, compressão de foto
```

## Conceitos usados

useState e useEffect, formulários controlados com validação, lifting state up (`aoSalvar`, `aoAtualizar`...),
`map` com `key`, `filter`, ternário, desestruturação e spread, localStorage (token, contato e ocorrências enviadas),
query params (`URLSearchParams` e `useSearchParams`), async/await com tratamento de erros, rotas protegidas.
