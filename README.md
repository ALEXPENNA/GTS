# GTSystem - Sistema de Gestão de Estacionamentos

Sistema completo de gestão de estacionamentos com **Frontend React/TypeScript** e **Backend Node.js/TypeScript**.

## 🎯 Sobre o Projeto

O GTSystem é uma plataforma que conecta:
- **Administradores** - Gerenciam todo o sistema
- **Transportadoras** - Gerenciam veículos, motoristas e reservam vagas
- **Estacionamentos** - Gerenciam vagas e visualizam reservas

## 📁 Estrutura do Projeto

```
GTSystem/
├── backend/           # API Node.js/Express/TypeScript
│   ├── src/
│   ├── prisma/       # Schema e migrações
│   └── README.md     # Documentação do backend
├── src/              # Frontend React/TypeScript
│   ├── components/   # Componentes reutilizáveis
│   ├── pages/       # Páginas da aplicação
│   ├── services/    # Serviços de API
│   └── contexts/     # Context API
└── README.md        # Este arquivo
```

## 🚀 Tecnologias

### Frontend
- **React 18** com TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilização
- **Shadcn/UI** para componentes
- **React Router** para navegação
- **React Hook Form** + **Zod** para formulários

### Backend
- **Node.js 18+** com TypeScript
- **Express** - Framework web
- **Prisma ORM** - Banco de dados
- **JWT** - Autenticação
- **PostgreSQL/SQLite** - Banco de dados

## 📦 Instalação e Configuração

### Frontend

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente (criar .env)
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=GTSystem
VITE_ENVIRONMENT=development

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp env.example .env
# Editar .env com suas configurações

# Configurar banco de dados
npm run prisma:generate
npm run prisma:migrate

# Popular banco com dados de teste (opcional)
npm run prisma:seed

# Executar em desenvolvimento
npm run dev

# Visualizar banco com Prisma Studio (opcional)
npm run prisma:studio
```

## 🌐 Acessos

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555 (após `npm run prisma:studio`)

## 📚 Documentação

- [Backend README](./backend/README.md) - Documentação completa do backend
- [Schema do Banco](./backend/prisma/schema.prisma) - Estrutura do banco de dados

## 🔐 Autenticação

O sistema usa JWT para autenticação com três tipos de usuário:
- **ADMIN** - Acesso completo ao sistema
- **TRANSPORTADORA** - Gerencia veículos e faz reservas
- **ESTACIONAMENTO** - Gerencia vagas e visualiza reservas

## 📝 Scripts Disponíveis

### Frontend

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview da build
npm run lint         # Linting
```

### Backend

```bash
npm run dev          # Desenvolvimento
npm run build        # Compilar TypeScript
npm start            # Executar produção
npm test             # Executar testes
npm run prisma:studio # Abrir Prisma Studio
npm run prisma:migrate # Executar migrações
```

## 🗄️ Modelo de Dados

Principais entidades:
- **User** - Usuários do sistema
- **Company** - Empresas (Transportadoras ou Estacionamentos)
- **ParkingLot** - Estacionamentos
- **ParkingSpace** - Vagas de estacionamento
- **Vehicle** - Veículos das transportadoras
- **Reservation** - Reservas de vagas

## 🔧 Configuração de Ambiente

### Desenvolvimento

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=GTSystem
VITE_ENVIRONMENT=development
```

**Backend (.env):**
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET=sua_chave_secreta_aqui
JWT_REFRESH_SECRET=outra_chave_secreta_aqui
CLIENT_URL=http://localhost:5173
```

## 📊 Features Implementadas

- ✅ Autenticação e autorização (JWT)
- ✅ CRUD de usuários, empresas, estacionamentos
- ✅ Gestão de vagas de estacionamento
- ✅ Gestão de veículos
- ✅ Sistema de reservas
- ✅ Dashboard com estatísticas
- ✅ Interface responsiva

## 🚧 Em Desenvolvimento

- ⏳ Integração completa frontend-backend
- ⏳ Relatórios avançados
- ⏳ Notificações em tempo real
- ⏳ Upload de imagens
- ⏳ Sistema de pagamentos

## 📄 Licença

MIT

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ para o GTSystem**
