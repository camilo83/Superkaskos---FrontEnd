import { serverUrl } from '../../config';
import { LoginUser, User } from '../../model/user';
import { LoginResponse } from '../../types/login.payload';

export class RepoUsers {
  url = serverUrl + '/users';

  async getUsers(): Promise<User[]> {
    const response = await fetch(this.url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async createUser(newUser: FormData): Promise<User> {
    const response = await fetch(this.url + '/register', {
      method: 'POST',
      body: newUser,
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async login(LoginUser: LoginUser): Promise<LoginResponse> {
    const response = await fetch(this.url + '/login', {
      method: 'POST',
      body: JSON.stringify(LoginUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async loginWithToken(token: string): Promise<LoginResponse> {
    const response = await fetch(this.url + '/login', {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer' + token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async updateUser(id: User['id'], updatedUser: Partial<User>): Promise<User> {
    const finalUrl = `${this.url}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async deleteUser(id: User['id']): Promise<User[]> {
    const finalUrl = `${this.url}/${id}`;
    const response = await fetch(finalUrl, {
      method: 'DELETE',
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
