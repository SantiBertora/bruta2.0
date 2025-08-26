import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const MenuTemplate = ({ restaurantId, filtroPrincipal, filtroSecundario }) => {

    const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
        try {
      const q = query(collection(db, `restaurantes/${restaurantId}/productos`));
      const querySnapshot = await getDocs(q);

      const todosLosProductos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

        let productosFiltrados = todosLosProductos.filter(
            (producto) => (producto.clasificacion || "").toLowerCase() === filtroPrincipal.toLowerCase()
        );

        if (filtroSecundario !== "null") {
          productosFiltrados = productosFiltrados.filter(
            (producto) =>
              (producto.cat || "").toLowerCase() === filtroSecundario.toLowerCase()
          );
          console.log(filtroSecundario);
        }
        
        setProductos(productosFiltrados);
    }   catch (error) {
        console.error("Error al obtener los productos:", error);
        }
        };

    obtenerProductos();
  }, [restaurantId, filtroPrincipal, filtroSecundario]);

        
        

 return (
    <div>
      <h1>Menú - {filtroPrincipal}
      {filtroSecundario !== "null" && ` / ${filtroSecundario}`}
      </h1>
      {productos.length === 0 ? (
        <p>No hay productos disponibles en esta categoría.</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              <strong>{producto.nombre}</strong> - {producto.descripcion} (${producto.precio})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuTemplate;
