import Layout from "../../components/Layout";
import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => {
    if (res.status === 200 || res.status === 201) {
        return res.json();
    } else {
        return null;
    }
})


export default function Promociones() {
    const promos = useSWR('https://chat-bot-topicos.herokuapp.com/api/promociones', fetcher)

    if (promos.error) return (<Layout title="Tablero">
        <div className="flex flex-row items-center mb-2 mt-2">
            <h1 className="text-2xl font-bold ml-4">Lista de promociones</h1>
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

    if (!promos.data) return (<Layout title="Tablero">
        <div className="flex flex-row items-center mb-2 mt-2">
            <h1 className="text-2xl font-bold ml-4">Lista de promociones</h1>
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
    const promociones = promos.data.body;
    let rows = [];

    promociones.map((promocion) => {
        rows.push(createData(promocion.promocion._id, promocion.promocion.nombre, promocion.promocion.descripcion, promocion.promocion.fechaInicio, promocion.promocion.fechaFin, promocion.detalles));
    });

    function createData(id, nombre, descripcion, fechaInicio, fechaFin, detalles) {
        let listaPizzas = [];
        detalles.forEach((detalle) => {
            let pizza = {
                id: detalle.pizzaId._id,
                nombre: detalle.pizzaId.nombre,
                tamaño: detalle.pizzaId.tamano,
                descripcion: detalle.pizzaId.descripcion,
                precio: detalle.pizzaId.precio,
            }
            listaPizzas.push(pizza);
        })
        return { id, nombre, descripcion, fechaInicio, fechaFin, pizzas: listaPizzas, };
    }

    function del(id) {
        fetch('https://chat-bot-topicos.herokuapp.com/api/promociones/' + id, {
            method: 'DELETE',
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                alert("Promoción eliminada correctamente");
            } else {
                alert("Error al eliminar la promoción");
            }
        })
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = useState(false);
        return (
            <Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{row.id}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.descripcion}</TableCell>
                    <TableCell>{row.fechaInicio}</TableCell>
                    <TableCell>{row.fechaFin}</TableCell>
                    <TableCell>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => del(row.id)}>
                            Eliminar
                        </button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Lista de pizzas habilitadas
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Codigo</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Tamaño</TableCell>
                                            <TableCell>Descripcion</TableCell>
                                            <TableCell align="right">Precio ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.pizzas.map((historyRow) => (
                                            <TableRow key={historyRow.id}>
                                                <TableCell component="th" scope="row">{historyRow.id}</TableCell>
                                                <TableCell>{historyRow.nombre}</TableCell>
                                                <TableCell>{historyRow.tamaño}</TableCell>
                                                <TableCell>{historyRow.descripcion}</TableCell>
                                                <TableCell align="right">{Math.round(historyRow.precio)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        );
    }

    return (
        <Layout title="Detalles">
            <div className="p-6">
                {/* Titulo de promociones */}
                <div className="mb-7 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Lista de promociones</h1>
                    <Link href="/promociones/nueva">
                        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Nueva promoción</a>
                    </Link>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell className="font-bold">Codigo</TableCell>
                                <TableCell className="font-bold">Nombre</TableCell>
                                <TableCell className="font-bold">Descripcion</TableCell>
                                <TableCell className="font-bold">Inicio</TableCell>
                                <TableCell className="font-bold">Fin</TableCell>
                                <TableCell className="font-bold">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.id} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    );
}