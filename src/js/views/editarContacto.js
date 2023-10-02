import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";

export const EditarContacto = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    agenda_slug: "sara",
  });

  const [submitted, setSubmitted] = useState(false);

  const enviarFormulario = async (event) => {
    event.preventDefault();
    await actions.editarContacto(contact);

    // Mostrar la alerta y configurar submitted a true
    setSubmitted(true);
  };

  useEffect(() => {
    fetch(`https://playground.4geeks.com/apis/fake/contact/${params.id}`)
      .then((response) => response.json())
      .then((result) => {
        setContact(result);
        console.log("contact", contact);
        console.log("result", result);
      })
      .catch();
  }, []);

  if (submitted) {
    // Realiza la redirección después de 2 segundos (2000 milisegundos)
    setTimeout(() => {
      navigate("/"); // Redirige a la página de inicio
    }, 2000);

    return (
      <div className="container">
        <div className="alert alert-success">
          CONTACTO EDITADO. Redirigiendo a la lista de contactos.
        </div>
      </div>
    );
  }

      return (
        <div className="container">
            <div>
                <h1>Editar contacto</h1>
            </div>
            
        <form onSubmit={enviarFormulario}>
            <div class="container mb-3">
                <label className="mb-2">Fullname</label>
                <input
					type="text"
					id="full_name"
					className="form-control"
					placeholder="Enter Full name"
					value={contact.full_name}
					onChange={(e) => setContact({...contact, full_name: e.target.value})}
					></input>
            </div>
            <div class="container mb-3">
                <label className="mb-2">Email</label>
                <input
					type="text"
					id="email"
					className="form-control"
					placeholder="Enter Email"
					onChange={(e) => setContact({...contact, email: e.target.value})}
					value={contact.email}
					></input>
            </div>
            <div class="container mb-3">
                <label className="mb-2">Phone</label>
                <input
					type="text"
					id="phone"
					className="form-control"
					placeholder="Enter Full name"
					value={contact.phone}
					onChange={(e) => setContact({...contact, phone: e.target.value})}
					></input>
            </div>
            <div class="container mb-3">
                <label className="mb-2">Address</label>
                <input
					type="text"
					id="phone"
					className="form-control"
					placeholder="Enter Full name"
					value={contact.address}
					onChange={(e) => setContact({...contact, address: e.target.value})}
					></input>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    </div>
    );
}
   
export default EditarContacto;