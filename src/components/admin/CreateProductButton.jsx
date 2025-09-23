// CreateProductButton.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProductForm from "./ProductForm";

const CreateProductButton = ({ categorias, cepas, onCreate }) => {
  const { isAdmin, restauranteId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAdmin) return null;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className="btn-create" onClick={openModal}>
        ➕ Crear Producto
      </button>

      {isOpen && (
        <div className="modal" onMouseDown={closeModal}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()} role="dialog">
            <h3>Nuevo Producto</h3>
            <ProductForm
              restauranteId={restauranteId}
              categorias={categorias}
              cepas={cepas}
              onCreated={onCreate}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProductButton;
