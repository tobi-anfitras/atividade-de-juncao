# Curadoria JWT

API de curadoria de itens com autenticação via JWT, usando **Node.js + Express + PostgreSQL**.

---

## Stack

| Camada      | Tecnologia                     |
|-------------|--------------------------------|
| Runtime     | Node.js 18+                    |
| Framework   | Express 4                      |
| Banco       | **PostgreSQL**                 |
| Driver      | `pg`                           |
| Autenticação| JSON Web Token (`jsonwebtoken`)|
| Senhas      | bcrypt (`bcryptjs`)            |

---

## Estrutura do projeto

```
curadoria_jwt_completo/
├── backend/
│   ├── src/
│   │   ├── app.js                 # configuração do Express
│   │   ├── server.js              # bootstrap (listen)
│   │   ├── config/db.js           # pool de conexão PostgreSQL
│   │   ├── controllers/           # auth, items, users
│   │   ├── middlewares/           # auth (JWT) e tratamento de erros
│   │   ├── repositories/          # acesso ao banco (SQL)
│   │   ├── routes/                # rotas da API
│   │   └── utils/password.js      # hash/compare de senha
│   ├── schema.sql                 # criação das tabelas
│   ├── package.json
│   └── .env                       # (você cria — não versionado)
└── frontend/
    └── index.html                 # frontend estático simples
```

---

## Pré-requisitos

- **Node.js 18+** e **npm**
- **PostgreSQL 12+** rodando localmente (no host)

Verifique se estão instalados:

```bash
node -v
npm -v
psql --version
```

---

## Passo a passo para subir o sistema

### 1. Instalar o PostgreSQL (se ainda não tiver)

**Debian / Ubuntu / Parrot:**

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
```

Confirme que o serviço está ativo:

```bash
sudo systemctl enable --now postgresql
sudo systemctl status postgresql
```

### 2. Criar o banco e definir a senha

> O código **não cria o banco automaticamente** — este passo é manual e feito **uma única vez**.

```bash
# Criar o banco "curadoria"
sudo -u postgres psql -c "CREATE DATABASE curadoria;"

# Definir senha do usuário postgres (use a mesma do .env)
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

> Se quiser um usuário dedicado em vez do `postgres`, adapte os comandos e use essas credenciais no `.env`.

### 3. Criar as tabelas (aplicar o schema)

Ainda na pasta `backend/`, execute:

```bash
cd backend
psql -h localhost -U postgres -d curadoria -f schema.sql
```

Isso cria as tabelas `users` e `curation_items`.

### 4. Instalar as dependências do projeto

```bash
cd backend
npm install
```

> Se aparecer erro `EINTEGRITY` / `tarball seems to be corrupted`, limpe o cache do npm e reinstale:
> ```bash
> rm -rf node_modules package-lock.json
> npm cache clean --force
> npm install
> ```

### 5. Criar o arquivo `.env`

Crie o arquivo `backend/.env` com o conteúdo abaixo (ajuste conforme suas credenciais):

```ini
# Servidor
PORT=3001

# JWT
JWT_SECRET=troque-por-um-segredo-forte
JWT_EXPIRES_IN=1d

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=curadoria
```

### 6. Subir a API

**Modo desenvolvimento** (com reload automático via nodemon):

```bash
npm run dev
```

**Modo produção:**

```bash
npm start
```

Saída esperada:

```
API rodando em http://localhost:3001
```

Teste rápido do health check:

```bash
curl http://localhost:3001/health
# {"ok":true}
```

---

## Endpoints da API

Base: `http://localhost:3001`

| Método | Rota              | Autenticação | Descrição                       |
|--------|-------------------|--------------|---------------------------------|
| GET    | `/health`         | Não          | Verifica se a API está no ar    |
| POST   | `/auth/register`  | Não          | Cria usuário                    |
| POST   | `/auth/login`     | Não          | Autentica e retorna o token JWT |
| GET    | `/users/me`       | Bearer token | Retorna os dados do usuário     |
| GET    | `/items`          | Bearer token | Lista os itens do usuário       |
| POST   | `/items`          | Bearer token | Cria um item                    |

### Exemplos com `curl`

**Registrar usuário**

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Fulano","email":"fulano@teste.com","password":"123456"}'
```

**Login** (guarde o `accessToken` retornado)

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"fulano@teste.com","password":"123456"}'
```

**Buscar usuário logado**

```bash
curl http://localhost:3001/users/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Criar item**

```bash
curl -X POST http://localhost:3001/items \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"title":"Artigo sobre Node","url":"https://exemplo.com","notes":"ler depois","tags":"node,backend"}'
```

**Listar itens**

```bash
curl http://localhost:3001/items \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## Recriando as tabelas do zero

Se precisar resetar o banco:

```bash
sudo -u postgres psql -c "DROP DATABASE curadoria;"
sudo -u postgres psql -c "CREATE DATABASE curadoria;"
psql -h localhost -U postgres -d curadoria -f schema.sql
```

---

## Solução de problemas

| Sintoma                                          | Causa provável                              | Solução                                                      |
|--------------------------------------------------|---------------------------------------------|--------------------------------------------------------------|
| `nodemon: not found`                             | Dependências não instaladas                 | `npm install`                                                |
| `EINTEGRITY` / `tarball seems to be corrupted`   | Cache do npm corrompido                     | `rm -rf node_modules package-lock.json && npm cache clean --force && npm install` |
| `ECONNREFUSED 127.0.0.1:5432`                    | PostgreSQL não está rodando                 | `sudo systemctl start postgresql`                            |
| `password authentication failed for user`        | Credenciais erradas no `.env`               | Confira `DB_USER` / `DB_PASSWORD`                            |
| `database "curadoria" does not exist`            | Banco não criado                            | Passo 2 (`CREATE DATABASE curadoria;`)                       |
| `relation "users" does not exist`                | Schema não aplicado                         | Passo 3 (`psql ... -f schema.sql`)                           |
| `Token inválido` / `Token ausente`               | Header `Authorization` incorreto            | Envie `Authorization: Bearer <token>`                        |

---

## Observações

- O arquivo `.env` contém segredos e **não deve ser versionado**.
- `docker-compose.yml` está presente apenas como alternativa para quem usa Docker; **não é necessário** quando o PostgreSQL roda no host.
- As senhas são armazenadas como hash bcrypt, nunca em texto puro.
