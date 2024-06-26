import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    appointmentType: {
        type: String,
        enum: ['Consulta', 'Limpieza', 'Tratamiento','Control', 'Otro'],
        required: true,
    },
    dateAppointment: {
        type: Date,
        required: true,
    },
    reminderSent: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Confirmado', 'Completado', 'Cancelado'],
        default: 'Pendiente',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('Appointment', appointmentSchema);
