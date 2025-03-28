import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../config/loggingStyle.mjs";
import dragANDdropModel from "../../models/board/dragANDdropModel.mjs";


class DragANDdropController {
    async handleListIdUpdateRequest(sessionId, taskId, listID) {
        const result = await dragANDdropModel.updateListId(taskId, listID);
        logger.info(chalk.hex(styles.success)`Task successfully updated`);
        return {statusCode: 200};
    }

    async handleStatusUpdateRequest(sessionId, taskId, taskStatus) {
        const result = await dragANDdropModel.updateStatus(taskId, taskStatus);
        logger.info(chalk.hex(styles.success)`Task successfully updated`);
        return {statusCode: 200};
    }
}

export default new DragANDdropController();