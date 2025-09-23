import React from "react";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../admin/UploadButton";
import EditProductButton from "../admin/EditProductButton";
import DeleteProductButton from "../admin/DeleteProductButton";

const CardCafeDigestivo = ({ nombre, precio, productId, isInactive, activo, fetchProductos }) => {
  const { isAdmin, restauranteId } = useAuth();

  return (
    <div className={`card cafe-digestivo ${isInactive ? "inactive" : ""}`}>
      <div className="card-body">
        <h3>{nombre}</h3>
        <p className="precio">${precio}</p>
        {isInactive && <span className="badge inactive-badge">Inactivo</span>}
        {isAdmin && (
          <div className="admin-controls">
            <UploadButton restauranteId={restauranteId} productId={productId} />
            <EditProductButton product={{ id: productId, nombre, precio, activo }} onUpdated={fetchProductos} />
            <DeleteProductButton product={{ id: productId, nombre}} onDeleted={fetchProductos} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCafeDigestivo;
