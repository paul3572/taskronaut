import logger from "../../middleware/logger.mjs";
    import chalk from "chalk";
    import {styles} from "../../config/loggingStyle.mjs";
    import {serverResponse} from "../../middleware/serverResponse.mjs";
    import {Router} from "express";
    import userDataController from "../../controller/authentication/userDataController.mjs";
    import {errorHandler} from "../../middleware/errorHandler.js";

    const router = Router();

    router.post('/user', async (req, res) => {
        logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
        logger.info(chalk.hex(styles.dialogStart)(`GET USER DATA: `));
        logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
        logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
        const sessionId = req.body.sessionId;
        try {
            await serverResponse(res, await userDataController.loadUserData(sessionId));
        } catch (exception) {
            await serverResponse(res, await errorHandler(exception));
        }
        logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
    });

    router.get('/allSessions', async (req, res) => {
        logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
        logger.info(chalk.hex(styles.dialogStart)(`GET SESSIONS: `));
        logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
        logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
        try {
            await serverResponse(res, await userDataController.loadAllSessions());
        } catch (exception) {
            await serverResponse(res, await errorHandler(exception));
        }
        logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
    });

    router.post('/userId', async (req, res) => {
        logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
        logger.info(chalk.hex(styles.dialogStart)(`GET USER ID: `));
        logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
        logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
        const sessionId = req.body.sessionId;
        try {
            await serverResponse(res, await userDataController.convertSessionIdToUserId(sessionId));
        } catch (exception) {
            await serverResponse(res, await errorHandler(exception));
        }
        logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
    });

    export default router;