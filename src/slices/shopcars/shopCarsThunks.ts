import { createAsyncThunk } from '@reduxjs/toolkit';
import { RepoShopCars } from '../../services/shopcar/repoShopCar';

import { ShopCar } from '../../model/shop_car';

export const loadShopCarThunk = createAsyncThunk<ShopCar[], RepoShopCars>(
  'shopcars/load',
  async (repo) => {
    const ShopCars = await repo.getShopcars();
    return ShopCars;
  }
);

export const loadShopCarByIdThunk = createAsyncThunk<
  ShopCar[],
  {
    repo: RepoShopCars;
    id: string;
  }
>('shopcarsId/load', async ({ repo, id }) => {
  const ShopCars = await repo.getShopcarByUserId(id);
  return ShopCars;
});

export const updateShopCarThunk = createAsyncThunk<
  ShopCar,
  {
    repo: RepoShopCars;
    id?: ShopCar['id'];
    newShopcar?: Partial<ShopCar> | Omit<ShopCar, 'id'>;
  }
>('shopcars/update', async ({ repo, id, newShopcar }) => {
  const finalShopCar = await repo.updateShopCar(id, newShopcar);

  return finalShopCar;
});
