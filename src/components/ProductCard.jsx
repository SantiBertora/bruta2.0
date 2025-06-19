const ProductCard = ({ producto }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
      {producto.img && <img src={producto.img} alt={producto.nombre} width="100%" />}
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <strong>${producto.precio}</strong>
    </div>
  );
};

export default ProductCard;