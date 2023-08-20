import React from "react";
import { Link } from 'react-router-dom';  
import MenuItem from './menuItem';
import './menu.css';

const SideMenu = () => {
  return (
    <div className="side-menu">
      <Link to="/plan-de-estudio">
        <MenuItem text="Plan de Estudio" />
      </Link>
      <Link to="/beneficios">
        <MenuItem text="Beneficios" />
      </Link>
      <Link to="/inscripcion-online">
        <MenuItem text="Inscripción Online" />
      </Link>
      <Link to="/directivos">
        <MenuItem text="Directivos" />
      </Link>
      <Link to="/proximos-eventos">
        <MenuItem text="Proximos Eventos" />
      </Link>
      <Link to="/talleres">
        <MenuItem text="Talleres" />
      </Link>
    </div>
  );
};

export default SideMenu;