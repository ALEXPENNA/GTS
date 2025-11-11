# Especificações Técnicas da API - GTSystem Backend

## 📋 Visão Geral

Este documento contém todas as especificações técnicas necessárias para implementar o backend do GTSystem do zero em qualquer linguagem.

**Frontend espera que a API responda em**: `http://localhost:3000/api`

---

## 🏗️ Modelo de Dados (Schema)

### 1. User (Usuário)

```typescript
{
  id: string;           // ID único (cuid, uuid, etc)
  email: string;        // Email único (UNIQUE)
  name: string;         // Nome completo
  password: string;    // Hash bcrypt
  role: string;        // "ADMIN" | "TRANSPORTADORA" | "ESTACIONAMENTO"
  avatar?: string;     // URL do avatar (opcional)
  companyId?: string;  // FK para Company (opcional)
  createdAt: DateTime; // Data de criação
  updatedAt: DateTime; // Data de atualização
}
```

**Relacionamentos:**
- company → Company (many-to-one)
- reservations → Reservation[] (one-to-many)
- driverVehicles → Vehicle[] (one-to-many como motorista)
- parkingLots → ParkingLot[] (one-to-many como gerente)
- managedSpaces → ParkingSpace[] (one-to-many como gerente)

---

### 2. Company (Empresa)

```typescript
{
  id: string;          // ID único
  name: string;         // Razão social
  cnpj: string;        // CNPJ único (UNIQUE)
  email: string;        // Email da empresa
  phone?: string;       // Telefone (opcional)
  address?: string;     // Endereço (opcional)
  city?: string;        // Cidade (opcional)
  state?: string;       // Estado (opcional)
  zipCode?: string;     // CEP (opcional)
  companyType: string;  // "TRANSPORTADORA" | "ESTACIONAMENTO"
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

**Relacionamentos:**
- users → User[] (one-to-many)
- vehicles → Vehicle[] (one-to-many)
- parkingLots → ParkingLot[] (one-to-many)

---

### 3. ParkingLot (Estacionamento)

```typescript
{
  id: string;          // ID único
  name: string;         // Nome do estacionamento
  description?: string; // Descrição (opcional)
  address: string;      // Endereço completo
  city: string;         // Cidade
  state: string;        // Estado
  zipCode: string;      // CEP
  capacity: number;     // Capacidade total
  hourlyRate: number;  // Taxa por hora (float)
  latitude?: number;   // Latitude (opcional)
  longitude?: number;   // Longitude (opcional)
  companyId: string;    // FK para Company
  managerId: string;    // FK para User (gerente)
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

**Relacionamentos:**
- company → Company (many-to-one)
- manager → User (many-to-one como gerente)
- spaces → ParkingSpace[] (one-to-many)
- reservations → Reservation[] (one-to-many)

---

### 4. ParkingSpace (Vaga de Estacionamento)

```typescript
{
  id: string;          // ID único
  number: string;       // Número da vaga (ex: "A-01")
  type: string;         // "STANDARD" | "LARGE_VEHICLE" | "TRUCK" | "MOTORCYCLE"
  status: string;      // "AVAILABLE" | "OCCUPIED" | "RESERVED" | "MAINTENANCE"
  parkingLotId: string; // FK para ParkingLot
  managerId?: string;   // FK para User (opcional)
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

**Constraints:**
- Unique constraint: (parkingLotId, number) - não pode haver duas vagas com mesmo número no mesmo estacionamento

**Relacionamentos:**
- parkingLot → ParkingLot (many-to-one)
- manager → User (many-to-one, opcional)
- reservations → Reservation[] (one-to-many)

---

### 5. Vehicle (Veículo)

```typescript
{
  id: string;          // ID único
  licensePlate: string; // Placa (UNIQUE)
  model: string;        // Modelo
  brand: string;         // Marca
  year: number;         // Ano
  color?: string;       // Cor (opcional)
  type: string;          // "CAR" | "MOTORCYCLE" | "TRUCK" | "VAN" | "BUS"
  driverId: string;     // FK para User (motorista)
  companyId: string;    // FK para Company (empresa dona)
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

**Relacionamentos:**
- driver → User (many-to-one como motorista)
- company → Company (many-to-one)
- reservations → Reservation[] (one-to-many)

---

### 6. Reservation (Reserva)

```typescript
{
  id: string;           // ID único
  startDateTime: DateTime;   // Data/hora início
  endDateTime?: DateTime;     // Data/hora fim (opcional)
  status: string;            // "PENDING" | "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED"
  totalAmount?: number;       // Valor total (opcional)
  notes?: string;             // Notas (opcional)
  userId: string;            // FK para User (quem reservou)
  vehicleId: string;          // FK para Vehicle
  parkingLotId: string;       // FK para ParkingLot
  parkingSpaceId: string;     // FK para ParkingSpace
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

**Relacionamentos:**
- user → User (many-to-one)
- vehicle → Vehicle (many-to-one)
- parkingLot → ParkingLot (many-to-one)
- parkingSpace → ParkingSpace (many-to-one)

---

## 🔗 Endpoints da API

### Base URL: `http://localhost:3000/api`

---

### 🔐 Autenticação (Auth)

#### POST `/api/auth/login`
**Login de usuário**

**Request:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": {
    "id": "user_id",
    "name": "João Silva",
    "email": "user@example.com",
    "role": "TRANSPORTADORA",
    "avatar": "url_avatar",
    "companyId": "company_id",
    "companyName": "Nome da Empresa"
  },
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
```

**Errors:**
- 400: Email e senha obrigatórios
- 401: Credenciais inválidas
- 500: Erro interno

---

#### POST `/api/auth/logout`
**Logout (autenticado)**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout realizado com sucesso"
}
```

---

#### POST `/api/auth/refresh-token`
**Renovar access token**

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "new_access_token",
  "refreshToken": "new_refresh_token"
}
```

**Errors:**
- 400: Refresh token obrigatório
- 401: Token inválido ou expirado
- 404: Usuário não encontrado

---

#### GET `/api/auth/me`
**Obter dados do usuário atual (autenticado)**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "João Silva",
    "email": "user@example.com",
    "role": "TRANSPORTADORA",
    "avatar": "url_avatar",
    "companyId": "company_id",
    "companyName": "Nome da Empresa"
  }
}
```

