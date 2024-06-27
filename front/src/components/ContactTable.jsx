import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../assets/css/TableStyles.css';
import axios from 'axios';

const ContactTable = () => {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/contact',  { credentials:"include" });
            setContacts(response.data);
        } catch (error) {
            console.error('Error trayendo los mensajes de contacto', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []); 

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <>
            {contacts && contacts.length > 0 ? (
                <table className="table table-striped table-dark caption-top">
                    <caption>Listado de Mensajes</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Servicio</th>
                            <th scope="col">Mensaje</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{appointment.name}</td>
                                <td>{appointment.email}</td>
                                <td>{appointment.service}</td>
                                <td>{appointment.message}</td>
                                <td>{formatDate(appointment.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <>
                <h2 className='section-title'>Contactos</h2>
                <h3 className="text-center">No hay mensajes </h3>
                 </>
            )}
        </>
    );
};

export default ContactTable;
