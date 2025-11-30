export function renderHome() {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <section>
      <h1>Atlantis Web</h1>
      <p>Bem-vindo! Use o menu para navegar entre Clientes, Acomodações e Hospedagens.</p>
    </section>
  `;
}