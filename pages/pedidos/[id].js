import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Detalles({ data }) {
    const [pedidos, setPedidos] = useState(data);
    return (
        <Layout title="Pedidos">
            <div className={styles.container}>
                {/* titulo  */}
                <div className="flex flex-row items-center mb-4 mt-4">
                    {/* Link de volver */}
                    <Link href="/tablero">
                        <button
                            class="flex items-center border border-aside bg-aside text-white rounded-md px-3 py-1 m-2 transition duration-500 ease select-none hover:bg-aside focus:outline-none focus:shadow-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="ml-2">Volver</span>
                        </button>
                    </Link>
                    <h1 className="text-2xl font-bold ml-6">Lista de pedidos de {pedidos[0].pedido?.clienteId?.nombre}</h1>
                </div>
                <div class='flex flex-col'>
                    {
                        pedidos.map((pedido, index) => {
                            return (
                                <div class="basis-1/2 rounded-xl border px-5 py-2 shadow-md w-full bg-white mb-2" key={index}>
                                    <div class="flex w-full items-center justify-between border-b pb-3">
                                        <div class="flex flex-col items-start">
                                            <div class="text-lg font-bold text-slate-700">Monto Total: {pedido.pedido?.montoTotal} Bs</div>
                                            <div class="text-sm text-gray-500">Codigo: {pedido.pedido?._id}</div>
                                        </div>
                                        <div class="flex items-center space-x-8">
                                            <div class="text-xs  text-black ">{pedido.pedido?.fecha}</div>
                                        </div>
                                    </div>
                                    <div class="mt-4 mb-1">
                                        {
                                            pedido.detalles?.map((detalle, index) => {
                                                return (
                                                    <div class="w-full flex items-center rounded-lg mb-2" key={index}>
                                                        <div class="mr-4"><div class="h-9 w-9 rounded-sm flex items-center justify-center text-3xl" >
                                                            <Image src={detalle.pizzaId?.imagen} alt="Picture of the author" width={50} height={50} />
                                                        </div>
                                                        </div>
                                                        <div>
                                                            <div class="font-bold text-lg">{detalle.pizzaId?.nombre}</div>
                                                            <div class="text-xs text-gray-500">
                                                                <span class="mr-2">Tamaño: {detalle.pizzaId?.tamano}</span>
                                                                <span class="mr-2">Precio: {detalle.pizzaId?.precio}</span>
                                                                <span class="mr-2">Cantidad: {detalle.cantidad}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const url = "https://chat-bot-topicos.herokuapp.com/api/pedidos/cliente/" + id;
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