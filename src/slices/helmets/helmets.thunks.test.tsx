import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  loadHelmetThunk,
  updateHelmetThunk,
  createHelmetThunk,
  deletHelmetThunk,
  loadFavoriteHelmetThunk,
  updateHelmetFavoriteThunk,
} from './helmetsThunks';
import { RepoHelmets } from '../../services/helmets/repoHelmets';
import { Helmet } from '../../model/helmet';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('skins thunks', () => {
  let store: ReturnType<typeof mockStore> & {
    dispatch: ThunkDispatch<{}, {}, AnyAction>;
  };
  let mockRepo: RepoHelmets;

  beforeEach(() => {
    store = mockStore({});
    mockRepo = {
      getInitialHelmets: jest.fn().mockResolvedValue([]),
      getFavoriteHelmets: jest.fn().mockResolvedValue([]),
      createHelmet: jest.fn().mockResolvedValue({} as Helmet),
      updateHelmet: jest.fn().mockResolvedValue({} as Helmet),
      updateHelmetFavorite: jest.fn().mockResolvedValue({} as Helmet),
      deleteHelmet: jest.fn().mockResolvedValue([]),
    } as unknown as RepoHelmets;
  });

  test('loadSkinsThunk dispatches the correct actions', async () => {
    await store.dispatch(loadHelmetThunk(mockRepo));
    const actions = store.getActions();
    expect(actions[0].type).toBe('helmets/load/pending');
    expect(actions[1].type).toBe('helmets/load/fulfilled');
  });

  test('loadFavoriteHelmetThunk dispatches the correct actions', async () => {
    await store.dispatch(loadFavoriteHelmetThunk(mockRepo));
    const actions = store.getActions();
    expect(actions[0].type).toBe('favorite/helmets/load/pending');
    expect(actions[1].type).toBe('favorite/helmets/load/fulfilled');
  });

  test('createSkinThunk dispatches the correct actions', async () => {
    await store.dispatch(
      createHelmetThunk({ repo: mockRepo, newHelmet: new FormData() })
    );
    const actions = store.getActions();
    expect(actions[0].type).toBe('helmets/create/pending');
    expect(actions[1].type).toBe('helmets/create/fulfilled');
  });

  test('updateSkinsThunk dispatches the correct actions', async () => {
    await store.dispatch(
      updateHelmetThunk({
        repo: mockRepo,
        id: '1',
        updatedHelmet: new FormData(),
      })
    );
    const actions = store.getActions();
    expect(actions[0].type).toBe('helmets/update/pending');
    expect(actions[1].type).toBe('helmets/update/fulfilled');
  });

  test('updateSkinsThunk dispatches the correct actions', async () => {
    await store.dispatch(
      updateHelmetFavoriteThunk({
        repo: mockRepo,
        id: '1',
        isFavorite: true,
      })
    );
    const actions = store.getActions();
    expect(actions[0].type).toBe('helmets/update/favorite/pending');
    expect(actions[1].type).toBe('helmets/update/favorite/fulfilled');
  });

  test('deleteSkinThunk dispatches the correct actions', async () => {
    await store.dispatch(deletHelmetThunk({ repo: mockRepo, id: '1' }));
    const actions = store.getActions();
    expect(actions[0].type).toBe('helmets/delete/pending');
    expect(actions[1].type).toBe('helmets/delete/fulfilled');
  });
});
