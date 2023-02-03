const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const authService = require('./auth.service');

jest.mock('../models/user.model');
jest.mock('bcrypt');

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

        const result = await authService.register(newUserData);

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

        const result = await authService.register(newUserData);

        expect(result).not.toBeNull();
        expect(result.success).toBeFalsy();
        expect(result.message).toBe("User already exists.");
    });
});

describe('login', () => {
    test('should return JWT token for a valid user', async () => {
        const testCredentials = {
            email: 'test@test.org',
            password: 'some password $$1'
        };

        User.findOne.mockResolvedValue({
            id: 1,
            firstName: 'Joe',
            lastName: 'Doe',
            email: 'test@test.org',
            password: 'isdfkjshfddksfj'
        });
        bcrypt.compare.mockResolvedValue(true);

        const userData = { id: 1, email: testCredentials.email, firstName: 'Joe', lastName: 'Doe' };
        const expectedToken = jwt.sign(userData, process.env.JWT_SECRET, {
            expiresIn: "10m",
            algorithm: "HS512"
        });

        const result = await authService.login(testCredentials);

        expect(result).not.toBeNull();
        expect(result.success).toBeTruthy();
        expect(result.message).toBe("");
        expect(result.data?.token).toBe(expectedToken);

        expect(User.findOne).toBeCalled();
    });

    test('should return not success for non-existing user', async () => {
        const testCredentials = {
            email: 'test@test.org',
            password: 'some password $$1'
        };

        User.findOne.mockResolvedValue(null);

        const result = await authService.login(testCredentials);

        expect(result).not.toBeNull();
        expect(result.success).toBeFalsy();
        expect(result.message).toBe("Invalid credentials");
    });

    test('should return not success for invalid password', async () => {
        const testCredentials = {
            email: 'test@test.org',
            password: 'some password $$1'
        };

        User.findOne.mockResolvedValue({
            id: 1,
            firstName: 'Joe',
            lastName: 'Doe',
            email: 'test@test.org',
            password: 'isdfkjshfddksfj'
        });
        bcrypt.compare.mockResolvedValue(false);

        const result = await authService.login(testCredentials);

        expect(result).not.toBeNull();
        expect(result.success).toBeFalsy();
        expect(result.message).toBe("Invalid credentials");
    });
});