---

### 👥 Usuários (Users)

#### GET `/api/users`
**Listar usuários (apenas ADMIN)**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "id": "user_id",
      "name": "João Silva",
      "email": "user@example.com",
      "role": "TRANSPORTADORA",
      "avatar": "url_avatar",
      "companyId": "company_id",
      "createdAt": "2024-01-01T00:00:00Z",
      "company": {
        "name": "Nome da Empresa"
      }
    }
  ]
}
```

**Errors:**
- 401: Não autenticado
- 403: Sem permissão (apenas admin)

---

### 🏢 Empresas (Companies)

#### GET `/api/companies`
**Listar empresas**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "companies": [
    {
      "id": "company_id",
      "name": "Transportadora XYZ",
      "cnpj": "12345678901234",
      "email": "contato@xyz.com",
      "phone": "11999999999",
      "city": "São Paulo",
      "state": "SP",
      "companyType": "TRANSPORTADORA",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

#### GET `/api/companies/:id`
**Obter empresa por ID**

**Response (200):**
```json
{
  "success": true,
  "company": { /* dados completos da empresa */ }
}
```

---

#### POST `/api/companies`
**Criar empresa**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "name": "Transportadora XYZ",
  "cnpj": "12345678901234",
  "email": "contato@xyz.com",
  "phone": "11999999999",
  "address": "Rua Exemplo, 123",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234567",
  "companyType": "TRANSPORTADORA"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Empresa criada com sucesso",
  "company": { /* dados da empresa criada */ }
}
```

**Errors:**
- 400: Dados inválidos
- 409: CNPJ já existe
- 500: Erro interno

---

#### PUT `/api/companies/:id`
**Atualizar empresa**

**Request:** (mesma estrutura do POST)

**Response (200):**
```json
{
  "success": true,
  "message": "Empresa atualizada com sucesso",
  "company": { /* dados atualizados */ }
}
```

---

#### DELETE `/api/companies/:id`
**Deletar empresa**

**Response (200):**
```json
{
  "success": true,
  "message": "Empresa deletada com sucesso"
}
```

---

### 🅿️ Estacionamentos (Parking Lots)

#### GET `/api/parking-lots`
**Listar estacionamentos**

