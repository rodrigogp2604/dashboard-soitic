# Dashboard Clínica Médica — Grupo SOITIC

Protótipo funcional de um Dashboard de Agendamentos e Gestão de Pacientes desenvolvido como teste técnico para o Grupo SOITIC.

## Processo de Desenvolvimento

Antes de escrever qualquer linha de código, dediquei tempo ao planejamento visual e arquitetural. Para esse projeto, o foco em UI/UX era central, então comecei pelo design — utilizei o **Stitch (Google)** para idealizar e validar rapidamente o visual sem gastar tempo excessivo no Figma, trazendo referências da minha experiência prévia.

Sou apaixonado por arquitetura de software. Ainda tenho muito a evoluir, mas busco sempre abstrair ao máximo para facilitar manutenções futuras e tornar o processo de codificação mais claro e fluido — cada pasta, cada arquivo tem um propósito bem definido.

A escolha do **Docker** foi estratégica: queria demonstrar que sou um desenvolvedor full stack de fato, e não apenas frontend. O Docker permitiu entregar um ambiente completo e reproduzível com um único comando, sem depender de configurações locais específicas.

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

Essa separação garante que mudanças na fonte de dados exigem alteração apenas na camada `services/`, sem impacto em componentes ou lógica de UI.

**Contexto React** foi usado para gerenciar o estado global do modal de agendamento (`AppointmentModalContext`), evitando prop drilling entre `Sidebar` e o modal.

**Slim Framework** foi escolhido para o backend por ser leve e sem opinião — ideal para uma API REST simples sem overhead de um framework full-stack.

**Eloquent ORM** foi usado como camada de acesso ao banco por sua sintaxe expressiva e integração direta com MySQL, sem necessidade de instalar o Laravel completo.

**Docker** orquestra os três serviços (frontend, backend, banco) com um único comando. O entrypoint do backend executa automaticamente as migrations e seeds na inicialização — zero configuração manual.

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

| Ferramenta | Versão mínima | Instalação |
|-----------|--------------|------------|
| Docker | 24+ | [docs.docker.com](https://docs.docker.com/get-started/get-docker/) |
| Docker Compose | v2+ | Incluído no Docker Desktop. No Linux: [docs.docker.com/compose](https://docs.docker.com/compose/install/) |

> **Atenção:** Use `docker compose` (sem hífen) — versão v2. A versão antiga `docker-compose` pode causar incompatibilidades.

Para verificar se está tudo pronto:
```bash
docker --version       # Docker version 24+
docker compose version # Docker Compose version v2+
```

## Variáveis de Ambiente

O projeto utiliza arquivos `.env` para configuração. Os arquivos já estão incluídos no repositório com os valores padrão para rodar localmente.

**`backend/.env`**
```env
DB_HOST=db
DB_NAME=clinica_db
DB_USER=user
DB_PASSWORD=password
```

**`src/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> Nenhuma configuração adicional é necessária para rodar localmente com Docker. Os valores acima são os padrões utilizados pelo `docker-compose.yml`.

## Como rodar localmente

```bash
git clone https://github.com/rodrigogp2604/dashboard-soitic.git
cd dashboard-soitic/soitic-test-repo
docker compose up --build
```

Aguarde todos os serviços subirem. O terminal vai exibir:
```
clinica_backend | Migração finalizada.
clinica_backend | Seed finalizado.
clinica_frontend | ✓ Ready in Xms
```

Acesse:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **MySQL:** localhost:3307 (user: `user`, password: `password`, database: `clinica_db`)

> As migrations e seeds rodam automaticamente — nenhum comando adicional necessário.

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
│   │   ├── Services/           # Mappers e regras de negócio
│   │   └── Migrations/         # Migrations das tabelas
│   ├── config/
│   │   └── database.php        # Configuração do Eloquent
│   ├── public/
│   │   └── index.php           # Entry point do Slim
│   ├── migrate.php             # Script de migrations
│   ├── seed.php                # Script de seed
│   ├── entrypoint.sh           # Inicialização automática do container
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
- Atualização automática da lista após novo agendamento
- Dark mode com persistência em `localStorage`
- Layout responsivo com menu hamburguer no mobile
- Loading states com skeleton animado
- Empty state para listas vazias

## API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/appointments` | Lista todos os agendamentos com dados do paciente |
| POST | `/appointments` | Cria um novo agendamento |
| GET | `/patients` | Lista pacientes ativos |