import { Helmet } from '../../model/helmet';
import { Link } from 'react-router-dom';
import { useHelmets } from '../../hooks/useHelmets';
import { useUsers } from '../../hooks/useUsers';
import './card.scss';
import { useShopCars } from '../../hooks/useShopcars';
import { ShopCar } from '../../model/shop_car';

type PropsType = {
  readonly helmet: Helmet;
};

export function Card({ helmet }: PropsType) {
  const { handleCurrentHelmet } = useHelmets();
  const { loggedUser, token } = useUsers();
  const { currentShopCar, updateShopCar } = useShopCars();

  const handleAddToCart = async (helmetId: string) => {
    if (!loggedUser?.id) {
      console.error('Usuario no autenticado. No se puede añadir al carrito.');
      return;
    }

    const currentItems = currentShopCar?.items ?? [];

    const updatedItems = [...currentItems, { quantity: 1, helmetId }];

    const shopCarToUpdate: Partial<ShopCar> = {
      ...currentShopCar,
      items: updatedItems,
    };
    await updateShopCar(currentShopCar?.id, shopCarToUpdate);
  };

  let addToCartButton;
  if (loggedUser?.role === 'Admin') {
  } else if (token) {
    addToCartButton = (
      <div className="add-to-cart" onClick={() => handleAddToCart(helmet.id)}>
        <p>Añadir al carrito</p>
        <button role="button">
          <img src="/shop_icon_white.png" alt="add to cart button" width={20} />
        </button>
      </div>
    );
  } else {
    addToCartButton = (
      <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
        <div className="add-to-cart">
          <p>Añadir al carrito</p>
          <img src="/shop_icon_white.png" alt="add to cart button" width={20} />
        </div>
      </Link>
    );
  }

  return (
    <div className="card-container" data-testid="card-container">
      <li className="card">
        <Link
          to={'/details-page/' + helmet.id}
          style={{ textDecoration: 'none' }}
        >
          <button role="button">
            <img
              src={helmet.images.url}
              alt={`${helmet.reference} image`}
              height={140}
              width={140}
              onClick={() => handleCurrentHelmet(helmet)}
            />
          </button>
        </Link>
      </li>
      <div className="card-info">
        <p>{helmet.reference}</p>
        <p className="price">{`$ ${helmet.price}`}</p>
        <div className="card-buttons">{addToCartButton}</div>
      </div>
    </div>
  );
}
