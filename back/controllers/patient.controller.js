import * as patientsService from '../services/patient.service.js';

export const createPatient = async (req, res) => {
    try {
        const patient = await patientsService.createPatient(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPatients = async (req, res) => {
    try {
        const patients = await patientsService.getPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPatientById = async (req, res) => {
    try {
        const patient = await patientsService.getPatientById(req.params.id);
        if (!patient) {
            res.status(404).json({ message: 'Paciente no encontrado' });
        } else {
            res.status(200).json(patient);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const patient = await patientsService.updatePatient(req.params.id, req.body);
        if (!patient) {
            res.status(404).json({ message: 'Paciente no encontrado' });
        } else {
            res.status(200).json(patient);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const patient = await patientsService.deletePatient(req.params.id);
        if (!patient) {
            res.status(404).json({ message: 'Paciente no encontrado' });
        } else {
            res.status(200).json({ message: 'Paciente eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

