import taskModel from "../../models/board/taskModel.mjs";
import chalk from "chalk";
import logger from "../../middleware/logger.mjs";
import {styles} from "../../config/loggingStyle.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";
import {PermissionDeniedError, UserNotFoundError} from "../../config/errors.mjs";
import boardMemberModel from "../../models/board/boardMemberModel.mjs";

class TaskController {

    async handleAllTasksRequest(sessionId) {
        const userId = await findUserBySessionId(sessionId);
        const result = await taskModel.getAllTasks();

        logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
        return {statusCode: 200, data: result[0]};
    }

    async handleNewDefaultTaskCreation(sessionId, taskName, boardID, listID) {
        const taskCreatorID = await findUserBySessionId(sessionId);
        if (taskCreatorID === null || undefined) {
            logger.error(chalk.hex(styles.critical) + `ERROR: User not found`);
            throw new UserNotFoundError("User not found");
        }
        const result = await taskModel.createDefaultTask(taskCreatorID, taskName, boardID, listID);
        logger.info(chalk.hex(styles.success)('Task successfully added'));
        return {statusCode: 201};
    }

    async handleTaskUpdateRequest(sessionId, taskId, taskName, dueDate, taskDescription, priorities, taskStatus, comments, boardID, listID) {
        const result = await taskModel.updateTask(taskId, taskName, dueDate, taskDescription, priorities, taskStatus, comments, boardID, listID);
        logger.info(chalk.hex(styles.success)`Task successfully updated`);
        return {statusCode: 200};
    }

    async handleTaskRemovalRequest(sessionId, taskId) {
        const myUserId = await findUserBySessionId(sessionId);
        const boardId = await taskModel.getBoardIdByTask(taskId);
        const userToAddEntry = await boardMemberModel.getUserEntriesInBoard(myUserId, boardId);
        if (userToAddEntry[0] === null || userToAddEntry[0] === undefined) {
            throw new PermissionDeniedError("User is not allowed to board");
        } else {
            const result = await taskModel.deleteTask(taskId);
            logger.info(chalk.hex(styles.success)`Task with ID ${taskId} successfully removed`);
            return {statusCode: 200};
        }
    }

    async convertTaskIdToListId(taskId) {
        const result = await taskModel.getListIdByTaskId(taskId);
        logger.info(chalk.hex(styles.success)`List ID found`);
        return {statusCode: 200, data: result};
    }

    async handleUserSpecificTasksRequest(sessionId, boardId) {
        const userid = await findUserBySessionId(sessionId);
        // TODO: Check if user is allwoed to board
        const result = await taskModel.getUserTasks(boardId);

        logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
        return {statusCode: 200, data: result};
    }

    async handleSpecificTasksRequest(sessionId, boardId) {
        const userid = await findUserBySessionId(sessionId);
        // TODO: where boardId = ....
        const result = await taskModel.getUserTasks(boardId);
        logger.info(chalk.hex(styles.success)('Tasks successfully loaded'));
        return {statusCode: 200, data: result};
    }
}

export default new TaskController();