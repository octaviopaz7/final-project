import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    dateAppointment: {
        type: Date,
        required: true
    },
    appointmentType: {
        type: String,
        enum: ['Consulta', 'Limpieza', 'Tratamiento', 'Otro'],
        required: true
    },
    notes: {
        type: String
    },
    professional: {
        type: Schema.Types.ObjectId,
        ref: 'Professional',
        required: true
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    reminderSent: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Confirmado', 'Completado', 'Cancelado'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Appointment', appointmentSchema);
