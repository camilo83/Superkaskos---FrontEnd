import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/login.payload';
import { LoginUser } from '../../model/user';
import { RepoUsers } from '../../services/users/repoUsers';
import { Storage } from '../../services/storage';

// THUNK DEL LOGIN NORMAL
export const loginThunk = createAsyncThunk<
  LoginResponse,
  {
    loginUser: LoginUser;
    repo: RepoUsers;
    userStore: Storage<{ token: string }>;
  }
>('login', async ({ loginUser, repo, userStore }) => {
  const loginResponse = await repo.login(loginUser);
  userStore.set({ token: loginResponse.token });

  return loginResponse;
});

// THUNK DEL LOGIN WITH TOKEN
export const loginTokenThunk = createAsyncThunk<
  LoginResponse,
  {
    token: string;
    repo: RepoUsers;
  }
>('loginWithToken', async ({ token, repo }) => {
  return await repo.loginWithToken(token);
});
