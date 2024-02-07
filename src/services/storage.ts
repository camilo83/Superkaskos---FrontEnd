export class Storage<T> {
  constructor(private storeName: string) {}

  get() {
    const initialData = localStorage.getItem(this.storeName);
    if (!initialData) throw new Error('invalid store name');
    return JSON.parse(initialData) as T;
  }

  set(data: T) {
    const finalData = JSON.stringify(data);
    localStorage.setItem(this.storeName, finalData);
  }

  remove() {
    localStorage.removeItem(this.storeName);
  }
}
