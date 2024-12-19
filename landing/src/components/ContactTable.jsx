import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form } from "react-bootstrap";
import '../assets/css/TableStyles.css';
const ContactTable = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contact");
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

  const handleCheckboxChange = async (contactId, isChecked) => {
    try {
      await axios.put(`http://localhost:5000/api/contact/${contactId}`, {
        answered: isChecked,
      });
      fetchContacts(); 
    } catch (error) {
      console.error("Error al actualizar el estado de contestado", error);
    }
  };

  return (
  <>
      <h2 className="contact-section-title">Contactos</h2>
          <div>
            <Table className="table table-striped table-dark" responsive="md">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Servicio</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Contestado</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact._id}>
              <td>{index + 1}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.service}</td>
              <td>{contact.message}</td>
              <td>{formatDate(contact.createdAt)}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={contact.answered}
                  onChange={(e) =>
                    handleCheckboxChange(contact._id, e.target.checked)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
  );
};

export default ContactTable;
