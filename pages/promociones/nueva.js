import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Detalles({ data }) {
    const [pizzas, setPizzas] = useState(data);
    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [detalles, setDetalles] = useState([]);

    const savePromocion = async () => {
        console.log(nombre, descripcion, fechaInicio, fechaFin, detalles);
        console.log("guardar promocion");
    }


    return (
        <Layout title="Pedidos">
            <div className="p-6">
                {/* titulo */}
                <div className="flex justify-center mb-5">
                    <h1 className="text-3xl font-bold text-gray-600">Nueva promoción</h1>
                </div>
                {/* formulario de nueva promocion */}
                <div className="flex justify-center">
                    <form className="w-full">
                        <div className="flex flex-col mb-8">
                            <div className="flex flex-row" >
                                <div className="w-1/2 mx-2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                        Nombre
                                    </label>
                                    <input className="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="nombre" type="text" placeholder="Nombre"
                                        onChange={(event) => { setNombre(event.target.value) }} />
                                </div>
                                <div className="w-1/2 mx-2">
                                </div>
                            </div>
                            <div className="flex flex-row" >
                                {/* fecha inicio */}
                                <div className="w-1/2 mx-2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Fecha inicio
                                    </label>
                                    <input className="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="fecha_inicio" type="date" placeholder="Fecha inicio"
                                        onChange={(event) => { setFechaInicio(event.target.value) }} />
                                </div>
                                {/* fecha fin */}
                                <div className="w-1/2 mx-2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Fecha fin
                                    </label>
                                    <input className="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="fecha_fin" type="date" placeholder="Fecha fin" onChange={(event) => { setFechaFin(event.target.value) }} />
                                </div>
                            </div>
                            {/* text area */}
                            <div className="w-full px-3 mb-4">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Descripcion
                                </label>
                                <textarea className="no-resize block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-32 resize-none" id="descripcion" type="text" placeholder="Descripcion...." onChange={(event) => { setDescripcion(event.target.value) }} />
                            </div>
                            {/* cheack box con las pizzas */}
                            <div className="flex flex-row" >
                                <div className="w-full mx-2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" for="grid-last-name">
                                        Pizzas habilitadas
                                    </label>
                                    <div className="flex flex-row">
                                        {pizzas.map((pizza) => (
                                            <div className="flex flex-row items-center mx-4 row-span-5" key={pizza._id}>
                                                <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" id="detalles"
                                                    value={pizza._id} onChange={(event) => { setDetalles(event.target.value) }} />
                                                <label className="ml-2 text-gray-700" >{pizza.nombre}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* boton de enviar */}
                        <div className="flex justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={savePromocion}>
                                Guardar promoción
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const url = "http://localhost:3010/api/promociones/pizzas";
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
    return {
        props: {
            data: resp.body,
        },
    };
} 