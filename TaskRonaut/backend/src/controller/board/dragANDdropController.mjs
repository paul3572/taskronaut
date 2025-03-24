import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import psDragANDdrop from "../../database/preparedStatements/psDragANDdrop.mjs";


class DragANDdropController {
    async updateListId(sessionId, taskId, listID) {
        const result = await psDragANDdrop.patchListId(taskId, listID);
        logger.info(chalk.hex(styles.success)`Task successfully updated`);
        return {statusCode: 200};
    }

    async updateStatus(sessionId, taskId, taskStatus) {
        const result = await psDragANDdrop.patchStatus(taskId, taskStatus);
        logger.info(chalk.hex(styles.success)`Task successfully updated`);
        return {statusCode: 200};
    }
}

export default new DragANDdropController();