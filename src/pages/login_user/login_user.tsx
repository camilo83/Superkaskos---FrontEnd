import { SyntheticEvent } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { LoginUser } from '../../model/user';

import { Link, useNavigate } from 'react-router-dom';
import './login_user.scss';

export default function LoginForm() {
  const { login } = useUsers();

  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    const form = event.target as HTMLFormElement;
    event.preventDefault();

    const formData = new FormData(form);
    const userEmail = formData.get('email') as string;
    const userPasswd = formData.get('passwd') as string;

    const newUser: LoginUser = {
      email: userEmail,
      passwd: userPasswd,
    };

    await login(newUser);

    navigate('/home');
  };

  return (
    <>
      <div className="login-container">
        <p className="login-account">Inicia sesión</p>
        <form
          className="login-form"
          name="login-form"
          onSubmit={handleSubmit}
          data-testid="login-form"
        >
          <div>
            <label htmlFor="email"></label>
            <input type="email" name="email" id="email" placeholder="Email: " />
          </div>
          <div>
            <label htmlFor="passwd"></label>
            <input
              type="password"
              name="passwd"
              id="passwd"
              placeholder="Password"
            />
          </div>
          <button type="submit">Inciar Sesión</button>
        </form>
        <p className="go-to-register">
          No tienes cuenta?{' '}
          <span>
            <Link to={'/user-register'} style={{ textDecoration: 'none' }}>
              ¡Entra Aquì!
            </Link>
          </span>
        </p>
      </div>
    </>
  );
}
