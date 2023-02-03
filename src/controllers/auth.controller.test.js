const authControllers = require('./auth.controller');
const authService = require('../services/auth.service');

jest.mock('../services/auth.service');

describe.skip('createUser', () => {
    test('should return status 201 Created when user is created successfully.', async () => {
        authService.register.mockResolvedValue({
            success: true,
            message: "",
            data: {
                id: 1,
                firstName: 'Joe',
                lastName: 'Doe',
                email: 'jdoe@example.org'
            }
        });

        const newUserData = {
            firstName: 'Joe',
            lastName: 'Doe',
            email: 'jdoe@example.org',
            password: '123'
        };

        // authControllers.registerUser()
        
    });

});