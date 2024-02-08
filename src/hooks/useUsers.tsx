import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

import { loginThunk, loginTokenThunk } from '../slices/users/users.thunks';
import { RepoUsers } from '../services/users/repoUsers';
import { LoginUser } from '../model/user';
import { Storage } from '../services/storage';
import * as ac from '../slices/users/users.slice';

export function useUsers() {
  const { loggedUser, token } = useSelector(
    (state: RootState) => state.usersState
  );
  const dispatch = useDispatch<AppDispatch>();
  const repo = new RepoUsers();
  const userStore = new Storage<{ token: string }>('user');

  const makeLogOut = () => {
    dispatch(ac.logout());
  };

  const register = (newUser: FormData) => {
    repo.createUser(newUser);
  };

  const login = (loginUser: LoginUser) => {
    dispatch(loginThunk({ loginUser, repo, userStore }));
  };

  const loginWithToken = (token: string) => {
    dispatch(loginTokenThunk({ token, repo }));
  };

  return {
    register,
    login,
    loginWithToken,
    loggedUser,
    makeLogOut,
    token,
  };
}
