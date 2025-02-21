import {sha256} from "../../middleware/sha256.mjs";
import {authenticationRegex} from "../../database/regex.mjs";
import {getActivationStatusFromUserID, getUserIdByEmail} from "../../database/preparedStatements/psAuthentication.mjs";
import logger from "../../middleware/logger.mjs";
import {startSession} from "../../middleware/session2.mjs";
import {updateUserIdInSession} from "../../database/preparedStatements/psSession.mjs";

/**
 * Checking if the user Input (email, password) has a valid syntax
 * The requirements are stored in a separate File
 *
 * @param email User Input
 * @param password User Input
 * @returns {boolean} is input matching requirements
 */
function loginRegex(email, password) {
    return (authenticationRegex.emailRegex.test(email) && authenticationRegex.passwordRegex.test(password)) === true;
}

/**
 * Handles the user authentication process by validating the provided email and password.
 *
 * This function performs input validation using a regular expression, fetches
 * the user's details from the database, hashes the provided password, and checks
 * if it matches the stored password. Depending on the outcome, it returns an
 * appropriate status code and message.
 *
 * @param req
 * @param {string} email - The user's email address. This is used to identify the user in the database.
 * @param {string} password - The user's plain-text password to be verified.
 * @returns {Promise<Object>} - A promise that resolves to an object containing a status code and message.
 * - `statusCode: 200`: Login successful; the session can start.
 * - `statusCode: 401`: Unauthorized due to invalid credentials.
 * - `statusCode: 400`: Bad request due to invalid input.
 * - `statusCode: 500`: Internal server error.
 *
 * @description
 *  The function performs the following steps:
 *  1. Validates the input using the `loginRegex` function.
 *  2. Retrieves the user details by email using the `getUserIdByEmail` function.
 *  3. Hashes the provided password with `sha256` and compares it with the stored hash.
 *  4. Returns a success or failure response based on the password match.
 *  5. Logs errors and handles unexpected issues gracefully.
 */
export async function userLogin(req, email, password) {
    if (loginRegex(email, password)) {
        try {
            const user = await getUserIdByEmail(email)
            if (user === null) {
                logger.info("user does not exist");
                return {statusCode: 401};
            }
            const hashedPassword = await sha256(password);
            const isPasswordValid = hashedPassword === user.password;
            console.log("Hashed PW: "+hashedPassword);
            console.log("User PW: "+user.password);
            const emailIsActivated = await getActivationStatusFromUserID(user.id);
            console.log("Email activated: "+emailIsActivated);


            if (isPasswordValid && emailIsActivated === 1) {
                logger.info("Passwort korrekt. Starte Session für Benutzer-ID:");
                const sessionDetails = await startSession(req, user.id);
                const result = await updateUserIdInSession(user.id, req.sessionID);
                return {
                    statusCode: 200,
                    message: `Start Session for User-ID: ${user.id}`,
                    data: {session: req.session, sessionId: req.sessionID}
                };
            } else {
                logger.info("Ungültige Anmeldedaten, (Falsches Passwort).");
                return {statusCode: 401, message: `Password not correct.`};
            }
        } catch (error) {
            console.log(error);
            logger.error("Fehler bei der Login-Verarbeitung:", error);
            return {statusCode: 500};
        }
    } else {
        return {statusCode: 400, message: `No valid input`};
    }
}