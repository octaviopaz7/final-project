import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/TableStyles.css';

const Table = ({ appointments }) => {
    return (
        <>
            <table className="table table-striped table-hover table-dark caption-top">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Tipo de Consulta</th>
                        <th scope="col">Odontólogo</th>
                        <th scope="col">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={appointment._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{appointment.firstName}</td>
                            <td>{appointment.lastName}</td>
                            <td>{appointment.phone}</td>
                            <td>{appointment.appointmentType}</td>
                            <td>{appointment.doctor}</td>
                            <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;

