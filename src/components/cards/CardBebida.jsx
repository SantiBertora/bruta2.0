import React from "react";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../admin/UploadButton";
import EditProductButton from "../admin/EditProductButton";
import DeleteProductButton from "../admin/DeleteProductButton";

const CardBebida = ({ foto, nombre, descripcion, precio, picante, productId, isInactive, activo, fetchProductos }) => {
  const { isAdmin, restauranteId } = useAuth();

  return (
    <div className={`card bebida ${isInactive ? "inactive" : ""}`}>
      {foto && <img src={foto} alt={nombre} className="card-img" />}
      <div className="card-body">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p className="precio">${precio}</p>
        {picante && (
          <span className="badge picante">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/restricciones%2Fpicante.png?alt=media&token=e1064f62-ca4b-493a-9e99-d41f8b5ebf9c"
              alt="Picante"
              className="icon-picante"
            />
            Picante
          </span>
        )}
        {isInactive && <span className="badge inactive-badge">Inactivo</span>}

        {isAdmin && (
          <div className="admin-controls">
            <UploadButton restauranteId={restauranteId} productId={productId} />
            <EditProductButton product={{ id: productId, nombre, descripcion, precio, picante, activo }} onUpdated={fetchProductos} />
            <DeleteProductButton product={{ id: productId, nombre}} onDeleted={fetchProductos} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBebida;
