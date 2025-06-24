const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listacontactos: [],
			contact: null,
		},


		actions: {
			crearAgenda: (nuevaAgenda) => {
				fetch(`https://playground.4geeks.com/contact/agendas/${nuevaAgenda}`, {
					method: 'POST',
				})
					.then(response => response.json())
					.then(result => console.log("Agenda creada:", result))
					.catch(error => console.log("Error creando agenda:", error));
			},



			obtenerContacto: async () => {
				const { agendaSlug } = getStore();
				if (!agendaSlug) {
					console.error("agendaSlug no definido");
					return;
				}
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agendas/${agendaSlug}`, {
						method: "GET",
					});
					if (!response.ok) {
						throw new Error(`Agenda '${agendaSlug}' no encontrada`);
					}
					const result = await response.json();
					console.log("Contactos obtenidos:", result);
					setStore({ listacontactos: result });
				} catch (error) {
					console.error("Error al obtener contactos:", error.message);
				}
			},


			crearContactos: async (newContact) => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newContact),
					});


					if (!response.ok) {
						throw new Error("Error creando el contacto");
					}


					const data = await response.json();
					console.log("Contacto creado:", data);
					getActions().obtenerContacto();
				} catch (error) {
					console.error("Error creando contacto:", error.message);
				}
			},


			eliminarContactos: async (contactId) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
						method: "DELETE",
					});


					if (response.ok) {
						console.log(`Contacto ${contactId} eliminado`);
						getActions().obtenerContacto();
					}
				} catch (error) {
					console.error("Error eliminando contacto:", error);
				}
			},


			editarContacto: async (contact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact.id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(contact),
					});


					const result = await response.json();
					console.log("Contacto actualizado:", result);
					getActions().obtenerContacto();
				} catch (error) {
					console.error("Error actualizando contacto:", error);
				}
			}
		}
	};
};


export default getState;


