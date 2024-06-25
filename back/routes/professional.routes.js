import express from 'express';
import * as professionalsController from '../controllers/professional.controller.js';

const router = express.Router();

router.post('/', professionalsController.createProfessional);
router.get('/', professionalsController.getProfessionals);
router.get('/:id', professionalsController.getProfessionalById);
router.put('/:id', professionalsController.updateProfessional);
router.delete('/:id', professionalsController.deleteProfessional);

export default router;
