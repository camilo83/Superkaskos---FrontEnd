import { Helmet } from '../../../model/helmet';
import { Link } from 'react-router-dom';
import { useHelmets } from '../../../hooks/useHelmets';
import './home_card.scss';
import { useUsers } from '../../../hooks/useUsers';

type PropsType = {
  helmet: Helmet;
};

export function HomeCard({ helmet }: PropsType) {
  const { handleCurrentHelmet } = useHelmets();
  const { token } = useUsers();

  return (
    <>
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
              <div className="add-to-cart">
                <p>Añadir al carrito.</p>
                <img
                  src="/shop_icon_white.png"
                  alt="add to cart button."
                  width={20}
                />
              </div>
            ) : (
              <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
                <div className="add-to-cart">
                  <p>Añadir al carrito.</p>
                  <img
                    src="/shop_icon_white.png"
                    alt="add to cart button."
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
