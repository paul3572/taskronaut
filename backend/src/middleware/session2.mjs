import dbConnection from '../database/dbCon.mjs';
import { v4 as uuidv4 } from 'uuid';

export async function startSession(req, userId) {
    const sessionId = uuidv4();
    await dbConnection.query(
        "INSERT INTO Sessions (sessionId, userId, expires) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 DAY))",
        [sessionId, userId]
    );

    req.session = { sessionId, userId };
    return sessionId;
}

export async function isAuthenticated(req) {
    const sessionId = req.session?.sessionId;
    if (!sessionId) {
        return { authenticated: false, message: 'Nicht autorisiert' };
    }

    const [rows] = await dbConnection.query(
        "SELECT userId FROM Sessions WHERE sessionId = ? AND expires > NOW()",
        [sessionId]
    );

    if (rows.length === 0) {
        return { authenticated: false, message: 'Session abgelaufen oder ungültig' };
    }

    req.userId = rows[0].userId;
    return { authenticated: true, userId: req.userId };
}

export async function destroySession(req) {
    const sessionId = req.session?.sessionId;
    if (sessionId) {
        await dbConnection.query("DELETE FROM Sessions WHERE sessionId = ?", [sessionId]);
        req.session = null;
    }
    return { message: "Erfolgreich ausgeloggt" };
}
