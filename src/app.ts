// Bootstrap da SPA com IndexedDB, rotas e navbar
import { initRouter } from './router';
import { db } from './services/indexedDb';

async function bootstrap() {
  try {
    await db.init();
  } catch (e) {
    console.error('Falha ao iniciar banco IndexedDB:', e);
    alert('Erro ao iniciar banco local. Ver console.');
  }
  initRouter();
}

document.addEventListener('DOMContentLoaded', bootstrap);