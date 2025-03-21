import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import dragANDdropController from "../../controller/board/dragANDdropController.mjs";
import {Router} from "express";


const router = new Router();
router.patch('/list', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`DRAG&DROP LIST: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionID, taskID, listID} = req.body;
    await serverResponse(res, await dragANDdropController.updateListId(sessionID, taskID, listID));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});
router.patch('/status', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`DRAG&DROP STATUS: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionID, taskID, taskStatus} = req.body;
    await serverResponse(res, await dragANDdropController.updateStatus(sessionID, taskID, taskStatus));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});
export default router;