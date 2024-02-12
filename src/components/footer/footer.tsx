import { useState, useEffect } from 'react';
import './footer.scss';

export function Footer() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 500);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        {isSmallScreen ? (
          ''
        ) : (
          <img
            className="logo-name"
            src="./logo.png"
            alt="Superkaskos"
            height={15}
          />
        )}

        {isSmallScreen ? (
          <p>Camiloisazag@hotmail.com</p>
        ) : (
          <p>Derechos reservados: Camiloisazag@hotmail.com</p>
        )}
        <img
          src="/logo_instagram.png"
          alt="Logo Instagram"
          height={15}
          width={15}
        />
        <img
          src="/logo_whatsapp.png"
          alt="Logo WhatsApp"
          height={15}
          width={15}
        />
        <img src="/logo_email.png" alt="Logo Email" height={15} width={15} />
      </div>
    </footer>
  );
}
