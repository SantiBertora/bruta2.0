import React from "react";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../admin/UploadButton";
import EditProductButton from "../admin/EditProductButton";

const CardCafeDigestivo = ({ nombre, precio, productId }) => {
  const { isAdmin, restauranteId } = useAuth();

  return (
    <div className="card cafe-digestivo">
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
              product={{ id: productId, nombre, precio }}
              />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardCafeDigestivo;
