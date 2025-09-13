import React from "react";

const CardCafeDigestivo = ({ nombre, precio }) => {
  return (
    <div className="card cafe-digestivo">
      <div className="card-body">
        <h3>{nombre}</h3>
        <p className="precio">${precio}</p>
      </div>
    </div>
  );
};

export default CardCafeDigestivo;
