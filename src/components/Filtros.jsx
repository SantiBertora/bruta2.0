import React from "react";

const Filtros = ({filtroPrincipal, filtroSecundario, setFiltroPrincipal, setFiltroSecundario, categorias}) => {
  
  const filtros = ["Bebidas", "Vinos", "Menú", "Postres y Digestivos"];

  const cambiarFiltroPrincipal = (filtro) => {
    setFiltroPrincipal(filtro);
    setFiltroSecundario("null"); // Resetea el filtro secundario al cambiar el principal
  };

  const cambiarFiltroSecundario = (filtro) => {
    setFiltroSecundario(filtro);
  };

  const categoriasFiltradas = categorias
    .filter((cat) => cat.ubicacion === filtroPrincipal && cat.activo !== false)
    .sort((a, b) => a.prioridad - b.prioridad)
    .map((cat) => ({ value: cat.id, label: cat.nombre}));

  return (
    <div className="filtros">
      <div id="filtro-principal">
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
      <div className="filtro-secundario">
        <select
          id="filtroDesplegable"
          value={filtroSecundario}
          onChange={(event) => cambiarFiltroSecundario(event.target.value)}
        >
            <option value="null">Todos</option>
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
