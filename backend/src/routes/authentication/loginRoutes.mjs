import express, {Router} from 'express';
import {destroySession} from "../../middleware/session2.mjs";
import loginController from "../../controller/authentication/loginController.mjs";
import registrationController from "../../controller/authentication/registrationController.mjs";
import emailActivationController from "../../controller/authentication/emailActivationController.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import chalk from "chalk";
import {styles} from "../../config/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";

const router = Router();
router.use(express.urlencoded({extended: true}));

router.post('/registration', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`REGISTRATION: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {email, password, firstName, lastName} = req.body;
    logger.debug([{Email: email, Password: password, FirstName: firstName, LastName: lastName}]);
    try {
        await serverResponse(res, await registrationController.handleRegistrationRequest(email, password, firstName, lastName));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dialogEnd)`Registration Process finished!`);
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/login', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`LOGIN: `));
    const {email, password} = req.body;
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    try {
        await serverResponse(res, await loginController.handleLoginRequest(req, email, password));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.get('/isEmailActivated/:userId', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`USER-ACTIVATION-STATUS-REQUEST: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const userId = req.params.userId;
    try {
        await serverResponse(res, await emailActivationController.checkEmailVerifiedStatus(userId));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/activateEmail/:token', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`ACTIVATE USER: `));
    const token = req.params.token;
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    try {
        await serverResponse(res, await emailActivationController.handleEmailActivationRequest(token));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/logout', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`Logout angefordert für User-ID: ${req?.session?.userId}`,));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    try {
        await destroySession(req, res);
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;