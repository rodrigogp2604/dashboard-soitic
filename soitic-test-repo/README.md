# Dashboard Clínica Médica — Grupo SOITIC

Protótipo funcional de um Dashboard de Agendamentos e Gestão de Pacientes desenvolvido como teste técnico para o Grupo SOITIC.

## Tecnologias

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Recharts

**Backend**
- PHP 8.3 com Slim Framework 4
- Eloquent ORM (illuminate/database)
- MySQL 8
- Docker

## Decisões de Arquitetura

**Next.js com App Router** foi escolhido por ser o padrão moderno do ecossistema React, com suporte nativo a Server Components, roteamento por pastas e otimizações de performance out-of-the-box.

**Tailwind CSS v4** permite estilização direta no JSX sem overhead de CSS externo. A nova sintaxe de `@theme` no `globals.css` centraliza todo o design system em um único lugar — facilitando manutenção e troca de tema. O dark mode é implementado via classe `.dark` no elemento `html`, com toggle manual e persistência em `localStorage`.

**Recharts** foi escolhido por ser a biblioteca de gráficos mais idiomática para React, com suporte nativo a responsividade e fácil customização via props.

**Separação por responsabilidade** foi aplicada em toda a estrutura frontend:
- `components/generic/` — componentes reutilizáveis sem conhecimento de domínio (Modal, Input, Select, Badge, Skeleton)
- `components/appointments/` — componentes e contextos específicos do domínio de agendamentos
- `components/dashboard/` — componentes que orquestram dados e regras de negócio da dashboard
- `services/` — camada de acesso a dados, preparada para substituição pela API real sem impacto nos componentes
- `lib/` — funções utilitárias puras e constantes de configuração organizadas por domínio
- `types/` — interfaces TypeScript organizadas por domínio (`common/`, `dashboard/`, `appointments/`)

Essa separação garante que a troca do JSON simulado pela API real exige mudança apenas na camada `services/`, sem tocar em componentes ou lógica de UI.

**Contexto React** foi usado para gerenciar o estado global do modal de agendamento (`AppointmentModalContext`), evitando prop drilling entre `Sidebar` e o modal.

**Slim Framework** foi escolhido para o backend por ser leve e sem opinião — ideal para uma API REST simples sem overhead de um framework full-stack.

**Eloquent ORM** foi usado como camada de acesso ao banco por sua sintaxe expressiva e integração direta com MySQL, sem necessidade de instalar o Laravel completo.

**Docker** orquestra os três serviços (frontend, backend, banco) com um único comando, garantindo ambiente consistente para qualquer máquina.

## Como rodar localmente

### Pré-requisitos
- Docker e Docker Compose

### Com Docker (recomendado)
```bash
git clone https://github.com/rodrigogp2604/dashboard-soitic.git
cd dashboard-soitic
docker compose up --build
```

O comando acima sobe automaticamente:
- Frontend em `http://localhost:3000`
- Backend em `http://localhost:8080`
- Banco de dados MySQL na porta `3307`
- Migrations e seeds executados automaticamente

### Sem Docker (apenas frontend)
```bash
cd dashboard-soitic/src
npm install
npm run dev
```

Acesse `http://localhost:3000`

## Estrutura do Projeto
```
soitic-test-repo/
├── data/
│   ├── appointments.json       # Dados simulados de agendamentos
│   └── patients.json           # Dados simulados de pacientes
├── backend/
│   ├── src/
│   │   ├── Controllers/        # Controllers da API
│   │   ├── Models/             # Models Eloquent
│   │   └── Migrations/         # Migrations das tabelas
│   ├── config/
│   │   └── database.php        # Configuração do Eloquent
│   ├── public/
│   │   └── index.php           # Entry point do Slim
│   ├── migrate.php             # Script de migrations
│   ├── seed.php                # Script de seed
│   ├── entrypoint.sh           # Script de inicialização do container
│   └── Dockerfile
├── src/
│   ├── app/                    # Rotas e layout (Next.js App Router)
│   ├── components/
│   │   ├── generic/            # Componentes reutilizáveis
│   │   ├── appointments/       # Componentes e contextos de agendamentos
│   │   └── dashboard/          # Componentes específicos da dashboard
│   ├── services/               # Camada de acesso a dados
│   ├── lib/                    # Funções utilitárias e constantes por domínio
│   └── types/                  # Interfaces TypeScript
│       ├── common/
│       ├── dashboard/
│       └── appointments/
└── docker-compose.yml
```

## Funcionalidades

- Visão geral com cards de métricas (total, confirmados, pendentes, cancelados)
- Gráfico de evolução de agendamentos nos últimos 6 meses
- Lista de agendamentos ordenada por data decrescente
- Paginação configurável (10, 20, 50 ou todos)
- Filtro por status com reset automático de paginação
- Modal de novo agendamento com select de pacientes com busca
- Dark mode com persistência em `localStorage`
- Layout responsivo com menu hamburguer no mobile
- Loading states com skeleton animado
- Empty state para listas vazias

## API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/appointments` | Lista todos os agendamentos |
| POST | `/appointments` | Cria um novo agendamento |
| GET | `/patients` | Lista todos os pacientes |
| GET | `/patients/{id}` | Busca um paciente por ID |