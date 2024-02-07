import { serverUrl } from '../../config';
import { Helmet } from '../../model/helmet';
import { helmetCategory } from '../../types/helmetCategory';

export class RepoHelmets {
  url = serverUrl + '/helmets';

  constructor(public token: string) {}

  async getInitialHelmets(): Promise<Helmet[]> {
    const initialCategories = await this.fetchInitialCategories();
    const initialHelmets = await this.fetchHelmetsByCategories(
      initialCategories
    );

    return initialHelmets;
  }

  private async fetchInitialCategories(): Promise<string[]> {
    const response = await fetch(`${this.url}/initialCategories`);
    if (!response.ok) {
      throw new Error(response.status + ' ' + response.statusText);
    }

    const data = await response.json();

    return data;
  }

  private async fetchHelmetsByCategories(
    categories: string[]
  ): Promise<Helmet[]> {
    const response = await fetch(
      `${this.url}/helmetsByCategories?categories=${categories.join(',')}`
    );

    const data = await response.json();
    return data.helmets;
  }
  async getMoreHelmets(loadedCategories: string[]): Promise<helmetCategory> {
    try {
      const response = await fetch(`${this.url}/moreHelmets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loadedCategories: loadedCategories,
        }),
      });

      if (!response.ok) {
        throw new Error(response.status + ' ' + response.statusText);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error('Error fetching more helmets: ');
    }
  }

  async getHelmets(): Promise<Helmet[]> {
    const response = await fetch(this.url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async getHelmetById(id: Helmet['id']): Promise<Helmet> {
    const response = await fetch(`${this.url}/${id}`);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async getFavoriteHelmets(): Promise<Helmet[]> {
    const response = await fetch(`${this.url}/promotions`);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async createHelmet(newHelmet: FormData): Promise<Helmet> {
    const response = await fetch(this.url, {
      method: 'POST',
      body: newHelmet,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async updateHelmet(
    id: Helmet['id'],
    updatedHelmet: FormData
  ): Promise<Helmet> {
    const finalUrl = `${this.url}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'PATCH',
      body: updatedHelmet,
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async updateHelmetFavorite(
    id: Helmet['id'],
    isFavorite: boolean
  ): Promise<Helmet> {
    const finalUrl = `${this.url}/${id}/favorite`;

    const response = await fetch(finalUrl, {
      method: 'PATCH',
      body: JSON.stringify({ isFavorite }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async deleteHelmet(id: Helmet['id']): Promise<void> {
    const finalUrl = `${this.url}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
  }
}
