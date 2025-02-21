import dbConnection from "../dbCon.mjs";
import {authenticationQueries} from "../dbQueries.mjs";

export async function getUserIdByEmail(email) {
    const [rows] = await dbConnection.query(authenticationQueries.getUserByEmail, [email]);
    return rows[0];
}

export async function getUserById(id) {
    const [rows] = await dbConnection.query(authenticationQueries.getUserById, [id]);
    return {firstName: rows[0]?.firstname, lastName: rows[0]?.lastname, email: rows[0]?.email};
}

export async function getActivationTokenByUserEmail(email) {
    const [rows] = await dbConnection.query(authenticationQueries.getActivationTokenFromUser, [email]);
    return rows[0]?.activationToken;
}

export async function getUserIdBySessionId(sessionId) {
    try {
        const [rows] = await dbConnection.query(authenticationQueries.getUserIdBySessionId, [sessionId]);
        return rows[0]?.user_id;
    }
    catch (error) {
        console.error("Error getting user id by session id:", error);
        return error;
    }
}
export async function getUserIdByEmail(email) {
    try {
        const [rows] = await dbConnection.query(authenticationQueries.getUserIdBySessionId, [email]);
        return rows[0]?.user_id;
    }
    catch (error) {
        console.error("Error getting user id by session id:", error);
        return error;
    }
}
export async function getActivationStatusFromUserID(id) {
    const [rows] = await dbConnection.query(authenticationQueries.userIdEmailActivated, [id]);
    console.log(rows[0]?.activated);
    console.log(JSON.stringify(rows));
    return rows[0]?.activated;
}