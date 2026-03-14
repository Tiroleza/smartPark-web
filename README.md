# 🅿️ SmartPark API

API REST para gerenciamento inteligente de estacionamentos, construída com [NestJS](https://nestjs.com/) e [MongoDB](https://www.mongodb.com/).

## Funcionalidades

- **Registro de veículos** — Cadastra placas de veículos no estacionamento
- **Validação de placas** — Aceita placas nos padrões brasileiro antigo (ABC-1234) e Mercosul (ABC1D23)
- **Validação de entrada** — Rejeita automaticamente dados inválidos com mensagens de erro claras

## Tecnologias

- **NestJS** v10 — Framework Node.js progressivo
- **MongoDB Atlas** — Banco de dados NoSQL na nuvem
- **Mongoose** — ODM para modelagem de dados
- **class-validator** — Validação de DTOs via decorators
- **TypeScript** — Tipagem estática

## Pré-requisitos

- Node.js ≥ 18
- npm ≥ 9
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) (ou instância MongoDB local)

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/Tiroleza/smartPark-api.git
cd smartPark-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/?retryWrites=true&w=majority
PORT=3000
CORS_ORIGIN=http://localhost:3000
```

## Executando

```bash
# modo desenvolvimento (com hot-reload)
npm run start:dev

# modo produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

### `POST /estacionamentos`

Registra a placa de um veículo no estacionamento.

**Request body:**
```json
{
  "placa": "ABC1D23"
}
```

**Formatos aceitos:**
| Padrão | Formato | Exemplo |
|--------|---------|---------|
| Antigo | `AAA-9999` | `ABC-1234` |
| Mercosul | `AAA9A99` | `ABC1D23` |

**Resposta de sucesso (201):**
```json
{
  "_id": "664d...",
  "placa": "ABC1D23",
  "__v": 0
}
```

**Resposta de erro (400):**
```json
{
  "statusCode": 400,
  "message": ["Placa inválida"],
  "error": "Bad Request"
}
```

## Testes

```bash
# testes unitários
npm run test

# testes e2e
npm run test:e2e

# cobertura de testes
npm run test:cov
```

## Estrutura do projeto

```
src/
├── app.module.ts              # Módulo raiz da aplicação
├── app.controller.ts          # Controller de estacionamentos
├── app.service.ts             # Serviço de estacionamentos
├── main.ts                    # Bootstrap da aplicação
├── database/
│   └── database.module.ts     # Configuração do MongoDB
├── dto/
│   └── criar-estacionamento.dto.ts  # Validação de entrada
└── test/
    └── app.controller.spec.ts # Testes unitários
schemas/
└── estacionamento.schema.ts   # Schema do Mongoose
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
