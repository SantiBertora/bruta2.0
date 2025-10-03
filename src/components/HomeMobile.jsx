import React from 'react'
import { Link } from "react-router-dom";

const HomeMobile = () => {
    return (
    <div className="home">
      {/* Logo fijo */}
      <header className="logo">
        <img src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/Home%2Flogo.png?alt=media&token=4c38cade-3f8c-41b4-97b1-b4769140d586" alt="Bruta Logo" />
      </header>

      {/* Secciones */}
      <section className="section menu">
        <div className="overlay">
          <h1>Conocé nuestro Menú</h1>
          <p>Platos preparados con ingredientes frescos y sabores únicos.</p>
          <Link to={"/menu"}>
            <button>Ver menú</button>
          </Link>
        </div>
      </section>

      <section className="section reserva">
        <div className="overlay">
          <h1>Visitanos en Pocitos</h1>
          <p>Dirección: Luis de La Torre 818</p>
          <a
  href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2Fmessage%2FCYJ7I6ZHZOMIN1%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAaf05DhCayXWMZEPhBwsUqYukrnlt2ZlX8sOMNvSS9UtCwt2nppEBvUauc-I4w_aem_rIySqU4ztRBxFZiGV5v6-g&e=AT124L_hr7BWR-W_KHzsQgoN7_2HhHS3UiXfdkboZk-nNJUXJFRF1X7zw1TsaHkB51oAdxbEevwvU6gBYj--mBac7HtFpMxBwhDsi61sRaINSoWuHVaD6moFrw"
  target="_blank"
  rel="noreferrer"
  className="whatsapp-btn"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt="WhatsApp"
    style={{ width: "40px", height: "40px" }}
  />
</a>
        </div>
      </section>

      <section className="section eventos">
        <div className="overlay">
          <h1>Eventos privados</h1>
          <p>Consultanos por eventos y experiencias gastronómicas personalizadas.</p>
          <button>Contactanos</button>
        </div>
      </section>

      <section className="section cierre">
        <div className="overlay">
<p>
  Seguinos en{" "}
  <a
    href="https://www.instagram.com/restaurantebruta/"
    target="_blank"
    rel="noreferrer"
    className="instagram-btn"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
      alt="Instagram"
      style={{ width: "32px", height: "32px" }}
    />
  </a>
</p>          <small>© 2025 Bruta - Todos los derechos reservados</small>
        </div>
      </section>
    </div>
  );
}

export default HomeMobile