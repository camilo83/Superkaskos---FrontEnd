import { Link } from 'react-router-dom';
import { MenuOption } from '../../types/menuOptions';
import './menu.scss';
import { ReactNode, useState } from 'react';

type Props = {
  readonly options: MenuOption[];
  children?: ReactNode;
};
export function Menu({ options }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav>
      <button
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        className="burger-icon"
      >
        <img
          src="./burgerMenu.png"
          alt="icono de menu plegable"
          height={30}
          width={30}
        />
      </button>
      <ul className={isMenuOpen ? 'open' : ''}>
        {options.map((item) => (
          <li key={item.label}>
            <Link to={item.path} onClick={toggleMenu}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
