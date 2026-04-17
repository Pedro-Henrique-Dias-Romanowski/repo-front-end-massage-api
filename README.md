# web-massage

Front-end da aplicação **Meri Terapias Integrativas & SPA**, consumidor do
back-end [`massage-api`](../api-massage). Apresenta a vitrine de serviços
(massagens) e direciona o cliente ao WhatsApp para contato.

Construído com React 19, TypeScript, Vite, TailwindCSS, React Router e
TanStack Query.

## Requisitos

- Node.js 20+
- npm 10+
- Back-end `massage-api` rodando (por padrão em `http://localhost:8080`)

## Configuração

1. Instalar as dependências:

   ```bash
   npm install
   ```

2. (Opcional) Criar um arquivo `.env` na raiz apontando para o back-end, caso a
   URL não seja a padrão:

   ```env
   VITE_API_URL=http://localhost:8080
   ```

   Se omitido, a aplicação usa `http://localhost:8080`.

## Scripts

| Comando           | Descrição                                     |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Sobe o servidor de desenvolvimento (Vite).    |
| `npm run build`   | Gera o build de produção em `dist/`.          |
| `npm run preview` | Serve o build de produção localmente.         |
| `npm run lint`    | Executa o ESLint.                             |

Com o back-end rodando, execute `npm run dev` e acesse
`http://localhost:5173`.
