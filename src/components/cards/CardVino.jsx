import React from "react";

const CardVino = ({ nombre, precio }) => {
  return (
    <div className="card vino">
      <div className="card-body">
        <h3>{nombre}</h3>
        <p className="precio">${precio}</p>
      </div>
    </div>
  );
};

export default CardVino;
