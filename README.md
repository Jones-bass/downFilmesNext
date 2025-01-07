# Aplicação Fullstack para Gerenciamento de Filmes

## Este projeto é uma aplicação fullstack desenvolvida com Next.js e TailwindCSS. Utiliza o Prisma para gerenciamento do banco de dados e o Supabase para autenticação. O objetivo principal é explorar e testar a abordagem fullstack, integrando frontend e backend em uma única aplicação para listar, cadastrar e deletar filmes.

# 🚀 Tecnologias Utilizadas

## 📋 Funcionalidades Principais


📌Cadastro de filmes com título, descrição e ano de lançamento.

📌 Listagem de todos os filmes cadastrados.

📌 Exclusão de filmes cadastrados.

<div align="left">
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="40" alt="nextjs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
</div>

---

# 🔐 Autenticação

- Registro e login de usuários utilizando o Supabase.

- Controle de acesso a funcionalidades restritas com autenticação segura.

# 🚀 Fluxo de Uso

1. Cadastro de Filmes
Os usuários autenticados podem cadastrar novos filmes fornecendo as informações necessárias.

2. Listagem de Filmes
Todos os filmes cadastrados são exibidos em uma lista com detalhes básicos, permitindo fácil visualização.

3. Exclusão de Filmes
Filmes podem ser removidos do sistema por meio de um botão de exclusão disponível na listagem.

# 📦 Exemplo de Uso

### Cadastro de Filme

POST /api/movies
Content-Type: application/json

```bash
{
  "title": "Inception",
  "description": "Um thriller psicológico sobre sonhos dentro de sonhos.",
  "year": 2010
}
```


### Listagem de Filmes

GET /api/movies

Resposta:

```bash
[
  {
    "id": 1,
    "title": "Inception",
    "description": "Um thriller psicológico sobre sonhos dentro de sonhos.",
    "year": 2010
  }
]
```


### Exclusão e Edição de Filme

UPDATE /api/movies/:id

DELETE /api/movies/:id

📝 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.