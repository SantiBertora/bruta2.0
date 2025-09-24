// src/utils/DeleteProductButton.jsx
import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const DeleteProductButton = ({ product, onDeleted }) => {
  const { isAdmin, restauranteId } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!isAdmin) return null;

  const handleDelete = async () => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el producto "${product.nombre}"?`
    );
    if (!confirmar) return;

    setLoading(true);
    try {
      const productRef = doc(
        db,
        `restaurantes/${restauranteId}/productos`,
        product.id
      );
      await deleteDoc(productRef);

      setLoading(false);
      alert("Producto eliminado con éxito ✅");

      if (typeof onDeleted === "function") {
        onDeleted();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error eliminando producto:", err);
      setLoading(false);
      alert("Error al eliminar el producto. Reintentá.");
    }
  };

  return (
    <button
      type="button"
      className="btn-delete"
      onClick={handleDelete}
      disabled={loading}
      
    >
      {loading ? "Eliminando..." : "🗑️ Eliminar"}
    </button>
  );
};

export default DeleteProductButton;
