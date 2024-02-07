import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  loadShopCarThunk,
  updateShopCarThunk,
  loadShopCarByIdThunk,
} from './shopCarsThunks';

import { ShopCar } from '../../model/shop_car';

export type ShopcarsState = {
  shopCars: ShopCar[];
  shopCarsStateOption: 'idle' | 'loading' | 'error';
  currentShopCar: ShopCar | Partial<ShopCar> | null;
};

const initialState: ShopcarsState = {
  shopCars: [],
  shopCarsStateOption: 'idle',
  currentShopCar: null,
};

const ShopCarSlice = createSlice({
  name: 'helmets',
  initialState,
  reducers: {
    setCurrentShopcar: (
      state: ShopcarsState,
      { payload }: PayloadAction<ShopCar | Partial<ShopCar> | null>
    ) => {
      state.currentShopCar = payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadShopCarThunk.pending, (state: ShopcarsState) => {
      state.shopCarsStateOption = 'loading';
      return state;
    }),
      builder.addCase(loadShopCarThunk.fulfilled, (state, { payload }) => {
        state.shopCars = payload;
        state.shopCarsStateOption = 'idle';
        return state;
      }),
      builder.addCase(loadShopCarThunk.rejected, (state: ShopcarsState) => {
        state.shopCarsStateOption = 'error';
        return state;
      });

    builder.addCase(loadShopCarByIdThunk.pending, (state: ShopcarsState) => {
      state.shopCarsStateOption = 'loading';
      return state;
    }),
      builder.addCase(loadShopCarByIdThunk.fulfilled, (state, { payload }) => {
        state.shopCars = payload;
        state.shopCarsStateOption = 'idle';
        return state;
      }),
      builder.addCase(loadShopCarByIdThunk.rejected, (state: ShopcarsState) => {
        state.shopCarsStateOption = 'error';
        return state;
      });

    builder.addCase(
      updateShopCarThunk.fulfilled,
      (state: ShopcarsState, { payload }: PayloadAction<ShopCar>) => {
        state.currentShopCar = payload;

        return state;
      }
    );
  },
});

export default ShopCarSlice.reducer;

export const { setCurrentShopcar } = ShopCarSlice.actions;
