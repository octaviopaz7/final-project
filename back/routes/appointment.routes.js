import express from 'express';
import * as appointmentsController from '../controllers/appointment.controller.js';

const router = express.Router();

router.post('/', appointmentsController.createAppointment);
router.get('/', appointmentsController.getAppointments);
router.get('/:id', appointmentsController.getAppointmentById);
router.put('/:id', appointmentsController.updateAppointment);
router.put('/:id/status', appointmentsController.updateStatusAppointment);
router.delete('/:id', appointmentsController.deleteAppointment);

export default router;
