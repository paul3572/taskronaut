import dbConnection from "../../database/dbCon.mjs";
import {joins, taskQueries} from "../../database/dbQueries.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";

class TaskModel {
    async selectAllTasks() {
        const [tasks] = await dbConnection.query(taskQueries.getAllTasks);
        return tasks;
    }

    async createDefaultTask(taskCreatorID, taskName, boardID, listID) {
        const isAuthorized = 1;
        const isResponsible = 0;
        const [result] = await dbConnection.query(taskQueries.addDeafaultTask, [taskCreatorID, taskName, boardID, listID]);
        const [taskID] = await dbConnection.query(taskQueries.getTaskId, [taskCreatorID, taskName, boardID, listID]);
        const [result3] = await dbConnection.query(taskQueries.authorizeUser, [taskCreatorID, taskID[0].taskID, isAuthorized, isResponsible]);
        return true;
    }

    async patchTask(taskId, taskName, dueDate, taskDescription, priorities, taskStatus, comments, boardID, listID) {
        logger.debug(`Executing query: ${taskQueries.updateTask} with parameters: ${[taskName, dueDate, taskDescription, priorities, taskStatus, comments, boardID, listID, taskId]}`);
        const [result] = await dbConnection.query(taskQueries.updateTask, [taskName, dueDate, taskDescription, priorities, taskStatus, comments, boardID, listID, taskId]);
        if (result.affectedRows === 0) {
            throw new Error("Task not found");
        } else {
            return result;
        }
    }

    async deleteTask(id) {

        const [result] = await dbConnection.query(taskQueries.deleteTaskById, [id]);
        if (result.affectedRows === 0) {
            throw new Error("Task not found");
        } else {
            return result;
        }

    }

    async selectListIdByTaskId(taskId) {

        const [tasks] = await dbConnection.query(taskQueries.getListIdFromTaskById, [taskId]);
        if (tasks.length === 0) {
            logger.info('not found');
            throw new Error("Task not found");
        }
        return tasks;
    }

    async selectBoardIdByTask(taskId) {
        const [boardId] = await dbConnection.query(taskQueries.getBoardIdFromTaskById, [taskId]);
        console.log("Länge: " + boardId.length);
        if (boardId.length === 0) {
            logger.info('not found');
            throw new Error("Task not found");
        }
        return boardId[0].boardID;
    }


    async selectUserTasks(boardId) {
        const [tasks] = await dbConnection.query(joins.getBoardTasks, [boardId]);
        logger.debug(chalk.hex(styles.debug)(`Tasks: ${JSON.stringify(tasks)}`));
        return tasks;
    }

}

export default new TaskModel();