import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = 'abcdefghijklmnopqrstuvwx123456789'; // 32 Zeichen lang
const iv = crypto.randomBytes(16); // Initialisierungsvektor (IV), zufällig

/** Nachricht verschlüsseln
 *
 * @param text
 * @returns {{encryptedData: string, iv: string}}
 */
function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return {iv: iv.toString('hex'), encryptedData: encrypted};
}

/** Nachricht entschlüsseln
 *
 * @param encryptedText
 * @returns {string}
 */
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(encryptedText.iv, 'hex'));
    let decrypted = decipher.update(encryptedText.encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}
