import express from 'express';
import {
    getProvidersByCategory,
    createProvider,
    getAllProfiles
} from '../controllers/ProviderProfileController.js';

const router = express.Router();


router.get('/service/:category', getProvidersByCategory);
router.post('/', createProvider);
router.get('/admin/all', getAllProfiles); // needs middleware to verify admin

export default router;
