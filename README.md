# ASA Inc.

Plataforma acadêmica para conectar alunos que precisam de ajuda com alunos que podem ensinar.

A proposta do projeto é permitir que estudantes encontrem mentores para matérias específicas, criem pedidos de atendimento, conversem por chat, avaliem a experiência e acompanhem tudo em uma dashboard.

---

## Tecnologias usadas

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL (Neon)
- NextAuth
- Zod

---

## Funcionalidades atuais

### Autenticação
- Cadastro de usuário
- Login com credenciais
- Sessão com NextAuth
- Perfil do usuário logado

### Mentores
- Listagem de mentores
- Página de detalhes do mentor
- Exibição de matérias, preço, nota e avaliações

### Pedidos
- Criação de pedido
- Listagem de pedidos do usuário logado
- Exibição de status do pedido

### Chat
- Envio de mensagens
- Listagem de mensagens por pedido
- Chat salvo no banco

### Dashboard
- Resumo com dados reais
- Pedidos recentes
- Contagem de chats
- Métricas principais

### Avaliações
- Rota criada para enviar avaliação
- Atualização de média e total de avaliações do mentor

### Interface
- Layout desktop
- Layout mobile
- Navbar desktop
- Bottom navigation mobile
- Home responsiva
- Páginas principais padronizadas

---

## Estrutura principal do projeto

```bash id="13003"
src/
  app/
    api/
    avaliacoes/
    cadastro/
    chat/
    dashboard/
    login/
    mentores/
    pedidos/
    perfil/
  components/
    cards/
    layout/
    navigation/
    sections/
    ui/
    providers/
  config/
  lib/
    data/
    mappers/
  types/

prisma/
  schema.prisma
  seed.ts