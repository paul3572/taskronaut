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
        await serverResponse(res, await taskController.newDefaultTaskCreationProcess(sessionId, taskName, boardID, listID));
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
//TODO: Irrelevant
router.patch('/tasks/:id/listId', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`SET NEW LIST-ID FOR TASK: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));

    const {id} = req.params;
    const {listId} = req.body;

    if (!listId) {
        res.status(400).send("Fehlende listId im Request Body");
    }

    try {
        const [result] = await dbConnection.execute(taskQueries.updateTaskListId, [listId, id]);

        if (result.affectedRows === 0) {
            res.status(404).send('Task not found');
        } else {
            const [rows] = await dbConnection.execute(taskQueries.selectTaskById, [id]);
            const updatedTask = rows[0];
            res.status(200).send(updatedTask);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.get('/get/listId/:id', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)(`GET LIST-ID FROM TASK-ID: `));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const taskId = req.params.id;
    try {
        await serverResponse(res, await taskController.convertTaskIdToListId(taskId));
    } catch (exception) {
        await serverResponse(res, await errorHandler(exception));
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
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