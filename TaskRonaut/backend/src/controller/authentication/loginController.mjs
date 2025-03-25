import {sha256} from "../../middleware/sha256.mjs";
import regex from "../../database/regex.mjs";
import authenticationModel from "../../models/authentication/authenticationModel.mjs";
import logger from "../../middleware/logger.mjs";
import {startSession} from "../../middleware/session2.mjs";
import sessionModel from "../../models/authentication/sessionModel.mjs";
import {
    InvalidInputError,
    InvalidLoginDataError,
    UserNotActivatedError,
    UserNotFoundError
} from "../../database/errors.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";

class LoginController {

    /**
     * Checking if the user Input (email, password) has a valid syntax
     * The requirements are stored in a separate File
     *
     * @param email User Input
     * @param password User Input
     * @returns {boolean} is input matching requirements
     */
    loginRegex(email, password) {
        return (regex.authenticationRegex.emailRegex.test(email) && regex.authenticationRegex.passwordRegex.test(password)) === true;
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
    async userLogin(req, email, password) {
        if (this.loginRegex(email, password)) {
            const user = await authenticationModel.getUserIdByEmail(email);
            if (user === null) {
                logger.info(chalk.hex(styles.info)(`No User found for email: ${email}`));
                throw new UserNotFoundError(email);
            }
            const hashedPassword = await sha256(password);
            const isPasswordValid = hashedPassword === user.password;
            logger.debug(chalk.hex(styles.debug)(`Is Password ${hashedPassword} same as ${user.password}? It's ${isPasswordValid}.`));


            if (isPasswordValid) {
                const emailIsActivated = await authenticationModel.getActivationStatusFromUserID(user.id);
                logger.debug(chalk.hex(styles.debug)(`Email ${email} is activated: ${emailIsActivated}`));
                if (emailIsActivated === 0) {
                    throw new UserNotActivatedError(user.id);
                }
                logger.info(chalk.hex(styles.debug)(`Starte Session für User ${user.id}:`));
                await startSession(req, user.id);
                await sessionModel.updateUserIdInSession(user.id, req.sessionID);
                return {
                    statusCode: 200,
                    message: `Starte Session für User ${user.id}:`,
                    data: {session: req.session, sessionId: req.sessionID}
                };
            } else {
                logger.info(chalk.hex(styles.info)("Ungültige Anmeldedaten, (Falsches Passwort)."));
                throw new InvalidLoginDataError("Invalid login data.");
            }
        } else {
            throw new InvalidInputError("Invalid input data.");
        }
    }
}

export default new LoginController();