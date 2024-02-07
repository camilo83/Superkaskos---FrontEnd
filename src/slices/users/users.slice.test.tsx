import { LoginUser, User } from '../../model/user';
import { RepoUsers } from '../../services/users/repoUsers';
import { Storage } from '../../services/storage';
import { store } from '../../store/store';
import { loginThunk, loginTokenThunk } from './users.thunks';
import userReducer, { UserState, logout } from './users.slice';

describe('Given...', () => {
  describe('When...', () => {
    const sharedData = {
      repo: {
        login: jest.fn().mockReturnValue({
          token: '',
        }),
        loginWithToken: jest.fn().mockReturnValue({
          token: '',
        }),
      } as unknown as RepoUsers,
      userStore: {
        set: jest.fn(),
      } as unknown as Storage<{
        token: string;
      }>,
    };

    test('Then it should ...', async () => {
      const data3 = { ...sharedData, loginUser: {} as LoginUser };
      await store.dispatch(loginThunk(data3));
      expect(data3.repo.login).toHaveBeenCalled();
      expect(data3.userStore.set).toHaveBeenCalled();
      data3.repo.login;
    });
    test('Then it should ...', async () => {
      const data4 = { ...sharedData, token: '' };
      await store.dispatch(loginTokenThunk(data4));
      expect(data4.repo.login).toHaveBeenCalled();
      expect(data4.userStore.set).toHaveBeenCalled();
      data4.repo.login;
    });
  });

  describe('When...', () => {
    const sharedData = {
      repo: {
        login: jest.fn().mockRejectedValue({ error: 'Login failed' }),
        loginWithToken: jest.fn().mockReturnValue({
          token: '',
        }),
      } as unknown as RepoUsers,
      userStore: {
        set: jest.fn(),
      } as unknown as Storage<{
        token: string;
      }>,
    };

    test('Then it should handle loadding loginThunk', async () => {
      const data = { ...sharedData, loginUser: {} as LoginUser };

      await store.dispatch(loginThunk(data));

      const newState = userReducer(store.getState().usersState, {
        type: loginThunk.rejected.type,
      });
      expect(newState.loggingState).toBe('logging');
      expect(newState.loggedUser).toBe(undefined);
      expect(newState.token).toBe('');
    });
  });
});

describe('Given userSlice reducer', () => {
  describe('When logout action is dispatched', () => {
    test('Then it should set loggedUser to null and token to an empty string', () => {
      const initialState: UserState = {
        loggedUser: {
          id: '1',
        } as User,
        loggingState: 'idle',
        token: 'exampleToken',
      };

      const newState = userReducer(initialState, logout());

      expect(newState.loggedUser).toBeNull();
      expect(newState.token).toBe('');
    });
  });
});
