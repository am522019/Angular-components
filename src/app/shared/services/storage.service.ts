import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  res: any;
  isReady: boolean;
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.ready();
    this.init().then(() => {
      this.res();
      this.isReady = true;
      console.info('storage initialized');
    });
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    if (this._storage) {
      return this._storage.set(key, value);
    }
  }
  public get(key: string): Promise<any> {
    if (this._storage) {
      return this._storage.get(key);
    } else {
      return new Promise((res) => {
        res(undefined);
      });
    }
  }
  public clear() {
    return this._storage.clear();
  }
  async ready(): Promise<boolean> {
    return new Promise((res, rej) => {
      this.res = res;
      if (this.isReady) {
        res(true);
      }
    });
  }
}
