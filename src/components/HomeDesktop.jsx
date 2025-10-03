import React from "react";
import { Link } from "react-router-dom";

const HomeDesktop = () => {
  return (
    <div className="home-desktop">
      <img
        className="fondo"
        src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/Home%2Ffondo%20Web.jpg?alt=media&token=2b73c421-1eea-483c-b9c5-250ce102b471"
        alt="fondo Web"
      />
      <img
        src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/Home%2Flogo-oscuro.png?alt=media&token=5968ef86-aabc-4af9-985f-21e57396a317"
        alt=""
        className="logo"
      />
      <div className="section-wrapper">
        <div className="section1">
          <h1>Conoce nuestro menú!</h1>
          <p>Platos preparados con ingredientes frescos y sabores únicos.</p>
          <Link to={"/menu"}>
          <button>Ver menú</button>
          </Link>
          <img className="img-section1" src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/Home%2FIMG_2635.jpg?alt=media&token=fd55acde-94ff-429d-bebc-c5cfb1f42a8c" alt="foto platos" />
        </div>
        <div className="section2">
          <img className="img-top" src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/Home%2Ffondo1.jpg?alt=media&token=0df43bb9-32ae-4fd4-ab63-94784cdf88c6" alt="foto bruta" />
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
          <img className="img-bottom" src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/Home%2Ffondo4.jpg?alt=media&token=5dcb5e23-0d4d-4fd0-a7f3-b6c6f55dfca6" alt="foto bruta" />
        </div>
        <div className="section3">
          <img className="img-section3" src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/Home%2Ffoto6.jpg?alt=media&token=6f9dfd56-9c18-4b06-8b21-deb29f93edd6" alt="foto bruta" />
          <h1>Eventos privados</h1>
          <p>Consultanos por eventos y experiencias gastronómicas personalizadas.</p>
        </div>
      </div>
      <div className="section4">
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
    </div>
  );
};

export default HomeDesktop;
