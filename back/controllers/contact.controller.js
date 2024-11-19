import Contact from "../models/contact.model.js";
import { updateContactAnswered } from '../services/contact.service.js';
import axios from "axios";
export const submitContactForm = async (req, res) => {
  const { name, email, service, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      service,
      message,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllContactForms = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContactAnsweredStatus = async (req, res) => {
  const { id } = req.params;
  const { answered } = req.body;

  try {
    const updatedContact = await updateContactAnswered(id, answered);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error al actualizar el estado del contacto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};