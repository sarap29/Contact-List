import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import hr from "../../img/hr.png";
import contacto from "../../img/contacto.png"


export const Parteuno = () => {
  const { store, actions } = useContext(Context);

  //Para que elimine y luego actualice el contacto

  useEffect(() => {
    actions.obtenerContacto();
  }, [store.listacontactos]);

  return (
    <div className="main-container">
     <div className="row header">
    <div className="col hora">
    9:41
    </div>
    <div className="col">
    <i className="fa-solid fa-battery-half"></i> <i class="fa-solid fa-wifi"></i>
    </div>
   
  </div>

  <div className="row ">
  <div className="col-12">
    <img className= "raya" src={contacto} />
    </div>
  </div>
     

      <div className="contact-list">
        <div className="row">
          <div className="col-12">
            <h2>Agenda de contactos</h2>
          </div>
        </div>
      </div>

      <div className="contenedor-agenda">
        {store.listacontactos.map((contact) => (
          <div className="row-agenda" key={contact.id}>
            <div className="col-2">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="col-9">
              <p id="texto">{contact.title}</p>
              <p id="texto">Name: {contact.full_name}</p>
              <p id="texto">Email: {contact.email}</p>
              <p id="texto">Phone: {contact.phone}</p>
              <p id="texto">Address: {contact.address} </p>
            </div>
            <div className="col-1">
            <Link to={`/editarcontacto/${contact.id}`}>
								<i class="fa-solid fa-pen"></i>
							</Link>

              <i
                className="fa-solid fa-trash"
                onClick={() => actions.eliminarContactos(contact.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <div className ="footer d-flex">
      <div className="row">
    <div className="col piepagina">
    <Link to="/">
    <i className="fa-solid fa-house"></i>
    </Link>
    </div>
    <div className="col piepagina">
    <Link to="/anadircontacto">
    <i className="fa-solid fa-user-plus"></i>
            </Link>
    </div>
    <div className="col piepagina">
    <Link to="/parteuno">
    <i className="fa-solid fa-address-book"></i>
    </Link>
    </div>
  </div>
      </div>
    </div>
  );
};





/*

<div className="caja-degradado">
<div className="icono-flecha">
  <i className="fa-solid fa-arrow-left"></i>
</div>

<div className="icono-agenda">
  <i className="fa-solid fa-address-book"></i>
</div>
<h1>Contact List</h1>
</div>*/