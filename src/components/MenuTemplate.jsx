import React from "react";

const MenuTemplate = ({ filtroPrincipal, filtroSecundario, categorias, productos, cepas }) => {

  // --- Agrupador de vinos por cepa ---
  const renderProductosPorCepas = (productosCat, tipo) => {
    // Cepas correspondientes al tipo (tinto/blanco)
    const cepasTipo = cepas
      .filter((c) => c.activo && c.ubicacion.toLowerCase() === tipo.toLowerCase())
      .sort((a, b) => a.prioridad - b.prioridad);

    const vinosRender = cepasTipo.map((cepa) => {
      const vinosDeCepa = productosCat.filter((v) => v.cepa === cepa.id);
      if (vinosDeCepa.length === 0) return null;
      return (
        <div key={cepa.id}>
          <h4>{cepa.nombre}</h4>
          <ul>
            {vinosDeCepa.map((vino) => (
              <li key={vino.id}>
                <strong>{vino.nombre}</strong> - {vino.descripcion} (${vino.precio})
              </li>
            ))}
          </ul>
        </div>
      );
    });

    // Vinos que no coinciden con ninguna cepa activa → "Otros"
    const vinosOtros = productosCat.filter(
      (v) => !cepas.some((c) => c.id === v.cepa && c.activo && c.ubicacion.toLowerCase() === tipo.toLowerCase())
    );

    if (vinosOtros.length > 0) {
      vinosRender.push(
        <div key={`otros-${tipo}`}>
          <h4>{tipo === "tinto" ? "Otros Tintos" : "Otros Blancos"}</h4>
          <ul>
            {vinosOtros.map((vino) => (
              <li key={vino.id}>
                <strong>{vino.nombre}</strong> - {vino.descripcion} (${vino.precio})
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return vinosRender;
  };

  return (
    <div>
      {filtroPrincipal.toLowerCase() === "menú" ? (
        // --- Render de platos ---
        productos.length === 0 ? (
          <p>No hay platos disponibles.</p>
        ) : (
          <ul>
            {productos.map((plato) => (
              <li key={plato.id}>
                <strong>{plato.nombre}</strong> - {plato.descripcion} (${plato.precio})
              </li>
            ))}
          </ul>
        )
      ) : filtroPrincipal.toLowerCase() === "vinos" ? (
        // --- Render de vinos ---
        ["tinto", "blanco", "rosado", "espumante", "por copa"].map((tipo) => {
          const productosCat = productos.filter((p) => (p.cat || "").toLowerCase() === tipo);
          if (productosCat.length === 0) return null;

          return (
            <div key={tipo}>
              <h2>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
              {tipo === "tinto" || tipo === "blanco"
                ? renderProductosPorCepas(productosCat, tipo)
                : (
                  <ul>
                    {productosCat.map((vino) => (
                      <li key={vino.id}>
                        <strong>{vino.nombre}</strong> - {vino.descripcion} (${vino.precio})
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          );
        })
      ) : (
        // --- Otras clasificaciones (bebidas, postres, etc.) ---
        categorias
          .filter((c) => c.activo && c.ubicacion === filtroPrincipal)
          .sort((a, b) => a.prioridad - b.prioridad)
          .map((cat) => {
            const productosCat = productos.filter((p) => p.cat === cat.id);
            if (productosCat.length === 0) return null;
            return (
              <div key={cat.id}>
                <h2>{cat.nombre}</h2>
                <ul>
                  {productosCat.map((p) => (
                    <li key={p.id}>
                      <strong>{p.nombre}</strong> - {p.descripcion} (${p.precio})
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
      )}
    </div>
  );
};

export default MenuTemplate;
