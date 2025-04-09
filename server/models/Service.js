import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['plumbing', 'electrical', 'landscaping'],
        required: true
    }
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
