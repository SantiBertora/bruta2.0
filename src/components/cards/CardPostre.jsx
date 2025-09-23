import React from "react";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../admin/UploadButton";
import EditProductButton from "../admin/EditProductButton";

const CardPostre = ({ foto, nombre, descripcion, precio, sinGluten, productId, isInactive, activo }) => {
  const { isAdmin, restauranteId } = useAuth();

  return (
    <div className={`card postre ${isInactive ? "inactive" : ""}`}>
      {foto && <img src={foto} alt={nombre} className="card-img" />}
      <div className="card-body">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p className="precio">${precio}</p>
        {sinGluten && (
          <span className="badge sin-gluten">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/restricciones%2Fsin%20gluten.png?alt=media&token=a1b61607-f2fb-47be-8799-48a981902830"
              alt="Sin Gluten"
              className="icon-sin-gluten"
            />{" "}
            Sin Gluten
          </span>
        )}
        {isInactive && <span className="badge inactive-badge">Inactivo</span>}
        {isAdmin && (
          <div className="admin-controls">
            <UploadButton restauranteId={restauranteId} productId={productId} />
            <EditProductButton product={{ id: productId, nombre, descripcion, precio, activo, sinGluten }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPostre;
