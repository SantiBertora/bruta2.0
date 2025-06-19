import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig"; // Asegúrate de que la ruta sea correcta
import { collection, getDocs } from "firebase/firestore";

const Filtros = () => {
  const [categorias, setCategorias] = useState([]);
  const filtros = ["Bebidas", "Vinos", "Menú", "Postres y Digestivos"];
  const [filtroPrincipal, setFiltroPrincipal] = useState("Bebidas");
  const [filtroSecundario, setFiltroSecundario] = useState("null");
  const cambiarFiltroPrincipal = (filtro) => {
    setFiltroPrincipal(filtro);
    setFiltroSecundario("null"); // Resetea el filtro secundario al cambiar el principal
  };
  const cambiarFiltroSecundario = (filtro) => {
    setFiltroSecundario(filtro);
  };

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const q = collection(db, "restaurantes/bruta/categorias");
        const querySnapshot = await getDocs(q);

        const datos = querySnapshot.docs.map((doc) => doc.data());

        setCategorias(datos);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const categoriasFiltradas = categorias
    .filter(cat => cat.ubicacion === filtroPrincipal)
    .map(cat => cat.nombre);

  return (
    <div>
      <div id="filtroPrincipal">
        {filtros.map((filtro) => (
          <button
            key={filtro}
            className={`filtro ${filtro === filtroPrincipal ? "activo" : ""}`}
            onClick={() => cambiarFiltroPrincipal(filtro)}
          >
            {filtro}
          </button>
        ))}
      </div>
      <div id="filtroSecundario">
        <select
          id="filtroDesplegable"
          value={filtroSecundario}
          onChange={(event) => cambiarFiltroSecundario(event.target.value)}
        >
            <option value="null">Selecciona una categoría</option>
            {categoriasFiltradas.map((categoria) => (
                <option key={categoria} value={categoria}>
                {categoria}
                </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Filtros;
