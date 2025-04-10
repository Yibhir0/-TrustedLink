import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/UserRoutes.js'; // Adjust the path as necessary

import serviceRoutes from './routes/ServiceRoutes.js';
import providerProfileRoutes from './routes/ProviderProfileRoutes.js';

import bookingRoutes from './routes/BookingRoutes.js';


const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.get('/api', (req, res) => {
    res.send('Trusted Link!');
});

// MongoDB URI — adjust as needed
const MONGO_URI = 'mongodb://root:example@localhost:27017/trusted-link-db?authSource=admin';

// Connect to MongoDB, then start server
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(' MongoDB connection failed:', err);
    });

app.use('/api/services', serviceRoutes);
app.use('/api/providers', providerProfileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);