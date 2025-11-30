import { ClientesStore } from '../../services/indexedDb';

export function renderCadastroCliente() {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <section>
      <h1>Novo Cliente</h1>
      <form id="formCliente" class="form">
        <label>Nome<input name="nome" required /></label>
        <label>Email<input name="email" type="email" /></label>
        <button type="submit" class="btn">Salvar</button>
        <a href="/clientes" class="btn btn-secondary">Cancelar</a>
      </form>
    </section>
  `;

  const form = document.getElementById('formCliente') as HTMLFormElement;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const nome = String(fd.get('nome') || '').trim();
    const email = String(fd.get('email') || '').trim() || undefined;

    if (!nome) {
      alert('Nome é obrigatório');
      return;
    }

    await ClientesStore.add({ nome, email });
    alert('Cliente cadastrado!');
    history.pushState({}, '', '/clientes');
    const { renderListagemClientes } = await import('./listagemClientes');
    renderListagemClientes();
  });
}