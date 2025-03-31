// regex.test.js
import Regex from '../config/regex.mjs';

describe('Regex', () => {
    test('should validate email addresses correctly', () => {
        expect(Regex.authenticationRegex.emailRegex.test('test@example.com')).toBe(true);
        expect(Regex.authenticationRegex.emailRegex.test('invalid-email')).toBe(false);
    });

    test('should validate passwords correctly', () => {
        expect(Regex.authenticationRegex.passwordRegex.test('Valid123!')).toBe(true);
        expect(Regex.authenticationRegex.passwordRegex.test('invalid')).toBe(false);
    });

    test('should validate names correctly', () => {
        expect(Regex.authenticationRegex.nameRegex.test('John')).toBe(true);
        expect(Regex.authenticationRegex.nameRegex.test('John123')).toBe(false);
    });
});