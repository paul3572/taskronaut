import psTask from "../../database/preparedStatements/psTask.mjs";
import chalk from "chalk";
import logger from "../../middleware/logger.mjs";
import {styles} from "../../database/loggingStyle.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import {UserNotFoundError} from "../../middleware/errors.mjs";

class TaskController {

    async getAllTask(sessionId) {
        try {
            const userId = await findUserBySessionId(sessionId);
            const result = await psTask.selectAllTasks();

            logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
            return {statusCode: 200, data: result[0]};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async addNewDefaultTask(sessionId, taskName, boardID, listID) {
        try {
            const taskCreatorID = await findUserBySessionId(sessionId);
            if (taskCreatorID === null || undefined) {
                logger.error(chalk.hex(styles.critical) + `ERROR: User not found`);
                throw new UserNotFoundError("User not found");
            }
            const result = await psTask.createDefaultTask(taskCreatorID, taskName, boardID, listID);
            logger.info(chalk.hex(styles.success)('Task successfully added'));
            return {statusCode: 201};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async updateTask(sessionId, taskId, taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistoryID, boardID, listID) {
        try {
            const result = await psTask.patchTask(taskId, taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistoryID, boardID, listID);
            logger.info(chalk.hex(styles.success)`Task successfully updated`);
            return {statusCode: 200};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async removeTask(taskId) {
        try {
            const result = await psTask.deleteTask(taskId);

            logger.info(chalk.hex(styles.success)`Task with ID ${taskId} successfully removed`);
            return {statusCode: 200};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async getListIdFromTaskId(taskId) {
        try {
            const result = await psTask.selectListIdByTaskId(taskId);
            logger.info(chalk.hex(styles.success)`List ID found`);
            return {statusCode: 200, data: result};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async getUserSpecificTasks(sessionId, boardId) {
        try {
            const userid = await findUserBySessionId(sessionId);
            // TODO: Check if user is allwoed to board
            const result = await psTask.selectUserTasks(boardId);

            logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
            return {statusCode: 200, data: result};

        } catch (error) {
            return await errorHandler(error);
        }
    }

    async getSpecificTasks(sessionId, boardId) {
        try {
            const userid = await findUserBySessionId(sessionId);
            // TODO: where boardId = ....
            const result = await psTask.selectUserTasks(boardId);
            logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
            return {statusCode: 200, data: result};


        } catch (error) {
            return await errorHandler(error);
        }
    }
}

export default new TaskController();