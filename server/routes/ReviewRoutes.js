import express from 'express';

import { createReview, getReviewsByProvider } from '../controllers/ReviewController.js'; // Adjust the path as necessary

const router = express.Router();

// POST /api/reviews - create a new review
router.post('/', createReview);

// GET /api/reviews/provider/:providerId - get all reviews for a specific provider
router.get('/provider/:providerId', getReviewsByProvider);

export default router;
