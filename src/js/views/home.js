import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";



export const Home = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    // Llama a la acción para cargar los datos de la agenda por su ID
    actions
      .loadAgendaUser(params.getid)
      .then((data) => {
        setAgendaData(data);
      })
      .catch((error) => {
        console.error("Error al cargar la agenda:", error);
      });
  }, [actions, params.getid]);

  return (
    <div className="main-container">
      <div className="caja-degradado">
        <div className="icono-flecha">
          <i className="fa-solid fa-arrow-left"></i>
        </div>

        <div className="icono-agenda">
          <i className="fa-solid fa-address-book"></i>
        </div>
        <h1>Contact List</h1>
      </div>

      <div className="contact-list">
        <div className="row">
          <div className="col-9">
            <h2>Contactos</h2>
          </div>
          <div className="col-3">
          <Link to="/anadircontacto"> <i className="fa-solid fa-plus">
					
          </i></Link>
          </div>
        </div>
      </div>

      <div className="contenedor-agenda">
        <div className="">
          {store.listacontactos.map((contact) => (
            <div className="row-agenda" key={contact.id}>
              <div className="col-2">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="col-9">
                <p>{contact.title}</p>
                <h4>Name: {contact.full_name}</h4>
                <p>Email: {contact.email}</p>
                <p>Phone: {contact.phone}</p>
                <p>Address: {contact.address} </p>
              </div>
              <div className="col-1">
                <i className="fa-solid fa-pen"></i>
                <i className="fa-solid fa-trash" onClick={() => actions.eliminarContactos(contact.id)}>
                </i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
