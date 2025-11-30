# atvv
SPA Atlantis com IndexedDB para persistência local (clientes, acomodações, hospedagens, documentos).

Pré-requisitos:
- Node.js 18+ instalado (verifique com `node -v`)
- NPM (vem com Node) ou Yarn/PNPM
- VS Code (opcional) com extensão “TypeScript” habilitada

Instalação:
1) Abra o terminal na pasta do projeto:
   - Windows Explorer: Shift + botão direito > “Abrir janela do PowerShell aqui”
   - Ou no VS Code: Terminal > New Terminal

2) Instale dependências:
```
npm i
```

Rodando em desenvolvimento:
```
npm run dev
```
- Abra o endereço exibido pelo Vite (por padrão http://localhost:5173).
- Navegue pelos links do navbar: Home, Clientes, Acomodações, Hospedagens.

Build de produção:
```
npm run build
```
Preview do build:
```
npm run preview
```
- Abre um servidor estático para testar o conteúdo de `dist/`.

Estrutura principal:
- src/index.html: HTML da SPA
- src/app.ts: bootstrap da aplicação e inicialização do IndexedDB
- src/router.ts: roteamento por History API
- src/pages/*: páginas de listagem e cadastro
- src/services/indexedDb.ts: serviço de banco (CRUD) no navegador

O que o banco faz:
- Usa IndexedDB para persistir “clientes”, “acomodacoes”, “hospedagens” e “documentos”.
- Não requer backend nem servidor externo.

Resolução de problemas:
- Erro de módulo/import: confirme Node 18+ e rode via `npm run dev` (Vite).
- Página em branco: abra o console do navegador (F12) e veja mensagens; garanta que `db.init()` não falhou.
- Porta ocupada: `npm run dev -- --port 5174`.
- Trocar navegador: use Chrome/Edge (IndexedDB habilitado).

