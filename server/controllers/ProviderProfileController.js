import ProviderProfile from '../models/ProviderProfile.js';
import User from '../models/User.js';

export const getProvidersByCategory = async (req, res) => {
    const category = req.params.category;
    const profiles = await ProviderProfile.find({ category }).populate('user');
    res.json(profiles);
};

export const createProvider = async (req, res) => {
    const { userData, profileData } = req.body;
    const user = await User.create({ ...userData, role: 'provider' });
    // dont return password and user name
    const profile = await ProviderProfile.create({ ...profileData, user: user._id });
    res.status(201).json({ user, profile });
};

export const getAllProfiles = async (req, res) => {
    const profiles = await ProviderProfile.find({}).populate('user');
    res.json(profiles);
};
