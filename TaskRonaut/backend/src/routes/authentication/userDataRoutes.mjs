import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import {Router} from "express";
import {getSessions, getUserData, getUserId} from "../../controller/authentication/userDataController.mjs";

const router = Router();
router.post('/user', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`GET USER DATA: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const sessionId = req.body.sessionId;
    await serverResponse(res, await getUserData(sessionId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});
router.get('/allSessions', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`GET SESSIONS: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    await serverResponse(res, await getSessions());
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});
router.post('/userId', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`GET USER ID: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const sessionId = req.body.sessionId;
    await serverResponse(res, await getUserId(sessionId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;
