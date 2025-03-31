import {Router} from 'express';
import dbConnection from '../../database/dbCon.mjs';
import {taskQueries} from "../../database/dbQueries.mjs";
import taskController from "../../controller/board/taskController.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import chalk from "chalk";
import {styles} from "../../config/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";

const router = Router();

router.post('/tasks/get', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`USER TASKS REQUESTED: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId} = req.body;
    try {
        await serverResponse(res, await taskController.handleAllTasksRequest(sessionId));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/add', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`NEW TASK : `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    let {sessionId, taskName, boardID, listID} = req.body;
    try {
        await serverResponse(res, await taskController.handleNewDefaultTaskCreation(sessionId, taskName, boardID, listID));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
});

router.post('/get', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`TASKS BY BOARD USER : `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    let {sessionId, boardId} = req.body;
    try {
        await serverResponse(res, await taskController.handleSpecificTasksRequest(sessionId, boardId));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
});

router.patch('/update', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`UPDATE TASK: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {
        sessionID,
        taskID,
        taskName,
        dueDate,
        taskDescription,
        priorities,
        taskStatus,
        comments,
        boardID,
        listID
    } = req.body;
    try {
        await serverResponse(res, await taskController.handleTaskUpdateRequest(sessionID, taskID, taskName, dueDate, taskDescription, priorities, taskStatus, comments, boardID, listID));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.delete('/delete', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`DELETE TASK: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, taskId} = req.body;
    try {
        await serverResponse(res, await taskController.handleTaskRemovalRequest(sessionId, taskId));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dialogEnd)`Task deletion finished!`);
});

router.post('/get/byBoard', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`GET USER-SPECIFIC TASKS: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId} = req.body;
    try {
        await serverResponse(res, await taskController.handleUserSpecificTasksRequest(sessionId, boardId));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;