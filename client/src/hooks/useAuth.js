// hooks/useAuth.js

// You can switch between roles by changing `activeUser`

const mockUsers = {
    provider: {
        _id: '67f6242a72831acc49e69938',
        username: 'ninafixit',
        role: 'provider',
        email: 'nina@pipesafe.com',
        firstName: 'Nina',
        lastName: 'Drill',
        city: 'Halifax',
        phone: '222-888-7777',
        bio: 'Reliable pipe specialist.'
    },
    admin: {
        _id: '67f6242a72831acc49e6993c',
        username: 'adminmaster',
        role: 'admin',
        email: 'admin@servicematch.com',
        firstName: 'Admin',
        lastName: 'Master',
        city: 'Toronto',
        phone: '999-999-9999',
        bio: 'System administrator'
    },

    customer1: {
        _id: '67f71fad1ccf1e6c357bb637',
        username: 'customer1',
        password: 'pass123',
        email: 'customer1@example.com',
        role: 'customer',
        firstName: 'Alice',
        lastName: 'Smith',
        city: 'Toronto',
        phone: '111-111-1111',
    },
    customer2: {
        _id: '67f71fad1ccf1e6c357bb639',
        username: 'customer2',
        password: 'pass123',
        email: 'customer2@example.com',
        role: 'customer',
        firstName: 'Brian',
        lastName: 'Johnson',
        city: 'Vancouver',
        phone: '222-222-2222',
    },

    provider1: {
        _id: '67f71fad1ccf1e6c357bb611',
        username: 'sallyspark',
        password: 'pass123',
        email: 'sally@electric.com',
        role: 'provider',
        firstName: 'Sally',
        lastName: 'Spark',
        city: 'Chicago',
        phone: '987-654-3210',
    }
};

// 🟢 Change the active role here to test
const activeUser = mockUsers.customer1; // Change to .admin or .customer as needed

export const useAuth = () => {
    return {
        currentUser: activeUser
    };
};
