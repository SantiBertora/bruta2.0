import React from "react";

const CardPostre = ({ foto, nombre, descripcion, precio, sinGluten }) => {
  return (
    <div className="card postre">
      {foto && <img src={foto} alt={nombre} className="card-img" />}
      <div className="card-body">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p className="precio">${precio}</p>
         {sinGluten && <span className="badge sin-gluten"><img
      src="https://firebasestorage.googleapis.com/v0/b/bruta2.firebasestorage.app/o/restricciones%2Fsin%20gluten.png?alt=media&token=a1b61607-f2fb-47be-8799-48a981902830"
      alt="Sin Gluten"
      className="icon-sin-gluten"
    /> Sin Gluten</span>}
      </div>
    </div>
  );
};

export default CardPostre;
