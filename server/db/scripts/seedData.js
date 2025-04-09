import mongoose from 'mongoose';
import User from '../../models/User.js';
import Service from '../../models/Service.js';
import ProviderProfile from '../../models/ProviderProfile.js';

const MONGO_URI = 'mongodb://root:example@localhost:27017/trusted-link-db?authSource=admin';

const services = [
    { name: 'Plumbing Repair', description: 'Fix leaks and clogs', category: 'plumbing' },
    { name: 'Electrical Repair', description: 'Fix wiring and outlets', category: 'electrical' },
    { name: 'Lawn Maintenance', description: 'Keep your lawn neat', category: 'landscaping' }
];

const providersWithProfiles = [
    {
        user: {
            username: 'johnplumber',
            password: 'pass123',
            email: 'john@fix.com',
            firstName: 'John',
            lastName: 'Plumb',
            role: 'provider',
            city: 'New York',
            phone: '123-456-7890',
            bio: 'Expert in pipe systems.',
            profileImage: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'
        },
        profile: {
            category: 'plumbing',
            hourlyRate: 75,
            isVerified: true,
            city: 'New York',
            bio: 'Licensed plumber with 10+ years of experience.',
            rating: 4.8,
            yearsOfExperience: 10,
            workImages: [
                'https://media.istockphoto.com/id/1516511531/photo/a-plumber-carefully-fixes-a-leak-in-a-sink-using-a-wrench.jpg?s=1024x1024&w=is&k=20&c=LkKMuHe7Uj0PjkyC0bn7HEQmQ8Iidl8B8_rqFiPSS2A=',
                'https://media.istockphoto.com/id/169270269/photo/plumbers-working-on-pipes-under-sink.jpg?s=1024x1024&w=is&k=20&c=E_gFYtt4HfwqJHc9I2oqY1adEyIT-2lKimkkV5UWgR4=',
            ]
        }
    },
    {
        user: {
            username: 'sallyspark',
            password: 'pass123',
            email: 'sally@electric.com',
            firstName: 'Sally',
            lastName: 'Spark',
            role: 'provider',
            city: 'Chicago',
            phone: '987-654-3210',
            bio: 'Handles all residential electrical work.',
            profileImage: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk'
        },
        profile: {
            category: 'electrical',
            hourlyRate: 85,
            isVerified: true,
            city: 'Chicago',
            bio: 'Reliable electrician for homes and businesses.',
            rating: 4.6,
            yearsOfExperience: 8,
            workImages: [
                'https://media.istockphoto.com/id/1411581327/photo/silhouette-electrician-work-on-high-ground-heavy-industry-concept-construction-of-the.jpg?s=612x612&w=0&k=20&c=Kozp-lrF2SKwShKMV3b6l-FrErAGw2hiXtSVVGIuu7A=',
                'https://media.istockphoto.com/id/1405880267/photo/two-engineers-installing-solar-panels-on-roof.jpg?s=1024x1024&w=is&k=20&c=mskLiEze3fWKilJamAiSM5imZnX1MjhZ9V4q7TJTAVI=',
            ],
        }
    },
    {
        user: {
            username: 'mikelawn',
            password: 'pass123',
            email: 'mike@landscape.com',
            firstName: 'Mike',
            lastName: 'Green',
            role: 'provider',
            city: 'Los Angeles',
            phone: '555-123-4567',
            bio: 'Lawn care enthusiast.',
            profileImage: 'https://robohash.org/mail@ashallendesign.co.uk'
        },
        profile: {
            category: 'landscaping',
            hourlyRate: 65,
            isVerified: true,
            city: 'Los Angeles',
            bio: 'Professional landscaper with passion for greenery.',
            rating: 5.0,
            yearsOfExperience: 6,
            workImages: [
                'https://media.istockphoto.com/id/1166203849/photo/garden-worker-trimming-plants.jpg?s=1024x1024&w=is&k=20&c=rRJXcf-07pPi2wWrhw1IycK3SHECGtFkxUB1M3AFs9s=',
                'https://media.istockphoto.com/id/1312760160/photo/big-garden-grass-field-mowing-by-caucasian-gardener.jpg?s=1024x1024&w=is&k=20&c=ln0D2ZTNy8nc-t5zeXecdXi_VlojH5HC3PrNmG9fqX8=',
            ],
        }
    },
    {
        user: {
            username: 'emilypipe',
            password: 'pass123',
            email: 'emily@pipepros.com',
            firstName: 'Emily',
            lastName: 'Waters',
            role: 'provider',
            city: 'Toronto',
            phone: '222-333-4444',
            bio: 'Pipe repair specialist.',
            profileImage: 'http://placebeard.it/250/250'
        },
        profile: {
            category: 'plumbing',
            hourlyRate: 70,
            isVerified: false,
            city: 'Toronto',
            bio: 'Fast and affordable plumbing services.',
            rating: 4.5,
            yearsOfExperience: 7,
            workImages: [
                'https://media.istockphoto.com/id/1516511531/photo/a-plumber-carefully-fixes-a-leak-in-a-sink-using-a-wrench.jpg?s=1024x1024&w=is&k=20&c=LkKMuHe7Uj0PjkyC0bn7HEQmQ8Iidl8B8_rqFiPSS2A=',
                'https://media.istockphoto.com/id/169270269/photo/plumbers-working-on-pipes-under-sink.jpg?s=1024x1024&w=is&k=20&c=E_gFYtt4HfwqJHc9I2oqY1adEyIT-2lKimkkV5UWgR4=',
            ]
        }
    },
    {
        user: {
            username: 'davidwire',
            password: 'pass123',
            email: 'david@powernow.com',
            firstName: 'David',
            lastName: 'Wired',
            role: 'provider',
            city: 'Vancouver',
            phone: '333-222-1111',
            bio: 'Commercial electrician.',
            profileImage: 'https://avatar.iran.liara.run/public/boy?username=Ash'
        },
        profile: {
            category: 'electrical',
            hourlyRate: 90,
            isVerified: true,
            city: 'Vancouver',
            bio: 'Certified electrician with 12 years of experience.',
            rating: 4.9,
            yearsOfExperience: 12,
            workImages: [
                'https://media.istockphoto.com/id/1411581327/photo/silhouette-electrician-work-on-high-ground-heavy-industry-concept-construction-of-the.jpg?s=612x612&w=0&k=20&c=Kozp-lrF2SKwShKMV3b6l-FrErAGw2hiXtSVVGIuu7A=',
                'https://media.istockphoto.com/id/1405880267/photo/two-engineers-installing-solar-panels-on-roof.jpg?s=1024x1024&w=is&k=20&c=mskLiEze3fWKilJamAiSM5imZnX1MjhZ9V4q7TJTAVI=',
            ],
        }
    },
    {
        user: {
            username: 'lilygarden',
            password: 'pass123',
            email: 'lily@greenthumb.com',
            firstName: 'Lily',
            lastName: 'Bloom',
            role: 'provider',
            city: 'Calgary',
            phone: '444-555-6666',
            profileImage: 'https://placebeard.it/250/250'
        },
        profile: {
            category: 'landscaping',
            hourlyRate: 60,
            isVerified: false,
            city: 'Calgary',
            bio: 'Floral garden specialist and landscape designer.',
            rating: 4.4,
            yearsOfExperience: 5,
            workImages: [
                'https://media.istockphoto.com/id/1166203849/photo/garden-worker-trimming-plants.jpg?s=1024x1024&w=is&k=20&c=rRJXcf-07pPi2wWrhw1IycK3SHECGtFkxUB1M3AFs9s=',
                'https://media.istockphoto.com/id/1312760160/photo/big-garden-grass-field-mowing-by-caucasian-gardener.jpg?s=1024x1024&w=is&k=20&c=ln0D2ZTNy8nc-t5zeXecdXi_VlojH5HC3PrNmG9fqX8=',
            ],

        }
    },
    {
        user: {
            username: 'bobbuilder',
            password: 'pass123',
            email: 'bob@builder.com',
            firstName: 'Bob',
            lastName: 'Builder',
            role: 'provider',
            city: 'Montreal',
            phone: '123-123-1234',
            bio: 'Fixes pipes and drains.',
            profileImage: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'
        },
        profile: {
            category: 'plumbing',
            hourlyRate: 80,
            isVerified: true,
            city: 'Montreal',
            bio: 'Emergency and regular plumbing services.',
            rating: 4.3,
            yearsOfExperience: 9,
            workImages: [
                'https://media.istockphoto.com/id/1516511531/photo/a-plumber-carefully-fixes-a-leak-in-a-sink-using-a-wrench.jpg?s=1024x1024&w=is&k=20&c=LkKMuHe7Uj0PjkyC0bn7HEQmQ8Iidl8B8_rqFiPSS2A=',
                'https://media.istockphoto.com/id/169270269/photo/plumbers-working-on-pipes-under-sink.jpg?s=1024x1024&w=is&k=20&c=E_gFYtt4HfwqJHc9I2oqY1adEyIT-2lKimkkV5UWgR4=',
            ]
        }
    },
    {
        user: {
            username: 'natalievolts',
            password: 'pass123',
            email: 'natalie@volt.com',
            firstName: 'Natalie',
            lastName: 'Watt',
            role: 'provider',
            city: 'Ottawa',
            phone: '888-999-7777',
            bio: 'Energy-efficient lighting.'
        },
        profile: {
            category: 'electrical',
            hourlyRate: 82,
            isVerified: true,
            city: 'Ottawa',
            bio: 'Sustainable electrical solutions.',
            rating: 4.7,
            yearsOfExperience: 6,
            workImages: [
                'https://media.istockphoto.com/id/1411581327/photo/silhouette-electrician-work-on-high-ground-heavy-industry-concept-construction-of-the.jpg?s=612x612&w=0&k=20&c=Kozp-lrF2SKwShKMV3b6l-FrErAGw2hiXtSVVGIuu7A=',
                'https://media.istockphoto.com/id/1405880267/photo/two-engineers-installing-solar-panels-on-roof.jpg?s=1024x1024&w=is&k=20&c=mskLiEze3fWKilJamAiSM5imZnX1MjhZ9V4q7TJTAVI=',
            ],
        }
    },
    {
        user: {
            username: 'adamgreen',
            password: 'pass123',
            email: 'adam@landmaster.com',
            firstName: 'Adam',
            lastName: 'Green',
            role: 'provider',
            city: 'Edmonton',
            phone: '555-000-8888',
            bio: 'Backyard landscaping.'
        },
        profile: {
            category: 'landscaping',
            hourlyRate: 68,
            isVerified: true,
            city: 'Edmonton',
            bio: 'Designs modern outdoor spaces.',
            rating: 4.9,
            yearsOfExperience: 4,
            workImages: [
                'https://media.istockphoto.com/id/1166203849/photo/garden-worker-trimming-plants.jpg?s=1024x1024&w=is&k=20&c=rRJXcf-07pPi2wWrhw1IycK3SHECGtFkxUB1M3AFs9s=',
                'https://media.istockphoto.com/id/1312760160/photo/big-garden-grass-field-mowing-by-caucasian-gardener.jpg?s=1024x1024&w=is&k=20&c=ln0D2ZTNy8nc-t5zeXecdXi_VlojH5HC3PrNmG9fqX8=',
            ],

        }
    },
    {
        user: {
            username: 'ninafixit',
            password: 'pass123',
            email: 'nina@pipesafe.com',
            firstName: 'Nina',
            lastName: 'Drill',
            role: 'provider',
            city: 'Halifax',
            phone: '222-888-7777',
            bio: 'Reliable pipe specialist.'
        },
        profile: {
            category: 'plumbing',
            hourlyRate: 72,
            isVerified: true,
            city: 'Halifax',
            bio: 'Certified for residential and industrial plumbing.',
            rating: 4.6,
            yearsOfExperience: 11,
            workImages: [
                'https://media.istockphoto.com/id/1516511531/photo/a-plumber-carefully-fixes-a-leak-in-a-sink-using-a-wrench.jpg?s=1024x1024&w=is&k=20&c=LkKMuHe7Uj0PjkyC0bn7HEQmQ8Iidl8B8_rqFiPSS2A=',
                'https://media.istockphoto.com/id/169270269/photo/plumbers-working-on-pipes-under-sink.jpg?s=1024x1024&w=is&k=20&c=E_gFYtt4HfwqJHc9I2oqY1adEyIT-2lKimkkV5UWgR4=',
            ]
        }
    }
];

