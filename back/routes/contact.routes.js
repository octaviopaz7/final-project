import express from 'express';

import { submitContactForm, getAllContactForms } from '../controllers/contact.controller.js';
const router = express.Router();
router.post('/submit', submitContactForm);
router.get('/', getAllContactForms);
export default router;