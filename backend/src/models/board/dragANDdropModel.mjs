import logger from "../../middleware/logger.mjs";
import {dragANDdropQueries, taskQueries} from "../../database/dbQueries.mjs";
import dbConnection from "../../database/dbCon.mjs";

class DragANDdropModel {
    async updateListId(taskId, listID) {
        logger.debug(`Executing query: ${dragANDdropQueries.updateListId} with parameters: ${[listID, taskId]}`);
        const [result] = await dbConnection.query(dragANDdropQueries.updateListId, [listID, taskId]);
        if (result.affectedRows === 0) {
            throw new Error("Task not found");
        } else {
            return result;
        }
    }

    async updateStatus(taskId, taskStatus) {
        logger.debug(`Executing query: ${dragANDdropQueries.updateTaskStatus} with parameters: ${[taskStatus, taskId]}`);
        const [result] = await dbConnection.query(dragANDdropQueries.updateTaskStatus, [taskStatus, taskId]);
        if (result.affectedRows === 0) {
            throw new Error("Task not found");
        } else {
            return result;
        }
    }
}

export default new DragANDdropModel();