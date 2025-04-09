import Service from '../models/Service.js';

export const getAllServices = async (req, res) => {
    const services = await Service.find({});
    res.json(services);
};
