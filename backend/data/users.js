import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'User One',
        email: 'userOne@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'User Two',
        email: 'userTwo@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    }
];

export default users;