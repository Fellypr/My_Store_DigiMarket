# 🛒 Sistema de Loja - React + ASP.NET Core + PostgreSQL

Bem-vindo ao repositório do **Sistema de Loja**, uma aplicação completa desenvolvida com **React** no frontend, **ASP.NET Core** no backend e **PostgreSQL** como banco de dados. O sistema permite **visualização de produtos**, **pesquisa inteligente**, e uma **área administrativa** para **cadastrar, editar e excluir** produtos.

---

## ✨ Funcionalidades

### 👨‍💼 Área Pública (Clientes)
- 🔍 Pesquisa de produtos pelo nome
- 🛍️ Exibição de todos os produtos disponíveis
- 📱 Interface responsiva e amigável

### 🛠️ Área Administrativa (Funcionários)
- ➕ Adição de novos produtos
- 📝 Edição de produtos existentes
- ❌ Exclusão de produtos
- 🔐 Interface segura, acessível somente a funcionários da loja

---

## 🧱 Tecnologias Utilizadas

### 🎨 Frontend
- [React](https://reactjs.org/)
- Axios para requisições HTTP
- React Router para navegação de páginas
- CSS customizado para estilização

### 🚀 Backend
- [ASP.NET Core Web API](https://learn.microsoft.com/aspnet/core/)
- Controllers e Services bem organizados
- Acesso a dados via Dapper ou Entity Framework (dependendo da sua escolha)

### 🗃️ Banco de Dados
- [PostgreSQL](https://www.postgresql.org/)
- Tabelas normalizadas para produtos
- Integração com ASP.NET via string de conexão

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js (v18+)
- .NET SDK (7.0+)
- PostgreSQL instalado
- Yarn ou NPM

### 🔧 Backend

```bash
cd backend
dotnet restore
dotnet run
