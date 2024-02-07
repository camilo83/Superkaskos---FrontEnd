import { useEffect } from 'react';
import { useShopCars } from '../../hooks/useShopcars';
import { useUsers } from '../../hooks/useUsers';
import { ShopCar } from '../../model/shop_car';
import { ShopCarCard } from '../shopCar_card/shopCar_card';
import './shopCar_list.scss';

export function ShopCarList() {
  const { shopCars, loadShopCars, loadShopCarsByUserId } = useShopCars();
  const { loggedUser } = useUsers();

  loggedUser &&
    (loggedUser!.role === 'Admin'
      ? useEffect(() => {
          const fetchData = async () => {
            await loadShopCars();
          };

          fetchData();
        }, [])
      : useEffect(() => {
          const fetchData = async () => {
            await loadShopCarsByUserId(loggedUser?.id!);
          };

          fetchData();
        }, []));

  return (
    <>
      <div className="shop-list">
        <p className="shopcar-title">Ordenes</p>
        {loggedUser?.role === 'Admin' ? (
          <ul>
            {shopCars.map((item: ShopCar) => (
              <ShopCarCard shopcar={item} key={item.id}></ShopCarCard>
            ))}
          </ul>
        ) : (
          <ul>
            {shopCars.filter((shopCars) => shopCars.userID === loggedUser?.id)
              .length === 0 ? (
              <p>No hay nada en tu historial de pedidos.</p>
            ) : (
              shopCars
                .filter((shopCars) => shopCars.userID === loggedUser?.id)
                .map((item: ShopCar) => (
                  <ShopCarCard shopcar={item} key={item.id}></ShopCarCard>
                ))
            )}
          </ul>
        )}
      </div>
    </>
  );
}
