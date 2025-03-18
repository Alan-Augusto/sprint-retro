# Sprint Retro

> **Sprint Retro** é uma aplicação construída para facilitar a retrospectiva das sprints de um time ágil. Com ela, os membros do time podem compartilhar feedbacks sobre a sprint de forma simples, categorizada e organizada. A aplicação oferece uma maneira de registrar mensagens relacionadas a três categorias: **Bom**, **Ruim** e **Repetir**, além de permitir a criação e o gerenciamento de sprints.

## Funcionalidades

### Para o Time:
- **Seleção de Sprint**: O usuário pode selecionar a sprint da qual deseja fazer a retrospectiva ou criar uma nova sprint.
- **Envio de Mensagens**: Os membros do time podem enviar mensagens que serão categorizadas em três categorias:
  - **🎉 Foi bom**: Feedback positivo sobre a sprint.
  - **😞 Não foi bom**: Feedback negativo ou algo que não funcionou bem.
  - **🌱 Queremos repetir**: Feedback sobre o que deve ser mantido para as próximas sprints.
- **Mensagens Organizadas**: As mensagens são exibidas em categorias separadas, facilitando a visualização das opiniões do time.
- **Compartilhamento de Link**: O time pode gerar um link direto para a retrospectiva, facilitando o compartilhamento.

### Para o Administrador:
- **Criação de Sprint**: O administrador do time pode criar novas sprints facilmente.
- **Gerenciamento de Times**: O administrador pode criar novos times e adicionar membros ao time existente.

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Next.js** (React Framework): Para criação de interfaces de usuário altamente interativas e rápidas.
- **TypeScript**: Para garantir uma experiência de desenvolvimento mais segura e robusta.
- **Prisma**: Para gerenciamento eficiente do banco de dados, utilizando um banco PostgreSQL.
- **Tailwind CSS**: Para estilização eficiente e rápida.
- **Radix UI**: Para componentes acessíveis e personalizáveis.
- **Lucide Icons**: Para ícones leves e de alta qualidade.
- **Vercel**: Para deploy da aplicação.

## Como Rodar o Projeto Localmente

### 1. Clonando o Repositório

```bash
git clone https://github.com/SEU_USUARIO/sprint-retro.git
cd sprint-retro
```

### 2. Instalando Dependências

```bash
npm install
```

Ou, se preferir usar o Yarn:

```bash
yarn install
```

### 3. Configurando o Banco de Dados

Certifique-se de ter um banco de dados PostgreSQL configurado. Você pode usar o Prisma para gerar as migrações e configurar o banco de dados localmente.

Crie um arquivo `.env` com a URL de conexão do banco de dados:

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

Após configurar a URL de conexão, execute o comando para gerar as migrações e aplicar ao banco de dados:

```bash
npx prisma migrate dev
```

### 4. Iniciando o Servidor de Desenvolvimento

```bash
npm run dev
```

Ou, se estiver usando Yarn:

```bash
yarn dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Contribuindo

1. Fork o repositório.
2. Crie uma branch para a sua feature (`git checkout -b minha-nova-feature`).
3. Faça as alterações necessárias e commite suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Envie para o repositório (`git push origin minha-nova-feature`).
5. Crie um Pull Request.
