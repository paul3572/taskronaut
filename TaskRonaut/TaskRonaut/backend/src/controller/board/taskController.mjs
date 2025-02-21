import {
    createDefaultTask,
    deleteTask, patchTask,
    selectAllTasks,
    selectListIdByTaskId,
    selectUserTasks
} from "../../database/preparedStatements/psTask.mjs";
import chalk from "chalk";
import logger from "../../middleware/logger.mjs";
import {styles} from "../../database/loggingStyle.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";

export async function getAllTask(sessionId) {
    const userId = await findUserBySessionId(sessionId);
    const result = await selectAllTasks();
    switch (result[1]) {
        case true:
            logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
            return {statusCode: 200, data: result[0]};
        case false:
            logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${result[0]}`);
            return {statusCode: 500};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR`);
            return {statusCode: 500};
    }
}

export async function addNewDefaultTask(sessionId, taskName, boardID, listID) {
    const taskCreatorID = await findUserBySessionId(sessionId);
    if (taskCreatorID === null || undefined) {
        logger.error(chalk.hex(styles.critical) + `ERROR: User not found`);
        return {statusCode: 404};
    }
    const result = await createDefaultTask(taskCreatorID, taskName, boardID, listID);

    switch (result) {
        case true:
            logger.info(chalk.hex(styles.success)('Task successfully added'));
            return {statusCode: 201};
        case false:
            logger.error(chalk.hex(styles.critical)`ERROR: ${result[0]}`);
            return {statusCode: 500};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR`);
            return {statusCode: 500};
    }
}

export async function updateTask(sessionId, taskId, taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistoryID, boardID, listID) {
    const result = await patchTask(taskId, taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistoryID, boardID, listID);
    switch (result[1]) {
        case 0:
            logger.info(chalk.hex(styles.success)`Task successfully updated`);
            return {statusCode: 200};
        case 1:
            logger.info(chalk.hex(styles.info)`Task not found`);
            return {statusCode: 404};
        case 2:
            logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${result[0]}`);
            return {statusCode: 500};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR`);
            return {statusCode: 500};
    }
}

export async function removeTask(taskId) {
    const result = await deleteTask(taskId);
    switch (result[1]) {
        case 0:
            logger.info(chalk.hex(styles.success)`Task with ID ${taskId} successfully removed`);
            return {statusCode: 200};
        case 1:
            logger.info(chalk.hex(styles.info)`Task with Id ${taskId} not found`);
            return {statusCode: 404};
        case 2:
            logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${result[0]}`);
            return {statusCode: 500};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR`);
            return {statusCode: 500};
    }
}

export async function getListIdFromTaskId(taskId) {
    const result = await selectListIdByTaskId(taskId);
    switch (result[1]) {
        case 0:
            logger.info(chalk.hex(styles.success)`List ID found`);
            return {statusCode: 200, data: result[0]};
        case 1:
            logger.info(chalk.hex(styles.info)`Task with Id ${taskId} not found`);
            return {statusCode: 404};
        case 2:
            logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${result[0]}`);
            return {statusCode: 500};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR`);
            return {statusCode: 500};
    }
}

export async function getUserSpecificTasks(sessionId) {
    const userid = await findUserBySessionId(sessionId);
    const result = await selectUserTasks(userid);
    switch (result[1]) {
        case true:
            logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
            return {statusCode: 200, data: result[0]};
        case false:
            logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${result[0]}`);
            return {statusCode: 500, data: JSON.stringify(result[0])};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR`);
            return {statusCode: 500};
    }
}
export async function getSpecificTasks(sessionId, boardId) {
    const userid = await findUserBySessionId(sessionId);
    // TODO: where boardId = ....
    const result = await selectUserTasks(userid);
    switch (result[1]) {
        case true:
            logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
            return {statusCode: 200, data: result[0]};
        case false:
            logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${result[0]}`);
            return {statusCode: 500, data: JSON.stringify(result[0])};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR`);
            return {statusCode: 500};
    }
}