import { HospedagensStore, ClientesStore, AcomodacoesStore } from '../../services/indexedDb';

export async function renderCadastroHospedagem() {
  const app = document.getElementById('app')!;
  const [clientes, acomodacoes] = await Promise.all([
    ClientesStore.getAll(),
    AcomodacoesStore.getAll(),
  ]);

  app.innerHTML = `
    <section>
      <h1>Nova Hospedagem</h1>
      <form id="formHospedagem" class="form">
        <label>Cliente
          <select name="clienteId" required>
            <option value="">Selecione</option>
            ${clientes.map((c) => `<option value="${c.id}">${c.nome}</option>`).join('')}
          </select>
        </label>
        <label>Acomodação
          <select name="acomodacaoId" required>
            <option value="">Selecione</option>
            ${acomodacoes.map((a) => `<option value="${a.id}">${a.nome}</option>`).join('')}
          </select>
        </label>
        <label>Check-in<input name="checkin" type="date" required /></label>
        <label>Check-out<input name="checkout" type="date" /></label>
        <button type="submit" class="btn">Salvar</button>
        <a href="/hospedagens" class="btn btn-secondary">Cancelar</a>
      </form>
    </section>
  `;

  const form = document.getElementById('formHospedagem') as HTMLFormElement;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const clienteId = Number(fd.get('clienteId') || 0);
    const acomodacaoId = Number(fd.get('acomodacaoId') || 0);
    const checkin = String(fd.get('checkin') || '').trim();
    const checkout = String(fd.get('checkout') || '').trim() || undefined;

    if (!clienteId || !acomodacaoId || !checkin) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    await HospedagensStore.add({ clienteId, acomodacaoId, checkin, checkout });
    alert('Hospedagem cadastrada!');
    history.pushState({}, '', '/hospedagens');
    const { renderListagemHospedagens } = await import('./listagemHospedagens');
    renderListagemHospedagens();
  });
}