import Image from "next/image";
import React from "react";
import FormContacto from "./FormContacto";
import DetallesContacto from "./DetallesContacto";
import Link from "next/link";

export default function Card({
    id,
    title,
    facebookId,
    data = [],
    tags,
    image,
    metadata,
    type
}) {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div class="mb-2 shadow-lg rounded-xl w-72 md:w-80 p-3 bg-white relative overflow-hidden">
                <a class="w-full h-full block">
                    <div class="flex items-center border-b-2 mb-2 py-2">
                        <Image
                            src={image}
                            alt="Picture of the author"
                            width={40}
                            height={40}
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div class="pl-3">
                            <div class="font-medium text-black">{title}</div>
                            <div class="text-gray-600 text-sm">FacebookId: {facebookId}</div>
                        </div>
                    </div>
                    <div class="w-full mb-3">
                        {data.map((dat, index) => {
                            return (
                                <p class="text-gray-600 text-sm font-medium mb-0.1">
                                    <span className="text-gray-800 text-sm font-bold">
                                        {dat.key}: &nbsp;
                                    </span>
                                    {dat.value}
                                </p>
                            );
                        })}
                    </div>
                    {/* tags con colores */}
                    <div class="flex flex-row">
                        <div class="flex basis-1/2">
                            {type === "prospecto" ? <button
                                class="bg-blue-500 text-xs hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-full"
                                onClick={() => setShowModal(true)}>
                                Contactar
                            </button> : ""}
                            {type === "contacto" ?
                                (<Link href={`/contacto/${metadata.prospecto._id}`}>
                                    <a class="bg-blue-500 text-xs hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-full">
                                        Detalles
                                    </a>
                                </Link>) : ""}
                            {type === "cliente" || type === "frecuente" ?
                                (<Link href={`/pedidos/${metadata.cliente._id}`}>
                                    <a class="bg-blue-500 text-xs hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-full mr-2">
                                        Pedidos
                                    </a>
                                </Link>) : ""}
                            {type === "frecuente" ?
                                (<Link href='/'>
                                    <a class="bg-green-500 text-xs hover:bg-green-600 text-white font-medium py-1 px-2 rounded-full">
                                        Notificar
                                    </a>
                                </Link>) : ""}
                        </div>
                        <div class="flex basis-1/2">
                            {tags.map((tag, index) => {
                                return (
                                    // texto con variables de tailwind
                                    <button class={`ml-1 bg-${tag.color}-200 text-black text-xs font-medium rounded-full px-1 py-1 hover:bg-${tag.color}-300`}                  >
                                        {tag.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </a>
            </div>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    {/* imagen redonda pequena */}
                                    <img src={image} className="rounded-full w-10 h-10 mr-3" />
                                    <div class="pl-3">
                                        <div class="font-medium">{title}</div>
                                        <div class="text-gray-600 text-sm">
                                            FacebookId: {facebookId}
                                        </div>
                                    </div>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                {type == "prospecto" ? (<FormContacto data={metadata} />) : ('')}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}