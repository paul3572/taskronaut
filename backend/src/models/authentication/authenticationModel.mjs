import dbConnection from "../../database/dbCon.mjs";
import {authenticationQueries} from "../../database/dbQueries.mjs";
import {ActivationTokenNotFoundError, QueryExecutionError, UserNotFoundError} from "../../config/errors.mjs";

class AuthenticationModel {
    async getUserIdByEmail(email) {
        const [rows] = await dbConnection.query(authenticationQueries.selectUserByEmail, [email]);
        if (!rows || rows.length === 0) {
            throw new UserNotFoundError("Benutzer mit der angegebenen E-Mail-Adresse nicht gefunden.");
        }
        if (rows instanceof Error) {
            throw new QueryExecutionError("Fehler bei der Datenbankabfrage: " + rows.message);
        }
        return rows[0];
    }

    async getUserById(id) {
        const [rows] = await dbConnection.query(authenticationQueries.selectUserById, [id]);
        if (!rows || rows.length === 0) {
            //throw new UserNotFoundError("Benutzer mit der angegebenen ID nicht gefunden.");
        }
        if (rows instanceof Error) {
            throw new QueryExecutionError("Fehler bei der Datenbankabfrage: " + rows.message);
        }
        return {firstName: rows[0]?.firstname, lastName: rows[0]?.lastname, email: rows[0]?.email};
    }

    async getActivationTokenByUserEmail(email) {
        const [rows] = await dbConnection.query(authenticationQueries.selectActivationTokenFromUser, [email]);
        if (!rows || rows.length === 0) {
            throw new ActivationTokenNotFoundError("Aktivierungstoken für die angegebene E-Mail-Adresse nicht gefunden.");
        }
        if (!rows[0]?.activationToken) {
            throw new ActivationTokenNotFoundError("Aktivierungstoken ist nicht gesetzt.");
        }
        if (rows instanceof Error) {
            throw new QueryExecutionError("Fehler bei der Datenbankabfrage: " + rows.message);
        }
        return rows[0]?.activationToken;
    }

    async getUserIdBySessionId(sessionId) {
        const [rows] = await dbConnection.query(authenticationQueries.selectUserIdBySessionId, [sessionId]);

        if (!rows || rows.length === 0) {
            throw new UserNotFoundError("Benutzer mit der angegebenen Session-ID nicht gefunden.");
        }
        const userId = rows[0]?.userId;
        if (!userId) {
            throw new UserNotFoundError("Benutzer-ID wurde nicht gefunden.");
        }

        if (rows instanceof Error) {
            throw new QueryExecutionError("Fehler bei der Datenbankabfrage: " + rows.message);
        }
        return userId;
    }

    async getActivationStatusFromUserID(id) {
        const [rows] = await dbConnection.query(authenticationQueries.selectActivatedFromUser, [id]);
        if (!rows || rows.length === 0) {
            throw new UserNotFoundError("Benutzer mit der angegebenen ID nicht gefunden.");
        }

        if (rows instanceof Error) {
            throw new QueryExecutionError("Fehler bei der Datenbankabfrage: " + rows.message);
        }
        return rows[0]?.activated;
    }
}

export default new AuthenticationModel();