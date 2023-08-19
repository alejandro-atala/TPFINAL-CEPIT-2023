import React from "react";
import MenuItem from './menuItem';
import './menu.css';

const SideMenu = () => {
    return (
      <div className="side-menu">
        <MenuItem text="Plan de Estudio" />
        <MenuItem text="Beneficios" />
        <MenuItem text="Inscripción Online" />
        <MenuItem text="Directivos" />
        <MenuItem text="Proximos Eventos" />
        <MenuItem text="Talleres" />
      </div>
    );
  };
  
  export default SideMenu;