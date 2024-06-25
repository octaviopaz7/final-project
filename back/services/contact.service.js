import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor backend

const submitContactForm = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/contact/submit`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

export default submitContactForm;