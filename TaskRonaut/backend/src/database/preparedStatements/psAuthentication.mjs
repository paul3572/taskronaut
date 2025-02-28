import dbConnection from "../dbCon.mjs";
import {authenticationQueries} from "../dbQueries.mjs";
import {ActivationTokenNotFoundError, QueryExecutionError, UserNotFoundError} from "../../middleware/errors.mjs";

class PsAuthentication {
    async getUserIdByEmail(email) {
        const [rows] = await dbConnection.query(authenticationQueries.getUserByEmail, [email]);
        if (!rows || rows.length === 0) {
            throw new UserNotFoundError("Benutzer mit der angegebenen E-Mail-Adresse nicht gefunden.");
        }
        if (rows instanceof Error) {
            throw new QueryExecutionError("Fehler bei der Datenbankabfrage: " + rows.message);
        }
        return rows[0];
    }

    async getUserById(id) {
        const [rows] = await dbConnection.query(authenticationQueries.getUserById, [id]);
        if (!rows || rows.length === 0) {
            throw new UserNotFoundError("Benutzer mit der angegebenen ID nicht gefunden.");
        }
        if (rows instanceof Error) {
            throw new QueryExecutionError("Fehler bei der Datenbankabfrage: " + rows.message);
        }
        return {firstName: rows[0]?.firstname, lastName: rows[0]?.lastname, email: rows[0]?.email};
    }

    async getActivationTokenByUserEmail(email) {
        const [rows] = await dbConnection.query(authenticationQueries.getActivationTokenFromUser, [email]);
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
        const [rows] = await dbConnection.query(authenticationQueries.getUserIdBySessionId, [sessionId]);

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
        console.log("ID: " + id);
        const [rows] = await dbConnection.query(authenticationQueries.userIdEmailActivated, [id]);
        console.log(rows[0]?.activated);
        console.log(JSON.stringify(rows));
        if (!rows || rows.length === 0) {
            throw new UserNotFoundError("Benutzer mit der angegebenen ID nicht gefunden.");
        }

        if (rows instanceof Error) {
            throw new QueryExecutionError("Fehler bei der Datenbankabfrage: " + rows.message);
        }
        return rows[0]?.activated;
    }
}

export default new PsAuthentication();