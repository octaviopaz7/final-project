import express from 'express';
import * as servicesController from '../controllers/service.controller.js';

const router = express.Router();

router.post('/', servicesController.createService);
router.get('/', servicesController.getServices);
router.get('/:id', servicesController.getServiceById);
router.put('/:id', servicesController.updateService);
router.delete('/:id', servicesController.deleteService);

export default router;
