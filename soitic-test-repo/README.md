# Dashboard Clínica Médica — Grupo SOITIC

Protótipo funcional de um Dashboard de Agendamentos e Gestão de Pacientes desenvolvido como teste técnico para o Grupo SOITIC.

## Tecnologias

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Recharts

**Backend** *(em desenvolvimento)*
- PHP 8 com Slim Framework
- Docker

## Decisões de Arquitetura

**Next.js com App Router** foi escolhido por ser o padrão moderno do ecossistema React, com suporte nativo a Server Components, roteamento por pastas e otimizações de performance out-of-the-box.

**Tailwind CSS v4** permite estilização direta no JSX sem overhead de CSS externo. A nova sintaxe de `@theme` no `globals.css` centraliza todo o design system em um único lugar — facilitando manutenção e troca de tema. O dark mode é implementado via classe `.dark` no elemento `html`, com toggle manual e persistência em `localStorage`.

**Recharts** foi escolhido por ser a biblioteca de gráficos mais idiomática para React, com suporte nativo a responsividade e fácil customização via props.

**Separação por responsabilidade** foi aplicada em toda a estrutura:
- `components/generic/` — componentes reutilizáveis sem conhecimento de domínio (Modal, Input, Select, Badge, Skeleton)
- `components/appointments/` — componentes e contextos específicos do domínio de agendamentos
- `components/dashboard/` — componentes que orquestram dados e regras de negócio da dashboard
- `services/` — camada de acesso a dados, preparada para substituição pela API real sem impacto nos componentes
- `lib/` — funções utilitárias puras e constantes de configuração organizadas por domínio
- `types/` — interfaces TypeScript organizadas por domínio (`common/`, `dashboard/`, `appointments/`)

Essa separação garante que a troca do JSON simulado pela API real exige mudança apenas na camada `services/`, sem tocar em componentes ou lógica de UI.

**Contexto React** foi usado para gerenciar o estado global do modal de agendamento (`AppointmentModalContext`), evitando prop drilling entre `Sidebar` e o modal.

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- npm

### Frontend
```bash
git clone https://github.com/rodrigogp2604/dashboard-soitic.git
cd dashboard-soitic/src
npm install
npm run dev
```

Acesse `http://localhost:3000`

### Com Docker *(em breve)*
```bash
docker-compose up --build
```

## Estrutura do Projeto
```
soitic-test-repo/
├── data/
│   ├── appointments.json       # Dados simulados de agendamentos
│   └── patients.json           # Dados simulados de pacientes
└── src/
    ├── app/                    # Rotas e layout (Next.js App Router)
    ├── components/
    │   ├── generic/            # Componentes reutilizáveis
    │   ├── appointments/       # Componentes e contextos de agendamentos
    │   └── dashboard/          # Componentes específicos da dashboard
    ├── services/               # Camada de acesso a dados
    ├── lib/                    # Funções utilitárias e constantes por domínio
    └── types/                  # Interfaces TypeScript
        ├── common/
        ├── dashboard/
        └── appointments/
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