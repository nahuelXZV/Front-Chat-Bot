import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import { DataGrid } from '@mui/x-data-grid';

export default function Promociones({ data }) {
    const [promociones, setPromociones] = useState(data);
    console.log(promociones);
    let rows = [];
    const columns = [
        { field: 'id', headerName: 'Código', width: 130 },
        { field: 'nombre', headerName: 'Nombre', width: 230 },
        { field: 'descripcion', headerName: 'Descripción', width: 400 },
        { field: 'fecha_inicio', headerName: 'Fecha de inicio', width: 130 },
        { field: 'fecha_fin', headerName: 'Fecha de fin', width: 130 },
    ];
    promociones.forEach(promo => {
        rows.push({
            id: promo.promocion._id,
            nombre: promo.promocion.nombre,
            descripcion: promo.promocion.descripcion,
            fecha_inicio: promo.promocion.fechaInicio,
            fecha_fin: promo.promocion.fechaFin,
        })
    });
    return (
        <Layout title="Detalles">
            <div className="p-6">
                {/* Titulo de promociones */}
                <div className="mb-7 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Promociones</h1>
                    <Link href="/promociones/nueva">
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Nueva promoción</a>
                    </Link>
                </div>
                <div style={{ height: 450, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const url = "http://localhost:3010/api/promociones"
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