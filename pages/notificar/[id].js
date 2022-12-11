import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Notificar({ data }) {
    const [notificaciones, setNotificaciones] = useState(data);
    console.log(notificaciones);
    const columns = [
        { field: 'id', headerName: 'Codigo', width: 150 },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'fechaNotify', headerName: 'Fecha Notificacion', width: 160 },
        { field: 'descripcion', headerName: 'Descripcion', width: 400 },
        { field: 'inicio', headerName: 'Fecha de inicio', width: 120, type: 'date' },
        { field: 'final', headerName: 'Fecha final', width: 100, type: 'date' },
    ];
    const rows = [];
    notificaciones.notificaciones.map((notificacion) => {
        rows.push(
            {
                id: notificacion._id,
                nombre: notificacion.promocionId.nombre,
                fechaNotify: notificacion.fecha,
                descripcion: notificacion.promocionId.descripcion,
                inicio: notificacion.promocionId.fechaInicio,
                final: notificacion.promocionId.fechaFin,
            }
        );
    });
    return (
        <Layout title="Notificaciones">
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
                <h1 className="text-2xl font-bold ml-6">Lista de notificaciones</h1>
            </div>
            <div style={{ height: 400, width: '100%', padding: '10px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const url = "https://chat-bot-topicos.herokuapp.com/api/promociones/notificaciones/" + id;
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