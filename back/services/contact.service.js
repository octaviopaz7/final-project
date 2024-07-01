import axios from 'axios';
import Contact from '../models/contact.model.js';

const API_URL = 'http://localhost:3000'; 

export const submitContactForm = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/contact/submit`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};


export const updateContactAnswered = async (id, newAnswered) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { answered: newAnswered },
      { new: true }
    );

    return contact;
  } catch (error) {
    console.error("Error al actualizar el estado del contacto:", error);
    throw new Error(error.message);
  }
};
