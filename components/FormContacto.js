import React from "react";

export default function FormContacto({ data }) {
    async function save(data) {
        // valores del formulario
        const medio = document.getElementById("medio").value;
        const fecha = document.getElementById("fecha").value;
        const descripcion = document.getElementById("descripcion").value;
        const id = data.prospecto._id;

        // validar que los campos no esten vacios
        if (medio === "" || fecha === "" || descripcion === "") {
            alert("Todos los campos son obligatorios");
            return;
        }
        const url = "http://localhost:3010/api/prospectos/contacto";
        // const token = "keyw3fjK3q3q8XsW2";
        const headers = {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const body = {
            "tipoComunicacion": medio,
            "descripcion": descripcion,
            "prospectoId": id,
            "empleadoId": "6355b8d4a2df5edde87d2e6d",
            "fecha": fecha
        };
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });
        const resp = await response.json();
        console.log(resp);
        if (resp.status == "201") {
            alert("Contacto guardado");
            return;
        } else {
            alert("Error al guardar el contacto");
        }
        // limpiar campos
        document.getElementById("medio").value = "";
        document.getElementById("fecha").value = "";
        document.getElementById("descripcion").value = "";
        // redireccionar al tablero
        window.location.href = "/tablero";
    }

    return (
        <>
            {/*body*/}
            <div className="relative px-6 py-3 flex-auto">
                {/* formulario de contacto */}
                <div className="flex flex-col w-full mb-2">
                    <div className="flex flex-row w-full mb-4">
                        <div className="flex flex-col w-full mr-8 text-black">
                            <label className="mb-2 uppercase font-bold text-lg text-gray-600">Medio de comunicación</label>
                            {/* select */}
                            <div className="relative">
                                <select className="block appearance-none w-full border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    id="medio">
                                    <option disabled>Selecciona un medio de comunicación</option>
                                    <option selected>Facebook</option>
                                    <option>Whatsapp</option>
                                    <option>Correo</option>
                                    <option>Telefono</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="mb-2 uppercase font-bold text-lg text-gray-600">Fecha</label>
                            {/* input date with date the now */}
                            <input type="date" id="fecha" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                defaultValue={new Date().toISOString().slice(0, 10)} />
                        </div>
                    </div>

                    {/* text area */}
                    <div className="flex flex-col w-full">
                        <label className="mb-2 uppercase font-bold text-lg text-gray-600">Descripción</label>
                        <textarea id="descripcion" className="border py-2 px-3 text-gray-700 mb-1" placeholder="Descripcion..." rows="8"></textarea>
                    </div>
                </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end px-6 py-3 border-t border-solid border-slate-200 rounded-b">
                <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button" onClick={() => save(data)}>
                    Guardar
                </button>
            </div>
        </>
    );
}
