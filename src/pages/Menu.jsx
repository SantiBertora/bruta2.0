import { useEffect, useState } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Menu = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const productosArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProductos(productosArray);
  };

    obtenerProductos();
  }, []);
  
  return (
    <div>
      <h1>Menú</h1>
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            <h3>{p.nombre}</h3>
            <h4>${p.precio}</h4>
            <p>{p.descripcion}</p>
            {p.img && <img src={p.img} alt={p.nombre} width={150} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu