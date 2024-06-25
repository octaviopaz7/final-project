import express from 'express';
import * as patientsController from '../controllers/patient.controller.js';

const router = express.Router();

router.post('/', patientsController.createPatient);
router.get('/', patientsController.getPatients);
router.get('/:id', patientsController.getPatientById);
router.put('/:id', patientsController.updatePatient);
router.delete('/:id', patientsController.deletePatient);

export default router;

