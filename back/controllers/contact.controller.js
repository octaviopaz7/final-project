import Contact from '../models/contact.model.js';

export const submitContactForm = async (req, res) => {
    const { name, email, service, message } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            service,
            message
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



