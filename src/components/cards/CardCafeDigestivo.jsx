import React from "react";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../admin/UploadButton";
import EditProductButton from "../admin/EditProductButton";

const CardCafeDigestivo = ({ nombre, precio, productId, isInactive, activo }) => {
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
            <EditProductButton product={{ id: productId, nombre, precio, activo }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCafeDigestivo;
