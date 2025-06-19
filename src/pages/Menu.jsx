import Filtros from '../components/Filtros';
import MenuTemplate from '../components/MenuTemplate';

const Menu = () => {
  return (
  <div>
    <Filtros />
    <MenuTemplate restaurantId="bruta" />; // o el ID que uses para identificar el restaurante
  </div>
  );
  };

export default Menu;