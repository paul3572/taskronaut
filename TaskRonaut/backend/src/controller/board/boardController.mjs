import psBoard from "../../database/preparedStatements/psBoard.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";
import psBoardMember from "../../database/preparedStatements/psBoardMember.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";

class BoardController {
    async boardRequest(sessionId) {

        try {
            const userId = await findUserBySessionId(sessionId);
            const result = await psBoard.selectAllUserBoards(userId);
            logger.info(chalk.hex(styles.success)('Boards successfully loaded'));
            return {statusCode: 200, data: result};
        } catch (error) {
            return await errorHandler(error);
            /*
            if (error instanceof UserNotFoundError) {
                console.error(error.message);
            } else if (error instanceof NoBoardsFoundError) {
                console.error(error.message);
            } else if (error instanceof BoardNotFoundError) {
                console.error(error.message);
            } else if (error instanceof InvalidBoardMemberDataError) {
                console.error(error.message);
            } else if (error instanceof QueryExecutionError) {
                logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${error.message}`);
                return {statusCode: 500};
            } else {
                logger.error(chalk.hex(styles.critical)`ERROR`);
                return {statusCode: 500};
            }

             */
        }
    }


    async addBoard(boardName, sessionId) {
        try {
            let userId;
            if (sessionId[1] === true) {
                userId = sessionId[0];
            } else {
                userId = await findUserBySessionId(sessionId);
            }

            const result = await psBoard.insertNewBoard(boardName);
            const boardId = result[0].insertId;
            logger.info(chalk.hex(styles.success)('Boards successfully added'));
            console.log("result[0].insertId: " + boardId);
            await psBoardMember.insertNewBoardMembers(userId, boardId);
            return {statusCode: 200, data: result[0]};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async removeBoard(boardId) {
        try {
            const result = await psBoard.deleteBoard(boardId);
            logger.info(chalk.hex(styles.success)`Board mit ID ${boardId} erfolgreich entfernt`);
            return {statusCode: 200};
        } catch (error) {
            return await errorHandler(error);
        }
    }
}

export default new BoardController();