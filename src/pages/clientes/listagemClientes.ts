import { ClientesStore } from '../../services/indexedDb';

export async function renderListagemClientes() {
  const app = document.getElementById('app')!;
  const clientes = await ClientesStore.getAll();

  app.innerHTML = `
    <section>
      <h1>Clientes</h1>
      <a href="/clientes/novo" class="btn">Novo cliente</a>
      <table class="table">
        <thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Ações</th></tr></thead>
        <tbody>
          ${clientes
            .map(
              (c) => `
            <tr>
              <td>${c.id}</td>
              <td>${c.nome}</td>
              <td>${c.email ?? '-'}</td>
              <td>
                <button data-id="${c.id}" class="btn btn-danger">Excluir</button>
              </td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </section>
  `;

  app.querySelectorAll('.btn-danger').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = Number((btn as HTMLButtonElement).dataset.id);
      if (confirm('Confirma excluir?')) {
        await ClientesStore.delete(id);
        renderListagemClientes();
      }
    });
  });
}