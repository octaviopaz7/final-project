import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import appointmentsRoutes from './routes/appointment.routes.js'
import professionalsRoutes from './routes/professional.routes.js'
import servicesRoutes from './routes/service.routes.js'
import patientsRoutes from './routes/patient.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.options("*", cors());

app.use('/api/auth', authRoutes);

app.use('/api/appointments', appointmentsRoutes);
app.use('/api/professionals', professionalsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/patients', patientsRoutes);


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Conexión con base de datos establecida"))
.catch((e) => console.error(error))

app.listen(PORT, () => console.log(`Servidor en: http://localhost:${PORT}`));
