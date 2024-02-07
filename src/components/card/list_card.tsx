import { Helmet } from '../../model/helmet';
import { Link } from 'react-router-dom';
import { useHelmets } from '../../hooks/useHelmets';
import { useUsers } from '../../hooks/useUsers';
import './card.scss';
import { useShopCars } from '../../hooks/useShopcars';
import { ShopCar } from '../../model/shop_car';

type PropsType = {
  helmet: Helmet;
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

    const currentItems = currentShopCar?.items || [];

    const updatedItems = [...currentItems, { quantity: 1, helmetId }];

    const shopCarToUpdate: Partial<ShopCar> = {
      ...currentShopCar,
      items: updatedItems,
    };
    await updateShopCar(currentShopCar?.id, shopCarToUpdate);
  };

  return (
    <>
      <div className="card-container" data-testid="card-container">
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
          <p className="price">{`$ ${helmet.price}`}</p>
          <div className="card-buttons">
            {loggedUser?.role === 'Admin' ? (
              <div className="edit-and-delete-buttons">
                <Link
                  to={'/currentHelmet-edit-form/' + helmet.id}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src="./editar_icon_white.png"
                    role="button"
                    alt="edit button"
                    width={30}
                    onClick={() => handleCurrentHelmet(helmet)}
                  />
                </Link>
                <Link
                  to={'/details-page/' + helmet.id}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src="./delete_icon_white.png"
                    alt="delete button"
                    role="button"
                    width={30}
                    onClick={() => handleCurrentHelmet(helmet)}
                  />
                </Link>
                <Link
                  to={'/details-page/' + helmet.id}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    className={helmet?.isFavorite ? 'favorite' : 'no-favorite'}
                    src="./add_favorite_white.png"
                    alt="add to favorite button"
                    role="button"
                    width={30}
                    onClick={() => handleCurrentHelmet(helmet)}
                  />
                </Link>
              </div>
            ) : token ? (
              <div
                className="add-to-cart"
                onClick={() => handleAddToCart(helmet.id)}
              >
                <p>Añadir al carrito</p>
                <img
                  src="/shop_icon_white.png"
                  alt="add to cart button"
                  width={20}
                  role="button"
                />
              </div>
            ) : (
              <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
                <div className="add-to-cart">
                  <p>Añadir al carrito</p>
                  <img
                    src="/shop_icon_white.png"
                    alt="add to cart button"
                    width={20}
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
