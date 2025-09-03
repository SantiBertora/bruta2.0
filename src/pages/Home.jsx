import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      {/* Logo fijo */}
      <header className="logo">
        <img src="src/assets/logo.png" alt="Bruta Logo" />
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
          <h1>Visitanos en Palermo</h1>
          <p>Dirección: Gurruchaga 1234, CABA</p>
          <button>Reservar</button>
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
          <p>Seguinos en <a href="https://instagram.com/bruta" target="_blank">Instagram</a></p>
          <small>© 2025 Bruta - Todos los derechos reservados</small>
        </div>
      </section>
    </div>
  );
};

export default Home;
