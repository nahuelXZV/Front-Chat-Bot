import Layout from "../components/Layout";
import Board from "react-trello";
import React, { Component } from "react";
import Card from "../components/Card";

export default function Tablero({ data }) {
  const components = {
    Card: Card,
  };
  return (
    <Layout title="Tablero">
      <div className="flex flex-row items-center mb-2 mt-2">
        <h1 className="text-2xl font-bold ml-4">Tablero</h1>
      </div>
      <Board
        data={data}
        components={components}
        draggable={false}
        cardDraggable={false}
        laneDraggable={false}
        style={{ backgroundColor: "#dff9fb", padding: "5px 10px" }}
      />
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
    id: id,
    title: title,
    facebookId: id,
    data: formatoDescripcion(dataCard, type),
    tags: tags,
    image: imagen,
    metadata: dataCard,
    type: type,
  };
  return cardData;
}

function createPanel(id, title, dataPanel, color = '#30336b') {
  let panelData = {
    id: id,
    title: title,
    label: dataPanel.length + "/10",
    cards: dataPanel,
    style: { backgroundColor: color, color: "white" },
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
    createPanel("prospectos", "PROSPECTO", listProspectos)
  );
  dataTablero.lanes.push(
    createPanel("contactos", "CONTACTADOS", listContactos)
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
          title: "Notificacion: " + element.notificaciones,
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
  dataTablero.lanes.push(createPanel("clientes", "CLIENTES", listClientes));
  dataTablero.lanes.push(
    createPanel("frecuentes", "CLIENTES FRECUENTES", listFrecuentes)
  );
  return {
    props: {
      data: dataTablero,
    }, // will be passed to the page component as props
  };
}
