import {Router} from "express";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../config/loggingStyle.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import boardMemberController from "../../controller/board/boardMemberController.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";

const router = Router();

router.post('/get', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`BOARD-MEMBERS REQUESTED: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId} = req.body;
    try {
        await serverResponse(res, await boardMemberController.handleAllBoardMemberRequest(sessionId, boardId));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});


router.delete('/remove', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`REMOVE BOARD-MEMBER: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId, email} = req.body;
    try {
        await serverResponse(res, await boardMemberController.handleBoardMemberRemovalRequest(sessionId, boardId, email));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/add', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`NEW BOARD-MEMBER TO BOARD: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId, email} = req.body;
    try {
        await serverResponse(res, await boardMemberController.handleNewBoardMember(sessionId, boardId, email));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;