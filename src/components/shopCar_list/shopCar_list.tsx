import { useEffect } from 'react';
import { useShopCars } from '../../hooks/useShopcars';
import { useUsers } from '../../hooks/useUsers';
import { ShopCar } from '../../model/shop_car';
import { ShopCarCard } from '../shopCar_card/shopCar_card';
import './shopCar_list.scss';

export function ShopCarList() {
  const { shopCars, loadShopCars, loadShopCarsByUserId } = useShopCars();
  const { loggedUser } = useUsers();

  useEffect(() => {
    if (loggedUser && loggedUser.role === 'Admin') {
      const fetchData = async () => {
        await loadShopCars();
      };
      fetchData();
    } else if (loggedUser) {
      const fetchData = async () => {
        await loadShopCarsByUserId(loggedUser.id);
      };
      fetchData();
    }
  }, [loggedUser, loadShopCars, loadShopCarsByUserId]);

  return (
    <div className="shop-list">
      <p className="shopcar-title">Ordenes</p>
      <ul>
        {shopCars.map((item: ShopCar) => (
          <ShopCarCard shopcar={item} key={item.id}></ShopCarCard>
        ))}
      </ul>
    </div>
  );
}
