import './helmetCertificate.scss';

export default function Certificates() {
  return (
    <>
      <div className="certificate_banner">
        <img src="/descargar_certificado.png" alt="" />
      </div>
      <div className="certificate">
        <img src="/ya_tienes_casco2.png" alt="" height={200} />
        <div className="get-certificate">
          <p className="other-p">¡Descarga tu certificado!</p>
          <p className="here">AQUÍ</p>
        </div>
      </div>
    </>
  );
}
