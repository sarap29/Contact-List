const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listacontactos: [],
			contact: "",
			currentAgendaSlug: "sara", // Por defecto a "sara"
		},
		actions: {
			// Función auxiliar para crear la agenda si no existe
			crearOVerificarAgenda: async (agendaSlug) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`, {
						method: 'POST', // Usamos POST para crearla
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({}) // Cuerpo vacío o mínimo requerido
					});

					if (response.ok) {
						console.log(`Agenda '${agendaSlug}' creada exitosamente.`);
						return; // Éxito: la agenda se creó. Salir de la función.
					} else if (response.status === 409) { // Conflicto: la agenda ya existe (código típico)
						console.log(`Agenda '${agendaSlug}' ya existe (código 409).`);
						return; // Éxito: la agenda ya existía. Salir de la función.
					} else if (response.status === 400) {
						// Si es un 400, necesitamos leer el cuerpo para ver si es el mensaje de "ya existe".
						const errorData = await response.json();
						// Verificamos que 'detail' exista, sea un string y contenga el mensaje de "already exists".
						if (errorData.detail && typeof errorData.detail === 'string' && errorData.detail.includes("already exists")) {
							console.log(`Agenda '${agendaSlug}' ya existe (código 400 con mensaje de existencia).`);
							return; // Éxito: la agenda ya existía. Salir de la función.
						} else {
							// Si es un 400 pero no el mensaje de "ya existe", entonces es un error real.
							console.error(`Error al crear/verificar agenda '${agendaSlug}' (código 400 inesperado):`, errorData);
							throw new Error(`Failed to create/verify agenda: ${response.status} - ${JSON.stringify(errorData)}`);
						}
					} else {
						// Cualquier otro código de estado HTTP que no sea 2xx, 409, o 400 específico, es un error.
						const errorData = await response.json(); // Asegurar que se parsee el JSON para los detalles del error
						console.error(`Error al crear/verificar agenda '${agendaSlug}' (código ${response.status} inesperado):`, errorData);
						throw new Error(`Failed to create/verify agenda: ${response.status} - ${JSON.stringify(errorData)}`);
					}
				} catch (error) {
					// Este catch maneja errores de red o errores lanzados por 'response.json()' si el JSON es inválido.
					console.error("Error en la conexión al crear/verificar agenda:", error);
					throw error; // Propagar el error para que sea manejado más arriba
				}
			},

			// 3. Mostrar contactos de una agenda GET
			obtenerContacto: async (retryCount = 0) => { // Añadimos un contador de reintentos
				const store = getStore();
				const agendaSlug = store.currentAgendaSlug;
				const MAX_RETRIES = 3; // Número máximo de reintentos
				const RETRY_DELAY_MS = 2000 * Math.pow(2, retryCount); // Retardo exponencial (2s, 4s, 8s)

				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`, {
						method: 'GET',
					});

					if (!response.ok) {
						if (response.status === 429 && retryCount < MAX_RETRIES) {
							console.warn(`Demasiadas peticiones (429). Reintentando en ${RETRY_DELAY_MS / 1000} segundos...`);
							await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
							return getActions().obtenerContacto(retryCount + 1); // Reintentar
						}

						if (response.status === 404) {
							console.log(`Agenda '${agendaSlug}' no encontrada. Intentando crearla...`);
							await getActions().crearOVerificarAgenda(agendaSlug);
							// Después de crear, reintentamos obtener los contactos
							return getActions().obtenerContacto();
						}
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					const result = await response.json();
					console.log("Contactos obtenidos:", result);
					setStore({ listacontactos: result.contacts || [] }); // Asegúrate de acceder a 'contacts'
				} catch (error) {
					console.error("Error al obtener contactos:", error);
					setStore({ listacontactos: [] }); // Limpiar contactos si hay un error
				}
			},

			// Crear contacto en una agenda específica
			crearContactos: async (newContact) => {
				const store = getStore();
				const agendaSlug = store.currentAgendaSlug; // Usamos el slug del store

				try {
					// Paso 1: Asegurarse de que la agenda exista
					await getActions().crearOVerificarAgenda(agendaSlug);

					// Paso 2: Crear el contacto en la agenda
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newContact), // newContact ahora tendrá 'name'
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error al crear contacto: ${response.status} - ${JSON.stringify(errorData)}`);
					}

					const result = await response.json();
					console.log("Contacto creado exitosamente:", result);
					// Actualizar la lista de contactos después de crear uno nuevo
					await getActions().obtenerContacto(); // Esto recargará la lista
					return result; // Puedes devolver el contacto creado si es útil
				} catch (error) {
					console.error("Error al crear contacto:", error);
					throw error; // Propagar el error para que el componente pueda manejarlo
				}
			},

			// Eliminar contacto
			eliminarContactos: async (contactId) => {
				const store = getStore();
				const agendaSlug = store.currentAgendaSlug; // Usamos el slug del store

				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contactId}`, {
						method: "DELETE"
					});

					if (!response.ok) {
						throw new Error(`Error al eliminar contacto: ${response.status}`);
					}

					console.log(`Contacto con ID ${contactId} eliminado.`);
					// Actualizar la lista de contactos después de eliminar uno
					await getActions().obtenerContacto();
				} catch (error) {
					console.error("Error al eliminar contacto:", error);
				}
			},

			// Editar contacto
			editarContacto: async (contact) => {
				const store = getStore();
				const agendaSlug = store.currentAgendaSlug; // Usamos el slug del store

				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${contact.id}`, {
						method: "PUT",
						body: JSON.stringify(contact), // contact ahora tendrá 'name'
						headers: {
							"Content-Type": "application/json",
						},
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(`Error al editar contacto: ${response.status} - ${JSON.stringify(errorData)}`);
					}

					const result = await response.json();
					console.log("Contacto editado exitosamente:", result);
					// Actualizar la lista de contactos después de editar uno
					await getActions().obtenerContacto();
					return result; // Puedes devolver el contacto editado
				} catch (error) {
					console.error("Error al editar contacto:", error);
					throw error; // Propagar el error
				}
			},

			// Otras funciones...
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				// ...
			},
			changeColor: (index, color) => {
				// ...
			}
		}
	};
};

export default getState;
