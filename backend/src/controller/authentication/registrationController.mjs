import regex from "../../config/regex.mjs";
import dbConnection from "../../database/dbCon.mjs";
import {authenticationQueries} from "../../database/dbQueries.mjs";
import {sha256} from "../../middleware/sha256.mjs";
import {generateToken} from "../../middleware/token.mjs";
import {sendEmail} from "../../middleware/email.mjs";
import authenticationModel from "../../models/authentication/authenticationModel.mjs";
import chalk from "chalk";
import {styles} from "../../config/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";
import {DatabaseError, EmailAlreadyInUseError, EmailSendingError, InvalidInputError} from "../../config/errors.mjs";
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

    async handleRegistrationRequest(email, password, firstName, lastName) {
        if (this.registrationRegex(email, password, firstName, lastName)) {
            await authenticationModel.checkIfEmailExists(email);

            const hPw = await sha256(password);
            await authenticationModel.createUser(email, hPw, firstName, lastName);
            logger.info(chalk.hex(styles.info)`User added successfully to database!`);
            logger.info(chalk.hex(styles.info)`Start generating validation token for ${email}...`);
            await generateToken(email);
            logger.info(chalk.hex(styles.info)(`...generating validdtion token...`));
            const activationToken = await authenticationModel.getActivationTokenByUserEmail(email);
            logger.info(chalk.hex(styles.info)(`...token generated!`));
            logger.info(chalk.hex(styles.info)(`ACTIVATION TOKEN:  ${activationToken}`));

            /*
            // Create Default Board for new User
            const userId = await selectUserIdByEmail(email);
            const boardName = "Default Board";
            const returnValue = [userId?.id, true]
            await handleBoardCreation(boardName, returnValue);
            logger.info(chalk.hex(styles.info)`Default Board ${boardName} added to user ${JSON.stringify(returnValue)}`);
             */

            const url = `http://taskronaut.at/activateEmail?token=${activationToken}`;
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
        } else {
            logger.error(chalk.hex(styles.warning)(`No valid input!`));
            throw new InvalidInputError("No valid input!");
        }
    }
}

export default new RegistrationController();