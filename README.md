# ASA Inc.

Plataforma educacional para conectar quem quer ensinar com quem quer aprender.

A ASA Inc. está sendo construída como um marketplace de educação, onde alunos, mentores e professores podem se conectar para aulas, reforço, preparação para provas, vestibulares e outras jornadas de aprendizagem.

---

## Proposta

A ideia da ASA é ser uma plataforma simples, acessível e escalável para:

- encontrar mentores por matéria
- solicitar aulas e atendimentos
- conversar por chat
- avaliar a experiência
- acompanhar tudo por dashboard
- monetizar por comissão sobre aulas realizadas

---

## Posicionamento atual

A ASA não fica mais restrita apenas a “alunos ajudando alunos”.

O foco agora é abrir espaço para diferentes perfis de ensino e aprendizagem, incluindo:

- alunos
- mentores
- professores
- reforço acadêmico
- preparação para vestibular
- nichos de alta demanda, como engenharias, medicina, veterinária, áreas militares e concursos

Tagline atual:

**Ensine. Aprenda. Conecte.**

---

## Tecnologias usadas

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL (Neon)
- NextAuth
- Zod
- Mercado Pago
- Capacitor

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
- Envio de avaliação
- Atualização de média e total de avaliações do mentor

### Admin
- Visualização de usuários
- Visualização de mentores
- Aprovação de mentor
- Mudança de status de pedidos
- Filtros administrativos

### Pagamentos
- Estrutura inicial para Mercado Pago
- Base para Pix
- Base de webhook
- Base de transações no banco

### Interface
- Layout desktop
- Layout mobile
- Navbar desktop
- Bottom navigation mobile
- Home responsiva
- Páginas principais padronizadas
- PWA publicado
- Base Android com Capacitor

---

## Como rodar localmente

### 1. Instalar dependências
```bash
npm install