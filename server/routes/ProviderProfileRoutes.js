import express from 'express';
import {
    getProvidersByCategory,
    createProvider,
    getAllProfiles,
    getProviderById,
    deleteProvider
} from '../controllers/ProviderProfileController.js';

const router = express.Router();
// needs middleware to verify admin
router.get('/:id', getProviderById)
router.get('/service/:category', getProvidersByCategory);
router.post('/', createProvider);
router.get('/admin/all', getAllProfiles);
router.delete('/admin/:id', deleteProvider)



export default router;
