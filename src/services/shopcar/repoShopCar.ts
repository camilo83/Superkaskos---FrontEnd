import { serverUrl } from '../../config';
import { Items, ShopCar } from '../../model/shop_car';

export class RepoShopCars {
  url = serverUrl + '/shopcar';

  constructor(public token: string) {}
  async getShopcars(): Promise<ShopCar[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error(response.status + ' ' + response.statusText);
    }

    return response.json();
  }

  async getShopcar(id: string): Promise<ShopCar> {
    const response = await fetch(`${this.url}/${id}`);
    if (!response.ok) {
      throw new Error(response.status + ' ' + response.statusText);
    }

    return response.json();
  }

  async getShopcarByUserId(id: string): Promise<ShopCar[]> {
    const response = await fetch(`${this.url}/users/${id}`);
    if (!response.ok) {
      throw new Error(response.status + ' ' + response.statusText);
    }

    return response.json();
  }

  async updateShopCar(
    id?: string,
    newShopcar?: Partial<ShopCar> | Omit<ShopCar, 'id'>
  ): Promise<ShopCar> {
    if (!id) {
      const response = await fetch(this.url, {
        method: 'PATCH',
        body: JSON.stringify(newShopcar),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok)
        throw new Error(response.status + ' ' + response.statusText);
      return response.json();
    }

    const existingShopCar = await this.getShopcar(id);

    const updatedItems: Items[] = [...(newShopcar?.items || [])];

    const updatedShopCar: ShopCar = {
      ...existingShopCar,
      ...newShopcar,
      items: updatedItems,
    };

    const response = await fetch(`${this.url}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedShopCar),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async deleteShopCar(id: ShopCar['id']): Promise<ShopCar[]> {
    const finalUrl = `${this.url}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'DELETE',
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
