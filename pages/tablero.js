import Layout from "../components/Layout";
import Board from "react-trello";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import useSWR from 'swr'; 

const fetcher = (...args) => fetch(...args).then((res) => {
  if (res.status === 200 || res.status === 201) {
    return res.json();
  } else {
    return null;
  }
})

export default function Tablero() {
  const prospectos = useSWR('https://chat-bot-topicos.herokuapp.com/api/prospectos/', fetcher, { refreshInterval: 4000 })
  const clientes = useSWR('https://chat-bot-topicos.herokuapp.com/api/clientes/', fetcher, { refreshInterval: 4000 })

  const components = {
    Card: Card,
  };

  if (prospectos.error || clientes.error) return (<Layout title="Tablero">
    <div className="flex flex-row items-center mb-2 mt-2">
      <h1 className="text-2xl font-bold ml-4">Tablero</h1>
    </div>
    <div className="flex flex-row items-center mb-2 mt-2">
      <h2 className="text-xl font-bold ml-4">Error al cargar los datos...</h2>
      <div className="ml-4 text-black">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    </div>
  </Layout>)
  if (!prospectos.data || !clientes.data) return (<Layout title="Tablero">
    <div className="flex flex-row items-center mb-2 mt-2">
      <h1 className="text-2xl font-bold ml-4">Tablero</h1>
    </div>
    <div className="flex flex-row items-center mb-2 mt-2">
      <h2 className="text-xl font-bold ml-4">Cargando...</h2>
      <div className="ml-4 text-black">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </div>
    </div>
  </Layout>)

  let dataTablero = {
    lanes: [],
  };
  let listaP = getDataProspecto(prospectos.data.body)
  let listaC = getDataCliente(clientes.data.body)

  dataTablero.lanes.push(createPanel("prospectos", "PROSPECTO", listaP.prospectos));
  dataTablero.lanes.push(createPanel("contactos", "CONTACTADOS", listaP.contactos));
  dataTablero.lanes.push(createPanel("clientes", "CLIENTES", listaC.clientes));
  dataTablero.lanes.push(createPanel("frecuentes", "CLIENTES FRECUENTES", listaC.frecuentes));

  return (
    <Layout title="Tablero">
      <div className="flex flex-row items-center mb-2 mt-2">
        <h1 className="text-2xl font-bold ml-4">Tablero</h1>
      </div>
      <Board
        data={dataTablero}
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

function getDataProspecto(datos) {
  let listProspectos = [];
  let listContactos = [];
  let tags;

  datos.forEach((element) => {
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
  return {
    prospectos: listProspectos,
    contactos: listContactos,
  }
}

function getDataCliente(datos) {
  let tags;
  let listClientes = [];
  let listFrecuentes = [];
  datos.forEach((element) => {
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
  return {
    clientes: listClientes,
    frecuentes: listFrecuentes,
  }
}