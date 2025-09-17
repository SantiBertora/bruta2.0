import React from "react";
import { useAuth } from "../../context/AuthContext";
import UploadButton from "../admin/UploadButton";
import EditProductButton from "../admin/EditProductButton";

const CardPlato = ({ foto, nombre, descripcion, precio, veggie, sinGluten, picante, productId }) => {
    const { isAdmin, restauranteId } = useAuth();
  
  return (
    <div className="card plato">
      {foto && <img src={foto} alt={nombre} className="card-img" />}
      <div className="card-body">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p className="precio">${precio}</p>
        <div className="etiquetas">
          {veggie && <span className="badge veggie"><img
      src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/restricciones%2Fveggie.png?alt=media&token=0b70ee67-d05d-4e5a-8144-c5eddcc64d96"
      alt="Veggie"
      className="icon-veggie"
    /> Veggie</span>}
          {sinGluten && <span className="badge sin-gluten"><img
      src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/restricciones%2Fsin%20gluten.png?alt=media&token=a1b61607-f2fb-47be-8799-48a981902830"
      alt="Sin Gluten"
      className="icon-sin-gluten"
    /> Sin Gluten</span>}
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
    </div>
  );
};

export default CardPlato;
