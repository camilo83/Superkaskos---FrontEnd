import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import usersReducer from '../slices/users/users.slice';
import helmetsReducer from '../slices/helmets/helmetsSlice';
import shopCarReducer from '../slices/shopcars/shopCarsSlice';

export const store = configureStore({
  reducer: {
    usersState: usersReducer,
    helmetsState: helmetsReducer,
    shopCarsState: shopCarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
