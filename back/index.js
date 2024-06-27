import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import appointmentsRoutes from './routes/appointment.routes.js'
import servicesRoutes from './routes/service.routes.js'
import authRoutes from './routes/auth.routes.js'
import contactRoutes from './routes/contact.routes.js'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json())
const allowedOrigins = ['http://localhost:5000', 'http://localhost:5173'];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);

app.use('/api/appointments', appointmentsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión con base de datos establecida"))
    .catch((e) => console.error(e))

app.listen(PORT, () => console.log(`Servidor en: http://localhost:${PORT}`));
