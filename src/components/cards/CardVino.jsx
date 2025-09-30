import React from "react";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../admin/UploadButton";
import EditProductButton from "../admin/EditProductButton";
import DeleteProductButton from "../admin/DeleteProductButton";

const CardVino = ({ nombre, precio, productId, foto, descripcion, origen, isInactive, activo, fetchProductos, banderas, clasificacion }) => {
  const { isAdmin, restauranteId } = useAuth();
  const bandera = banderas?.find(b => b.nombre === origen);

  return (
    <div className={`card vino ${isInactive ? "inactive" : ""}`}>
      {foto && <img src={foto} alt={nombre} className="card-img" />}
      <div className="card-body">
        <h3>{nombre}</h3>
        <p className="precio">${precio}</p>
        {origen && bandera && (
          <img
            src={bandera.url} // asumimos que cada banderas tiene url
            alt={origen}
            title={origen}
            style={{ width: 24, height: 16, marginLeft: 8 }}
          />
        )}
        {isInactive && <span className="badge inactive-badge">Inactivo</span>}
        {isAdmin && (
          <div className="admin-controls">
            <UploadButton restauranteId={restauranteId} productId={productId} />
            <EditProductButton product={{ id: productId, nombre, descripcion, precio, activo, clasificacion }} onUpdated={fetchProductos} banderas={banderas} />
            <DeleteProductButton product={{ id: productId, nombre}} onDeleted={fetchProductos} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardVino;
