export default function DetallesContacto({ data }) {
    // consultar los contactos a la API
    let contactos;
    console.log(data);
    async function consultarContactos(data) {
        const url = "http://localhost:3010/api/prospectos/contacto/" + data.prospecto._id;
        // const token = "keyw3fjK3q3q8XsW2";
        const headers = {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });
        const resp = await response.json();
        contactos = resp.body;
        console.log(contactos);
    }
    consultarContactos(data)
    return <>
        {/*body*/}
        <div className="relative px-6 py-3 flex-auto">
            {/* formulario de contacto */}
            <div className="flex flex-col w-full mb-2">
                <div className="flex flex-row w-full mb-4">

                </div>
            </div>
        </div>
    </>
}
