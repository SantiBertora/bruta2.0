import Filtros from '../components/Filtros';
import MenuTemplate from '../components/MenuTemplate';
import { useState , useEffect } from 'react';
import { db } from "../firebase/firebaseConfig"; // Asegúrate de que la ruta sea correcta
import { collection, getDocs, query } from "firebase/firestore";

const Menu = ({ restauranteId }) => {

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cepas, setCepas] = useState([]);
  const [filtroPrincipal, setFiltroPrincipal] = useState("Bebidas");
  const [filtroSecundario, setFiltroSecundario] = useState("null");

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
              const ref = collection(db, `restaurantes/${restauranteId}/categorias`);
              const querySnapshot = await getDocs(ref);
      
              const cats = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
              .filter((c) => c.activo !== false);;
              
              setCategorias(cats);
            } catch (error) {
              console.error("Error al obtener las categorías:", error);
            }
          };
          obtenerCategorias();
        }, [restauranteId]);

        useEffect(() => {
          const obtenerDatos = async () => {
            try {
              // --- Productos ---
              const snapProd = await getDocs(query(collection(db, `restaurantes/${restauranteId}/productos`)));
              const todosLosProductos = snapProd.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
              const snaoCepas = await getDocs(query(collection(db, `restaurantes/${restauranteId}/cepas`)));
              const todasLasCepas = snaoCepas.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

              setProductos(todosLosProductos);
              setCepas(todasLasCepas);
            } catch (error) {
              console.error("Error al obtener datos:", error);
            }
          };
          obtenerDatos();
        }, [restauranteId]);

        const productosFiltrados = productos.filter(
          (p) => (p.clasificacion || "").toLowerCase() === filtroPrincipal.toLowerCase()
        );

        const productosFiltradosPlatos = productosFiltrados.filter((plato) => {
          if (filtroPrincipal.toLowerCase() === "menú") {
            if (filtroSecundario === "sinGluten") return plato.sinGluten || plato.opSinGluten || false;
            if (filtroSecundario === "veggie") return plato.veggie || plato.opVeggie || false;
            return true;
          }
          return true;
        });

  return (
  <div className="menu">
    <header className="logo">
        <img src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/Home%2Flogo.png?alt=media&token=4c38cade-3f8c-41b4-97b1-b4769140d586" alt="Bruta Logo" />
      </header>
      <div className="filtros-container">
    <Filtros
    categorias={categorias}
    filtroPrincipal={filtroPrincipal}
    setFiltroPrincipal={setFiltroPrincipal}
    filtroSecundario={filtroSecundario}
    setFiltroSecundario={setFiltroSecundario} 
    />
    </div>
    <MenuTemplate 
    filtroPrincipal={filtroPrincipal}
    filtroSecundario={filtroSecundario}
    categorias={categorias}
    productos={productosFiltradosPlatos}
    cepas={cepas} />
  </div>
  );
  };

export default Menu;