import psBoard from "../../database/preparedStatements/psBoard.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";
import psBoardMember from "../../database/preparedStatements/psBoardMember.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import {PermissionDeniedError} from "../../middleware/errors.mjs";

class BoardController {
    async boardRequest(sessionId) {
        const userId = await findUserBySessionId(sessionId);
        logger.info(chalk.hex(styles.success)('User-ID: ' + userId));
        const result = await psBoard.selectAllUserBoards(userId);
        logger.info(chalk.hex(styles.success)('Boards successfully loaded'));
        return {statusCode: 200, data: result};
    }

    async addBoard(boardName, sessionId) {

        let userId;
        if (sessionId[1] === true) {
            userId = sessionId[0];
        } else {
            userId = await findUserBySessionId(sessionId);
        }

        //  Add Boards:
        const result = await psBoard.insertNewBoard(boardName);
        const boardId = result[0].insertId;
        logger.info(chalk.hex(styles.success)('Boards successfully added'));
        await psBoardMember.insertNewBoardMembers(userId, boardId);

        return {statusCode: 200, data: result[0]};
    }

    async updateBoard(sessionId, boardId, boardName) {
        const myUserId = await findUserBySessionId(sessionId);
        const result = await psBoard.updateBoard(boardId, boardName);
        return {statusCode: 200};
    }

    async removeBoard(sessionId, boardId) {
        const myUserId = await findUserBySessionId(sessionId);
        const userToAddEntry = await psBoardMember.getBoardUserEntries(myUserId, boardId);
        if (userToAddEntry[0] === null || userToAddEntry[0] === undefined) {
            throw new PermissionDeniedError("User is not allowed to board");
        } else {
            const result = await psBoard.deleteBoard(boardId);
            logger.info(chalk.hex(styles.success)(`Board mit ID ${boardId} erfolgreich entfernt`));
            //TODO: Delete Chat
            return {statusCode: 200};
        }
    }
}

export default new BoardController();