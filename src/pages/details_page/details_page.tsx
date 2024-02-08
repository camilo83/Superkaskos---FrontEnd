import { Link, useNavigate } from 'react-router-dom';
import './details_page copy.scss';
import { useHelmets } from '../../hooks/useHelmets';
import { useUsers } from '../../hooks/useUsers';
import { Helmet } from '../../model/helmet';

export default function DetailsPage() {
  const { deleteHelmet, currentHelmet, updateFavoriteHelmet } = useHelmets();
  const { loggedUser, token } = useUsers();
  const navigate = useNavigate();

  const handleDeleteButton = (helmetID: string) => {
    const isConfirmed = window.confirm('¿Está seguro que desea eliminar?');

    if (isConfirmed) {
      deleteHelmet(helmetID);
      navigate('/helmets');
    }
  };

  const handleAddToFavorite = (currentHelmet: Helmet) => {
    updateFavoriteHelmet(currentHelmet.id, currentHelmet.isFavorite);
    navigate('/helmets');
  };

  let buttonContent;
  if (loggedUser?.role === 'Admin') {
    buttonContent = (
      <div className="edit-and-delete-buttons">
        <Link
          to={'/currentHelmet-edit-form/' + currentHelmet?.id}
          style={{ textDecoration: 'none' }}
        >
          <img src="/editar_icon_white.png" alt="edit button" width={30} />
        </Link>
        <button onClick={() => handleDeleteButton(String(currentHelmet?.id))}>
          <img src="/delete_icon_white.png" alt="delete button" width={30} />
        </button>
        <button onClick={() => handleAddToFavorite(currentHelmet!)}>
          <img
            className={currentHelmet?.isFavorite ? 'favorite' : 'no-favorite'}
            src="/add_favorite_white.png"
            alt="add to favorite button"
            width={30}
          />
        </button>
      </div>
    );
  } else {
    buttonContent = (
      <div className="add-to-cart">
        <p>Añadir al carrito</p>
        <img src="/shop_icon_white.png" alt="add to cart button" width={30} />
      </div>
    );
    if (!token) {
      buttonContent = (
        <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
          {buttonContent}
        </Link>
      );
    }
  }

  return (
    <div className="details">
      <div className="images">
        <img src={currentHelmet?.images.url} alt="" width={200} />
      </div>
      <div className="info">
        <h3 className="element-property">{currentHelmet?.reference}</h3>

        <p className="info-text">
          Categoría:{' '}
          <span className="element-property">{currentHelmet?.category}</span>
        </p>
        <p className="info-text">
          Precio:{' '}
          <span className="element-property">{currentHelmet?.price}</span>
        </p>
        <div className="buttons">{buttonContent}</div>
      </div>
    </div>
  );
}
