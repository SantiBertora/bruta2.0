import Filtros from '../components/Filtros';
import MenuTemplate from '../components/MenuTemplate';
import { useState , useEffect } from 'react';
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from '../context/AuthContext';
import CreateProductButton from '../components/admin/CreateProductButton';
import CategoriasOrdenables from '../components/admin/CategoriasOrdenables';
import CrearCategoria from '../components/admin/CrearCategoria';
import CepasOrdenables from '../components/admin/CepasOrdenables';

const Menu = ({ restauranteId }) => {
  const { isAdmin } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cepas, setCepas] = useState([]);
  const [filtroPrincipal, setFiltroPrincipal] = useState("Bebidas");
  const [filtroSecundario, setFiltroSecundario] = useState("null");

  // --- Función para obtener los productos y refrescar la lista ---
  const fetchProductos = async () => {
    try {
      const snapProd = await getDocs(query(collection(db, `restaurantes/${restauranteId}/productos`)));
      const todosLosProductos = snapProd.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(todosLosProductos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Obtener categorías
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const ref = collection(db, `restaurantes/${restauranteId}/categorias`);
        const querySnapshot = await getDocs(ref);
        const cats = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((c) => c.activo !== false);
        setCategorias(cats);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    obtenerCategorias();
  }, [restauranteId]);

  // Obtener productos y cepas
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        await fetchProductos(); // obtiene y setea productos
        const snapCepas = await getDocs(query(collection(db, `restaurantes/${restauranteId}/cepas`)));
        const todasLasCepas = snapCepas.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCepas(todasLasCepas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    obtenerDatos();
  }, [restauranteId]);

  // Filtrado de productos
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

  const guardarCambios = async (nuevasCategorias) => {
    try {
      const updates = nuevasCategorias.map(async (cat) => {
        const ref = doc(db, `restaurantes/${restauranteId}/categorias/${cat.id}`);
        await updateDoc(ref, {
          prioridad: cat.prioridad ?? 0,
        });
      });

      await Promise.all(updates);
      alert("✅ Prioridades actualizadas correctamente");
    } catch (err) {
      console.error("Error al actualizar prioridades:", err);
      alert("❌ Hubo un error al guardar los cambios.");
    }
  };

  const eliminarCategoria = async (categoriaId) => {
  try {
    const confirm = window.confirm("¿Seguro que deseas eliminar esta categoría?");
    if (!confirm) return;

    const ref = doc(db, `restaurantes/${restauranteId}/categorias/${categoriaId}`);
    await deleteDoc(ref);

    // Refrescar categorías
    const refCats = collection(db, `restaurantes/${restauranteId}/categorias`);
    const querySnapshot = await getDocs(refCats);
    const cats = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((c) => c.activo !== false);
    setCategorias(cats);

    alert("✅ Categoría eliminada correctamente");
  } catch (err) {
    console.error("Error al eliminar categoría:", err);
    alert("❌ Hubo un error al eliminar la categoría.");
  }
};

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
      {isAdmin && (
  <CrearCategoria 
    restauranteId={restauranteId} 
    onCreate={() => {
      // Refrescar categorías desde Firebase
      const refCats = collection(db, `restaurantes/${restauranteId}/categorias`);
      getDocs(refCats).then((querySnapshot) => {
        const cats = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCategorias(cats);
      });
    }}
  />
)}

<CategoriasOrdenables categorias={categorias} onSave={guardarCambios} onDelete={eliminarCategoria} />
{isAdmin && (
  <CepasOrdenables
    restauranteId={restauranteId}
    cepas={cepas}
    onSave={async (nuevasCepas) => {
      try {
        const updates = nuevasCepas.map(c => {
          const ref = doc(db, `restaurantes/${restauranteId}/cepas/${c.id}`);
          return updateDoc(ref, { prioridad: c.prioridad ?? 0 });
        });
        await Promise.all(updates);
        alert("✅ Prioridades de cepas actualizadas");
      } catch (err) {
        console.error(err);
        alert("❌ Error al guardar prioridades de cepas");
      }
    }}
  />
)}

      {isAdmin && (
        <CreateProductButton 
          cepas={cepas} 
          categorias={categorias} 
          onCreate={fetchProductos} // refresca productos al crear
        />
      )}

      <MenuTemplate 
        filtroPrincipal={filtroPrincipal}
        filtroSecundario={filtroSecundario}
        categorias={categorias}
        productos={productosFiltradosPlatos}
        cepas={cepas} 
        fetchProductos={fetchProductos} // pasamos la función para borrar productos
      />
    </div>
  );
};

export default Menu;