**Response (200):**
```json
{
  "success": true,
  "parkingLots": [
    {
      "id": "lot_id",
      "name": "Estacionamento Central",
      "address": "Rua Exemplo, 123",
      "city": "São Paulo",
      "capacity": 100,
      "hourlyRate": 15.00,
      "company": {
        "name": "Empresa Pro hisa"
      },
      "manager": {
        "name": "João Silva",
        "email": "joao@example.com"
      }
    }
  ]
}
```

---

#### GET `/api/parking-lots/:id`
**Obter estacionamento por ID**

---

#### POST `/api/parking-lots`
**Criar estacionamento**

**Request:**
```json
{
  "name": "Estacionamento Central",
  "description": "Descrição do estacionamento",
  "address": "Rua Exemplo, 123",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234567",
  "capacity": 100,
  "hourlyRate": 15.00,
  "latitude": -23.5505,
  "longitude": -46.6333,
  "companyId": "company_id",
  "managerId": "manager_id"
}
```

---

#### PUT `/api/parking-lots/:id`
**Atualizar estacionamento**

---

#### DELETE `/api/parking-lots/:id`
**Deletar estacionamento**

---

### 🚗 Vagas de Estacionamento (Parking Spaces)

#### GET `/api/parking-spaces`
**Listar vagas**

**Response (200):**
```json
{
  "success": true,
  "spaces": [
    {
      "id": "space_id",
      "number": "A-01",
      "type": "STANDARD",
      "status": "AVAILABLE",
      "parkingLot": {
        "name": "Estacionamento Central",
        "address": "Rua Exemplo, 123"
      }
    }
  ]
}
```

---

#### GET `/api/parking-spaces/:id`
**Obter vaga por ID**

---

#### POST `/api/parking-spaces`
**Criar vaga**

**Request:**
```json
{
  "number": "A-01",
  "type": "STANDARD",
  "status": "AVAILABLE",
  "parkingLotId": "lot_id",
  "managerId": "manager_id"
}
```

---

#### PUT `/api/parking-spaces/:id`
**Atualizar vaga**

---

#### DELETE `/api/parking-spaces/:id`
**Deletar vaga**

---

#### GET `/api/parking-spaces/available`
**Listar vagas disponíveis (opcional com filtros)**

**Query Params:**
- `parkingLotId` (opcional)
- `type` (opcional)
- `startDateTime` (opcional)
- `endDateTime` (opcional)

---

### 🚙 Veículos (Vehicles)

#### GET `/api/vehicles`
**Listar veículos**

**Response (200):**
```json
{
  "success": true,
  "vehicles": [
    {
      "id": "vehicle_id",
      "licensePlate": "ABC-1234",
      "model": "FH 540",
      "brand": "Volvo",
      "year": 2023,
      "color": "Branco",
      "type": "TRUCK",
      "driver": {
        "name": "João Silva",
        "email": "joao@example.com"
      },
      "company": {
        "name": "Transportadora XYZ"
      }
    }
  ]
}
```

---

#### POST `/api/vehicles`
**Criar veículo**

**Request:**
```json
{
  "licensePlate": "ABC-1234",
  "model": "FH 540",
  "brand": "Volvo",
  "year": 2023,
  "color": "Branco",
  "type": "TRUCK",
  "driverId": "driver_id",
  "companyId": "company_id"
}
```

---

#### PUT `/api/vehicles/:id`
**Atualizar veículo**

---

#### DELETE `/api/vehicles/:id`
**Deletar veículo**

---

### 📅 Reservas (Reservations)

#### GET `/api/reservations`
**Listar reservas**

**Response (200):**
```json
{
  "success": true,
  "reservations": [
    {
      "id": "reservation_id",
      "startDateTime": "2024-01-01T10:00:00Z",
      "endDateTime": "2024-01-01T14:00:00Z",
      "status": "CONFIRMED",
      "totalAmount": 60.00,
      "notes": "Observações",
      "user": {
        "name": "João Silva",
        "email": "joao@example.com"
      },
      "vehicle": {
        "licensePlate": "ABC-1234",
        "model": "FH 540",
        "brand": "Volvo"
      },
      "parkingLot": {
        "name": "Estacionamento Central",
        "address": "Rua Exemplo, 123"
      },
      "parkingSpace": {
        "number": "A-01",
        "type": "STANDARD"
      }
    }
  ]
}
```

---

#### GET `/api/reservations/:id`
**Obter reserva por ID**

---

#### POST `/api/reservations`
**Criar reserva**

