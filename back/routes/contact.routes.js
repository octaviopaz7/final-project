import express from 'express';

import * as controller from '../controllers/contact.controller.js';
const router = express.Router();
router.post('/submit', controller.submitContactForm);
router.get('/', controller.getAllContactForms);
router.put('/:id', controller.updateContactAnsweredStatus);
export default router;