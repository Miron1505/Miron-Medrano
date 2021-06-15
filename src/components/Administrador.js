import Cookies from "universal-cookie/es6";
import { useHistory } from "react-router-dom";
import { Fragment, useEffect, useState } from 'react';
import 'sweetalert2';
import Swal from "sweetalert2";

const api = "http://192.168.1.10:3030/api";

export const Admin = () => {

    const cookie = new Cookies();
    const history = useHistory();

    const [ordenes, setOrdenes] = useState([]);

    const getOrders = async () => {
        const res = await fetch(api + '/order/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        setOrdenes(data);
    }

    const handleDelete = async (id) => {
        Swal.fire({
            icon: "warning",
            title: "Eliminar orden?",
            text: "Esto será irreversible.",
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonColor: 'gray',
            confirmButtonColor: '#FF3333',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if(result.isConfirmed)
            {
                await fetch(api + '/orden/delete/' + id, {
                    method: 'DELETE',
                    headers: {
                        'access-token': cookie.get('token')
                    }
                }).then( async () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Orden eliminada con éxito',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    await getOrders();
                });
            }
        });
    }

    const handleUpdate = async (id) => {
        Swal.fire({
            icon: "info",
            title: "Entregar orden?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Entregar orden',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if(result.isConfirmed)
            {
                await fetch(api + '/orden/update/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': cookie.get('token')
                    }
                }).then( async () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Orden entregada con éxito',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    await getOrders();
                });
            }
        });
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>
            { cookie.get('token') &&
                <Fragment>
                    <div className="mt-5"/>
                    <div className="row">
                        <div className="col-md-1"/>
                        <div className="col-md-9">
                            <table className="table table-stripped ml-5">
                                <thead>
                                    <td>Id</td>
                                    <td>Usurio</td>
                                    <td>Orden</td>
                                    <td>Fecha</td>
                                    <td>Dirección</td>
                                    <td>Estado</td>
                                </thead>
                                <tbody>
                                    {ordenes.map(orden => (
                                        <Fragment>
                                            <tr>
                                                <td>{orden.id}</td>
                                                <td>{orden.user_id}</td>
                                                <td>{orden.orden}</td>
                                                <td>{orden.fecha}</td>
                                                <td>{orden.direccion}</td>
                                                <td>{orden.estado}</td>
                                                <td><button className="btn btn-info text-white" onClick={() => handleUpdate(orden.id)}><strong>Entregar</strong></button></td>
                                                <td><button className="btn btn-danger text-white" onClick={() => handleDelete(orden.id)}><strong>Eliminar</strong></button></td>
                                            </tr>
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Fragment>
            }
            { !cookie.get('token') && history.push('/login') }
        </div>
    )
}