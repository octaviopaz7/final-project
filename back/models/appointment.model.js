import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  date: {
    type: String,
  },
  hour: {
    type: String,
  },
  appointmentType: {
    type: String,
    enum: ["Consulta", "Limpieza", "Tratamiento", "Control", "Otro"],
  },
  reminderSent: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["Pendiente", "Confirmado", "Completado", "Cancelado"],
    default: "Pendiente",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Appointment", appointmentSchema);
