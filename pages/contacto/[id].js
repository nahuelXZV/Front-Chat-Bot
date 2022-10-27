import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Detalles({ data }) {
    const [contactos, setContactos] = useState(data);
    console.log(contactos);

    return (
        <Layout title="Detalles">
            <div className={styles.container}>
                {/* titulo  */}
                <div className="flex flex-row  items-center mb-4 mt-4">
                    {/* Link de volver */}
                    <Link href="/tablero">
                        <button
                            type="button"
                            class="flex items-center border border-aside bg-aside text-white rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-aside focus:outline-none focus:shadow-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="ml-2">Volver</span>
                        </button>
                    </Link>
                    <h1 className="text-2xl font-bold ml-6">Detalles de contacto de {contactos[0].prospectoId?.nombre}</h1>
                </div>
                {/* Lista con los datos de los contactos */}
                <div class='flex flex-col items-center justify-center'>
                    {
                        contactos.map((dat, index) => {
                            return <div class="rounded-xl border p-5 shadow-md w-full bg-white mb-4">
                                <div class="flex w-full items-center justify-between border-b pb-3">
                                    <div class="flex items-center space-x-3">
                                        {/* <div class="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div> */}
                                        {/* imagen del icono de facebook */}
                                        <div class="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://www.facebook.com/rsrc.php/v3/y8/r/S0U5ECzYUSu.png')]"></div>
                                        <div class="text-lg font-bold text-slate-700">{dat.tipoComunicacion}</div>
                                    </div>
                                    <div class="flex items-center space-x-8">
                                        <div class="text-xs text-neutral-500 text-black">{dat.fecha}</div>
                                    </div>
                                </div>

                                <div class="mt-4 mb-6">
                                    <div class="mb-3 text-xl font-bold">{dat.empleadoId?.nombre}</div>
                                    <div class="text-sm text-neutral-600">
                                        {dat.descripcion}
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </Layout>
    );
}


export async function getServerSideProps(context) {
    const { id } = context.query;
    const url = "https://chat-bot-topicos.herokuapp.com/api/prospectos/contacto/" + id;
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