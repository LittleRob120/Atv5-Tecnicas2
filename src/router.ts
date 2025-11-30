// Roteador simples para SPA
type RouteHandler = () => Promise<void> | void;

const routes: Record<string, RouteHandler> = {
  '/': async () => {
    const { renderHome } = await import('./pages/home');
    renderHome();
  },
  '/clientes': async () => {
    const { renderListagemClientes } = await import('./pages/clientes/listagemClientes');
    renderListagemClientes();
  },
  '/clientes/novo': async () => {
    const { renderCadastroCliente } = await import('./pages/clientes/cadastroCliente');
    renderCadastroCliente();
  },
  '/acomodacoes': async () => {
    const { renderListagemAcomodacoes } = await import('./pages/acomodacoes/listagemAcomodacoes');
    renderListagemAcomodacoes();
  },
  '/acomodacoes/nova': async () => {
    const { renderCadastroAcomodacao } = await import('./pages/acomodacoes/cadastroAcomodacao');
    renderCadastroAcomodacao();
  },
  '/hospedagens': async () => {
    const { renderListagemHospedagens } = await import('./pages/hospedagens/listagemHospedagens');
    renderListagemHospedagens();
  },
  '/hospedagens/nova': async () => {
    const { renderCadastroHospedagem } = await import('./pages/hospedagens/cadastroHospedagem');
    renderCadastroHospedagem();
  },
};

function navigate(path: string) {
  if (location.pathname !== path) {
    history.pushState({}, '', path);
  }
  void render();
}

async function render() {
  const path = (location.pathname || '/') as keyof typeof routes;
  const route = routes[path] || routes['/'];
  await route();
}

export function initRouter() {
  window.addEventListener('popstate', () => void render());

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest?.('a[href^="/"]') as HTMLAnchorElement | null;
    if (anchor) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      if (href) navigate(href);
    }
  });

  void render();
}

export { navigate };