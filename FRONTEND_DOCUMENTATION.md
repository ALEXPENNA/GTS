# Documentação do Frontend - GTSystem

## 📋 Visão Geral

O frontend do GTSystem é uma aplicação **React 18** com **TypeScript**, construída com **Vite**, **Tailwind CSS** e **Shadcn/UI**. O sistema oferece interface moderna e responsiva para gestão de estacionamentos, transportadoras e administração.

---

## 🎨 Tecnologias

- **React 18** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **Shadcn/UI** - Componentes UI
- **React Router** - Navegação
- **React Hook Form** - Formulários
- **Zod** - Validação de dados
- **Context API** - Gerenciamento de estado

---

## 🗂️ Estrutura de Pastas

```
src/
├── components/        # Componentes reutilizáveis
│   ├── ui/           # Componentes Shadcn/UI (50+ componentes)
│   ├── modals/       # Modais do sistema (11 modais)
│   └── *.tsx         # Outros componentes
├── contexts/         # Context API (Auth, Notifications)
├── hooks/           # Custom hooks
├── pages/           # Páginas/rotas (19 páginas)
├── services/        # Serviços de API (14 serviços)
├── types/           # Tipos TypeScript
└── lib/             # Utilitários
```

---

## 📱 Telas do Sistema

### 🔐 Autenticação

#### **Login** (`/login`)
- Tela de autenticação
- Validação de email e senha
- Token JWT
- Redirecionamento por role (admin, transportadora, estacionamento)
- Notificações de erro

**Funcionalidades:**
- Login com email e senha
- Armazenamento de tokens
- Refresh automático
- Recuperação de senha

---

### 🏠 Páginas Principais

#### **1. Dashboard** (`/dashboard`)
Adaptativo por role do usuário:

**Para ADMIN:**
- Estatísticas gerais (empresas, veículos, motoristas, estacionamentos)
- Gráficos de atividade
- Reservas recentes
- Ações rápidas

**Para TRANSPORTADORA:**
- Visão geral de veículos e motoristas
- Reservas ativas
- Estatísticas de uso
- Ações rápidas (cadastrar veículo, motorista, reservar vaga)

**Para ESTACIONAMENTO:**
- Vagas disponíveis vs ocupadas
- Taxa de ocupação
- Reservas pendentes
- Ações rápidas (gerenciar vagas, ver reservas)

---

#### **2. Empresas** (`/empresas`)
**CRUD completo** de empresas:
- Listagem com busca e filtros
- Visualização de detalhes
- Criação, edição e exclusão
- Badges de status (ativo, inativo)
- Filtros por tipo e status

**Funcionalidades:**
- Busca por nome, CNPJ ou email
- Tabela responsiva
- Modais de visualização, edição e exclusão
- Validação de campos

**Tipos de Empresa:**
- TRANSPORTADORA
- ESTACIONAMENTO

---

#### **3. Estacionamentos Cadastrados** (`/estacionamentos-cadastrados`)
**Gerenciamento de estacionamentos:**
- Listagem completa
- Status (ativo, inativo, manutenção)
- Informações: endereço, vagas, taxas
- CRUD completo

**Funcionalidades:**
- Busca por nome, endereço ou cidade
- Filtro por status
- Visualização de detalhes
- Edição de informações
- Exclusão com confirmação
- Badges visuais de status

---

#### **4. Reserva de Vagas** (`/reserva-vagas`)
**Busca e reserva de vagas** (para transportadoras):
- Listagem de estacionamentos disponíveis
- Busca por cidade
- Filtros por status de disponibilidade
- Informações: localização, vagas, preço
- Modal de reserva

**Funcionalidades:**
- Busca de estacionamentos
- Filtro por cidade
- Seleção de data e hora
- Escolha de veículo
- Confirmação de reserva

**Status possíveis:**
- Disponível
- Cheio
- Manutenção

---

#### **5. Minhas Reservas** (`/minhas-reservas`)
**Histórico de reservas da transportadora:**
- Listagem de reservas próprias
- Status (pendente, confirmada, em andamento, completa, cancelada)
- Histórico completo
- Cancelamento de reservas

**Funcionalidades:**
- Filtro por status
- Visualização de detalhes
- Ações por status
- Timeline de reservas

---

#### **6. Reservas Recebidas** (`/reservas-recebidas`)
**Gestão de reservas do estacionamento:**
- Listagem de reservas recebidas
- Confirmação/rejeição de reservas
- Status em tempo real
- Informações do solicitante

