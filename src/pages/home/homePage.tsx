import { Link } from 'react-router-dom';

import { HomeList } from '../../components/home/homeList/home_list';
import { useHelmets } from '../../hooks/useHelmets';
import './homePage.scss';
import { useEffect } from 'react';
import { HomeImages } from '../../components/home/homeImages/home_images';
import { useShopCars } from '../../hooks/useShopcars';
import { useUsers } from '../../hooks/useUsers';
import { ShopCar } from '../../model/shop_car';

export default function HomePage() {
  const { favorites, loadFavoriteHelmets } = useHelmets();
  const { handleCurrentShopcar, loadShopcarById } = useShopCars();
  const { loggedUser } = useUsers();

  useEffect(() => {
    loadFavoriteHelmets();
  }, [loadFavoriteHelmets]);

  const newShopCar: Partial<ShopCar> = {
    userID: loggedUser?.id,
    status: 'open',
    items: [],
  };
  useEffect(() => {
    const fetchData = async () => {
      if (loggedUser) {
        if (loggedUser.role === 'User') {
          if (loggedUser.orders.length > 0) {
            const allOrders = await Promise.all(
              loggedUser.orders.map(async (order) => {
                return await loadShopcarById(order);
              })
            );

            const currentOrder = allOrders.find(
              (order) => order?.status === 'open'
            );

            if (currentOrder) {
              handleCurrentShopcar(currentOrder);
            } else {
              handleCurrentShopcar(newShopCar);
            }
          } else {
            handleCurrentShopcar(newShopCar);
          }
        }
      }
    };
    fetchData();
  }, [loggedUser]);

  return (
    <>
      <HomeImages></HomeImages>
      {favorites.length > 0 ? <HomeList></HomeList> : 'nada'}
      <div className="certificate-container">
        <div className="more-helmets">
          <Link to={'/helmets'} style={{ textDecoration: 'none' }}>
            <p>!Ver Todos los cascos!</p>
          </Link>
        </div>
        <div className="certificate_banner">
          <img src="/descargar_certificado.png" alt="" />
        </div>
        <div className="certificate">
          <img src="/ya_tienes_casco2.png" alt="" />
          <div className="get-certificate">
            <p className="other-p">¡Descarga tu certificado!</p>
            <p className="here">AQUÍ</p>
          </div>
        </div>
      </div>
    </>
  );
}
