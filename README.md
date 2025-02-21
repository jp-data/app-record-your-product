# App Record Your Product 🚀
## Sistema para gerenciamento de produtos e vendas.

## Descrição
### Uma aplicação na qual o usuário faz o cadastro de seus produtos e de suas vendas, acompanhando suas métricas através de um dashboard.

# Funcionalidades do site: 
- 📌 **Autenticação**:
  - Criação de conta e login

- 🛍️ **Gestão de Produtos**:
  - Criar, editar, deletar e listar produtos com filtros  

- 💰 **Gestão de Vendas**:
  - Criar vendas com opções de desconto e métodos de pagamento  
  - Filtrar vendas por método de pagamento, desconto aplicado ou valor integral  

- 📊 **Dashboard de Estatísticas**:
  - 📈 Faturamento total e quantidade de vendas por período  
  - 📊 Evolução do faturamento ao longo do tempo  
  - 🔝 Produtos mais vendidos  

## 💻Tecnologias utilizadas:
### - **Frontend**:
    - React
    - React hook form
    - React router dom
    - Tailwindcss para estilização
    - Zod para validação de dados 
    - Gráficos com a biblioteca recharts
    - Consumo das api's com Axios

### - Backend:
    - Typescript
    - Nestjs
    - Banco postgres utilizando uma imagem via Docker para os ambientes de desenvolvimento e de testes
    - Utilização do JwtService do Nestjs para autenticação de usuários.
    - Aplicação de testes e2e do próprio Nestjs.


## Deploy: https://app-record-your-product-joao-paulos-projects-3c6f2216.vercel.app
