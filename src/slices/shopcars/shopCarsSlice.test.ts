import { ShopCar } from '../../model/shop_car';
import shopcarReducer, {
  ShopcarsState,
  setCurrentShopcar,
} from './shopCarsSlice';
import { updateShopCarThunk } from './shopCarsThunks';

describe('Given shopcarsReducer', () => {
  describe(' When shopcars/load/pending action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const actionP = { type: 'shopcars/load/pending' };
      const state: ShopcarsState = {} as ShopcarsState;
      const resultP = shopcarReducer(state, actionP);
      expect(resultP.shopCarsStateOption).toBe('loading');
    });
  });

  test('Then the new state will be returned ', () => {
    const actionR = { type: 'shopcars/load/rejected' };
    const state: ShopcarsState = {} as ShopcarsState;
    const resultR = shopcarReducer(state, actionR);
    expect(resultR.shopCarsStateOption).toBe('error');
  });

  test('Then the new state will be returned ', () => {
    const actionF = {
      type: 'shopcars/load/fulfilled',
      payload: [{}] as unknown as ShopCar,
    };
    const state: ShopcarsState = {} as ShopcarsState;
    const resultF = shopcarReducer(state, actionF);
    expect(resultF.shopCarsStateOption).toBe('idle');
  });

  describe(' When shopcarsId/load/pending action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const actionFP = { type: 'shopcarsId/load/pending' };
      const state: ShopcarsState = {} as ShopcarsState;
      const resultFP = shopcarReducer(state, actionFP);
      expect(resultFP.shopCarsStateOption).toBe('loading');
    });
  });

  test('Then the new state will be returned ', () => {
    const actionFR = { type: 'shopcarsId/load/rejected' };
    const state: ShopcarsState = {} as ShopcarsState;
    const resultFR = shopcarReducer(state, actionFR);
    expect(resultFR.shopCarsStateOption).toBe('error');
  });

  test('Then the new state will be returned ', () => {
    const actionFF = {
      type: 'shopcarsId/load/fulfilled',
      payload: [{}] as unknown as ShopCar,
    };
    const state: ShopcarsState = {} as ShopcarsState;
    const resultFF = shopcarReducer(state, actionFF);
    expect(resultFF.shopCarsStateOption).toBe('idle');
  });

  describe('When updateShopCarhunk.fulfilled action is dispatched', () => {
    test('Then the shopccar should be updated in the state', () => {
      const mockShopcar = { id: '1', status: 'open' } as unknown as ShopCar;
      const updatedShopcar = { ...mockShopcar, status: 'delivered' };
      const action = {
        type: updateShopCarThunk.fulfilled.type,
        payload: updatedShopcar,
      };
      const state: ShopcarsState = { shopCars: [mockShopcar] } as ShopcarsState;
      const result = shopcarReducer(state, action);
      expect(result.currentShopCar).toEqual(updatedShopcar);
    });
  });

  describe('shopcar reducer', () => {
    const initialState: ShopcarsState = {
      currentShopCar: {} as ShopCar,
    } as ShopcarsState;
    it('should handle setCurrentShopcar', () => {
      const mockShopcar = { id: '1' } as ShopCar;
      const actual = shopcarReducer(
        initialState,
        setCurrentShopcar(mockShopcar)
      );
      expect(actual.currentShopCar).toBe(mockShopcar);
    });
  });
});
