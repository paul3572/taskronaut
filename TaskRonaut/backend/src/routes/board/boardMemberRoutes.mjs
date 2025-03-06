import {Router} from "express";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import boardMemberController from "../../controller/board/boardMemberController.mjs";

const router = Router();

router.post('/get', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`BOARD-MEMBERS REQUESTED: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId} = req.body;
    await serverResponse(res, await boardMemberController.getAllBoardMembers(sessionId, boardId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/board-members/hilfe', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`NEW BOARD-MEMBERS: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {userId, boardId} = req.body;
    await serverResponse(res, await boardMemberController.createNewBoardMember(userId, boardId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.delete('/remove', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`REMOVE BOARD-MEMBER: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId, email} = req.body;
    await serverResponse(res, await boardMemberController.removeBoardMember(sessionId, boardId, email));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/add', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`NEW BOARD-MEMBER TO BOARD: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId, email} = req.body;
    await serverResponse(res, await boardMemberController.addMemberToBoard(sessionId, boardId, email));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;