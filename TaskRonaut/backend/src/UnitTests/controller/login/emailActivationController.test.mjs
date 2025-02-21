import {isEmailAuthenticated, activateEmail} from '@/api/controller/authentication/emailActivationController.mjs';
import connection from '../../../database/dbCon.mjs';
import { describe, it, expect, jest } from '@jest/globals';

jest.mock('../../../database/dbCon.mjs');

describe('emailActivationController', () => {
    describe('isEmailAuthenticated', () => {
        it('should return 200 if user is authenticated', async () => {
            connection.query.mockResolvedValue([[{activated: true}]]);
            const response = await isEmailAuthenticated(1);
            expect(response).toEqual({statusCode: 200, message: "User is authenticated"});
        });

        it('should return 401 if user is not authenticated', async () => {
            connection.query.mockResolvedValue([[{activated: false}]]);
            const response = await isEmailAuthenticated(1);
            expect(response).toEqual({statusCode: 401, message: "User is not authenticated"});
        });

        it('should return 500 if there is an error', async () => {
            connection.query.mockRejectedValue(new Error('Database error'));
            const response = await isEmailAuthenticated(1);
            expect(response).toEqual({statusCode: 500, message: "Error while checking user authentication"});
        });
    });

    describe('activateEmail', () => {
        it('should return 200 if user activation is successful', async () => {
            connection.query
                .mockResolvedValueOnce([[{id: 1}]])
                .mockResolvedValueOnce([{}]);
            const response = await activateEmail('valid-token');
            expect(response).toEqual({statusCode: 200, message: "User activation successful"});
        });

        it('should return 404 if token does not match any registered user', async () => {
            connection.query.mockResolvedValue([[]]);
            const response = await activateEmail('invalid-token');
            expect(response).toEqual({statusCode: 404, message: "Token does not match any registered user"});
        });

        it('should return 500 if there is an error while updating user activation status', async () => {
            connection.query
                .mockResolvedValueOnce([[{id: 1}]])
                .mockRejectedValueOnce(new Error('Database error'));
            const response = await activateEmail('valid-token');
            expect(response).toEqual({statusCode: 500, message: "Error while updating user activation status"});
        });

        it('should return 500 if there is an error while fetching user by token', async () => {
            connection.query.mockRejectedValue(new Error('Database error'));
            const response = await activateEmail('valid-token');
            expect(response).toEqual({statusCode: 500});
        });
    });
});