**Request:**
```json
{
  "startDateTime": "2024-01-01T10:00:00Z",
  "endDateTime": "2024-01-01T14:00:00Z",
  "status": "PENDING",
  "totalAmount": 60.00,
  "notes": "Observações",
  "userId": "user_id",
  "vehicleId": "vehicle_id",
  "parkingLotId": "lot_id",
  "parkingSpaceId": "space_id"
}
```

---

#### PUT `/api/reservations/:id`
**Atualizar reserva**

---

#### PUT `/api/reservations/:id/status`
**Atualizar apenas o status da reserva**

**Request:**
```json
{
  "status": "CONFIRMED"
}
```

**Status válidos:** `PENDING`, `CONFIRMED`, `ACTIVE`, `COMPLETED`, `CANCELLED`

---

#### DELETE `/api/reservations/:id`
**Deletar reserva**

---

### 📊 Dashboard

#### GET `/api/dashboard`
**Estatísticas do dashboard**

**Response (200):**
```json
{
  "success": true,
  "totalEstacionamentos": 10,
  "totalVeiculos": 50,
  "totalMotoristas": 30,
  "totalReservas": 150,
  "receitaMensal": 50000.00,
  "ocupacaoMedia": 75,
  "reservasAtivas": 8,
  "vagasDisponiveis": 92
}
```

---

#### GET `/api/dashboard/test`
**Estatísticas de teste (sem autenticação) - útil para desenvolvimento**

---

## 🔒 Segurança e Autenticação

### JWT Tokens

