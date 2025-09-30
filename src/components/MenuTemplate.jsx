import React from "react";
import CardBebida from "./cards/CardBebida";
import CardPlato from "./cards/CardPlato";
import CardVino from "./cards/CardVino";
import CardPostre from "./cards/CardPostre";
import CardCafeDigestivo from "./cards/CardCafeDigestivo";
import { useAuth } from "../context/AuthContext";

const MenuTemplate = ({
  filtroPrincipal,
  filtroSecundario,
  categorias,
  productos,
  cepas,
  fetchProductos,
  banderas,
}) => {
  const { user } = useAuth();

  // --- Agrupador de vinos por cepa ---
  const renderProductosPorCepas = (productosCat, tipo) => {
    const cepasTipo = cepas
      .filter(
        (c) => c.activo && c.ubicacion.toLowerCase() === tipo.toLowerCase()
      )
      .sort((a, b) => a.prioridad - b.prioridad);

    const vinosRender = cepasTipo.map((cepa) => {
      const vinosDeCepa = productosCat.filter((v) => v.cepa === cepa.id);
      if (vinosDeCepa.length === 0) return null;
      return (
        <div key={cepa.id}>
          <h4>{cepa.nombre}</h4>
          {vinosDeCepa.map((vino) => (
            <CardVino
              key={vino.id}
              nombre={vino.nombre}
              precio={vino.precio}
              productId={vino.id}
              foto={vino.img}
              isInactive={user && !vino.activo}
              activo={vino.activo}
              fetchProductos={fetchProductos} // PASAMOS la función
              banderas={banderas}
              clasificacion={vino.clasificacion}
              origen={vino.origen}
            />
          ))}
        </div>
      );
    });

    const vinosOtros = productosCat.filter(
      (v) =>
        !cepas.some(
          (c) =>
            c.id === v.cepa &&
            c.activo &&
            c.ubicacion.toLowerCase() === tipo.toLowerCase()
        )
    );

    if (vinosOtros.length > 0) {
      vinosRender.push(
        <div key={`otros-${tipo}`}>
          <h4>{tipo === "tinto" ? "Otros Tintos" : "Otros Blancos"}</h4>
          {vinosOtros.map((vino) => (
            <CardVino
              key={vino.id}
              nombre={vino.nombre}
              precio={vino.precio}
              productId={vino.id}
              foto={vino.img}
              isInactive={user && !vino.activo}
              activo={vino.activo}
              fetchProductos={fetchProductos} // PASAMOS la función
              banderas={banderas}
              clasificacion={vino.clasificacion}
              origen={vino.origen}
            />
          ))}
        </div>
      );
    }

    return vinosRender;
  };

  return (
    <div>
      {filtroPrincipal.toLowerCase() === "menú" ? (
        (user ? productos : productos.filter((p) => p.activo)).length === 0 ? (
          <p>No hay platos disponibles.</p>
        ) : (
          (user ? productos : productos.filter((p) => p.activo))
            .sort((a, b) => (a.prioridad ?? 9999) - (b.prioridad ?? 9999))
            .map((plato) => (
              <CardPlato
                key={plato.id}
                foto={plato.img}
                nombre={plato.nombre}
                descripcion={plato.descripcion}
                precio={plato.precio}
                veggie={plato.veggie}
                sinGluten={plato.sinGluten}
                picante={plato.picante}
                productId={plato.id}
                isInactive={user && !plato.activo}
                activo={plato.activo}
                fetchProductos={fetchProductos} // PASAMOS la función
              />
            ))
        )
      ) : filtroPrincipal.toLowerCase() === "vinos" ? (
        ["tinto", "blanco", "rosado", "espumante", "por copa"].map((tipo) => {
          const productosCat = (
            user ? productos : productos.filter((p) => p.activo)
          ).filter((p) => (p.cat || "").toLowerCase() === tipo);
          if (productosCat.length === 0) return null;

          return (
            <div key={tipo} id={`cat-${tipo}`}>
              <h2>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
              {tipo === "tinto" || tipo === "blanco"
                ? renderProductosPorCepas(productosCat, tipo)
                : productosCat
                    .sort(
                      (a, b) => (a.prioridad ?? 9999) - (b.prioridad ?? 9999)
                    )
                    .map((vino) => (
                      <CardVino
                        key={vino.id}
                        nombre={vino.nombre}
                        precio={vino.precio}
                        productId={vino.id}
                        foto={vino.img}
                        isInactive={user && !vino.activo}
                        activo={vino.activo}
                        fetchProductos={fetchProductos} // PASAMOS la función
                        banderas={banderas}
                        clasificacion={vino.clasificacion}
                        origen={vino.origen}
                      />
                    ))}
            </div>
          );
        })
      ) : (
        categorias
          .filter((c) => c.activo && c.ubicacion === filtroPrincipal)
          .sort((a, b) => a.prioridad - b.prioridad)
          .map((cat) => {
            const productosCat = (
              user ? productos : productos.filter((p) => p.activo)
            ).filter((p) => p.cat === cat.id);
            if (productosCat.length === 0) return null;

            return (
              <div key={cat.id} id={`cat-${cat.id}`}>
                <h2>{cat.nombre}</h2>
                {productosCat
                  .sort((a, b) => (a.prioridad ?? 9999) - (b.prioridad ?? 9999))
                  .map((p) => {
                    if (filtroPrincipal.toLowerCase() === "bebidas") {
                      return (
                        <CardBebida
                          key={p.id}
                          foto={p.img}
                          nombre={p.nombre}
                          descripcion={p.descripcion}
                          precio={p.precio}
                          picante={p.picante}
                          productId={p.id}
                          isInactive={user && !p.activo}
                          activo={p.activo}
                          fetchProductos={fetchProductos} // PASAMOS la función
                        />
                      );
                    }
                    if (
                      filtroPrincipal.toLowerCase() === "postres y digestivos"
                    ) {
                      if (
                        cat.nombre.toLowerCase().includes("café") ||
                        cat.nombre.toLowerCase().includes("digestivo")
                      ) {
                        return (
                          <CardCafeDigestivo
                            key={p.id}
                            nombre={p.nombre}
                            precio={p.precio}
                            productId={p.id}
                            isInactive={user && !p.activo}
                            activo={p.activo}
                            fetchProductos={fetchProductos} // PASAMOS la función
                          />
                        );
                      }
                      return (
                        <CardPostre
                          key={p.id}
                          foto={p.img}
                          nombre={p.nombre}
                          descripcion={p.descripcion}
                          precio={p.precio}
                          sinGluten={p.sinGluten}
                          productId={p.id}
                          isInactive={user && !p.activo}
                          activo={p.activo}
                          fetchProductos={fetchProductos} // PASAMOS la función
                        />
                      );
                    }
                    return null;
                  })}
              </div>
            );
          })
      )}
    </div>
  );
};

export default MenuTemplate;
