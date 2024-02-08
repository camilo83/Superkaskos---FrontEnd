import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadShopCarByIdThunk,
  loadShopCarThunk,
  updateShopCarThunk,
} from '../slices/shopcars/shopCarsThunks';
import { AppDispatch, RootState } from '../store/store';

import { RepoShopCars } from '../services/shopcar/repoShopCar';
import { ShopCar } from '../model/shop_car';
import { setCurrentShopcar } from '../slices/shopcars/shopCarsSlice';
import { User } from '../model/user';

export function useShopCars() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentShopCar, shopCars, shopCarsStateOption } = useSelector(
    (state: RootState) => state.shopCarsState
  );
  const { token } = useSelector((state: RootState) => state.usersState);
  const repo = useMemo(() => new RepoShopCars(token), []);

  const loadShopCars = useCallback(async () => {
    try {
      dispatch(loadShopCarThunk(repo));
    } catch (error) {}
  }, [repo]);

  const loadShopCarsByUserId = useCallback(
    async (id: User['id']) => {
      try {
        dispatch(loadShopCarByIdThunk({ repo, id }));
      } catch (error) {}
    },
    [repo]
  );

  const updateShopCar = async (
    id?: ShopCar['id'],
    shopcar?: Partial<ShopCar> | Omit<ShopCar, 'id'>
  ) => {
    try {
      await dispatch(
        updateShopCarThunk({
          id,
          repo,
          newShopcar: shopcar,
        })
      );
    } catch (error) {}
  };

  const loadShopcarById = async (id: ShopCar['id']) => {
    try {
      const result = await repo.getShopcar(id);
      return result;
    } catch (error) {}
  };

  const handleCurrentShopcar = async (
    shopcar: Partial<ShopCar> | Omit<ShopCar, 'id'> | null
  ) => {
    dispatch(setCurrentShopcar(shopcar));
  };

  return {
    currentShopCar,
    shopCars,
    shopCarsStateOption,
    loadShopCars,
    updateShopCar,
    loadShopcarById,
    loadShopCarsByUserId,
    handleCurrentShopcar,
  };
}
