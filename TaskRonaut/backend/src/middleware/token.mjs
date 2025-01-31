import connection from "../database/dbCon.mjs";
import {sha256} from "./sha256.mjs";
import {authenticationQueries} from "../database/dbQueries.mjs";
import logger from "./logger.mjs";

/**
 * Generates an activation token for a user based on their email address.
 *
 * This function retrieves the user ID associated with the given email address,
 * generates a SHA-256-based activation token using the user ID, and updates
 * the user's activation status in the database with the generated token.
 *
 * @param {string} email - The email address of the user for whom the token is generated.
 * @returns {Promise<void>} - A promise that resolves when the token generation
 * and database update processes are completed.
 */
export async function generateToken(email) {
    try {
        const [user] = await connection.query(authenticationQueries.getUserIdByEmail, [email]);
        const userid = user[0]?.id;
        const activationToken = await sha256(userid);

        const [rows] = await connection.query(authenticationQueries.setEmailActivationStatus, [activationToken, userid])
    } catch (e) {
        logger.error(e);
    }
}


