import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import contacto from "../../img/contacto.png"


export const Parteuno = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.listacontactos.length === 0) {
      actions.obtenerContacto();
    }
  }, []);

  return (
    <div className="main-container">
      <div className="row header">
        <div className="col hora">
          9:41
        </div>
        <div className="col">
          <i className="fa-solid fa-battery-half"></i> <i className="fa-solid fa-wifi"></i>
        </div>

      </div>

      <div className="row ">
        <div className="col-12">
          <img className="raya" src={contacto} alt="Icono de contacto" />
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
        {/* Muestra un mensaje si no hay contactos o si están cargando */}
        {store.listacontactos.length === 0 ? (
          <p className="text-center mt-3">No hay contactos en esta agenda. Añade tu primer contacto.</p>
        ) : (
          // Mapea y muestra los contactos si la lista no está vacía
          store.listacontactos.map((contact) => (
            <div className="row-agenda" key={contact.id}>
              <div className="col-2">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="col-9">
                {/* Usa contact.full_name para el nombre completo */}
                <p id="texto">{contact.name}</p>
                <p id="texto">Email: {contact.email}</p>
                <p id="texto">Phone: {contact.phone}</p>
                <p id="texto">Address: {contact.address} </p>
              </div>
              <div className="col-1">
                {/* Asegúrate de usar backticks para las rutas de Link */}
                <Link to={`/editarcontacto/${contact.id}`}>
                  <i className="fa-solid fa-pen"></i>
                </Link>

                <i
                  className="fa-solid fa-trash"
                  onClick={() => actions.eliminarContactos(contact.id)}
                ></i>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="footer d-flex">
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