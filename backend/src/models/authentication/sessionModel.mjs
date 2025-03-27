import dbConnection from "../../database/dbCon.mjs";
import {authenticationQueries, sessionQueries} from "../../database/dbQueries.mjs";

class SessionModel {
    async selectSessionByUserId(userId) {
        const [rows] = await dbConnection.query(authenticationQueries.getSessionByUserId, [userId]);
        return rows[0];
    }

    async selectSessionBySessionId(sessionId) {
        const [rows] = await dbConnection.query(authenticationQueries.getSessionBySessionId, [sessionId]);
        return rows[0];
    }

    async getUserIdFromSessionId(sessionId) {
        const [rows] = await dbConnection.query(sessionQueries.getUserIdBySessionId, [sessionId]);
        const myUserId = rows[0];
        if (myUserId !== null || undefined) {
            return myUserId;
        } else {
            throw new InvalidSessionError("Invalid Session");
        }
    }

    async updateUserIdInSession(userId, sessionId) {
        const [rows] = await dbConnection.query(sessionQueries.updateSessionUserId, [userId, sessionId]);
        if (rows instanceof Error) {
            throw new QueryExecutionError;
        }
        return rows[0];
    }

    async getAllSessionIds() {
        const [rows] = await dbConnection.query(sessionQueries.getSessionIds);
        if (rows instanceof Error) {
            throw new QueryExecutionError;
        }
        return rows;
    }
}

export default new SessionModel();