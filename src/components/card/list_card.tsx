import { Helmet } from '../../model/helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useHelmets } from '../../hooks/useHelmets';
import { useUsers } from '../../hooks/useUsers';
import './card.scss';
import { useShopCars } from '../../hooks/useShopcars';
import { Items, ShopCar } from '../../model/shop_car';
import Swal from 'sweetalert2';

type PropsType = {
  readonly helmet: Helmet;
};

export function Card({ helmet }: PropsType) {
  const { handleCurrentHelmet } = useHelmets();
  const { loggedUser, token } = useUsers();
  const { currentShopCar, updateShopCar } = useShopCars();
  const navigate = useNavigate();

  const handleAddToCart = async (helmetId: string) => {
    if (!loggedUser?.id) {
      console.error('Usuario no autenticado. No se puede añadir al carrito.');
      return;
    }

    const currentItems = currentShopCar?.items ?? [];

    const handleQuantity = () => {
      if (currentItems.some((item: Items) => item.helmetId === helmetId)) {
        return currentItems.map((item) =>
          item.helmetId === helmetId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { quantity: 1, helmetId }];
      }
    };

    const updatedItems = handleQuantity();
    console.log(currentShopCar?.id);
    const shopCarToUpdate: Partial<ShopCar> = {
      ...currentShopCar,
      items: updatedItems,
    };

    currentShopCar?.items!.length === undefined ||
    currentShopCar?.items!.length < 1
      ? Swal.fire({
          title: 'Objeto añadido al carrito',
          text: 'Quieres ir a pagar?',
          icon: 'success',
          background: 'white',
          color: 'black',
          iconColor: 'black',
          width: '15rem',
          showCancelButton: true,
          confirmButtonColor: 'limegreen',
          cancelButtonColor: 'red',
          confirmButtonText: 'Checkout!',
          customClass: {
            container: 'custom-swal-font',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/shop-car');
          }
        })
      : '';

    await updateShopCar(currentShopCar?.id, shopCarToUpdate);
  };

  let addToCartButton;
  if (token && loggedUser?.role === 'User') {
    addToCartButton = (
      <div className="add-to-cart" onClick={() => handleAddToCart(helmet.id)}>
        <p>Añadir al carrito</p>
        <button role="button">
          <img src="/shop_icon_white.png" alt="add to cart button" width={20} />
        </button>
      </div>
    );
  } else if (token && loggedUser?.role === 'Admin') {
    addToCartButton = (
      <div className="edit-and-delete-buttons">
        <Link
          to={'/currentHelmet-edit-form/' + helmet.id}
          style={{ textDecoration: 'none' }}
        >
          <button role="button">
            <img
              src="./editar_icon_white.png"
              alt="edit button"
              width={30}
              onClick={() => handleCurrentHelmet(helmet)}
            />
          </button>
        </Link>
        <Link
          to={'/details-page/' + helmet.id}
          style={{ textDecoration: 'none' }}
        >
          <button role="button">
            <img
              src="./delete_icon_white.png"
              alt="delete button"
              width={30}
              onClick={() => handleCurrentHelmet(helmet)}
            />
          </button>
        </Link>
        <Link
          to={'/details-page/' + helmet.id}
          style={{ textDecoration: 'none' }}
        >
          <button role="button">
            <img
              className={helmet?.isFavorite ? 'favorite' : 'no-favorite'}
              src="./add_favorite_white.png"
              alt="add to favorite button"
              width={30}
              onClick={() => handleCurrentHelmet(helmet)}
            />
          </button>
        </Link>
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
          <button role="button" onClick={() => handleCurrentHelmet(helmet)}>
            <img
              className="helmet_image"
              src={helmet.images.url}
              alt={`${helmet.reference} image`}
              height={140}
              width={140}
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
