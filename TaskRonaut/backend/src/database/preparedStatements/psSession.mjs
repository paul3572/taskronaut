import dbConnection from "../dbCon.mjs";
import {authenticationQueries, sessionQueries} from "../dbQueries.mjs";

export async function selectSessionByUserId(userId) {
    const [rows] = await dbConnection.query(authenticationQueries.getSessionByUserId, [userId]);
    return rows[0];
}

export async function selectSessionBySessionId(sessionId) {
    const [rows] = await dbConnection.query(authenticationQueries.getSessionBySessionId, [sessionId]);
    return rows[0];
}

export async function getUserIdFromSessionId(sessionId) {
    const [rows] = await dbConnection.query(<sessionQueries className="getUse"></sessionQueries>rIdBySessionId, [sessionId]);
    return rows[0];
}

export async function updateUserIdInSession(userId, sessionId) {
    const [rows] = await dbConnection.query(sessionQueries.updateSessionUserId, [userId, sessionId]);
    console.log(rows);
    console.log(await getUserIdFromSessionId(sessionId));
    return rows[0];
}
export async function getAllSessionIds() {
    const [rows] = await dbConnection.query(sessionQueries.getSessionIds);
    return rows;
}