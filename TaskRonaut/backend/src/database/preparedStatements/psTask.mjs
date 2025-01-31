import dbConnection from "../dbCon.mjs";
import {taskQueries} from "../dbQueries.mjs";
import {getListIdFromTaskId} from "../../controller/board/taskController.mjs";
import logger from "../../middleware/logger.mjs";

export async function selectAllTasks() {
    try {
        const [tasks] = await dbConnection.query(taskQueries.getAllTasks);
        return [tasks, true];
    } catch (error) {
        logger.error("DATENBANKFEHLER: " + error.message);
        return [error, false];
    }
}

export async function createDefaultTask(taskCreatorID, taskName, boardID, listID) {
    try {
        const isAuthorized = 1;
        const isResponsible = 0;
        const [result] = await dbConnection.query(taskQueries.addDeafaultTask, [taskCreatorID, taskName, boardID, listID]);
        const [taskID] = await dbConnection.query(taskQueries.getTaskId, [taskCreatorID, taskName, boardID, listID]);
        console.log(taskID[0].taskID);
        const [result3] = await dbConnection.query(taskQueries.authorizeUser, [taskCreatorID, taskID[0].taskID, isAuthorized, isResponsible]);
        return true;
    } catch (error) {
        return false;
    }
}

export async function patchTask(taskId, taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistroryId) {
    try {
        const [result] = await dbConnection.query(taskQueries.updateTask, [taskId, taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistroryId]);
        if (result.affectedRows === 0) {
            return [result, 1];
        } else {
            return [result, 0];
        }
    } catch (error) {
        return [error, 2];
    }
}

export async function deleteTask(id) {
    try {
        const [result] = await dbConnection.query(taskQueries.deleteTaskById, [id]);
        if (result.affectedRows === 0) {
            return [result, 1];
        } else {
            return [result, 0];
        }
    } catch (error) {
        return [error, 2];
    }
}

export async function selectListIdByTaskId(taskId) {
    try {
        const [tasks] = await dbConnection.query(taskQueries.getListIdFromTaskById, [taskId]);
        console.log(tasks.length);
        if (tasks.length === 0) {
            logger.info('not found');
            return [tasks, 1];
        }
        return [tasks, 0];
    } catch (error) {
        logger.error("DATENBANKFEHLER: " + error.message);
        return [error, 2];
    }
}

export async function selectUserTasks(userId) {
    try {
        const [taskIds] = await dbConnection.query(taskQueries.getTasksByUserId, [userId]);
        console.log(JSON.stringify(taskIds));
        let tasks = [];

        for (let taskId of taskIds) {
            console.log(JSON.stringify(taskId?.taskID));
            const [task] = await dbConnection.query(taskQueries.getTaskById, [taskId.taskID]);
            tasks.push(task);
        }

        return [tasks, true];
    } catch (error) {
        logger.error("DATENBANKFEHLER: " + error.message);
        return [error, false];
    }
}