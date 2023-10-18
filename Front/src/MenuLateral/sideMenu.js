// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './menu.css';
// import MenuItem from './menuItem';


// const SideMenu = () => {
//   const location = useLocation();
//   const isMenuOption = 
//   ['/', '/plan-de-estudio', '/beneficios', '/inscripcion-online', 
//   '/directivos', '/proximos-eventos', '/talleres'].includes(location.pathname);

//   const isHomePage = location.pathname === '/';

//   if (isHomePage || isMenuOption) {
//   return (
//     <div className="side-menu">
//       <Link to="/plan-de-estudio">
//         <MenuItem text="Plan de Estudio" />
//         </Link>
//       <Link to="/beneficios">
//       <MenuItem text="Beneficios" />
//       </Link>
//       <Link to="/inscripcion-online">
//       <MenuItem text="Inscripción Online" />
//       </Link>
//       <Link to="/directivos">
//       <MenuItem text="Directivos" />
//       </Link>
//       <Link to="/proximos-eventos">
//       <MenuItem text="Proximos Eventos" />
//       </Link>
//       <Link to="/talleres">
//         <MenuItem text="Talleres" />
//         </Link>
//       </div>
//   );
// };
// return null;
// };

// export default SideMenu;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './menu.css';
import MenuItem from './menuItem';
import Collapse from 'react-bootstrap/Collapse';

const SideMenu = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  const toggleMenu = () => setOpen(!open);

  return (
    <div className={`side-menu d-flex flex-column ${!isHomePage && 'collapsed-menu'}`}>
      <button
        className="btn btn-primary mb-2"
        onClick={toggleMenu}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Toggle Menu
      </button>
      <Collapse in={open}>
        <div id="example-collapse-text">
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
      </Collapse>
    </div>
  );
};

export default SideMenu;

