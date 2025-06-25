import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import phone from "../../img/phone.png";
import { Link } from "react-router-dom";
import contacto from "../../img/contacto.png"

export const EditarContacto = () => {
  const { store, actions } = useContext(Context);
  const params = useParams(); // params.id should contain the contact ID
  const navigate = useNavigate();

  // Local state for the contact, initialized with empty fields.
  // The 'id' will be added or updated from URL parameters and API response.
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    agenda_slug: store.currentAgendaSlug, // Use the agenda slug from the store for consistency!
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  const enviarFormulario = async (event) => { // Marked as async
    event.preventDefault();
    setError(null); // Clear previous errors
    try {
      // The editarContacto action needs the 'contact' object which includes the 'id'.
      // Make sure the 'contact' in the local state already has the 'id'.
      await actions.editarContacto(contact);
      setSubmitted(true);
    } catch (err) {
      console.error("Error al editar el contacto:", err);
      setError("No se pudo editar el contacto. Por favor, inténtalo de nuevo."); // Error message for the user
      setSubmitted(false); // Do not redirect if there's an error
    }
  };

  // useEffect to load contact data when the component mounts
  // or when params.id, store.currentAgendaSlug, or store.listacontactos change.
  useEffect(() => {
    const agendaSlug = store.currentAgendaSlug;
    const contactId = params.id; // The contact ID comes from the URL

    if (!contactId) {
      console.error("No se encontró el ID del contacto en la URL.");
      setError("No se pudo cargar el contacto: ID no encontrado.");
      return; // Exit if no ID
    }

    // NEW LOGIC: Only proceed if store.listacontactos is not empty.
    // This ensures that we wait for the main contact list to be loaded.
    if (store.listacontactos.length === 0) {
      // We are waiting for the list to be populated by appContext or parteuno.
      // Do nothing for now, useEffect will re-run when listacontactos changes.
      return;
    }

    // 1. Try to find the contact in the store first
    // Convert both to string to ensure correct comparison if one is number and one is string
    const contactFromStore = store.listacontactos.find(c => String(c.id) === String(contactId));

    if (contactFromStore) {
      // If found in the store, use that data
      setContact({
        id: contactFromStore.id, // Ensure the contact ID is saved in the state
        name: contactFromStore.name || "",
        email: contactFromStore.email || "",
        phone: contactFromStore.phone || "",
        address: contactFromStore.address || "",
        agenda_slug: contactFromStore.agenda_slug || store.currentAgendaSlug
      });
      console.log("Contacto cargado desde el store:", contactFromStore);
      setError(null); // Clear any previous error
    } else {
      // 2. If not found in the store, try to get it from the API
      // This part will only run if the contact is truly not in the store AFTER it's loaded.
      // This fetch is now the fallback for edge cases, less likely to be hit due to appContext loading.
      fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contactId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error al cargar contacto: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          setContact({
            id: result.id, // Ensure the contact ID is saved in the state
            name: result.name || "",
            email: result.email || "",
            phone: result.phone || "",
            address: result.address || "",
            agenda_slug: result.agenda_slug || store.currentAgendaSlug
          });
          console.log("Contacto cargado de la API (fallback):", result);
          setError(null); // Clear any previous error
        })
        .catch((err) => {
          console.error("Error al obtener el contacto para editar (API fallback):", err);
          setError("No se pudo cargar el contacto para editar. Revisa la consola para más detalles.");
        });
    }
  }, [params.id, store.currentAgendaSlug, store.listacontactos]); // Dependencies: runs when URL ID, agenda slug, or contact list change.

  // If submitted is true, show a confirmation message and redirect after a short delay
  if (submitted) {
    // Perform redirection after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      navigate("/parteuno"); // Redirect to home page
    }, 3000); // SetTimeout duration

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
              Tu contacto ha sido editado.
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
              <h2>Editar contacto</h2>
            </div>
          </div>
        </div>

        {error && ( // Show error message if it exists
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
              placeholder="Name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
            ></input>
          </div>
          <div className="container mb-3">
            <label className="mb-2" htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
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
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
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
}

export default EditarContacto;
