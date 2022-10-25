import React from "react";

export default function ModalTail({ dataModal }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              {/* imagen redonda pequena */}
              <img
                src={dataModal.prospecto?.foto}
                className="rounded-full w-10 h-10 mr-3"
              />
              <h3 className="text-3xl font-semibold mr-20">
                {dataModal.prospecto?.nombre} {dataModal.cliente?.nombre}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  X
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <span className="font-bold"> Correo: </span>{" "}
                {dataModal.cliente.correo} <br />
                <span className="font-bold">Telefono:</span>{" "}
                {dataModal.cliente.telefono} <br />
                <span className="font-bold">Frecuencia de compra:</span>{" "}
                {dataModal.frecuencia} <br />
                <span className="font-bold">Ult. Pedido: </span>
                {dataModal.ultimoPedido?.fecha}
                <br />
                <span className="font-bold">Promedio de compras:</span>{" "}
                {dataModal.promedioCompra}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Ver Pedidos
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
