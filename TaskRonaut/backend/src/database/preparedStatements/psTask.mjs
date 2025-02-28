import dbConnection from "../dbCon.mjs";
import {taskQueries} from "../dbQueries.mjs";
import logger from "../../middleware/logger.mjs";

class PsTask {
    async selectAllTasks() {
        const [tasks] = await dbConnection.query(taskQueries.getAllTasks);
        return tasks;
    }

    async createDefaultTask(taskCreatorID, taskName, boardID, listID) {
        const isAuthorized = 1;
        const isResponsible = 0;
        const [result] = await dbConnection.query(taskQueries.addDeafaultTask, [taskCreatorID, taskName, boardID, listID]);
        const [taskID] = await dbConnection.query(taskQueries.getTaskId, [taskCreatorID, taskName, boardID, listID]);
        console.log(taskID[0].taskID);
        const [result3] = await dbConnection.query(taskQueries.authorizeUser, [taskCreatorID, taskID[0].taskID, isAuthorized, isResponsible]);
        return true;
    }

    async patchTask(taskId, taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistoryID, boardID, listID) {
        logger.debug(`Executing query: ${taskQueries.updateTask} with parameters: ${[taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistoryID, boardID, listID, taskId]}`);
        const [result] = await dbConnection.query(taskQueries.updateTask, [taskName, taskCreator, taskCreationDate, dueDate, taskDescription, priorities, taskStatus, comments, taskHistoryID, boardID, listID, taskId]);
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
        console.log(tasks.length);
        if (tasks.length === 0) {
            logger.info('not found');
            throw new Error("Task not found");
        }
        return tasks;
    }


    async selectUserTasks(userId) {
        const [taskIds] = await dbConnection.query(taskQueries.getTasksByUserId, [userId]);
        console.log(JSON.stringify(taskIds));
        let tasks = [];

        for (let taskId of taskIds) {
            console.log(JSON.stringify(taskId?.taskID));
            const [task] = await dbConnection.query(taskQueries.getTaskById, [taskId.taskID]);
            tasks.push(task);
        }
        return tasks;
    }

}

export default new PsTask();