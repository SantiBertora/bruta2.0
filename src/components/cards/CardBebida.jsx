import React from "react";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../admin/UploadButton";
import EditProductButton from "../admin/EditProductButton";

const CardBebida = ({ foto, nombre, descripcion, precio, picante, productId }) => {

  const { isAdmin, restauranteId } = useAuth();

  return (
    <div className="card bebida">
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
              product={{ id: productId, nombre, descripcion, precio, picante }}
              />
          </div>
        )}
      </div>
      
    </div>
  );
};

export default CardBebida;
