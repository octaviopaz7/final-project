import * as professionalsService from '../services/professional.service.js';

export const createProfessional = async (req, res) => {
    try {
        const professional = await professionalsService.createProfessional(req.body);
        res.status(201).json(professional);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfessionals = async (req, res) => {
    try {
        const professionals = await professionalsService.getProfessionals();
        res.status(200).json(professionals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfessionalById = async (req, res) => {
    try {
        const professional = await professionalsService.getProfessionalById(req.params.id);
        if (!professional) {
            res.status(404).json({ message: 'Professional not found' });
        } else {
            res.status(200).json(professional);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfessional = async (req, res) => {
    try {
        const professional = await professionalsService.updateProfessional(req.params.id, req.body);
        if (!professional) {
            res.status(404).json({ message: 'Professional not found' });
        } else {
            res.status(200).json(professional);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProfessional = async (req, res) => {
    try {
        const professional = await professionalsService.deleteProfessional(req.params.id);
        if (!professional) {
            res.status(404).json({ message: 'Professional not found' });
        } else {
            res.status(200).json({ message: 'Professional deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
