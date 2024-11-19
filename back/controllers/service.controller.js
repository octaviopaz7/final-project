import * as servicesService from '../services/service.service.js';

export const createService = async (req, res) => {
    try {
        const service = await servicesService.createService(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getServices = async (req, res) => {
    try {
        const services = await servicesService.getServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const service = await servicesService.getServiceById(req.params.id);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
        } else {
            res.status(200).json(service);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const service = await servicesService.updateService(req.params.id, req.body);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
        } else {
            res.status(200).json(service);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const service = await servicesService.deleteService(req.params.id);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
        } else {
            res.status(200).json({ message: 'Service deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
