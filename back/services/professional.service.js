import Professional from '../models/professional.model.js';

export const createProfessional = async (professionalData) => {
    const professional = new Professional(professionalData);
    return await professional.save();
};

export const getProfessionals = async () => {
    return await Professional.find();
};

export const getProfessionalById = async (id) => {
    return await Professional.findById(id);
};

export const updateProfessional = async (id, professionalData) => {
    return await Professional.findByIdAndUpdate(id, professionalData, { new: true });
};

export const deleteProfessional = async (id) => {
    return await Professional.findByIdAndDelete(id);
};
