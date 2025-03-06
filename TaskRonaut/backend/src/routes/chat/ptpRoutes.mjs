import {Router} from 'express';
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import ptpMessagesController from "../../controller/chat/ptpMessagesController.mjs";

const router = Router();

router.post('/send', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`NEW P2P MESSAGE: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, otherUserEmail, message} = req.body;
    await serverResponse(res, await ptpMessagesController.send(sessionId, otherUserEmail, message));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/view', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`VIEW P2P MESSAGE LOG: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, otherUserEmail} = req.body;
    await serverResponse(res, await ptpMessagesController.view(sessionId, otherUserEmail));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});
router.delete('/delete', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`DELETE P2P MESSAGE: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, messageId} = req.body;
    await serverResponse(res, await ptpMessagesController.delete(sessionId, messageId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});


export default router;
