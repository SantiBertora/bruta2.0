import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import CategorySection from "./CategorySection";

const MenuTemplate = ({ restaurantId }) => {
    const [productosPorCategoria, setProductosPorCategoria] = useState({});

    useEffect(() => {
        const obtenerProductos = async () => {
            const q = query(collection(db, `restaurantes/${restaurantId}/productos`));
            const querySnapshot = await getDocs(q);
        const productos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Agrupar productos por categoría
        const agrupados = {};
        productos.forEach(p => {
            if (!agrupados[p.categoria]) agrupados[p.categoria] = [];
            agrupados[p.categoria].push(p);
        });

        setProductosPorCategoria(agrupados);
    };

        obtenerProductos();
    }, [restaurantId]);

        return (
            <div>
                <h1>Menú</h1>
                {Object.entries(productosPorCategoria).map(([categoria, productos]) => (
                <CategorySection key={categoria} categoria={categoria} productos={productos} />
        ))}
            </div>
        );
    };

    export default MenuTemplate;