#### Access Token
- **Expiração:** 1 hora
- **Payload:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "role": "TRANSPORTADORA",
  "companyId": "company_id"
}
```

#### Refresh Token
- **Expiração:** 7 dias
- **Payload:**
```json
{
  "id": "user_id"
}
```

### Middleware de Autenticação

Todas as rotas (exceto `/api/auth/login` e `/api/dashboard/test`) requerem:

**Header:**
```
Authorization: Bearer <access_token>
```

### Middleware de Autorização (Roles)

Algumas rotas requerem roles específicas:

- **ADMIN:** Acesso total
- **TRANSPORTADORA:** Gestão de veículos e reservas próprias
- **ESTACIONAMENTO:** Gestão de vagas e reservas recebidas

---

## ✅ Validações Necessárias

### User
- Email: válido e único
- Password: mínimo 6 caracteres, hash com bcrypt
- Role: um dos valores permitidos

### Company
- CNPJ: válido e único
- Email: válido
- CompanyType: um dos valores permitidos

### ParkingLot
- Capacity: número positivo
- HourlyRate: número positivo

### ParkingSpace
- (parkingLotId, number): combinação única

### Vehicle
- LicensePlate: único e no formato válido
- Year: ano entre 1900 e ano atual + 1

### Reservation
- StartDateTime: data futura
- EndDateTime: após startDateTime
- Veículo disponível no período
- Vaga disponível no período

---

## 📝 Formatos de Dados

### Enums/Constantes

**User Role:**
- `ADMIN`
- `TRANSPORTADORA`
- `ESTACIONAMENTO`

**Company Type:**
- `TRANSPORTADORA`
- `ESTACIONAMENTO`

**ParkingSpace Type:**
- `STANDARD`
- `LARGE_VEHICLE`
- `TRUCK`
- `MOTORCYCLE`

**ParkingSpace Status:**
- `AVAILABLE`
- `OCCUPIED`
- `RESERVED`
- `MAINTENANCE`

**Vehicle Type:**
- `CAR`
- `MOTORCYCLE`
- `TRUCK`
- `VAN`
- `BUS`

**Reservation Status:**
- `PENDING`
- `CONFIRMED`
- `ACTIVE`
- `COMPLETED`
- `CANCELLED`

---

## 🎯 Resumo de Endpoints

| Método | Endpoint | Autenticado | Role | Descrição |
|--------|----------|-------------|------|-----------|
| POST | `/api/auth/login` | ❌ | - | Login |
| POST | `/api/auth/logout` | ✅ | - | Logout |
| POST | `/api/auth/refresh-token` | ❌ | - | Renovar token |
| GET | `/api/auth/me` | ✅ | - | Dados do usuário |
| GET | `/api/users` | ✅ | ADMIN | Listar usuários |
| GET | `/api/companies` | ✅ | - | Listar empresas |
| GET | `/api/companies/:id` | ✅ | - | Obter empresa |
| POST | `/api/companies` | ✅ | - | Criar empresa |
| PUT | `/api/companies/:id` | ✅ | - | Atualizar empresa |
| DELETE | `/api/companies/:id` | ✅ | - | Deletar empresa |
| GET | `/api/parking-lots` | ✅ | - | Listar estacionamentos |
| GET | `/api/parking-lots/:id` | ✅ | - | Obter estacionamento |
| POST | `/api/parking-lots` | ✅ | - | Criar estacionamento |
| PUT | `/api/parking-lots/:id` | ✅ | - | Atualizar estacionamento |
| DELETE | `/api/parking-lots/:id` | ✅ | - | Deletar estacionamento |
| GET | `/api/parking-spaces` | ✅ | - | Listar vagas |
| GET | `/api/parking-spaces/:id` | ✅ | - | Obter vaga |
| POST | `/api/parking-spaces` | ✅ | - | Criar vaga |
| PUT | `/api/parking-spaces/:id` | ✅ | - | Atualizar vaga |
| DELETE | `/api/parking-spaces/:id` | ✅ | - | Deletar vaga |
| GET | `/api/parking-spaces/available` | ✅ | - | Vagas disponíveis |
| GET | `/api/vehicles` | ✅ | - | Listar veículos |
| GET | `/api/vehicles/:id` | ✅ | - | Obter veículo |
| POST | `/api/vehicles` | ✅ | - | Criar veículo |
| PUT | `/api/vehicles/:id` | ✅ | - | Atualizar veículo |
| DELETE | `/api/vehicles/:id` | ✅ | - | Deletar veículo |
| GET | `/api/reservations` | ✅ | - | Listar reservas |
| GET | `/api/reservations/:id` | ✅ | - | Obter reserva |
| POST | `/api/reservations` | ✅ | - | Criar reserva |
| PUT | `/api/reservations/:id` | ✅ | - | Atualizar reserva |
| PUT | `/api/reservations/:id/status` | ✅ | - | Atualizar status |
| DELETE | `/api/reservations/:id` | ✅ | - | Deletar reserva |
| GET | `/api/dashboard` | ✅ | - | Estatísticas |
| GET | `/api/dashboard/test` | ❌ | - | Teste (dev) |

**Total: ~40 endpoints**

---

## 🔧 Tecnologias Recomendadas

### Backend Base
- **Node.js** + Express
- **Python** + Django/FastAPI
- **Java** + Spring Boot
- **C#** + .NET
- **Go** + Gin/Echo
- **Ruby** + Rails

### Banco de Dados
- **PostgreSQL** (recomendado para produção)
- **MySQL** 
- **SQLite** (desenvolvimento)
- **MongoDB** (NoSQL)

### Autenticação
- **JWT** (jsonwebtoken)
- **Bcrypt** para hash de senhas
- **Refresh Tokens**

### Outras Ferramentas
- **Validação de Dados:** Zod, Joi, Yup
- **ORM:** Prisma, Sequelize, TypeORM, Django ORM
- **Rate Limiting:** express-rate-limit, Redis
- **CORS:** Configurar origens permitidas
- **Logging:** Winston, Morgan

---

## 🎨 Resposta Padrão

### Sucesso
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { /* dados */ }
}
```

### Erro
```json
{
  "success": false,
  "message": "Mensagem de erro",
  "error": "Detalhes do erro"
}
```

### Status HTTP
- **200:** Sucesso
- **201:** Criado com sucesso
- **400:** Bad Request (validação)
- **401:** Não autenticado
- **403:** Sem permissão
- **404:** Não encontrado
- **409:** Conflito (ex: email/CNPJ duplicado)
- **500:** Erro interno

---

## 📚 Observações Importantes

1. **CORS:** Frontend roda em `http://localhost:5173` - configurar CORS adequadamente
2. **Password Hash:** Usar bcrypt com salt rounds 10
3. **Toke ns:** Armazenar em HTTP-only cookies ou localStorage (frontend)
4. **Unique Constraints:** Email, CNPJ, Placa devem ser únicos
5. **Relacionamentos:** Implementar foreign keys e cascades
6. **Validações:** Validar todos os inputs no backend
7. **Error Handling:** Tratar erros de banco, validação, permissões
8. **Logs:** Registrar erros e operações importantes

---

**Data de Criação:** Janeiro 2025  
**Versão:** 1.0  
**Frontend pronto para integração**

