import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  loadShopCarByIdThunk,
  loadShopCarThunk,
  updateShopCarThunk,
} from './shopCarsThunks';

import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RepoShopCars } from '../../services/shopcar/repoShopCar';
import { ShopCar } from '../../model/shop_car';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shopcars thunks', () => {
  let store: ReturnType<typeof mockStore> & {
    dispatch: ThunkDispatch<{}, {}, AnyAction>;
  };
  let mockRepo: RepoShopCars;

  beforeEach(() => {
    store = mockStore({});
    mockRepo = {
      getShopcars: jest.fn().mockResolvedValue([]),
      getShopcarByUserId: jest.fn().mockResolvedValue([]),
      updateShopCar: jest.fn().mockResolvedValue({} as ShopCar),
      deleteHelmet: jest.fn().mockResolvedValue([]),
    } as unknown as RepoShopCars;
  });

  test('loadSkinsThunk dispatches the correct actions', async () => {
    await store.dispatch(loadShopCarThunk(mockRepo));
    const actions = store.getActions();
    expect(actions[0].type).toBe('shopcars/load/pending');
    expect(actions[1].type).toBe('shopcars/load/fulfilled');
  });

  test('loadFavoriteHelmetThunk dispatches the correct actions', async () => {
    await store.dispatch(loadShopCarByIdThunk({ repo: mockRepo, id: '1' }));
    const actions = store.getActions();
    expect(actions[0].type).toBe('shopcarsId/load/pending');
    expect(actions[1].type).toBe('shopcarsId/load/fulfilled');
  });

  test('updateSkinsThunk dispatches the correct actions', async () => {
    await store.dispatch(
      updateShopCarThunk({
        repo: mockRepo,
        id: '1',
        newShopcar: {} as ShopCar,
      })
    );
    const actions = store.getActions();
    expect(actions[0].type).toBe('shopcars/update/pending');
    expect(actions[1].type).toBe('shopcars/update/fulfilled');
  });
});
