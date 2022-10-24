import Layout from "../components/Layout";
import Board from "react-trello";
import React, { Component } from "react";

export default function Tablero({ data }) {
  return (
    <Layout title="Tablero">
      <Board data={data} draggable style={{ backgroundColor: "#1e3a8a" }} />
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
        data.ultimoPedido?.montoTotal;
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
        "Link Facebook: " +
        data.cliente.facebookId +
        "\n" +
        "Ult. Pedido: " +
        data.ultimoPedido?.fecha +
        "\n" +
        "Monto Ult. Pedido: " +
        data.ultimoPedido?.montoTotal;
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
  console.log(body);
  body.forEach((element) => {
    if (element.contactos == 0) {
      let prospecto = {
        id: element.prospecto._id,
        title: element.prospecto.nombre,
        description: formatoDescripcion(element, "prospecto"),
        label: element.ultimoIngreso.fecha.slice(0, 10),
      };
      listProspectos.push(prospecto);
    } else {
      let prospecto = {
        id: element.prospecto._id,
        title: element.prospecto.nombre,
        description: formatoDescripcion(element, "contacto"),
        label: element.ultimoIngreso.fecha.slice(0, 10),
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
      };
      listClientes.push(cliente);
    } else {
      let cliente = {
        id: element.cliente._id,
        title: element.cliente.nombre,
        description: formatoDescripcion(element, "frecuente"),
        label: "Frecuente",
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