const adminUser = {
    username: 'adminmaster',
    password: 'admin123',
    email: 'admin@servicematch.com',
    firstName: 'Admin',
    lastName: 'Master',
    role: 'admin',
    city: 'Toronto',
    phone: '999-999-9999',
    bio: 'System administrator'
};

const customerUsers = [
    {
        username: 'customer1',
        password: 'pass123',
        email: 'customer1@example.com',
        firstName: 'Alice',
        lastName: 'Smith',
        role: 'customer',
        city: 'Toronto',
        phone: '111-111-1111'
    },
    {
        username: 'customer2',
        password: 'pass123',
        email: 'customer2@example.com',
        firstName: 'Brian',
        lastName: 'Johnson',
        role: 'customer',
        city: 'Vancouver',
        phone: '222-222-2222'
    },
    {
        username: 'customer3',
        password: 'pass123',
        email: 'customer3@example.com',
        firstName: 'Carol',
        lastName: 'Lee',
        role: 'customer',
        city: 'Calgary',
        phone: '333-333-3333'
    },
    {
        username: 'customer4',
        password: 'pass123',
        email: 'customer4@example.com',
        firstName: 'David',
        lastName: 'Wong',
        role: 'customer',
        city: 'Ottawa',
        phone: '444-444-4444'
    },
    {
        username: 'customer5',
        password: 'pass123',
        email: 'customer5@example.com',
        firstName: 'Eva',
        lastName: 'Brown',
        role: 'customer',
        city: 'Halifax',
        phone: '555-555-5555'
    }
];

const seed = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        await User.deleteMany();
        await Service.deleteMany();
        await ProviderProfile.deleteMany();

        // Seed services
        const insertedServices = await Service.insertMany(services);
        console.log(`✅ Inserted ${insertedServices.length} services`);

        // Seed providers + linked profiles
        for (const provider of providersWithProfiles) {
            const createdUser = await User.create(provider.user);
            await ProviderProfile.create({
                ...provider.profile,
                user: createdUser._id
            });
            console.log(` Linked profile to user: ${createdUser.username}`);
        }

        // Add admin user
        const createdAdmin = await User.create(adminUser);
        console.log(` Admin created: ${createdAdmin.username}`);

        // Add customer users
        for (const customer of customerUsers) {
            const createdCustomer = await User.create(customer);
            console.log(` Customer created: ${createdCustomer.username}`);
        }

        console.log('Seeding completed successfully');
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

seed();
