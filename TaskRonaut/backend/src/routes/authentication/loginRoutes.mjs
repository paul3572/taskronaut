import express, {Router} from 'express';
import {destroySession} from "../../middleware/session.mjs";
import {userLogin} from "../../controller/authentication/loginController.mjs";
import {userRegistration} from "../../controller/authentication/registrationController.mjs";
import {activateEmail, isEmailAuthenticated} from "../../controller/authentication/emailActivationController.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";

const router = Router();
router.use(express.urlencoded({extended: true}));

router.post('/registration', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`REGISTRATION:`);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {email, password, firstName, lastName} = req.body;
    // TODO: table ausgabe logger
    logger.debug([{Email: email, Password: password, FirstName: firstName, LastName: lastName}]);
    await serverResponse(res, await userRegistration(email, password, firstName, lastName))
    logger.info(chalk.hex(styles.dialogEnd)`Registration Process finished!`);
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/login', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`LOGIN: `);
    const {email, password} = req.body;
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    await serverResponse(res, await userLogin(req, email, password))
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.get('/isEmailActivated/:userId', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`USER-ACTIVATION-STATUS-REQUEST: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const userId = req.params.userId;
    await serverResponse(res, await isEmailAuthenticated(userId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/activateEmail/:token', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`ACTIVATE USER: `);
    const token = req.params.token;
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    await serverResponse(res, await activateEmail(token));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/logout', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`Logout angefordert für User-ID: ${req?.session?.userId}`,);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    await destroySession(req, res);
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;
