import ProductCard from './ProductCard';

const CategorySection = ({ categoria, productos }) => {

    return (
        <section id={categoria}>
            <h2>{categoria}</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {productos.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </div>
        </section>
    );
};

export default CategorySection;