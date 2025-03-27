import regex from "../../database/regex.mjs";
import dbConnection from "../../database/dbCon.mjs";
import {authenticationQueries} from "../../database/dbQueries.mjs";
import {sha256} from "../../middleware/sha256.mjs";
import {generateToken} from "../../middleware/token.mjs";
import {sendEmail} from "../../middleware/email.mjs";
import authenticationModel from "../../models/authentication/authenticationModel.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";
import {DatabaseError, EmailAlreadyInUseError, InvalidInputError} from "../../database/errors.mjs";
import {config} from "../../config/config.mjs";


class RegistrationController {
    /**
     * Checking if the user Input (email, password) has a valid syntax
     *
     * @param email
     * @param password
     * @param firstName
     * @param lastName
     * @returns {boolean} Checking if user input is syntax-valid
     */
    registrationRegex(email, password, firstName, lastName) {
        return (regex.authenticationRegex.emailRegex.test(email) && regex.authenticationRegex.passwordRegex.test(password) && regex.authenticationRegex.nameRegex.test(firstName) && regex.authenticationRegex.nameRegex.test(lastName)) === true;
    }

    async userRegistration(email, password, firstName, lastName) {
        if (this.registrationRegex(email, password, firstName, lastName)) {
            const [rows] = await dbConnection.query(authenticationQueries.getUserByEmail, [email]);
            if (rows.length === 0) {
                try {
                    const hPw = await sha256(password);
                    const [result] = await dbConnection.query(authenticationQueries.insertUser, [email, hPw, firstName, lastName]);
                    logger.info(chalk.hex(styles.info)`User added successfully to database!`);
                    logger.info(chalk.hex(styles.info)`Start generating validation token for ${email}...`)

                    /*
                    // Create Default Board for new User
                    const userId = await getUserIdByEmail(email);
                    const boardName = "Default Board";
                    const returnValue = [userId?.id, true]
                    await addBoard(boardName, returnValue);
                    logger.info(chalk.hex(styles.info)`Default Board ${boardName} added to user ${JSON.stringify(returnValue)}`);
                     */

                    await generateToken(email);
                    const activationToken = await authenticationModel.getActivationTokenByUserEmail(email);
                    logger.info(chalk.hex(styles.info)(`...generating validdtion token...`));

                    const url = `http://taskronaut.at/activateEmail?token=${activationToken}`;
                    logger.info(chalk.hex(styles.info)(`...token generated!`));

                    logger.info(chalk.hex(styles.info)(`ACTIVATION TOKEN:  ${activationToken}`));
                    const mailOptions = {
                        from: config.nodeMailer.user,
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
                        logger.info(chalk.hex(styles.warning)(`E-Mail already in use!`));
                        throw new EmailAlreadyInUseError("E-Mail already in use!");
                    } else {
                        logger.info(error);
                        throw new DatabaseError("Error while adding user to database!");
                    }
                }
            } else {
                logger.error(chalk.hex(styles.warning)(`E-Mail already in use!`));
                throw new EmailAlreadyInUseError("E-Mail already in use!");
            }
        } else {
            logger.error(chalk.hex(styles.warning)(`No valid input!`));
            throw new InvalidInputError("No valid input!");
        }
    }
}

export default new RegistrationController();