**Funcionalidades:**
- Aceitar/rejeitar reservas
- Visualizar detalhes do veículo e motorista
- Atualização de status
- Filtros por status

---

### 👥 Gestão de Pessoas

#### **7. Usuários** (`/usuarios`)
**Gerenciamento de usuários** (apenas admin):
- Listagem completa
- Filtros por role e status
- Busca avançada
- CRUD completo

**Funcionalidades:**
- Filtro por role (admin, transportadora, estacionamento)
- Filtro por status (ativo, inativo, verificado)
- Criação de novos usuários
- Edição de dados e permissões
- Ativação/desativação
- Paginação

**Campos:**
- Nome, email, role
- Avatar
- Empresa vinculada
- Status ativo/inativo
- Email verificado

---

#### **8. Motoristas** (`/motoristas`)
**Gestão de motoristas:**
- Listagem
- Filtro por empresa (transportadora)
- CRUD completo
- Validação de CNH

**Funcionalidades:**
- Busca por nome, CPF ou CNH
- Alertas de validade próxima
- Badges de validade vencida
- Vinculação a veículos
- Histórico completo

**Campos:**
- Nome, CPF, CNH, telefone
- Categoria CNH
- Data de validade
- Empresa vinculada
- Status

---

#### **9. Veículos** (`/veiculos`)
**Gestão de frota:**
- Listagem de veículos
- Filtro por empresa (transportadora)
- CRUD completo
- Vinculação a motoristas

**Funcionalidades:**
- Busca por placa, modelo ou empresa
- Cadastro completo
- Edição de informações
- Exclusão
- Status (ativo, inativo, manutenção)

**Campos:**
- Placa, modelo, marca, ano, cor
- Tipo (caminhão, carreta, van, carro)
- Motorista responsável
- Empresa dona
- Status

---

### 🏢 Páginas Específicas por Role

#### **10. Meu Estacionamento** (`/meu-estacionamento`)
**Painel do estacionamento:**
- Informações do estacionamento
- Gestão de vagas
- Estatísticas de ocupação
- Configurações

---

#### **11. Estacionamento** (`/estacionamento`)
**Gestão de vagas:**
- Listagem de vagas
- Status de cada vaga
- Controle de ocupação
- Ajustes manuais

---

#### **12. Minhas Vagas** (`/minhas-vagas`)
**Visão específica de vagas:**
- Vagas associadas
- Ocupação em tempo real
- Histórico de uso
- Reservas ativas

---

### 📊 Relatórios e Financeiro

#### **13. Financeiro** (`/financeiro`)
**Gestão financeira:**
- Dashboard financeiro
- Faturamento
- Relatórios
- Pagamentos

**Funcionalidades:**
- Gráficos de faturamento
- Evolução mensal
- Resumo financeiro
- Exportação de relatórios

---

#### **14. Relatórios** (`/relatorios`)
**Sistema de relatórios:**
- Relatórios gerenciais
- Estatísticas e métricas
- Filtros personalizados
- Exportação (PDF, Excel)

**Funcionalidades:**
- Faturamento mensal
- Ocupação semanal
- Distribuição de veículos
- Exportação em diferentes formatos

---

### 🏢 Outras Páginas

#### **15. Transportadoras** (`/transportadoras`)
Listagem e gestão de transportadoras (admin)

#### **16. Configurações** (`/configuracoes`)
Configurações do sistema e perfil

#### **17. NotFound** (`/404`)
Página 404 customizada

#### **18. Index** (`/`)
Página inicial com redirecionamento

---

## 🔧 Componentes Reutilizáveis

### UI Components (50+ componentes)
- Button, Card, Input, Select, Textarea
- Dialog, Sheet, Alert Dialog
- Badge, Avatar, Skeleton, Progress
- Table, Pagination, Dropdown
- Toast, Tooltip, Popover
- Date Picker, Calendar
- E mais...

### Modals (11 modais)
- **CadastroEmpresaModal** - Criar empresa
- **CadastroEstacionamentoModal** - Criar estacionamento
- **CadastroVeiculoModal** - Criar veículo
- **CadastroMotoristaModal** - Criar motorista
- **CadastroUsuarioModal** - Criar usuário
- **EditModal** - Editar entidades
- **ViewModal** - Visualizar entidades
- **DeleteModal** - Confirmar exclusão
- **ReservaModal** - Criar reserva
- **EditUsuarioModal** - Editar usuário
- **ViewUsuarioModal** - Ver usuário

