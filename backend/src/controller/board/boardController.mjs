import boardModel from "../../models/board/boardModel.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";
import boardMemberModel from "../../models/board/boardMemberModel.mjs";
import {PermissionDeniedError} from "../../database/errors.mjs";

class BoardController {
    async handleBoardRequest(sessionId) {
        const userId = await findUserBySessionId(sessionId);
        logger.info(chalk.hex(styles.success)('User-ID: ' + userId));
        const result = await boardModel.getAllUserBoards(userId);
        logger.info(chalk.hex(styles.success)('Boards successfully loaded'));
        return {statusCode: 200, data: result};
    }

    async boardCreationProcess(boardName, sessionId) {
        let userId;
        if (sessionId[1] === true) {
            userId = sessionId[0];
        } else {
            userId = await findUserBySessionId(sessionId);
        }

        const result = await boardModel.createNewBoard(boardName);
        const boardId = result[0].insertId;
        logger.info(chalk.hex(styles.success)('Boards successfully added'));
        await boardMemberModel.createNewBoardMember(userId, boardId);

        return {statusCode: 200, data: result[0]};
    }

    async handleBoardUpdate(sessionId, boardId, boardName) {
        const myUserId = await findUserBySessionId(sessionId);
        const result = await boardModel.updateBoard(boardId, boardName);
        return {statusCode: 200};
    }

    async boardRemovalProcess(sessionId, boardId) {
        const myUserId = await findUserBySessionId(sessionId);
        const userToAddEntry = await boardMemberModel.getUserEntriesInBoard(myUserId, boardId);
        if (userToAddEntry[0] === null || userToAddEntry[0] === undefined) {
            throw new PermissionDeniedError("User is not allowed to board");
        } else {
            const result = await boardModel.deleteBoard(boardId);
            logger.info(chalk.hex(styles.success)(`Board mit ID ${boardId} erfolgreich entfernt`));
            //TODO: Delete Chat
            return {statusCode: 200};
        }
    }
}

export default new BoardController();