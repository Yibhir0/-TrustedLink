import ProviderProfile from '../models/ProviderProfile.js';
import User from '../models/User.js';
import Service from '../models/Service.js';

export const getProvidersByCategory = async (req, res) => {
    const category = req.params.category;
    const profiles = await ProviderProfile.find({ category }).populate('user');
    res.json(profiles);
};

export const createProvider = async (req, res) => {
    try {
        const { userData, profileData } = req.body;

        // Create the user
        const user = await User.create({ ...userData, role: 'provider' });

        const matchedService = await Service.findOne({ category: profileData.category });
        if (!matchedService) {
            return res.status(400).json({ error: 'No matching service found for the category.' });
        }

        // Create the provider profile with linked service ID
        const profile = await ProviderProfile.create({
            ...profileData,
            user: user._id,
            service: matchedService._id,
        });

        res.status(201).json({ user, profile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create provider' });
    }
};

export const getAllProfiles = async (req, res) => {
    const profiles = await ProviderProfile.find({}).populate('user');
    res.json(profiles);
};

export const getProviderById = async (req, res) => {
    const id = req.params.id;
    const provider = await ProviderProfile.findById(id).populate('user');
    if (!provider) {
        return res.status(404).json({ message: 'Provider not found' });
    }
    res.json(provider);
}

export const deleteProvider = async (req, res) => {
    const id = req.params.id;
    const provider = await ProviderProfile.findByIdAndDelete(id);
    if (!provider) {
        return res.status(404).json({ message: 'Provider not found' });
    }
    res.json({ message: 'Provider deleted successfully' });
}
