/**
 * Serviço IndexedDB genérico para coleções do sistema (clientes, acomodações, hospedagens, documentos)
 */
export type IDBRecord = { id: number } & Record<string, unknown>;

class IndexedDbService {
  private dbName: string;
  private version: number;
  private db: IDBDatabase | null = null;
  private stores: string[];

  constructor(dbName: string, version = 1, stores: string[] = []) {
    this.dbName = dbName;
    this.version = version;
    this.stores = stores;
  }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, this.version);
      req.onupgradeneeded = () => {
        const db = req.result;
        for (const store of this.stores) {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
          }
        }
      };
      req.onsuccess = () => {
        this.db = req.result;
        resolve();
      };
      req.onerror = () => reject(req.error);
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) throw new Error('IndexedDbService not initialized. Call init().');
    const tx = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  add<T extends IDBRecord>(storeName: string, data: Omit<T, 'id'>): Promise<T> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const req = store.add(data as unknown as T);
      req.onsuccess = () => resolve({ id: req.result as number, ...(data as object) } as T);
      req.onerror = () => reject(req.error);
    });
  }

  put<T extends IDBRecord>(storeName: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const req = store.put(data);
      req.onsuccess = () => resolve(data);
      req.onerror = () => reject(req.error);
    });
  }

  getById<T extends IDBRecord>(storeName: string, id: number): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result as T | undefined);
      req.onerror = () => reject(req.error);
    });
  }

  getAll<T extends IDBRecord>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result || []) as T[]);
      req.onerror = () => reject(req.error);
    });
  }

  delete(storeName: string, id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  clear(storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}

export const db = new IndexedDbService('atvv-db', 1, [
  'clientes',
  'acomodacoes',
  'hospedagens',
  'documentos',
]);

// Facades por domínio
export const ClientesStore = {
  add: (c: Omit<{ id: number; nome: string; email?: string }, 'id'>) => db.add('clientes', c),
  put: (c: { id: number; nome: string; email?: string }) => db.put('clientes', c),
  getAll: () => db.getAll<{ id: number; nome: string; email?: string }>('clientes'),
  getById: (id: number) => db.getById<{ id: number; nome: string; email?: string }>('clientes', id),
  delete: (id: number) => db.delete('clientes', id),
};

export const AcomodacoesStore = {
  add: (a: Omit<{ id: number; nome: string; capacidade: number }, 'id'>) => db.add('acomodacoes', a),
  put: (a: { id: number; nome: string; capacidade: number }) => db.put('acomodacoes', a),
  getAll: () => db.getAll<{ id: number; nome: string; capacidade: number }>('acomodacoes'),
  getById: (id: number) => db.getById<{ id: number; nome: string; capacidade: number }>('acomodacoes', id),
  delete: (id: number) => db.delete('acomodacoes', id),
};

export const HospedagensStore = {
  add: (h: Omit<{ id: number; clienteId: number; acomodacaoId: number; checkin: string; checkout?: string }, 'id'>) => db.add('hospedagens', h),
  put: (h: { id: number; clienteId: number; acomodacaoId: number; checkin: string; checkout?: string }) => db.put('hospedagens', h),
  getAll: () => db.getAll<{ id: number; clienteId: number; acomodacaoId: number; checkin: string; checkout?: string }>('hospedagens'),
  getById: (id: number) => db.getById<{ id: number; clienteId: number; acomodacaoId: number; checkin: string; checkout?: string }>('hospedagens', id),
  delete: (id: number) => db.delete('hospedagens', id),
};