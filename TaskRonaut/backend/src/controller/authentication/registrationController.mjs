import {authenticationRegex} from "../../database/regex.mjs";
import dbConnection from "../../database/dbCon.mjs";
import {authenticationQueries} from "../../database/dbQueries.mjs";
import {sha256} from "../../middleware/sha256.mjs";
import {generateToken} from "../../middleware/token.mjs";
import {sendEmail} from "../../middleware/email.mjs";
import {getActivationTokenByUserEmail, getUserIdByEmail} from "../../database/preparedStatements/psAuthentication.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";
import {addBoard} from "../board/boardController.mjs";

/**
 * Checking if the user Input (email, password) has a valid syntax
 *
 * @param email
 * @param password
 * @param firstName
 * @param lastName
 * @returns {boolean} Checking if user input is syntax-valid
 */
function registrationRegex(email, password, firstName, lastName) {
    return (authenticationRegex.emailRegex.test(email) && authenticationRegex.passwordRegex.test(password) && authenticationRegex.nameRegex.test(firstName) && authenticationRegex.nameRegex.test(lastName)) === true;
}

export async function userRegistration(email, password, firstName, lastName) {
    if (registrationRegex(email, password, firstName, lastName)) {
        const [rows] = await dbConnection.query(authenticationQueries.getUserByEmail, [email]);
        if (rows.length === 0) {
            try {
                const hPw = await sha256(password);
                const [result] = await dbConnection.query(authenticationQueries.insertUser, [email, hPw, firstName, lastName]);
                logger.info(chalk.hex(styles.info)`User added successfully to database!`);
                logger.info(chalk.hex(styles.info)`Start generating validation token for ${email}...`)

                const userId = await getUserIdByEmail(email);
                const boardName = "Default Board";
                await addBoard(boardName, userId);
                logger.info(chalk.hex(styles.info)`Default Board ${boardName} added to user ${userId}`);


                await generateToken(email);
                const activationToken = await getActivationTokenByUserEmail(email);
                logger.info(chalk.hex(styles.info)`...generating validdtion token...`);

                const url = `http://taskronaut.at/activateEmail?token=${activationToken}`;
                logger.info(chalk.hex(styles.info)`...token generated!`)

                logger.info(chalk.hex(styles.info)`ACTIVATION TOKEN:  ${activationToken}`);
                const mailOptions = {
                    // hihi tolle email dies ned gibt
                    from: "noreply@taskronaut.at",
                    to: email,
                    subject: "Willkommen bei unserem Service!",
                    html: `
                        <p>Hallo ${firstName} ${lastName},</p>
                        <p>Danke für deine Registrierung bei uns!</p>
                        <p>Klicke <a href=${url}>hier</a>, um zu unserer Seite zu gelangen.</p>
                    `
                };
                await sendEmail(mailOptions);
                return {statusCode: 201};
            } catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    logger.info(chalk.hex(styles.warning)`E-Mail already in use!`);
                    return {statusCode: 409, message: `E-Mail already in use!`};
                } else {
                    logger.info(error);
                    return {statusCode: 500};
                }
            }
        } else {
            logger.error(chalk.hex(styles.warning)`E-Mail already in use!`);
            return {statusCode: 409, message: `E-Mail already in use`};
        }
    } else {
        logger.error(chalk.hex(styles.warning)`No valid input!`);
        return {statusCode: 400, message: `No valid input!`};
    }
}