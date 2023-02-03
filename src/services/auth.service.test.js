const User = require('../models/user.model');
const userService = require('./auth.service');

jest.mock('../models/user.model');

describe('register', () => {
    test('should create new user given first name, last name, email and password and user does not exists', async () => {

        const newUserData = {
            email: 'test@test.org',
            firstName: 'Test',
            lastName: 'User',
            password: '123'
        };

        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({
            id: 1,
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName
        });

        const result = await userService.register(newUserData);

        expect(result).not.toBeNull();
        expect(result.success).toBeTruthy();
        expect(result.message).toBe("");
        expect(result.data?.id).toBe(1);
        expect(result.data?.email).toBe(newUserData.email);
        expect(result.data?.firstName).toBe(newUserData.firstName);
        expect(result.data?.lastName).toBe(newUserData.lastName);
        expect(result.data?.password).toBeUndefined();
    });

    test('should not create user if another user with the same email exists already', async () => {
        const newUserData = {
            email: 'test@test.org',
            firstName: 'Test',
            lastName: 'User',
            password: '123'
        };

        User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@test.org',
            firstName: 'Joe',
            lastName: 'Doe'
        });

        const result = await userService.register(newUserData);

        expect(result).not.toBeNull();
        expect(result.success).toBeFalsy();
        expect(result.message).toBe("User already exists.");
    });
});