import Filtros from '../components/Filtros';
import MenuTemplate from '../components/MenuTemplate';
import { useState } from 'react';

const Menu = () => {

  const [filtroPrincipal, setFiltroPrincipal] = useState("Bebidas");
  const [filtroSecundario, setFiltroSecundario] = useState("null");

  return (
  <div>
    <Filtros
    filtroPrincipal={filtroPrincipal}
    setFiltroPrincipal={setFiltroPrincipal}
    filtroSecundario={filtroSecundario}
    setFiltroSecundario={setFiltroSecundario} 
    />
    <MenuTemplate 
    restaurantId="bruta" 
    filtroPrincipal={filtroPrincipal}
    filtroSecundario={filtroSecundario} />
  </div>
  );
  };

export default Menu;