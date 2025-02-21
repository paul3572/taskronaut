import dbConnection from '../database/dbCon.mjs';
import { v4 as uuidv4 } from 'uuid';

export async function startSession(req, res, userId) {
    const sessionId = uuidv4();
    await dbConnection.execute(
        "INSERT INTO Sessions (sessionId, userId, expires) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 DAY))",
        [sessionId, userId]
    );

    res.cookie('sessionId', sessionId, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    });
}

export async function isAuthenticated(req, res, next) {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return res.status(401).send('Nicht autorisiert');
    }

    const [rows] = await dbConnection.execute(
        "SELECT userId FROM Sessions WHERE sessionId = ? AND expires > NOW()",
        [sessionId]
    );

    if (rows.length === 0) {
        return res.status(401).send('Session abgelaufen oder ungültig');
    }

    req.userId = rows[0].userId;
    next();
}

export async function destroySession(req, res) {
    const sessionId = req.cookies.sessionId;
    if (sessionId) {
        await dbConnection.execute("DELETE FROM Sessions WHERE sessionId = ?", [sessionId]);
        res.clearCookie('sessionId');
    }
    res.send("Erfolgreich ausgeloggt");
}
