import { HospedagensStore, ClientesStore, AcomodacoesStore } from '../../services/indexedDb';

export async function renderListagemHospedagens() {
  const app = document.getElementById('app')!;
  const [hospedagens, clientes, acomodacoes] = await Promise.all([
    HospedagensStore.getAll(),
    ClientesStore.getAll(),
    AcomodacoesStore.getAll(),
  ]);

  const nomeCliente = (id: number) => clientes.find((c) => c.id === id)?.nome ?? '—';
  const nomeAcomodacao = (id: number) => acomodacoes.find((a) => a.id === id)?.nome ?? '—';

  app.innerHTML = `
    <section>
      <h1>Hospedagens</h1>
      <a href="/hospedagens/nova" class="btn">Nova hospedagem</a>
      <table class="table">
        <thead><tr><th>ID</th><th>Cliente</th><th>Acomodação</th><th>Check-in</th><th>Check-out</th><th>Ações</th></tr></thead>
        <tbody>
          ${hospedagens
            .map(
              (h) => `
            <tr>
              <td>${h.id}</td>
              <td>${nomeCliente(h.clienteId)}</td>
              <td>${nomeAcomodacao(h.acomodacaoId)}</td>
              <td>${h.checkin}</td>
              <td>${h.checkout ?? '-'}</td>
              <td>
                <button data-id="${h.id}" class="btn btn-danger">Excluir</button>
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
        await HospedagensStore.delete(id);
        renderListagemHospedagens();
      }
    });
  });
}