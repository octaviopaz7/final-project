import Patient from '../models/patient.model.js';

export const createPatient = async (patientData) => {
    const patient = new Patient(patientData);
    return await patient.save();
};

export const getPatients = async () => {
    return await Patient.find();
};

export const getPatientById = async (id) => {
    return await Patient.findById(id);
};

export const updatePatient = async (id, patientData) => {
    return await Patient.findByIdAndUpdate(id, patientData, { new: true });
};

export const deletePatient = async (id) => {
    return await Patient.findByIdAndDelete(id);
};
