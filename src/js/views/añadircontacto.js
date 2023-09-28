import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const AñadirContacto = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Obtén la función de navegación




  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    agenda_slug: "sara",
  });

  const [submitted, setSubmitted] = useState(false);

  const enviarFormulario = (event) => {
    event.preventDefault();
    actions.crearContactos(contact);
    setSubmitted(true);
  };

  // Si submitted es true, muestra un mensaje de confirmación y redirige después de un breve retraso
  if (submitted) {
    // Realiza la redirección después de 2 segundos (2000 milisegundos)
    setTimeout(() => {
      navigate('/'); // Redirige a la página de inicio
    }, 2000);

    return (
      <div className="container">
        <div className="alert alert-success">
          Tu contacto ha sido creado. Redirigiendo a la lista de contactos
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div>
        <h1>Añadir Contacto</h1>
      </div>

      <form onSubmit={enviarFormulario}>
        <div className="container mb-3">
          <label className="mb-2">Full Name</label>
          <input
            type="text"
            id="full_name"
            className="form-control"
            placeholder="Enter Full name"
            value={contact.full_name}
            onChange={(e) =>
              setContact({ ...contact, full_name: e.target.value })
            }
          ></input>
        </div>
        <div className="container mb-3">
          <label className="mb-2">Email</label>
          <input
            type="text"
            id="email"
            className="form-control"
            placeholder="Enter Email"
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            value={contact.email}
          ></input>
        </div>
        <div className="container mb-3">
          <label className="mb-2">Phone</label>
          <input
            type="text"
            id="phone"
            className="form-control"
            placeholder="Enter Phone"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          ></input>
        </div>
        <div className="container mb-3">
          <label className="mb-2">Address</label>
          <input
            type="text"
            id="address"
            className="form-control"
            placeholder="Enter Address"
            value={contact.address}
            onChange={(e) =>
              setContact({ ...contact, address: e.target.value })
            }
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default AñadirContacto;
