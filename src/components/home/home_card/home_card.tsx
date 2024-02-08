import { Helmet } from '../../../model/helmet';
import { Link } from 'react-router-dom';
import { useHelmets } from '../../../hooks/useHelmets';
import './home_card.scss';
import { useUsers } from '../../../hooks/useUsers';
import { useShopCars } from '../../../hooks/useShopcars';
import { ShopCar } from '../../../model/shop_car';

type PropsType = {
  readonly helmet: Helmet;
};

export function HomeCard({ helmet }: PropsType) {
  const { handleCurrentHelmet } = useHelmets();
  const { loggedUser, token } = useUsers();
  const { currentShopCar, updateShopCar } = useShopCars();

  const handleAddToCart = async (helmetId: string) => {
    if (!loggedUser?.id) {
      console.error('Usuario no autenticado. No se puede añadir al carrito.');
      return;
    }

    const currentItems = currentShopCar?.items || [];

    const updatedItems = [...currentItems, { quantity: 1, helmetId }];

    const shopCarToUpdate: Partial<ShopCar> = {
      ...currentShopCar,
      items: updatedItems,
    };
    await updateShopCar(currentShopCar?.id, shopCarToUpdate);
  };

  return (
    <div className="card-container">
      <li className="card">
        <Link
          to={'/details-page/' + helmet.id}
          style={{ textDecoration: 'none' }}
        >
          <img
            role="button"
            src={helmet.images.url}
            alt={`${helmet.reference} image`}
            height={140}
            width={140}
            onClick={() => handleCurrentHelmet(helmet)}
          />
        </Link>
      </li>
      <div className="card-info">
        <p>{helmet.reference}</p>
        <p>Categoria {helmet.category}</p>
        <p className="price">{`$ ${helmet.price}`}</p>
        <div className="card-buttons">
          {token ? (
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(helmet.id)}
            >
              <p>Añadir al carrito.</p>
              <img
                src="/shop_icon_white.png"
                alt="add to cart button."
                width={20}
              />
            </button>
          ) : (
            <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
              <button className="add-to-cart">
                <p>Añadir al carrito.</p>
                <img
                  src="/shop_icon_white.png"
                  alt="add to cart button."
                  width={20}
                />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
