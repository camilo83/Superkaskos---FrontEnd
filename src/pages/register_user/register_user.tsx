import { SyntheticEvent } from 'react';
import { useUsers } from '../../hooks/useUsers';
import './register_user.scss';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const { register } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    const form = event.target as HTMLFormElement;

    event.preventDefault();
    const formData = new FormData(form);

    register(formData);
    navigate('/home');
  };

  return (
    <div className="register-container">
      <p className="create-account">Crear cuenta</p>
      <form
        className="register-form"
        name="register-form"
        onSubmit={handleSubmit}
        data-testid="register-form"
      >
        <div>
          <input type="email" name="email" id="email" placeholder="Correo:" />
        </div>
        <div>
          <input
            type="password"
            name="passwd"
            id="passwd"
            placeholder="Contraseña: "
          />
        </div>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            multiple
            placeholder="Nombre:"
          />
        </div>
        <div>
          <input
            type="text"
            name="surname"
            id="surname"
            placeholder="Apellidos:"
          />
        </div>
        <div>
          <input type="number" name="age" id="age" placeholder="Edad:" />
        </div>
        <div>
          <input
            type="text"
            name="number"
            id="number"
            placeholder="Número de Teléfono:"
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Dirección: "
          />
        </div>
        <div>
          <input type="file" name="avatar" id="avatar" placeholder="Image: " />
        </div>
        <button type="submit">Regístrate</button>
      </form>
      <p className="go-to-login">
        ¿Ya tienes cuenta?{' '}
        <span>
          <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
            ¡Entra Aqui!
          </Link>
        </span>
      </p>
    </div>
  );
}
