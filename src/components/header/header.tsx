import { useNavigate } from 'react-router-dom';
import { LoginHeader } from '../loginHeader/loginHeader';
import './header.scss';

type Props = {
  readonly children: JSX.Element;
};

export function Header({ children }: Props) {
  const navigate = useNavigate();
  const handleHomePage = () => {
    navigate('home');
  };
  return (
    <header>
      <button
        className="header"
        role="button"
        tabIndex={0}
        onClick={() => handleHomePage()}
      >
        <h1>SUPERKASKOS</h1>
        <img src="/logo_icon.png" alt="" />
        <img src="/logo.png" alt="" />
      </button>

      {children}
      <section className="login-header">
        <LoginHeader></LoginHeader>
      </section>
    </header>
  );
}
