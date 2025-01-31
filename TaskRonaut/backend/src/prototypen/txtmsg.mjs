import dbConnection from './db.mjs';
import {encrypt, decrypt} from './crypto.mjs';

/** Nachricht senden
 *
 * @param senderId
 * @param receiverId
 * @param messageText
 * @returns {Promise<*>}
 */
async function sendMessage(senderId, receiverId, messageText) {
    const encryptedMessage = encrypt(messageText); // Nachricht verschlüsseln

    const [result] = await dbConnection.query(
        'INSERT INTO messages (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, NOW())',
        [senderId, receiverId, JSON.stringify(encryptedMessage)] // Verschlüsselte Nachricht speichern
    );

    return result;
}

/** Nachrichten abrufen
 *
 * @param userId
 * @param chatPartnerId
 * @returns {Promise<*>}
 */
async function getMessages(userId, chatPartnerId) {
    const [rows] = await dbConnection.query(
        'SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp',
        [userId, chatPartnerId, chatPartnerId, userId]
    );

    /** Nachrichten entschlüsseln
     *
     */
    const decryptedMessages = rows.map(row => ({
        sender: row.sender_id,
        receiver: row.receiver_id,
        message: decrypt(JSON.parse(row.message)),  // Nachricht entschlüsseln
        timestamp: row.timestamp
    }));

    return decryptedMessages;
}
