import * as appointmentsService from '../services/appointment.service.js';

export const createAppointment = async (req, res) => {
    try {
        const appointment = await appointmentsService.createAppointment(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentsService.getAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await appointmentsService.getAppointmentById(req.params.id);
        if (!appointment) {
            res.status(404).json({ message: 'Turno no encontrado' });
        } else {
            res.status(200).json(appointment);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getAppointmentByPhone = async (req, res) => {
    try {
        const appointment = await appointmentsService.getAppointmentByPhone(req.params.phone);
        if (appointment.status !== "Cancelado" || appointment.status !== "Completado" || appointment.status == null){
            res.status(200).json(appointment); 
        } else {
            res.status(404).json({ message: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateAppointment = async (req, res) => {
    try {
        const appointment = await appointmentsService.updateAppointment(req.params.id, req.body);
        if (!appointment) {
            res.status(404).json({ message: 'Turno no encontrado' });
        } else {
            res.status(200).json(appointment);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const cancelAppointmentByNumber = async (req, res) => {
    try {
        const appointment = await appointmentsService.getAppointmentByPhone(req.params.number);
        if (!appointment) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }
        const updatedAppointment = await appointmentsService.updateStatusAppointment(appointment.id, "Cancelado");
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStatusAppointment = async (req, res) => {
    try {
        const updatedAppointment = await appointmentsService.updateStatusAppointment(req.params.id, req.body.status);
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await appointmentsService.deleteAppointment(req.params.id);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
