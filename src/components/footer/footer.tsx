import './footer.scss';

export function Footer() {
  return (
    <footer>
      <div className="footer">
        <address>calle 67</address>
        <img
          className="logo-icon"
          src="./logo_icon.png"
          alt="Superkaskos logo"
          height={15}
          width={15}
        />
        <img
          className="logo-name"
          src="./logo.png"
          alt="Superkaskos"
          height={15}
        />
        <p>Derechos reservados: Camiloisazag@hotmail.com</p>
      </div>
    </footer>
  );
}
