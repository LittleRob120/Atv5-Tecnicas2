import { AcomodacoesStore } from '../../services/indexedDb';

export async function renderListagemAcomodacoes() {
  const app = document.getElementById('app')!;
  const acomodacoes = await AcomodacoesStore.getAll();

  app.innerHTML = `
    <section>
      <h1>Acomodações</h1>
      <a href="/acomodacoes/nova" class="btn">Nova acomodação</a>
      <table class="table">
        <thead><tr><th>ID</th><th>Nome</th><th>Capacidade</th><th>Ações</th></tr></thead>
        <tbody>
          ${acomodacoes
            .map(
              (a) => `
            <tr>
              <td>${a.id}</td>
              <td>${a.nome}</td>
              <td>${a.capacidade}</td>
              <td>
                <button data-id="${a.id}" class="btn btn-danger">Excluir</button>
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
        await AcomodacoesStore.delete(id);
        renderListagemAcomodacoes();
      }
    });
  });
}