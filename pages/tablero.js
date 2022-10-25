import Layout from "../components/Layout";
import Board from "react-trello";
import React, { Component } from "react";
import Link from "next/link";
import Card from "../components/Card";

export default function Tablero({ data }) {
  const [showModal, setShowModal] = React.useState(false);
  const [dataModal, setDataModal] = React.useState({});

  const components = {
    Card: Card,
  };
  return (
    <Layout title="Tablero">
      <Board
        data={data}
        components={components}
        draggable={false}
        cardDraggable={false}
        laneDraggable={false}
        onCardClick={(cardId, metadata, laneId) => {
          setDataModal({
            ...metadata,
            laneId,
          });
          setShowModal(true);
        }}
        style={{ backgroundColor: "#1e3a8a" }}
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
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
                    {dataModal.laneId === "prospectos" ||
                    dataModal.laneId === "contactos"
                      ? dataModal.prospecto?.nombre
                      : dataModal.cliente?.nombre}
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
                    {/* Id de facebook */}
                    <span className="font-bold"> Codigo Facebook: </span>
                    {dataModal.prospecto?.facebookId} <br />
                    {/* Correo */}
                    {dataModal.laneId == "clientes" ||
                    dataModal.laneId == "frecuentes" ? (
                      <>
                        <span className="font-bold"> Correo: </span>
                        {dataModal.cliente?.correo} <br />
                      </>
                    ) : (
                      ""
                    )}
                    {/* Telefono */}
                    {dataModal.laneId == "clientes" ||
                    dataModal.laneId == "frecuentes" ? (
                      <>
                        <span className="font-bold"> Telefono: </span>
                        {dataModal.cliente?.telefono} <br />
                      </>
                    ) : (
                      ""
                    )}
                    {/* Ultima Ves */}
                    {dataModal.laneId === "prospectos" ||
                    dataModal.laneId === "contactos" ? (
                      <>
                        <span className="font-bold"> Ult. Vez: </span>
                        {dataModal.ultimoIngreso?.fecha} <br />
                      </>
                    ) : (
                      ""
                    )}
                    {/* Ultimo Contacto */}
                    {dataModal.laneId === "contactos" ? (
                      <>
                        <span className="font-bold"> Ult. Contacto: </span>
                        {dataModal.ultimoContacto?.fecha} <br />
                        <span className="font-bold"> Tipo comunicacion: </span>
                        {dataModal.ultimoContacto?.tipoComunicacion} <br />
                      </>
                    ) : (
                      ""
                    )}
                    {/* Frecuencia Compra */}
                    {dataModal.laneId == "frecuentes" ? (
                      <>
                        <span className="font-bold">
                          Frecuencia de compra:{" "}
                        </span>
                        {dataModal.frecuencia} <br />
                      </>
                    ) : (
                      ""
                    )}
                    {/* Ultimo Pedido */}
                    {dataModal.laneId == "clientes" ||
                    dataModal.laneId == "frecuentes" ? (
                      <>
                        <span className="font-bold">Ultimo pedido: </span>
                        {dataModal.ultimoPedido?.fecha} <br />
                      </>
                    ) : (
                      ""
                    )}
                    {/* Monto Ultimo Pedido */}
                    {dataModal.laneId == "clientes" ? (
                      <>
                        <span className="font-bold">Monto Ult. pedido: </span>
                        {dataModal.ultimoPedido?.montoTotal} Bs <br />
                      </>
                    ) : (
                      ""
                    )}
                    {/* Promedio de compra */}
                    {dataModal.laneId == "frecuentes" ? (
                      <>
                        <span className="font-bold">Promedio de compra: </span>
                        {dataModal.promedioCompra}
                      </>
                    ) : (
                      ""
                    )}
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
                  {dataModal.laneId === "prospectos" ? (
                    <Link href="/contactar">
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Contactar
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                  {dataModal.laneId === "contactos" ? (
                    <Link href="/detalles">
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Ver detalles
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                  {dataModal.laneId === "clientes" ? (
                    <Link href="/pedidos">
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Ver pedidos
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                  {dataModal.laneId === "frecuentes" ? (
                    <>
                      <Link href="/pedidos">
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Ver pedidos
                        </button>
                      </Link>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Notificar
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </Layout>
  );
}

function formatoDescripcion(data, type) {
  switch (type) {
    case "prospecto":
      let descripcion = [
        {
          key: "Link Facebook",
          value: data.prospecto.facebookId ? data.prospecto.facebookId : "",
        },
        {
          key: "Ult. Vez",
          value: data.ultimoIngreso?.fecha ? data.ultimoIngreso?.fecha : "",
        },
      ];
      return descripcion;
      break;
    case "contacto":
      let descripcionContacto = [
        {
          key: "Correo",
          value: data.prospecto.correo ? data.prospecto.correo : "",
        },
        {
          key: "Ult. Vez",
          value: data.ultimoIngreso?.fecha ? data.ultimoIngreso?.fecha : "",
        },
        {
          key: "Ult. Contacto",
          value: data.ultimoContacto?.fecha ? data.ultimoContacto?.fecha : "",
        },
        {
          key: "Medio de comunicacion",
          value: data.ultimoContacto?.tipoComunicacion
            ? data.ultimoContacto?.tipoComunicacion
            : "",
        },
      ];
      return descripcionContacto;
      break;
    case "cliente":
      let descripcionCliente = [
        {
          key: "Correo",
          value: data.cliente.correo ? data.cliente.correo : "",
        },
        {
          key: "Telefono",
          value: data.cliente.telefono ? data.cliente.telefono : "",
        },
        {
          key: "Ult. Pedido",
          value: data.ultimoPedido?.fecha ? data.ultimoPedido?.fecha : "",
        },
        {
          key: "Monto Ult. Pedido",
          value: data.ultimoPedido?.montoTotal
            ? data.ultimoPedido?.montoTotal
            : "",
        },
      ];
      return descripcionCliente;
      break;
    default:
      let clienteFrecuente = [
        {
          key: "Correo",
          value: data.cliente.correo ? data.cliente.correo : "",
        },
        {
          key: "Telefono",
          value: data.cliente.telefono ? data.cliente.telefono : "",
        },
        {
          key: "Frecuencia de pedidos",
          value: data.frecuencia ? data.frecuencia : "",
        },
        {
          key: "Ult. Pedido",
          value: data.ultimoPedido?.fecha ? data.ultimoPedido?.fecha : "",
        },
        {
          key: "Promedio de compra",
          value: data.promedioCompra ? data.promedioCompra : "",
        },
      ];
      return clienteFrecuente;
      break;
  }
}

function cardData(
  id = "null",
  title,
  dataCard,
  tags,
  type,
  imagen = "https://picsum.photos/200/300"
) {
  let cardData = {
    title: title,
    facebookId: id,
    data: formatoDescripcion(dataCard, type),
    tags: tags,
    image: imagen,
    metadata: dataCard,
  };
  return cardData;
}

function createPanel(id, title, dataPanel) {
  let panelData = {
    id: id,
    title: title,
    label: dataPanel.length + "/10",
    cards: dataPanel,
  };
  return panelData;
}

export async function getServerSideProps(context) {
  let dataTablero = {
    lanes: [],
  };
  let listProspectos = [];
  let listContactos = [];
  let listClientes = [];
  let listFrecuentes = [];
  let tags;
  // Prospectos y Contactados
  const prospectos = await fetch(
    `https://chat-bot-topicos.herokuapp.com/api/prospectos/`
  );
  const datas = await prospectos.json();
  const body = datas.body;
  body.forEach((element) => {
    if (element.contactos == 0) {
      tags = [
        {
          bgcolor: "blue",
          color: "blue",
          title: "Ingresos: " + element.ingresos,
        },
      ];
      listProspectos.push(
        cardData(
          element.prospecto?.facebookId,
          element.prospecto?.nombre,
          element,
          tags,
          "prospecto",
          element.prospecto?.foto
        )
      );
    } else {
      tags = [
        {
          bgcolor: "blue",
          color: "blue",
          title: "Ingresos: " + element.ingresos,
        },
        {
          bgcolor: "yellow",
          color: "yellow",
          title: "Contactos: " + element.contactos,
        },
      ];
      listContactos.push(
        cardData(
          element.prospecto?.facebookId,
          element.prospecto?.nombre,
          element,
          tags,
          "contacto",
          element.prospecto?.foto
        )
      );
    }
  });
  dataTablero.lanes.push(
    createPanel("prospectos", "Prospectos", listProspectos)
  );
  dataTablero.lanes.push(
    createPanel("contactos", "Contactados", listContactos)
  );

  // Clientes y Clientes frecuentes
  const clientes = await fetch(
    `https://chat-bot-topicos.herokuapp.com/api/clientes/`
  );
  const datas2 = await clientes.json();
  const body2 = datas2.body;
  body2.forEach((element) => {
    if (element.cliente.tipo != "frecuente") {
      tags = [
        {
          bgcolor: "blue",
          color: "blue",
          title: "Ingresos: " + element.ingresos,
        },
        {
          bgcolor: "yellow",
          color: "yellow",
          title: "Pedidos: " + element.pedidos,
        },
      ];
      listClientes.push(
        cardData(
          element.prospecto?.facebookId,
          element.cliente?.nombre,
          element,
          tags,
          "cliente",
          element.prospecto?.foto
        )
      );
    } else {
      tags = [
        {
          bgcolor: "#0079BF",
          color: "blue",
          title: "Notificaciones: " + element.notificaciones,
        },
        {
          bgcolor: "yellow",
          color: "yellow",
          title: "Pedidos: " + element.pedidos,
        },
      ];
      listFrecuentes.push(
        cardData(
          element.prospecto?.facebookId,
          element.cliente?.nombre,
          element,
          tags,
          "frecuente",
          element.prospecto?.foto
        )
      );
    }
  });
  dataTablero.lanes.push(createPanel("clientes", "Clientes", listClientes));
  dataTablero.lanes.push(
    createPanel("frecuentes", "Clientes frecuentes", listFrecuentes)
  );
  return {
    props: {
      data: dataTablero,
    }, // will be passed to the page component as props
  };
}
