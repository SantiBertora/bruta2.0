import React from "react";
import { Link } from "react-router-dom";



const Home = () => {
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
          <button  >Reservar</button>
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
          <p>Seguinos en <a href="https://www.instagram.com/restaurantebruta/" target="_blank">Instagram</a></p>
          <small>© 2025 Bruta - Todos los derechos reservados</small>
        </div>
      </section>
    </div>
  );
};

export default Home;
