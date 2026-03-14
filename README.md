# SmartPark API

API REST para registro de veículos em estacionamentos. Valida placas nos padrões brasileiro (antigo e Mercosul) e persiste os registros em banco de dados MongoDB.

Construída com [NestJS](https://nestjs.com/) v10 e [Mongoose](https://mongoosejs.com/) como ODM.

## Stack técnica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Runtime | Node.js | ≥ 18 |
| Framework | NestJS | 10.x |
| Linguagem | TypeScript | 5.x |
| Banco de dados | MongoDB (Atlas) | — |
| ODM | Mongoose | 8.x |
| Validação | class-validator + class-transformer | 0.14 / 0.5 |
| Configuração | @nestjs/config (dotenv) | 4.x |

## Arquitetura

```
src/
├── main.ts                           # Entrypoint — bootstrap, CORS, ValidationPipe global
├── app.module.ts                     # Módulo raiz — ConfigModule (global), DatabaseModule, feature modules
├── app.controller.ts                 # Controller — POST /estacionamentos
├── app.service.ts                    # Service — lógica de persistência
├── database/
│   └── database.module.ts            # Conexão assíncrona com MongoDB via ConfigService
├── dto/
│   └── criar-estacionamento.dto.ts   # DTO com validação de placa via regex
└── test/
    └── app.controller.spec.ts        # Testes unitários do controller

schemas/
└── estacionamento.schema.ts          # Schema Mongoose — collection "estacionamentos"

test/
├── app.e2e-spec.ts                   # Teste end-to-end
└── jest-e2e.json                     # Configuração Jest para e2e
```

### Fluxo de uma requisição

```
Client → POST /estacionamentos { "placa": "ABC1D23" }
  │
  ├─ ValidationPipe (global) → whitelist, forbidNonWhitelisted, transform
  │
  ├─ PlacaDto → @IsString() + @Length(7) + @Matches(regex)
  │     Regex aceita: AAA-9999 (antigo) ou AAA9A99 (Mercosul)
  │     Rejeita com 400 Bad Request se inválido
  │
  ├─ EstacionamentoController.criar()
  │     try/catch → re-throw HttpException ou 500 genérico
  │
  ├─ EstacionamentoService.criarEstacionamento(placa)
  │     new this.estacionamentoModel({ placa }).save()
  │
  └─ MongoDB → insert na collection "estacionamentos"
       Retorna documento salvo com _id
```

## Configuração

### 1. Clonar e instalar

```bash
git clone https://github.com/Tiroleza/smartPark-api.git
cd smartPark-api
npm install
```

### 2. Variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com suas credenciais:

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `MONGODB_URI` | Connection string do MongoDB Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/...` |
| `PORT` | Porta do servidor HTTP | `3000` |
| `CORS_ORIGIN` | Origem permitida para CORS | `http://localhost:5173` |

### 3. Executar

```bash
# Desenvolvimento (hot-reload)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## API

### `POST /estacionamentos`

Registra a placa de um veículo.

**Request:**

```http
POST /estacionamentos
Content-Type: application/json

{
  "placa": "ABC1D23"
}
```

**Formatos de placa aceitos:**

| Padrão | Regex | Exemplo |
|--------|-------|---------|
| Antigo | `^[A-Z]{3}-?\d{4}$` | `ABC-1234` ou `ABC1234` |
| Mercosul | `^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$` | `ABC1D23` |

> A placa deve ter exatamente 7 caracteres.

**Resposta `201 Created`:**

```json
{
  "_id": "664d...",
  "placa": "ABC1D23",
  "__v": 0
}
```

**Resposta `400 Bad Request`:**

```json
{
  "statusCode": 400,
  "message": ["Placa inválida"],
  "error": "Bad Request"
}
```

**Resposta `500 Internal Server Error`:**

```json
{
  "statusCode": 500,
  "message": "Erro ao registrar a placa"
}
```

## Testes

```bash
# Unitários
npm run test

# End-to-end
npm run test:e2e

# Cobertura
npm run test:cov
```

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run start` | Inicia em modo single-run |
| `npm run start:dev` | Inicia com hot-reload (watch mode) |
| `npm run start:debug` | Inicia com debugger + watch |
| `npm run start:prod` | Inicia a build de produção (`dist/main`) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm run lint` | Executa ESLint com auto-fix |
| `npm run format` | Formata código com Prettier |
| `npm run test` | Executa testes unitários |
| `npm run test:e2e` | Executa testes end-to-end |
| `npm run test:cov` | Executa testes com relatório de cobertura |

## Licença

[MIT](LICENSE)
