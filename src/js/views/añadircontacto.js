import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import phone from "../../img/phone.png";
import { Link } from "react-router-dom";
import contacto from "../../img/contacto.png"

export const AñadirContacto = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Obtén la función de navegación

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    agenda_slug: store.currentAgendaSlug, // ¡Ahora toma el slug de la agenda desde el store!
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  const enviarFormulario = async (event) => { // Marcado como async
    event.preventDefault();
    setError(null); // Limpiar errores previos
    try {
      // Llama a la acción que ahora se encarga de verificar/crear la agenda
      // y luego crear el contacto.
      await actions.crearContactos(contact);
      setSubmitted(true);
    } catch (err) {
      console.error("Error al añadir el contacto:", err);
      setError("No se pudo añadir el contacto. Por favor, inténtalo de nuevo."); // Mensaje de error para el usuario
      setSubmitted(false); // No redirigir si hay error
    }
  };

  // Si submitted es true, muestra un mensaje de confirmación y redirige después de un breve retraso
  if (submitted) {
    // Realiza la redirección después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      navigate('/parteuno'); // Redirige a la página de inicio
    }, 3000);

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
          <div className="col-12 presentacion" >
            <img className="phone" src={phone}></img>
          </div>
          <div className="col-12 alertanuevoeditado" >
            <div className="alert alert-success">
              Tu contacto ha sido creado.
              Redirigiendo a la lista de contactos...
            </div>
          </div>
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
  }

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

      <div className="container">
        <div className="row ">
          <div className="col-12">
            <img className="raya" src={contacto} alt="Contacto" />
          </div>
        </div>

        <div className="contact-list">
          <div className="row">
            <div className="col-12">
              <h2>Nuevo contacto</h2>
            </div>
          </div>
        </div>

        {error && ( // Muestra el mensaje de error si existe
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={enviarFormulario}>
          <div className="container mb-3">
            <label className="mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Full name"
              value={contact.name}
              onChange={(e) =>
                setContact({ ...contact, name: e.target.value })
              }
            ></input>
          </div>
          <div className="container mb-3">
            <label className="mb-2" htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              value={contact.email}
            ></input>
          </div>
          <div className="container mb-3">
            <label className="mb-2" htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              className="form-control"
              placeholder="Phone"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            ></input>
          </div>
          <div className="container mb-3">
            <label className="mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="form-control"
              placeholder="Address"
              value={contact.address}
              onChange={(e) =>
                setContact({ ...contact, address: e.target.value })
              }
            ></input>
          </div>
          <button id="nuevoeditar" type="submit">Save</button>
        </form>
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

export default AñadirContacto;