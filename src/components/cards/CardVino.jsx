import React from "react";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../admin/UploadButton";
import EditProductButton from "../admin/EditProductButton";

const CardVino = ({ nombre, precio, productId, foto, descripcion }) => {
    const { isAdmin, restauranteId } = useAuth();
  
  return (
    <div className="card vino">
      {foto && <img src={foto} alt={nombre} className="card-img" />}
      <div className="card-body">
        <h3>{nombre}</h3>
        <p className="precio">${precio}</p>
        {isAdmin && (
          <div className="admin-controls">
            <UploadButton
              restauranteId={restauranteId}
              productId={productId}
              onUpload={(url) => {
                console.log("Nueva URL de imagen:", url);
                // Aquí puedes actualizar el producto en tu DB
              }}
            />
          <EditProductButton
              product={{ id: productId, nombre, descripcion, precio }}
              />
              </div>
        )}

      </div>
    </div>
  );
};

export default CardVino;
