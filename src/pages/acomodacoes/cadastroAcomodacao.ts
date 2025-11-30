import { AcomodacoesStore } from '../../services/indexedDb';

export function renderCadastroAcomodacao() {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <section>
      <h1>Nova Acomodação</h1>
      <form id="formAcomodacao" class="form">
        <label>Nome<input name="nome" required /></label>
        <label>Capacidade<input name="capacidade" type="number" min="1" required /></label>
        <button type="submit" class="btn">Salvar</button>
        <a href="/acomodacoes" class="btn btn-secondary">Cancelar</a>
      </form>
    </section>
  `;

  const form = document.getElementById('formAcomodacao') as HTMLFormElement;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const nome = String(fd.get('nome') || '').trim();
    const capacidade = Number(fd.get('capacidade') || 0);

    if (!nome || capacidade < 1) {
      alert('Preencha os campos corretamente');
      return;
    }

    await AcomodacoesStore.add({ nome, capacidade });
    alert('Acomodação cadastrada!');
    history.pushState({}, '', '/acomodacoes');
    const { renderListagemAcomodacoes } = await import('./listagemAcomodacoes');
    renderListagemAcomodacoes();
  });
}