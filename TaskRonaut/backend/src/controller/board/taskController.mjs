import taskModel from "../../models/board/taskModel.mjs";
import chalk from "chalk";
import logger from "../../middleware/logger.mjs";
import {styles} from "../../database/loggingStyle.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";
import {PermissionDeniedError, UserNotFoundError} from "../../database/errors.mjs";
import boardMemberModel from "../../models/board/boardMemberModel.mjs";

class TaskController {

    async getAllTask(sessionId) {
        const userId = await findUserBySessionId(sessionId);
        const result = await taskModel.selectAllTasks();

        logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
        return {statusCode: 200, data: result[0]};
    }

    async addNewDefaultTask(sessionId, taskName, boardID, listID) {
        const taskCreatorID = await findUserBySessionId(sessionId);
        if (taskCreatorID === null || undefined) {
            logger.error(chalk.hex(styles.critical) + `ERROR: User not found`);
            throw new UserNotFoundError("User not found");
        }
        const result = await taskModel.createDefaultTask(taskCreatorID, taskName, boardID, listID);
        logger.info(chalk.hex(styles.success)('Task successfully added'));
        return {statusCode: 201};
    }

    async updateTask(sessionId, taskId, taskName, dueDate, taskDescription, priorities, taskStatus, comments, boardID, listID) {
        const result = await taskModel.patchTask(taskId, taskName, dueDate, taskDescription, priorities, taskStatus, comments, boardID, listID);
        logger.info(chalk.hex(styles.success)`Task successfully updated`);
        return {statusCode: 200};
    }

    async removeTask(sessionId, taskId) {
        const myUserId = await findUserBySessionId(sessionId);
        const boardId = await taskModel.selectBoardIdByTask(taskId);
        const userToAddEntry = await boardMemberModel.getBoardUserEntries(myUserId, boardId);
        if (userToAddEntry[0] === null || userToAddEntry[0] === undefined) {
            throw new PermissionDeniedError("User is not allowed to board");
        } else {
            const result = await taskModel.deleteTask(taskId);
            logger.info(chalk.hex(styles.success)`Task with ID ${taskId} successfully removed`);
            return {statusCode: 200};
        }
    }

    async getListIdFromTaskId(taskId) {
        const result = await taskModel.selectListIdByTaskId(taskId);
        logger.info(chalk.hex(styles.success)`List ID found`);
        return {statusCode: 200, data: result};
    }

    async getUserSpecificTasks(sessionId, boardId) {
        const userid = await findUserBySessionId(sessionId);
        // TODO: Check if user is allwoed to board
        const result = await taskModel.selectUserTasks(boardId);

        logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
        return {statusCode: 200, data: result};
    }

    async getSpecificTasks(sessionId, boardId) {
        const userid = await findUserBySessionId(sessionId);
        // TODO: where boardId = ....
        const result = await taskModel.selectUserTasks(boardId);
        logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
        return {statusCode: 200, data: result};
    }
}

export default new TaskController();