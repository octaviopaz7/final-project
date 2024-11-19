import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    answered: { type: Boolean, default: false }
});


const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
