import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../model/user';
import { loginThunk, loginTokenThunk } from './users.thunks';
import { LoginResponse } from '../../types/login.payload';

type LoginState = 'idle' | 'logging' | 'error';

export type UserState = {
  loggedUser: User | null;
  loggingState: LoginState;
  token: string;
};

const initial: UserState = {
  loggedUser: null,
  loggingState: 'idle',
  token: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState: initial,
  reducers: {
    logout: (state: UserState) => {
      state.loggedUser = null;
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginThunk.fulfilled,
      (state: UserState, { payload }: PayloadAction<LoginResponse>) => {
        state.loggedUser = payload.user;
        state.token = payload.token;
        state.loggingState = 'idle';
      }
    );
    builder.addCase(
      loginTokenThunk.fulfilled,
      (state: UserState, { payload }: PayloadAction<LoginResponse>) => {
        state.loggedUser = payload.user;
        state.token = payload.token;
        state.loggingState = 'idle';
      }
    );
    builder.addCase(loginThunk.pending, (state: UserState) => {
      state.loggingState = 'logging';
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
