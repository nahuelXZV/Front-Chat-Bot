import Layout from "../components/Layout";
import Board from "react-trello";
import React, { Component } from "react";

export default function Tablero({ data }) {
  const [showModal, setShowModal] = React.useState(false);
  const [dataModal, setDataModal] = React.useState({});

  return (
    <Layout title="Tablero">
      <Board
        data={data}
        draggable={false}
        cardDraggable={true}
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
                    <span className="font-bold">
                      Frecuencia de compra:
                    </span>{" "}
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
      ) : null}
    </Layout>
  );
}

function formatoDescripcion(data, type) {
  switch (type) {
    case "prospecto":
      let descripcion =
        "Correo: " +
        data.prospecto.correo +
        "\n" +
        "Link Facebook: " +
        data.prospecto.facebookId +
        "\n" +
        "Ult. Vez: " +
        data.ultimoIngreso?.fecha;
      return descripcion;
      break;
    case "contacto":
      let descripcionContacto =
        "Correo: " +
        data.prospecto.correo +
        "\n" +
        "Link Facebook: " +
        data.prospecto.facebookId +
        "\n" +
        "Ult. Vez: " +
        data.ultimoIngreso?.fecha +
        "\n" +
        "Ult. Contacto: " +
        data.ultimoContacto?.fecha +
        "\n" +
        "Medio de comunicacion: " +
        data.ultimoContacto?.tipoComunicacion;
      return descripcionContacto;
      break;
    case "cliente":
      let descripcionCliente =
        "Correo: " +
        data.cliente.correo +
        "\n" +
        "Telefono: " +
        data.cliente.telefono +
        "\n" +
        "Link Facebook: " +
        data.cliente.facebookId +
        "\n" +
        "Ult. Pedido: " +
        data.ultimoPedido?.fecha +
        "\n" +
        "Monto Ult. Pedido: " +
        data.ultimoPedido?.montoTotal +
        " Bs";
      return descripcionCliente;
      break;
    default:
      let clienteFrecuente =
        "Correo: " +
        data.cliente.correo +
        "\n" +
        "Telefono: " +
        data.cliente.telefono +
        "\n" +
        "Frecuencia de pedidos: " +
        data.frecuencia +
        "\n" +
        "Ult. Pedido: " +
        data.ultimoPedido?.fecha +
        "\n" +
        "Promedio de compra: " +
        data.promedioCompra +
        " Bs";
      return clienteFrecuente;
      break;
  }
}

export async function getServerSideProps(context) {
  let data = {
    lanes: [],
  };
  let listProspectos = [];
  let listContactos = [];
  let listClientes = [];
  let listFrecuentes = [];
  // Prospectos y Contactados
  const prospectos = await fetch(`http://localhost:3010/api/prospectos/`);
  const datas = await prospectos.json();
  const body = datas.body;
  body.forEach((element) => {
    if (element.contactos == 0) {
      let prospecto = {
        id: element.prospecto._id,
        title: element.prospecto.nombre,
        description: formatoDescripcion(element, "prospecto"),
        label: element.ultimoIngreso.fecha.slice(0, 10),
        tags: [
          {
            bgcolor: "#0079BF",
            color: "white",
            title: "Ingresos: " + element.ingresos,
          },
        ],
        metadata: element,
      };
      listProspectos.push(prospecto);
    } else {
      let prospecto = {
        id: element.prospecto._id,
        title: element.prospecto.nombre,
        description: formatoDescripcion(element, "contacto"),
        label: element.ultimoIngreso.fecha.slice(0, 10),
        tags: [
          {
            bgcolor: "#0079BF",
            color: "white",
            title: "Ingresos: " + element.ingresos,
          },
          {
            bgcolor: "#7c3aed",
            color: "white",
            title: "Contactos: " + element.contactos,
          },
        ],
        metadata: element,
      };
      listContactos.push(prospecto);
    }
  });
  const panel = {
    id: "prospectos",
    title: "Prospectos",
    label: listProspectos.length + "/10",
    cards: listProspectos,
  };

  const pane2 = {
    id: "contactos",
    title: "Contactados",
    label: listContactos.length + "/10",
    cards: listContactos,
  };
  data.lanes.push(panel);
  data.lanes.push(pane2);

  // Clientes y Clientes frecuentes
  const clientes = await fetch(`http://localhost:3010/api/clientes/`);
  const datas2 = await clientes.json();
  const body2 = datas2.body;
  body2.forEach((element) => {
    if (element.cliente.tipo != "frecuente") {
      let cliente = {
        id: element.cliente._id,
        title: element.cliente.nombre,
        description: formatoDescripcion(element, "cliente"),
        label: "Cliente",
        tags: [
          {
            bgcolor: "#0079BF",
            color: "white",
            title: "Ingresos: " + element.Ingresos,
          },
          {
            bgcolor: "#7c3aed",
            color: "white",
            title: "Pedidos: " + element.pedidos,
          },
        ],
        metadata: element,
      };
      listClientes.push(cliente);
    } else {
      let cliente = {
        id: element.cliente._id,
        title: element.cliente.nombre,
        description: formatoDescripcion(element, "frecuente"),
        label: "Frecuente",
        tags: [
          {
            bgcolor: "#0079BF",
            color: "white",
            title: "Notificaciones: " + element.notificaciones,
          },
          {
            bgcolor: "#7c3aed",
            color: "white",
            title: "Pedidos: " + element.pedidos,
          },
        ],
        metadata: element,
      };
      listFrecuentes.push(cliente);
    }
  });
  const panel3 = {
    id: "clientes",
    title: "Clientes",
    label: listClientes.length + "/10",
    cards: listClientes,
  };
  const panel4 = {
    id: "frecuentes",
    title: "Clientes frecuentes",
    label: listFrecuentes.length + "/10",
    cards: listFrecuentes,
  };
  data.lanes.push(panel3);
  data.lanes.push(panel4);

  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  };
}
