import './about-us.scss';

export default function AboutUs() {
  return (
    <>
      <div className="about-us">
        <h2>Superkaskos</h2>
        <section id="nosotros" role="region">
          <h4>NOSOTROS</h4>
          <p>
            Somos una empresa colombiana dedicada a la fabricación y
            comercialización de cascos para motociclistas.
          </p>
          <p>
            Todos nuestros cascos están certificados bajo la norma americana
            FMVSS218 (DOT).
          </p>
          <p>
            Este sueño nace de la convicción de apostarle al talento local, de
            abrir nuevos caminos y fronteras que permitan aportar a la economía
            de la región y del país.
          </p>
          <p>
            Sabemos que producimos más que cascos, tenemos una responsabilidad
            que trasciende al cuidado de la vida y protección de nuestros
            usuarios finales.
          </p>
          <p>
            Por eso, trabajamos todos los días por innovar nuestros procesos,
            operaciones, aprovisionamiento y logística.
          </p>
        </section>

        <section id="mision-vision" role="region">
          <h4>MISIÓN</h4>
          <p>
            Superkaskos es una empresa de orden privado que innova y desarrolla
            cascos para motociclistas de alta calidad...
          </p>

          <h4>VISIÓN</h4>
          <p>
            Para el año 2023 ampliar el mercado y posicionar nuestra marca
            TATTOO nacional e internacionalmente con estándares altos de
            calidad.
          </p>

          <h4>POLÍTICA DE CALIDAD</h4>
          <p>
            En Superkaskos buscamos satisfacer a nuestros clientes a través de
            la fabricación de cascos para motocicletas que cumplan los
            requisitos de las partes interesadas tanto internas como externas,
            el mejo...
          </p>
        </section>

        <section id="blog" role="region">
          <h4>BLOG</h4>
          <h5>SUPERKASKOS SOSTENIBLE</h5>
          <p>
            Nuestro compromiso nos lleva aportarle a la sostenibilidad del
            planeta a través de acciones regenerativas que cuiden el medio
            ambiente. Como tal, hemos implementado un sistema de generación
            solar, con el cual trabajamos aproximadamente 3.600 Megawatts- hora.
            Esto sería equivalente a dejar de emitir 2.700 toneladas de CO2 a la
            atmósfera o como dato relevante con esta energía podrían abastecerse
            aproximadamente 300 viviendas durante un año.
          </p>
          <video controls width="250">
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </section>
      </div>
    </>
  );
}
