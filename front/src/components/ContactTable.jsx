import { useState, useEffect } from "react";
import "../assets/css/TableStyles.css";
import axios from "axios";
import { Table } from "react-bootstrap";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contact", {
        credentials: "include",
      });
      setContacts(response.data);
    } catch (error) {
      console.error("Error trayendo los mensajes de contacto", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <>
      {contacts && contacts.length > 0 ? (
        <>
          <h2 className="contact-section-title">Contactos</h2>
          <div>
            <Table className="table table-striped table-dark" responsive="md">
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
                {contacts.map((contact, index) => (
                  <tr key={contact._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.service}</td>
                    <td>{contact.message}</td>
                    <td>{formatDate(contact.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <>
          <h2 className="section-title">Contactos</h2>
          <h3 className="text-center">No hay mensajes </h3>
        </>
      )}
    </>
  );
};

export default ContactTable;