### Outros Componentes
- **Header** - Cabeçalho com navegação
- **Sidebar** - Menu lateral
- **Layout** - Layout principal
- **NotificationBell** - Notificações
- **TableActions** - Ações da tabela
- **StatusControlButtons** - Controle de status
- **DateRangeFilter** - Filtro de datas

---

## 🔌 Serviços de API (14 serviços)

### Serviços Implementados
1. **auth.ts** - Autenticação (login, logout, refresh token)
2. **users.ts** - Gestão de usuários
3. **empresas.ts** - Gestão de empresas
4. **estacionamentos.ts** - Gestão de estacionamentos
5. **parkingSpaces.ts** - Gestão de vagas
6. **veiculos.ts** - Gestão de veículos
7. **motoristas.ts** - Gestão de motoristas
8. **reservations.ts** - Gestão de reservas
9. **dashboard.ts** - Dados do dashboard
10. **finance.ts** - Dados financeiros
11. **reports.ts** - Relatórios
12. **notifications.ts** - Notificações
13. **mockAuth.ts** - Auth mock (desenvolvimento)
14. **api.ts** - Configuração axios

### Conexão com Backend
- **Base URL**: `http://localhost:3000`
- **Timeout**: 8 segundos
- **Interceptors**: Autenticação automática
- **Error Handling**: Tratamento de erros
- **Fallbacks**: Dados mockados quando API indisponível

---

## 🔐 Sistema de Autenticação

### Roles
1. **ADMIN** - Acesso completo
2. **TRANSPORTADORA** - Gestão de veículos e reservas
3. **ESTACIONAMENTO** - Gestão de vagas e reservas

### Fluxo de Autenticação
1. Login com email/senha
2. Recebe access + refresh token
3. Tokens armazenados em localStorage
4. Headers automáticos em requisições
5. Refresh automático quando expira
6. Logout limpa tokens

### Contextos
- **AuthContext** - Gerenciamento de autenticação
- **NotificationContext** - Gerenciamento de notificações

---

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptações
- Menu hambúrguer em mobile
- Tabelas responsivas
- Cards empilhados
- Modais otimizados
- Sidebar colapsável

---

## 🎨 Design System

### Cores
- **Primary**: Azul (#3B82F6)
- **Secondary**: Cinza
- **Success**: Verde
- **Warning**: Amarelo
- **Error**: Vermelho

### Tema
- Modo escuro padrão
- Cores personalizadas
- Contrastes otimizados
- Acessibilidade

---

## 🚀 Funcionalidades Principais

### ✅ Implementado
- Sistema de autenticação completo
- CRUD de empresas, estacionamentos, veículos, motoristas, usuários
- Dashboard adaptativo por role
- Busca e filtros em todas as telas
- Modais de visualização, edição e exclusão
- Notificações toast
- Sistema de reservas
- Paginação
- Responsividade
- Validação de formulários
- Loading states
- Error handling

### 🚧 Parcialmente Implementado
- Integração completa backend/frontend
- Upload de imagens
- Exportação de relatórios em PDF/Excel
- Notificações em tempo real (WebSocket)

### 📋 A Implementar
- Recuperação de senha por email
- Upload de avatares
- Gráficos interativos avançados
- Filtros complexos
- Multi-select
- Drag & drop

---

## 📊 Estatísticas

- **19 Páginas** implementadas
- **14 Serviços** de API
- **50+ Componentes** UI (Shadcn)
- **11 Modais** customizados
- **3 Contextos** (Auth, Notification, Global)
- **3 Roles** de usuário
- **8 Entidades** principais

---

## 🔗 Links Úteis

- **API Backend**: `http://localhost:3000`
- **Frontend Dev**: `http://localhost:5173`
- **Documentação**: Ver README.md
- **Backend Docs**: Ver backend/README.md

---

## 📝 Notas de Desenvolvimento

### Padrões de Código
- **TypeScript** para tipagem
- **ESLint** para linting
- **Prettier** para formatação
- **Conventional Commits**

### Estado
- Context API para estado global
- useState para estado local
- useEffect para side effects

### Performance
- Lazy loading de componentes
- Code splitting
- Memoization quando necessário
- Otimização de re-renders

---

**Última atualização**: Janeiro 2025  
**Versão**: 1.0.0  
**Status**: Em desenvolvimento ativo

