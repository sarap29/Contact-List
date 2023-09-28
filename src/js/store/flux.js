const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		    listacontactos: [],
			contact: "",
		},
		actions: {
			//2. Crear Agenda
			crearAgenda: (nuevaAgenda) => {
				fetch ("https://playground.4geeks.com/apis/fake/contact/", {
				method: 'POST',
				headers: {"Content-Type": "application/json", },
				body: JSON.stringify({
					full_name: "",
					email: "",
					agenda_slug: nuevaAgenda, 
					address: "",
					phone: "",
				  }),
				})
				.then(response => response.json())
				  .then(result => console.log(result))
				  .catch(error => console.log(error));
			},

			  	
			//3. Mostrar contactos de una agenda GET: /apis/fake/contact/agenda/{agenda_slug}
			
			obtenerContacto: () => {
			fetch ('https://playground.4geeks.com/apis/fake/contact/agenda/sara', {
			method: 'GET',
			})
			.then(response => response.json())
  			.then(result => {console.log("resultado", result)
			setStore({listacontactos:result})})
  			.catch(error => console.log(error));
		},

	
			// 4. Consiga un contacto en particular GET: /apis/fake/contact/{contact_id}
			// 5.Eliminar un contacto en particular DELETE: /apis/fake/contact/{contact_id}
			// 6. Eliminar todos los contactos de una agenda DELETE: /apis/fake/contact/agenda/{agenda_slug}
			// 7. Crea un contacto POST: /apis/fake/contact/
			crearUsuario: (user) => {
				fetch ("https://playground.4geeks.com/apis/fake/contact/agenda/", {
				method: 'POST',
				headers: { "Content-Type": "application/json", },
				body: JSON.stringify(user),
		
			})
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
		},

		crearContactos: (newContact) => {		
			fetch("https://playground.4geeks.com/apis/fake/contact/", {
			method: "POST",
			body: JSON.stringify(newContact),
			headers: {
			"Content-Type": "application/json",
			},
		})
			.then (response => {response.json() 
			console.log(response)})
			.then (response => {setStore({...getStore().contact, response})})
	
		},

		eliminarContactos:(contact) => {
			fetch (`https://playground.4geeks.com/apis/fake/contact/${contact}`, {
				method: "DELETE"})
			.then(response => response.json())
			.then(result => {
				setStore({...getStore().listContact, result})
				console.log("contact", contact)
			})
			.catch()
			
		},

		loadAgendaUser: async agendaSlug => {
			try {
			  const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${agendaSlug}`);
			  if (!response.ok) {
				throw new Error("No se pudo cargar la agenda");
			  }
			  const data = await response.json();
			  return data;
			} catch (error) {
			  console.error("Error al cargar los datos de la agenda:", error);
			  throw error;
			}
		  },

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
