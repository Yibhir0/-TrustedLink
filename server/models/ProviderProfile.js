import mongoose from 'mongoose';

const providerProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    hourlyRate: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
    category: {
        type: String,
        enum: ['plumbing', 'electrical', 'landscaping'],
        required: true
    },
    city: { type: String, required: true },
    bio: { type: String, required: true },
    rating: { type: Number, default: 0 },
    workImages: [String],
    yearsOfExperience: { type: Number, default: 0 }
}, { timestamps: true });

const ProviderProfile = mongoose.model('ProviderProfile', providerProfileSchema);
export default ProviderProfile;
