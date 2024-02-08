import { Helmet } from '../../model/helmet';
import helmetsReducer, {
  HelmetsState,
  setCurrentHelmet,
  setRange,
} from './helmetsSlice';
import {
  createHelmetThunk,
  updateHelmetThunk,
  deletHelmetThunk,
  updateHelmetFavoriteThunk,
} from './helmetsThunks';

describe('Given helmetsReducer', () => {
  describe(' When skins/load/pending action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const actionP = { type: 'helmets/load/pending' };
      const state: HelmetsState = {} as HelmetsState;
      const resultP = helmetsReducer(state, actionP);
      expect(resultP.helmetsStateOption).toBe('loading');
    });
  });

  test('Then the new state will be returned ', () => {
    const actionR = { type: 'helmets/load/rejected' };
    const state: HelmetsState = {} as HelmetsState;
    const resultR = helmetsReducer(state, actionR);
    expect(resultR.helmetsStateOption).toBe('error');
  });

  test('Then the new state will be returned ', () => {
    const actionF = {
      type: 'helmets/load/fulfilled',
      payload: [{}] as unknown as Helmet,
    };
    const state: HelmetsState = {} as HelmetsState;
    const resultF = helmetsReducer(state, actionF);
    expect(resultF.helmetsStateOption).toBe('idle');
  });

  describe(' When helmets/favorites/helmets/load/pending action is dispacth  ', () => {
    test('Then the new state will be returned ', () => {
      const actionFP = { type: 'favorite/helmets/load/pending' };
      const state: HelmetsState = {} as HelmetsState;
      const resultFP = helmetsReducer(state, actionFP);
      expect(resultFP.helmetsStateOption).toBe('loading');
    });
  });

  test('Then the new state will be returned ', () => {
    const actionFR = { type: 'favorite/helmets/load/rejected' };
    const state: HelmetsState = {} as HelmetsState;
    const resultFR = helmetsReducer(state, actionFR);
    expect(resultFR.helmetsStateOption).toBe('error');
  });

  test('Then the new state will be returned ', () => {
    const actionFF = {
      type: 'favorite/helmets/load/fulfilled',
      payload: [{}] as unknown as Helmet,
    };
    const state: HelmetsState = {} as HelmetsState;
    const resultFF = helmetsReducer(state, actionFF);
    expect(resultFF.helmetsStateOption).toBe('idle');
  });

  describe('When createSkinThunk.fulfilled action is dispatched', () => {
    test('Then the new skin should be added to the state', () => {
      const mockHelmet = { id: '1', name: 'NameTest' } as unknown as Helmet;
      const action = {
        type: createHelmetThunk.fulfilled.type,
        payload: mockHelmet,
      };
      const state: HelmetsState = { helmets: [] } as unknown as HelmetsState;
      const result = helmetsReducer(state, action);
      expect(result.helmets).toContain(mockHelmet);
    });
  });

  describe('When updateSkinsThunk.fulfilled action is dispatched', () => {
    test('Then the skin should be updated in the state', () => {
      const mockHelmet = { id: '1', name: 'NameTest' } as unknown as Helmet;
      const updatedSkin = { ...mockHelmet, name: 'UpdatedName' };
      const action = {
        type: updateHelmetThunk.fulfilled.type,
        payload: updatedSkin,
      };
      const state: HelmetsState = { helmets: [mockHelmet] } as HelmetsState;
      const result = helmetsReducer(state, action);
      expect(result.helmets[0]).toEqual(updatedSkin);
    });
  });

  describe('When  updateHelmetFavoriteThunk.fulfilled action is dispatched', () => {
    test('Then the skin should be updated in the state', () => {
      const mockHelmet = { id: '1', name: 'NameTest' } as unknown as Helmet;
      const updatedSkin = { ...mockHelmet, isFavorite: true };
      const action = {
        type: updateHelmetFavoriteThunk.fulfilled.type,
        payload: updatedSkin,
      };
      const state: HelmetsState = { helmets: [mockHelmet] } as HelmetsState;
      const result = helmetsReducer(state, action);
      expect(result.helmets[0]).toEqual(updatedSkin);
    });
  });

  describe('When deleteSkinThunk.fulfilled action is dispatched', () => {
    test('Then the skin should be removed from the state', () => {
      const mockHelmet = { id: '1', name: 'NameTest' } as unknown as Helmet;
      const action = {
        type: deletHelmetThunk.fulfilled.type,
        payload: mockHelmet.id,
      };
      const state: HelmetsState = { helmets: [mockHelmet] } as HelmetsState;
      const result = helmetsReducer(state, action);
      expect(result.helmets).not.toContain(mockHelmet);
    });
  });

  describe('counter reducer', () => {
    const initialState: HelmetsState = {
      currentHelmet: {} as Helmet,
      range: {
        minValue: 50,
        maxValue: 1000000,
      },
    } as HelmetsState;
    it('should handle setCurrentHelmet', () => {
      const mockHelmet = { id: '1' } as Helmet;
      const actual = helmetsReducer(initialState, setCurrentHelmet(mockHelmet));
      expect(actual.currentHelmet).toBe(mockHelmet);
    });

    it('should handle setRange', () => {
      const mockRange = {
        minValue: 5,
        maxValue: 100000,
      };
      const actual = helmetsReducer(initialState, setRange(mockRange));
      expect(actual.range).toBe(mockRange);
    });
  });
});
