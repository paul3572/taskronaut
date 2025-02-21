import {Router} from 'express';
import {isAuthenticated} from '../../middleware/session.mjs';
import dbConnection from '../../database/dbCon.mjs';
import {taskQueries} from "../../database/dbQueries.mjs";
import {
    addNewDefaultTask,
    getAllTask,
    getListIdFromTaskId,
    getUserSpecificTasks,
    removeTask, updateTask
} from "../../controller/board/taskController.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";

const router = Router();

router.post('/tasks/get', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`USER TASKS REQUESTED: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId}=req.body;
    await serverResponse(res, await getAllTask(sessionId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/tasks', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`NEW TASK : `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    let {sessionId, taskName, boardID, listID} = req.body;



    await serverResponse(res, await addNewDefaultTask(sessionId, taskName, boardID, listID));
});

router.post('/tasks/byBoardUser', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`NEW TASK : `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    let {sessionId, borardId} = req.body;



    await serverResponse(res, await getSpecificTasks(sessionId, borardId));
});

router.put('/tasks/:id', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`UPDATE TASK: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));

    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.patch('/tasks/update', async (req, res) => {    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`UPDATE TASK: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {
        sessionID,
        taskID,
        taskName,
        taskCreator,
        taskCreationDate,
        dueDate,
        taskDescription,
        priorities,
        taskStatus,
        comments,
        taskHistoryID,
        boardID,
        listID
    } = req.body;
    await serverResponse(res, await updateTask(sessionID, taskID, taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistoryID, boardID, listID));    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.delete('/tasks/:id', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`DELETE TASK: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {id} = req.params;
    await serverResponse(res, await removeTask(id))
    logger.info(chalk.hex(styles.dialogEnd)`Task deletion finished!`);
});

router.patch('/tasks/:id/listId', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`SET NEW LIST-ID FOR TASK: `);
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
            const [rows] = await dbConnection.execute(taskQueries.getTaskById, [id]);
            const updatedTask = rows[0];
            res.status(200).send(updatedTask);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.get('/getListIdFromTaskId/:id', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`GET LIST-ID FROM TASK-ID: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const taskId = req.params.id;
    await serverResponse(res, await getListIdFromTaskId(taskId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/tasks/user/', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`GET USER-SPECIFIC TASKS: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId} = req.body;
    await serverResponse(res, await getUserSpecificTasks(sessionId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});


export default router;
