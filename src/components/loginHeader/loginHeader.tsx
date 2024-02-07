import { Link } from 'react-router-dom';
import './loginHeader.scss';

import { useUsers } from '../../hooks/useUsers';

export function LoginHeader() {
  const { token, loggedUser } = useUsers();

  return (
    <>
      {token ? (
        <>
          <div className="logout-header">
            <Link to={'/user-page'} style={{ textDecoration: 'none' }}>
              <p className="username">{loggedUser?.name}</p>
            </Link>
            <Link to={'/shop-car'} style={{ textDecoration: 'none' }}>
              <img src="/shop_icon_white.png" alt="logout-button" height={20} />
            </Link>
          </div>
        </>
      ) : (
        <div className="login-header">
          <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
            <p className="desktop-item">Iniciar sesión</p>
            <img className="mobile-item" src="./login.png" alt="Login icon" />
          </Link>
          <Link to={'/user-register'} style={{ textDecoration: 'none' }}>
            <p className="desktop-item">Registrarse</p>
          </Link>
        </div>
      )}
    </>
  );
}
