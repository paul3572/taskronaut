import {Router} from 'express';
import boardController from "../../controller/board/boardController.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";


const router = Router();

router.post('/get', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`BOARDS REQUESTED: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId} = req.body;
    await serverResponse(res, await boardController.boardRequest(sessionId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/add', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`NEW BOARD: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {boardName, sessionId} = req.body;
    await serverResponse(res, await boardController.addBoard(boardName, sessionId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.patch('/update', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`UPDATE BOARD-NAME: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));

    const {sessionId, boardId, boardName} = req.body;
    await serverResponse(res, await boardController.updateBoard(sessionId, boardId, boardName));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.delete('/delete', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`DELETE BOARD: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId} = req.body;
    logger.info(`REMOVE BOARD WITH ID: ${boardId}`);
    await serverResponse(res, await boardController.removeBoard(sessionId, boardId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;
