# Guia Completo do Frontend — Meri Terapias & SPA

> Escrito para devs backend Java que estão começando no mundo do front-end.
> Cada conceito novo é explicado com uma analogia do Spring Boot que você já conhece.

---

## Sumário

1. [O que foi criado](#1-o-que-foi-criado)
2. [Como rodar o projeto](#2-como-rodar-o-projeto)
3. [A stack escolhida e por quê](#3-a-stack-escolhida-e-por-quê)
4. [Estrutura de pastas explicada](#4-estrutura-de-pastas-explicada)
5. [Conceitos fundamentais do React](#5-conceitos-fundamentais-do-react)
6. [TypeScript no frontend](#6-typescript-no-frontend)
7. [Camada de API — como o front fala com o seu backend](#7-camada-de-api--como-o-front-fala-com-o-seu-backend)
8. [Autenticação com JWT](#8-autenticação-com-jwt)
9. [Gerenciamento de estado — Context API](#9-gerenciamento-de-estado--context-api)
10. [Roteamento — React Router](#10-roteamento--react-router)
11. [Rotas protegidas por perfil](#11-rotas-protegidas-por-perfil)
12. [Formulários com validação](#12-formulários-com-validação)
13. [Busca de dados — TanStack Query](#13-busca-de-dados--tanstack-query)
14. [Componentes de UI reutilizáveis](#14-componentes-de-ui-reutilizáveis)
15. [Estilização com Tailwind CSS](#15-estilização-com-tailwind-css)
16. [Páginas criadas](#16-páginas-criadas)
17. [Mapeamento: Backend ↔ Frontend](#17-mapeamento-backend--frontend)
18. [Variáveis de ambiente](#18-variáveis-de-ambiente)
19. [Próximos passos sugeridos](#19-próximos-passos-sugeridos)

---

## 1. O que foi criado

Um frontend completo em **React + TypeScript** para o sistema **Meri Terapias Integrativas e SPA**, que consome 100% dos endpoints da sua API Java/Spring Boot.

### Funcionalidades implementadas

| Funcionalidade | Quem pode usar |
|---|---|
| Página inicial com destaque dos serviços | Todos |
| Catálogo de massagens com preço e duração | Todos |
| Agendamento de sessão (cliente ou visitante) | Todos |
| Consultar agendamento por ID + código de segurança | Todos |
| Criar conta (cadastro) | Todos |
| Login com JWT | Todos |
| Ver e editar perfil | Cliente autenticado |
| Excluir conta | Cliente autenticado |
| Painel admin com tabela de agendamentos | Admin autenticado |

---

## 2. Como rodar o projeto

### Pré-requisitos
- Node.js 18+ instalado
- Sua API Java rodando em `localhost:8080`

### Passos

```bash
# 1. Entre na pasta do projeto
cd C:\massage-api\web-massage

# 2. Crie o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Instale as dependências (já foi feito, mas caso precise)
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O frontend vai abrir em `http://localhost:5173`.

> **Analogia Java:** o `npm run dev` é como rodar `mvn spring-boot:run`. Ele inicia um servidor local com **Hot Module Replacement (HMR)** — toda vez que você salva um arquivo `.tsx`, a página atualiza sozinha no navegador, sem precisar reiniciar o servidor. É como o DevTools do Spring Boot, mas em tempo real.

### Outros comandos úteis

```bash
npm run build    # Gera a pasta dist/ para produção (equivale a mvn package)
npm run preview  # Serve a build de produção localmente para teste
```

---

## 3. A stack escolhida e por quê

### Vite
**O que é:** Ferramenta de build e servidor de desenvolvimento.
**Analogia:** É o Maven/Gradle do frontend. Gerencia dependências, compila TypeScript, empacota tudo para produção.
**Por que não Create React App (CRA)?** O CRA foi descontinuado. O Vite é o padrão atual da indústria — muito mais rápido.

### React 19
**O que é:** Biblioteca JavaScript para construir interfaces.
**Analogia:** Pense no React como Thymeleaf ou JSP, mas muito mais poderoso. Em vez de gerar HTML no servidor, o React gera e atualiza HTML no navegador do usuário em tempo real, sem recarregar a página.

### TypeScript
**O que é:** JavaScript com tipagem estática.
**Analogia:** É exatamente como a diferença entre Java (tipado) e Python (dinâmico). TypeScript traz para o JS o conforto que você já tem no Java: erros em tempo de compilação, autocompletar na IDE, interfaces.

### React Router v6
**O que é:** Gerencia a navegação entre páginas.
**Analogia:** É o equivalente ao mapeamento de rotas do Spring MVC (`@RequestMapping`, `@GetMapping`). Cada `<Route path="/rota" element={<Componente />} />` é como um `@GetMapping("/rota")` que retorna uma "view".

### TanStack Query (React Query)
**O que é:** Gerencia chamadas HTTP, cache e estado de loading/error automaticamente.
**Analogia:** Imagine um `@Cacheable` do Spring combinado com um `@Async`. Ele faz a requisição, guarda em cache por um tempo configurável e mostra o estado de carregamento automaticamente.

### React Hook Form + Zod
**O que é:** Gerenciamento de formulários com validação.
**Analogia:** É o equivalente às anotações `@Valid`, `@NotNull`, `@Email`, `@Size` do Jakarta Validation que você usa nos seus DTOs no backend — mas rodando no navegador antes mesmo da requisição sair.

### Axios
**O que é:** Cliente HTTP.
**Analogia:** É como o `RestTemplate` ou o `WebClient` do Spring, mas para o frontend. Faz requisições HTTP para a sua API.

### Tailwind CSS
**O que é:** Framework de CSS utilitário.
**Analogia:** Em vez de escrever arquivos `.css` separados, você aplica classes diretamente no HTML/JSX. É controverso no começo, mas extremamente produtivo depois de pegar o jeito.

### Lucide React
**O que é:** Biblioteca de ícones SVG prontos para uso como componentes React.

---

## 4. Estrutura de pastas explicada

```
web-massage/
├── public/                   # Arquivos estáticos (favicon, imagens públicas)
├── src/
│   ├── api/                  # Camada de acesso à API (como um @Service que faz HTTP)
│   │   ├── client.ts         # Configuração do Axios (base URL, interceptors)
│   │   ├── auth.ts           # Função de login
│   │   ├── clientes.ts       # CRUD de clientes
│   │   ├── massagens.ts      # Busca de massagens
│   │   └── agendamentos.ts   # CRUD de agendamentos
│   │
│   ├── types/
│   │   └── index.ts          # Interfaces TypeScript (como os seus DTOs Java)
│   │
│   ├── utils/
│   │   └── format.ts         # Funções utilitárias (formatar moeda, data, extrair erros)
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx   # Estado global de autenticação (como um @SessionScoped bean)
│   │
│   ├── routes/
│   │   └── ProtectedRoute.tsx  # Guard de rota por perfil (como @PreAuthorize no Spring)
│   │
│   ├── components/           # Componentes reutilizáveis (como fragments/includes do Thymeleaf)
│   │   ├── ui/               # Componentes genéricos de interface
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   └── layout/           # Estrutura visual da página
│   │       ├── Header.tsx    # Barra de navegação superior
│   │       ├── Footer.tsx    # Rodapé
│   │       └── AppLayout.tsx # Container que envolve todas as páginas
│   │
│   ├── pages/                # Telas da aplicação (uma por rota)
│   │   ├── public/           # Acessíveis sem login
│   │   │   ├── HomePage.tsx
│   │   │   ├── ServicosPage.tsx
│   │   │   ├── AgendarPage.tsx
│   │   │   └── ConsultarAgendamentoPage.tsx
│   │   ├── auth/             # Login e cadastro
│   │   │   ├── LoginPage.tsx
│   │   │   └── CadastroPage.tsx
│   │   ├── cliente/          # Área restrita ao perfil CLIENTE
│   │   │   └── PerfilPage.tsx
│   │   └── admin/            # Área restrita ao perfil ADMIN
│   │       └── AdminAgendamentosPage.tsx
│   │
│   ├── App.tsx               # Ponto central: define todas as rotas
│   ├── main.tsx              # Ponto de entrada da aplicação (como o main() do Java)
│   └── index.css             # CSS global (Tailwind + Google Fonts)
│
├── .env.example              # Modelo de variáveis de ambiente
├── tailwind.config.js        # Configuração do Tailwind (cores, fontes customizadas)
├── vite.config.ts            # Configuração do Vite (bundler)
├── tsconfig.json             # Configuração do TypeScript
└── package.json              # Dependências (como o pom.xml)
```

---

## 5. Conceitos fundamentais do React

### O que é um Componente?

No React, tudo é um **componente** — uma função JavaScript/TypeScript que retorna HTML (chamado de **JSX**).

```tsx
// Isso é um componente React
function BotaoVerde() {
  return <button className="bg-green-500 text-white px-4 py-2">Clique aqui</button>;
}
```

**Analogia Java:** Um componente é como um método de um Controller que retorna uma View parcial. Você cria uma vez e reutiliza em vários lugares.

---

### O que é JSX?

JSX é a sintaxe que mistura HTML com JavaScript/TypeScript dentro de funções React.

```tsx
function Saudacao({ nome }: { nome: string }) {
  return <h1>Olá, {nome}!</h1>;  // As chaves {} executam JavaScript dentro do HTML
}
```

**Analogia Java:** É como o Thymeleaf `th:text="${nome}"`, mas escrito diretamente junto com o HTML, dentro do arquivo TypeScript.

---

### O que são Props?

Props (propriedades) são os parâmetros que você passa para um componente.

```tsx
// Componente recebe "nome" como prop
function Card({ nome, valor }: { nome: string; valor: number }) {
  return (
    <div>
      <h2>{nome}</h2>
      <p>R$ {valor}</p>
    </div>
  );
}

// Chamando o componente e passando as props
<Card nome="Massagem Relaxante" valor={150} />
```

**Analogia Java:** Props são como parâmetros de método. Você define o que o componente precisa receber, e quem o usa deve fornecer esses valores.

---

### O que é Estado (State)?

Estado é uma variável que, quando muda, faz o componente renderizar novamente na tela automaticamente.

```tsx
import { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0); // count = valor atual, setCount = setter

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicado {count} vezes
    </button>
  );
}
```

**Analogia Java:** É como um campo de instância de um bean `@SessionScoped` — quando você muda o valor via o setter (`setCount`), a "tela" (o componente) é atualizada automaticamente para refletir o novo valor.

---

### O que são Hooks?

Hooks são funções especiais do React que começam com `use`. Eles permitem usar funcionalidades do React dentro de componentes funcionais.

| Hook | O que faz |
|---|---|
| `useState` | Cria uma variável de estado reativa |
| `useEffect` | Executa código quando algo muda (ex: quando componente aparece na tela) |
| `useCallback` | Memoriza uma função para evitar recriações desnecessárias |
| `useContext` | Acessa um contexto global (como injeção de dependência) |
| `useQuery` | Da TanStack Query — faz requisições HTTP com cache automático |
| `useMutation` | Da TanStack Query — executa ações que modificam dados (POST/PATCH/DELETE) |
| `useForm` | Do React Hook Form — gerencia formulários |
| `useNavigate` | Do React Router — navega para outra rota por código |
| `useParams` | Do React Router — lê parâmetros da URL (ex: `/perfil/:id`) |

---

## 6. TypeScript no frontend

O arquivo `src/types/index.ts` contém todas as interfaces que espelham os seus DTOs Java:

```typescript
// No backend Java você tem:
// public record ClienteResponseDTO(UUID id, String nome, String email, String telefone) {}

// No frontend TypeScript você tem:
interface ClienteResponse {
  id: string;      // UUID vira string no JSON
  nome: string;
  email: string;
  telefone: string;
}
```

**Regra prática:** Para cada DTO do seu backend, existe uma interface TypeScript correspondente no arquivo `types/index.ts`. Isso garante que, se você mudar um DTO no backend, o TypeScript vai apontar os erros no frontend durante o desenvolvimento.

---

## 7. Camada de API — como o front fala com o seu backend

### `src/api/client.ts` — A configuração central do Axios

```typescript
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
```

**Analogia Java:** É como configurar um `RestTemplate` ou `WebClient` com a URL base e os headers padrão.

#### Interceptors — O equivalente aos Filters do Spring

O Axios tem **interceptors** que funcionam exatamente como os `OncePerRequestFilter` do Spring Security:

```typescript
// Interceptor de REQUEST: roda antes de CADA requisição sair
// → Injeta o token JWT no header Authorization automaticamente
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('@meri:auth');
  if (raw) {
    const { token } = JSON.parse(raw);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de RESPONSE: roda depois de CADA resposta chegar
// → Se o servidor retornar 401, redireciona para o login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@meri:auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
```

**Analogia Java:** O interceptor de request é idêntico ao `SecurityFilter` que você criou no backend — ele pega o token do storage antes de cada requisição e adiciona no header, assim como o seu `SecurityFilter` pega o token do header e valida antes de cada request chegar no controller.

### `src/api/clientes.ts` — Funções que chamam os endpoints

```typescript
import { api } from './client';
import type { ClienteRequest, ClienteResponse } from '../types';

// POST /v1/clientes
export const cadastrarCliente = (data: ClienteRequest) =>
  api.post<ClienteResponse>('/v1/clientes', data).then((r) => r.data);

// GET /v1/clientes/{id}
export const buscarCliente = (id: string) =>
  api.get<ClienteResponse>(`/v1/clientes/${id}`).then((r) => r.data);

// PATCH /v1/clientes/{id}
export const atualizarCliente = (id: string, data: AtualizacaoClienteRequest) =>
  api.patch<ClienteResponse>(`/v1/clientes/${id}`, data).then((r) => r.data);

// DELETE /v1/clientes/{id}
export const deletarCliente = (id: string) =>
  api.delete(`/v1/clientes/${id}`);
```

**Analogia Java:** Cada função aqui é como uma chamada ao seu `ClienteController`. O frontend não acessa o banco diretamente — ele chama a sua API REST, exatamente como um cliente externo faria.

---

## 8. Autenticação com JWT

### Como funciona o fluxo completo

```
Usuário digita email/senha
        ↓
Frontend chama POST /v1/login
        ↓
Backend valida, retorna { token, id, perfilAtribuido, dataHoraLogin }
        ↓
Frontend salva token no localStorage (memória do navegador)
        ↓
A partir daí, TODA requisição inclui "Authorization: Bearer <token>" no header
        ↓
Quando clica em "Sair", o token é removido do localStorage
```

### Onde o token fica salvo

O token fica salvo no `localStorage` do navegador, com a chave `@meri:auth`:

```json
{
  "id": "uuid-do-usuario",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "perfil": "CLIENTE"
}
```

**Importante:** O token tem validade de **30 minutos** (conforme configurado no seu `TokenService.java`). Após isso, o backend retorna 401, o interceptor do Axios detecta e redireciona para o login automaticamente.

**Analogia Java:** O `localStorage` do navegador é como a `HttpSession` do Servlet, mas do lado do cliente. Persiste enquanto o navegador não for fechado (ou até você remover manualmente).

---

## 9. Gerenciamento de estado — Context API

### `src/contexts/AuthContext.tsx`

O **Context API** é a solução nativa do React para compartilhar estado entre componentes sem precisar passar props manualmente de pai para filho.

**Analogia Java:** É muito parecido com o padrão de injeção de dependências do Spring. Você cria um "bean" de estado (`AuthContext`), envolve a aplicação com ele (`AuthProvider`), e qualquer componente filho pode "injetar" e usar esse estado com `useAuth()`.

```tsx
// 1. Cria o contexto (define a "interface do bean")
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// 2. O Provider é como um @Bean que fornece o estado para toda a árvore
export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadFromStorage);

  const signIn = async (data) => { /* chama a API e salva o token */ };
  const signOut = () => { /* remove o token */ };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook para "injetar" o contexto em qualquer componente
export function useAuth() {
  return useContext(AuthContext);
}
```

### Como usar em qualquer página

```tsx
// Em qualquer componente da aplicação:
function MeuComponente() {
  const { user, isAuthenticated, isAdmin, signOut } = useAuth();

  if (!isAuthenticated) return <p>Você precisa fazer login.</p>;

  return <p>Olá, {user.perfil}!</p>;
}
```

---

## 10. Roteamento — React Router

### `src/App.tsx` — O mapa de rotas da aplicação

```tsx
<Routes>
  <Route element={<AppLayout />}>           {/* Layout que envolve todas as páginas */}

    {/* Rotas públicas */}
    <Route path="/"          element={<HomePage />} />
    <Route path="/servicos"  element={<ServicosPage />} />
    <Route path="/agendar"   element={<AgendarPage />} />
    <Route path="/login"     element={<LoginPage />} />
    <Route path="/cadastro"  element={<CadastroPage />} />

    {/* Rotas protegidas por perfil */}
    <Route element={<ProtectedRoute requiredRole="CLIENTE" />}>
      <Route path="/perfil/:id" element={<PerfilPage />} />
    </Route>

    <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
      <Route path="/admin/agendamentos" element={<AdminAgendamentosPage />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
```

**Analogia Java:** Isso é exatamente o seu `SecurityConfiguration.java`, onde você define quais rotas são públicas e quais exigem autenticação:

```java
// No backend (SecurityConfiguration.java):
.requestMatchers(HttpMethod.GET, "/v1/massagens").permitAll()
.requestMatchers(HttpMethod.POST, "/v1/clientes").permitAll()
.requestMatchers("/v1/agendamentos").hasRole("ADMIN")

// No frontend (App.tsx):
<Route path="/servicos" element={<ServicosPage />} />           // permitAll()
<Route element={<ProtectedRoute requiredRole="ADMIN" />}>       // hasRole("ADMIN")
  <Route path="/admin/agendamentos" element={...} />
</Route>
```

### Navegação por código

Para navegar para outra rota dentro de um componente:

```tsx
import { useNavigate } from 'react-router-dom';

function MeuComponente() {
  const navigate = useNavigate();

  function irParaHome() {
    navigate('/');               // Equivale a response.sendRedirect("/")
  }
}
```

### Parâmetros de rota

```tsx
import { useParams } from 'react-router-dom';

// Rota definida como: /perfil/:id
function PerfilPage() {
  const { id } = useParams<{ id: string }>();
  // Agora "id" é o UUID da URL: /perfil/550e8400-e29b-41d4-a716-446655440000
}
```

**Analogia Java:** É o equivalente ao `@PathVariable` do Spring MVC.

---

## 11. Rotas protegidas por perfil

### `src/routes/ProtectedRoute.tsx`

```tsx
export function ProtectedRoute({ requiredRole }: { requiredRole?: Perfil }) {
  const { isAuthenticated, user } = useAuth();

  // Se não está autenticado, redireciona para o login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Se está autenticado mas não tem o perfil necessário, vai para home
  if (requiredRole && user?.perfil !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Tudo certo: renderiza a rota filha
  return <Outlet />;
}
```

**Analogia Java:** É o equivalente ao `@PreAuthorize("hasRole('ADMIN')")` do Spring Security. Em vez de lançar um 403, ele redireciona o usuário para outra página.

O `<Outlet />` é um placeholder que diz "renderize a rota filha aqui". Funciona como o layout pattern do Thymeleaf.

---

## 12. Formulários com validação

### React Hook Form + Zod

**Analogia Java:** O Zod faz o mesmo papel das anotações `@NotBlank`, `@Email`, `@Size` do Jakarta Validation. O React Hook Form gerencia o formulário (como o `@ModelAttribute` do Spring MVC).

```tsx
// 1. Define o schema de validação (equivale às anotações nos DTOs Java)
const schema = z.object({
  email: z.string().email('E-mail inválido'),          // @Email
  senha: z.string()
    .min(5, 'Mínimo de 5 caracteres')                  // @Size(min=5)
    .max(15, 'Máximo de 15 caracteres'),               // @Size(max=15)
  nome: z.string().min(2, 'Nome muito curto'),          // @NotBlank + tamanho
});

// 2. Usa o hook do formulário
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),   // Conecta o Zod ao React Hook Form
});

// 3. No JSX:
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />            {/* register = @ModelAttribute */}
  {errors.email && <p>{errors.email.message}</p>}  {/* Exibe o erro */}
  <button type="submit">Enviar</button>
</form>
```

---

## 13. Busca de dados — TanStack Query

### `useQuery` — Para buscar dados (GET)

```tsx
const { data: massagens, isLoading, isError } = useQuery({
  queryKey: ['massagens'],         // Chave de cache (como o nome do @Cacheable)
  queryFn: listarMassagens,        // A função que faz a requisição GET
  staleTime: 1000 * 60 * 5,        // Cache válido por 5 minutos
});
```

O TanStack Query cuida automaticamente de:
- Mostrar estado de `isLoading` (primeira vez que busca)
- Guardar em cache pelo tempo configurado
- Refazer a requisição se o dado ficar "velho" (stale)
- Tratar erros com `isError`

**Analogia Java:** É como `@Cacheable` + gerenciamento automático de estado de loading, tudo em um.

### `useMutation` — Para ações que mudam dados (POST/PATCH/DELETE)

```tsx
const mutation = useMutation({
  mutationFn: criarAgendamento,   // A função que faz o POST
  onSuccess: (data) => {
    toast('success', 'Agendamento criado!');
  },
  onError: (err) => {
    toast('error', extractErrorMessage(err));
  },
});

// Para executar:
mutation.mutate({ idMassagem: '...', dataInicio: '...' });
```

**Analogia Java:** É como chamar um `@Service` de forma assíncrona com callbacks de sucesso e erro.

---

## 14. Componentes de UI reutilizáveis

Foram criados componentes genéricos na pasta `src/components/ui/` que são usados em todas as páginas:

### Button (`src/components/ui/Button.tsx`)
Botão reutilizável com variantes e estado de loading.

```tsx
<Button variant="primary" size="lg" loading={mutation.isPending}>
  Confirmar
</Button>

<Button variant="danger" size="sm" onClick={handleDelete}>
  Excluir conta
</Button>

// Variantes disponíveis: primary | secondary | ghost | danger
// Tamanhos: sm | md | lg
```

### Input (`src/components/ui/Input.tsx`)
Campo de entrada com label, mensagem de erro e hint integrados.

```tsx
<Input
  label="E-mail"
  type="email"
  placeholder="seu@email.com"
  error={errors.email?.message}   // Exibe mensagem de erro em vermelho
  hint="Nunca compartilharemos seu e-mail."
  {...register('email')}
/>
```

### Card (`src/components/ui/Card.tsx`)
Container com borda e sombra sutil.

```tsx
<Card>
  <h2>Massagem Relaxante</h2>
  <p>Descrição aqui...</p>
</Card>
```

### Modal (`src/components/ui/Modal.tsx`)
Dialog de confirmação ou formulário.

```tsx
<Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Confirmar exclusão">
  <p>Tem certeza?</p>
  <Button onClick={handleDelete}>Confirmar</Button>
</Modal>
```

### Toast (`src/components/ui/Toast.tsx`)
Notificações temporárias de sucesso/erro (aparecem no canto inferior direito).

```tsx
const { toast } = useToast();

toast('success', 'Agendamento criado com sucesso!');
toast('error', 'E-mail já cadastrado.');
```

**Analogia Java:** Esses componentes são como métodos de uma classe `@Component` utilitária — criados uma vez e usados em vários lugares da aplicação.

---

## 15. Estilização com Tailwind CSS

Tailwind usa classes utilitárias diretamente no JSX, eliminando a necessidade de arquivos `.css` separados.

### Exemplos básicos

```tsx
// Layout
<div className="flex items-center gap-4">         {/* display:flex, align-items:center, gap:1rem */}
<div className="grid grid-cols-3 gap-6">          {/* CSS Grid com 3 colunas */}

// Espaçamento
<div className="p-6">                             {/* padding: 1.5rem */}
<div className="px-4 py-2">                       {/* padding horizontal e vertical */}
<div className="mt-4 mb-8">                       {/* margin-top e margin-bottom */}

// Texto
<p className="text-sm font-medium text-brand-700"> {/* font-size: 0.875rem, cor customizada */}
<h1 className="font-serif text-4xl">               {/* font-family: Playfair Display */}

// Cores (do tema customizado em tailwind.config.js)
<div className="bg-brand-50 border border-brand-200">
<button className="bg-brand-700 hover:bg-brand-800 text-white">

// Responsividade (mobile-first)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                 mobile          tablet            desktop
```

### Tema customizado (`tailwind.config.js`)

As cores `brand` e `gold` foram definidas para combinar com a identidade visual da Meri Terapias:

```js
colors: {
  brand: {
    50:  '#fdf8f6',  // quase branco com tom de rosa suave
    100: '#f2e8e5',
    // ...
    800: '#65524c',  // marrom escuro
    900: '#3b2b28',  // quase preto com tom quente
  },
  gold: {
    500: '#c9973a',  // dourado — usado em destaques e chamadas para ação
  },
},
```

---

## 16. Páginas criadas

### Páginas públicas (sem login necessário)

#### `HomePage.tsx` — Página inicial
- Hero section com chamada para ação
- Seção de diferenciais (terapeutas certificados, agendamento fácil, horários flexíveis)
- Preview dos 3 primeiros serviços (buscados da API)
- Banner de CTA (Call to Action) para agendar

#### `ServicosPage.tsx` — Catálogo de massagens
- Lista todos os serviços da API (`GET /v1/massagens`)
- Exibe: nome, descrição, valor formatado em BRL, duração formatada
- Skeleton loading enquanto carrega (animação de placeholder)
- Botão "Agendar" em cada card que leva para o formulário pré-selecionando a massagem

#### `AgendarPage.tsx` — Formulário de agendamento
- Seleção de massagem (radio buttons com preview do serviço)
- Seletor de data e hora
- Identificação: se logado como cliente, agenda no seu nome; se visitante, pede o nome
- Opção de agendar como visitante mesmo estando logado
- Após sucesso: exibe o **código de segurança** e os detalhes do agendamento

#### `ConsultarAgendamentoPage.tsx` — Consulta por código
- Formulário com dois campos: ID do agendamento e código de segurança
- Exibe os detalhes do agendamento encontrado

### Páginas de autenticação

#### `LoginPage.tsx`
- Formulário com validação de e-mail e senha
- Após login bem-sucedido, redireciona para a home
- Link para a página de cadastro

#### `CadastroPage.tsx`
- Formulário com: nome, e-mail, telefone, senha, confirmação de senha
- Validação de senha entre 5-15 caracteres (espelha a validação do backend)
- Após cadastro, faz login automático e redireciona para a home

### Área do cliente (requer perfil CLIENTE)

#### `PerfilPage.tsx` — `/perfil/:id`
- Exibe os dados do cliente (nome, e-mail, telefone)
- Botão "Editar dados" — transforma os campos em formulário inline
- Botão "Encerrar conta" — abre um Modal de confirmação antes de deletar
- Após deletar: faz logout e redireciona para a home

### Área admin (requer perfil ADMIN)

#### `AdminAgendamentosPage.tsx` — `/admin/agendamentos`
- Cards com estatísticas: total de agendamentos, clientes vs visitantes
- Tabela com todos os agendamentos do sistema
- Badge colorido indicando se é Cliente (verde) ou Visitante (azul)
- Atualiza automaticamente a cada 30 segundos (`refetchInterval`)

---

## 17. Mapeamento: Backend ↔ Frontend

### Endpoints x Páginas/Funções

| Endpoint Backend | Método | Onde é usado no Frontend |
|---|---|---|
| `POST /v1/login` | `login()` em `api/auth.ts` | `LoginPage.tsx` via `AuthContext` |
| `POST /v1/clientes` | `cadastrarCliente()` | `CadastroPage.tsx` |
| `GET /v1/clientes/{id}` | `buscarCliente()` | `PerfilPage.tsx` |
| `PATCH /v1/clientes/{id}` | `atualizarCliente()` | `PerfilPage.tsx` |
| `DELETE /v1/clientes/{id}` | `deletarCliente()` | `PerfilPage.tsx` |
| `GET /v1/massagens` | `listarMassagens()` | `HomePage.tsx`, `ServicosPage.tsx`, `AgendarPage.tsx` |
| `GET /v1/massagens/{id}` | `buscarMassagem()` | Disponível, ainda não usado em página própria |
| `POST /v1/agendamentos` | `criarAgendamento()` | `AgendarPage.tsx` |
| `GET /v1/agendamentos` | `listarAgendamentos()` | `AdminAgendamentosPage.tsx` |
| `GET /v1/agendamentos/{id}` | `buscarAgendamento()` | `ConsultarAgendamentoPage.tsx` |

### DTOs Java x Interfaces TypeScript

| DTO Java | Interface TypeScript |
|---|---|
| `LoginRequestDTO` | `LoginRequest` |
| `LoginResponseDTO` | `LoginResponse` |
| `ClienteRequestDTO` | `ClienteRequest` |
| `AtualizacaoClienteRequestDTO` | `AtualizacaoClienteRequest` |
| `ClienteResponseDTO` | `ClienteResponse` |
| `MassagemResponseDTO` | `MassagemResponse` |
| `AgendamentoRequestDTO` | `AgendamentoRequest` |
| `AgendamentoResponseDTO` | `AgendamentoResponse` |
| `Perfil` (enum) | `type Perfil = 'CLIENTE' \| 'ADMIN'` |

---

## 18. Variáveis de ambiente

O arquivo `.env.example` mostra as variáveis disponíveis. Para usar, copie para `.env`:

```bash
cp .env.example .env
```

Conteúdo:

```env
VITE_API_URL=http://localhost:8080
```

No código, variáveis de ambiente são acessadas com `import.meta.env.NOME_DA_VAR`.

**Analogia Java:** É o equivalente às propriedades no `application.yaml`:

```yaml
# application.yaml (backend)
spring:
  security:
    jwt:
      secret: ${JWT_SECRET}
```

```env
# .env (frontend)
VITE_API_URL=http://localhost:8080
```

> **Importante:** No Vite, todas as variáveis de ambiente expostas ao frontend **devem começar com `VITE_`**. Variáveis sem esse prefixo são ignoradas por segurança.

---

## 19. Próximos passos sugeridos

Aqui estão melhorias naturais para evoluir o projeto:

### Curto prazo (mais fáceis)
- **Página de detalhe da massagem** (`/servicos/:id`) — já existe o endpoint `GET /v1/massagens/{id}`
- **Lista de agendamentos do cliente** — criar um endpoint no backend que filtra por `clienteId` e mostrar na área do cliente
- **Máscara de telefone** no formulário de cadastro (ex: `(11) 99999-9999`)

### Médio prazo
- **Tela de redefinição de senha** — depende de criar o endpoint no backend
- **Calendário visual** para o agendamento em vez do input de data padrão
- **Paginação** na tabela de agendamentos do admin (quando tiver muitos registros)

### Longo prazo
- **Testes automatizados** com Vitest e React Testing Library (equivalente ao JUnit no Java)
- **Deploy** do frontend em Vercel, Netlify ou junto com o backend no Railway/Render
- **PWA (Progressive Web App)** — permite instalar no celular como se fosse um app

---

## Referências rápidas

| O que preciso | Onde fica |
|---|---|
| Mudar URL da API | `.env` → `VITE_API_URL` |
| Adicionar uma nova rota | `src/App.tsx` |
| Adicionar um novo endpoint | `src/api/` (criar arquivo ou adicionar função) |
| Adicionar um novo tipo/interface | `src/types/index.ts` |
| Criar uma nova página | `src/pages/` (nova pasta/arquivo) |
| Mudar as cores do tema | `tailwind.config.js` → `colors` |
| Ver erros de TypeScript | Rodar `npx tsc --noEmit` no terminal |

---

*Projeto gerado e documentado com Claude Code — abril de 2026.*
