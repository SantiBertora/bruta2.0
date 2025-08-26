import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig"; // Asegúrate de que la ruta sea correcta
import { collection, getDocs } from "firebase/firestore";

const Filtros = ({filtroPrincipal, filtroSecundario, setFiltroPrincipal, setFiltroSecundario}) => {
  const [categorias, setCategorias] = useState([]);
  const filtros = ["Bebidas", "Vinos", "Menú", "Postres y Digestivos"];
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
        const ref = collection(db, "restaurantes/bruta/categorias");
        const querySnapshot = await getDocs(ref);

        const cats = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        .filter((c) => c.activo !== false);;
        
        setCategorias(cats);
        console.log("Categorias obtenidas:", cats);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const categoriasFiltradas = categorias
    .filter((cat) => cat.ubicacion === filtroPrincipal)
    .map((cat) => ({ value: cat.id, label: cat.nombre}));

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
            {categoriasFiltradas.map((opt) => (
                <option key={opt.value} value={opt.value}>
                {opt.label}
                </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Filtros;
