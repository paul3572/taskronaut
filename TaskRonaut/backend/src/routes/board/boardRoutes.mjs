import {Router} from 'express';
import {addBoard, boardRequest, removeBoard} from "../../controller/board/boardController.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import {
    addMemberToBoard,
    createNewBoardMember,
    getAllBoardMembers,
    removeBoardMember
} from "../../controller/board/boardMemberController.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";

const router = Router();

router.post('/boards/get', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`BOARDS REQUESTED: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId} = req.body;
    await serverResponse(res, await boardRequest(sessionId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/boards', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`NEW BOARD: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {boardName} = req.body;
    logger.debug(boardName);
    await serverResponse(res, await addBoard(boardName));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.delete('/boards/:id', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`DELETE BOARD: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    logger.info(`REMOVE BOARD WITH ID: ${boardId}`);
    await serverResponse(res, await removeBoard(boardId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/board-members', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`BOARD-MEMBERS REQUESTED: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId} = req.body;
    await serverResponse(res, await getAllBoardMembers(sessionId, boardId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/board-members', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`NEW BOARD-MEMBERS: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {userId, boardId} = req.body;
    await serverResponse(res, await createNewBoardMember(userId, boardId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.delete('/board-members/:id', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`REMOVE BOARD-MEMBER: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const userId = req.params.id;
    logger.info(`REMOVE BOARD MEMBER WITH ID: ${userId}`);
    await serverResponse(res, await removeBoardMember(userId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/board-member-to-board', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`NEW BOARD-MEMBER TO BOARD: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId, email} = req.body;
    await serverResponse(res, await addMemberToBoard(sessionId, boardId, email));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;
