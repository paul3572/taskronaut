import listController from "../../controller/board/listController.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import chalk from "chalk";
import {styles} from "../../config/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";
import {Router} from "express";
import {errorHandler} from "../../middleware/errorHandler.js";

const router = new Router();
//TODO: Irrelevant
router.get('/lists', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`LIST REQUESTED: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    try {
        await serverResponse(res, await listController.handleListRequest());
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/get', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`BOARD-LISTS REQUESTED: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId} = req.body;
    try {
        await serverResponse(res, await listController.handleListRequestForBoard(sessionId, boardId));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/add', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`NEW LIST: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId, listName} = req.body;
    try {
        await serverResponse(res, await listController.handleListCreation(sessionId, boardId, listName));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.patch('/update', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`UPDATE LIST: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, listId, listName} = req.body;
    try {
        await serverResponse(res, await listController.handleListUpdateRequest(sessionId, listId, listName));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.delete('/delete', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`DELETE LIST: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, listId} = req.body;
    logger.info(`DELETE LIST ID: ${listId}`);
    try {
        await serverResponse(res, await listController.handleListRemovalRequest(sessionId, listId));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;