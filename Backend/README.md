# Resolve Já — Back-end

API REST em Node.js + Express, com Prisma e SQLite (schema e `prisma.config.ts` seus).

## Rodando

```bash
npm install
cp .env.example .env          # defina JWT_SECRET, ADMIN_EMAIL e ADMIN_PASSWORD
npx prisma migrate dev --name ocorrencias
npm run dev                   # http://localhost:2000
```

O `dev.db` antigo só tem a tabela `User` com `name` (agora é `nome`) e sem `telefone`.
Como é banco de teste, se a migration reclamar: `npx prisma migrate reset`.

## Como funciona

- **Cidadão não tem login.** Ao relatar, ele informa nome, e-mail e telefone; a API acha o `User`
  pelo e-mail (ou cria) e liga a ocorrência a ele. Se o e-mail já existe, nome/telefone dele **não** são sobrescritos.
- **Portal Restrito:** a equipe entra com o `ADMIN_EMAIL` / `ADMIN_PASSWORD` do `.env`
  e recebe um token. Rotas de admin exigem `Authorization: Bearer <token>`.
- `status`: `ABERTA`, `EM_ANALISE`, `EM_ANDAMENTO`, `RESOLVIDA`, `REJEITADA`
- `prioridade`: `BAIXA` (padrão), `MEDIA`, `ALTA` — só o admin altera.
- `categoria` é texto livre (2 a 60 caracteres), como no schema.

## Endpoints (`/api`)

| Método | Rota                         | Acesso  | Descrição |
|--------|------------------------------|---------|-----------|
| POST   | `/ocorrencias`               | público | relata ocorrência (retorna o `id`, que serve de número da ocorrência) |
| GET    | `/ocorrencias/:id/acompanhar?email=` | público | status da ocorrência, se o e-mail for o do relato |
| POST   | `/admin/login`               | público | `{ email, password }` → `{ token }` |
| GET    | `/ocorrencias`               | admin   | lista; filtros `status`, `prioridade`, `categoria`, `userId`, `search`, `page`, `limit` |
| GET    | `/ocorrencias/:id`           | admin   | detalhe com dados do usuário |
| PUT    | `/ocorrencias/:id`           | admin   | edita descricao, categoria, prioridade, status, latitude, longitude, imagem |
| DELETE | `/ocorrencias/:id`           | admin   | exclui |
| GET    | `/relatorios/resumo`         | admin   | total, últimos 30 dias, por status, por prioridade, por categoria, nº de usuários |
| GET/POST/PUT/DELETE | `/users`, `/users/:id` | admin | CRUD de usuários (excluir é bloqueado se o usuário tiver ocorrências) |

### Corpo para relatar

```json
{
  "nome": "Maria Souza",
  "email": "maria@email.com",
  "telefone": "46999990000",
  "descricao": "Buraco grande em frente ao número 120",
  "categoria": "Buraco na via",
  "latitude": -25.7447,
  "longitude": -53.0596,
  "imagem": "https://... ou data:image/jpeg;base64,..."
}
```

`imagem` é opcional e guarda o texto enviado (URL ou base64; o limite do JSON é 3 MB).

## Teste rápido

```bash
curl -X POST localhost:2000/api/ocorrencias -H 'Content-Type: application/json' -d '{
  "nome":"Maria","email":"maria@email.com","telefone":"46999990000",
  "descricao":"Buraco grande na rua","categoria":"Buraco na via",
  "latitude":-25.74,"longitude":-53.05}'

curl "localhost:2000/api/ocorrencias/1/acompanhar?email=maria@email.com"

curl -X POST localhost:2000/api/admin/login -H 'Content-Type: application/json' \
  -d '{"email":"admin@resolveja.local","password":"<ADMIN_PASSWORD>"}'

curl -X PUT localhost:2000/api/ocorrencias/1 -H "Authorization: Bearer <token>" \
  -H 'Content-Type: application/json' -d '{"status":"EM_ANDAMENTO","prioridade":"ALTA"}'
```

## Erros

Sempre `{ "error": "mensagem" }`; erros de validação trazem `details` com campo e mensagem.
Códigos: 400, 401, 403, 404, 409, 413, 500.
