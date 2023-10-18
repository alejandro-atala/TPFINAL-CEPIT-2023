import React from "react";
import './proyectos.css';


const Proyectos = () => {
    
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h1>Título principal</h1>
                    <p>Aquí va tu párrafo principal.</p>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12">
                            <img src="imagen1.jpg" class="img-fluid" alt="Imagen 1"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <img src="imagen2.jpg" class="img-fluid" alt="Imagen 2"/>
                        </div>
                        <div class="col-md-6">
                            <img src="imagen3.jpg" class="img-fluid" alt="Imagen 3"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proyectos;
