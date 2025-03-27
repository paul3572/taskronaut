import {findUserBySessionId} from "../../middleware/session.mjs";
import boardMemberModel from "../../models/board/boardMemberModel.mjs";
import {PermissionDeniedError} from "../../database/errors.mjs";
import boardMessagesModel from "../../models/chat/boardMessagesModel.mjs";
import chalk from "chalk";
import logger from "../../middleware/logger.mjs";
import {styles} from "../../database/loggingStyle.mjs";

class BoardMessagesController {
    async sendMessage(sessionId, boardId, message) {
        const myUserId = await findUserBySessionId(sessionId);
        logger.debug(chalk.hex(styles.debug)(`My User-ID: ${myUserId}, Board-ID: ${boardId}, Message: ${message}`));
        const myUserIdEntries = await boardMemberModel.getUserEntriesInBoard(myUserId, boardId);
        if (myUserIdEntries[0] === null || myUserIdEntries[0] === undefined) {
            throw new PermissionDeniedError("User is not allowed to board-chat");
        } else {
            await boardMessagesModel.createNewMessage(boardId, myUserId, message);
            return {statusCode: 201};
        }
    }

    async viewMessage(sessionId, boardId) {
        const myUserId = await findUserBySessionId(sessionId);
        logger.debug(chalk.hex(styles.debug)(`My User-ID: ${myUserId}, Board-ID: ${boardId}`));
        const myUserIdEntries = await boardMemberModel.getUserEntriesInBoard(myUserId, boardId);
        if (myUserIdEntries[0] === null || myUserIdEntries[0] === undefined) {
            throw new PermissionDeniedError("User is not allowed to board-chat");
        } else {
            const result = await boardMessagesModel.getMessages(boardId);
            return {statusCode: 200, data: result};
        }
    }

    async deleteMessage(sessionId, messageId) {
        const myUserId = await findUserBySessionId(sessionId);
        logger.debug(chalk.hex(styles.debug)(`My User-ID: ${myUserId}, Message-ID: ${messageId}`));
        const boardId = await boardMessagesModel.getBoardIdByMessageId(messageId);
        logger.debug(chalk.hex(styles.debug)(`My User-ID: ${myUserId}, Message-ID: ${messageId}, Board-ID: ${boardId}`));
        const myUserIdEntries = await boardMemberModel.getUserEntriesInBoard(myUserId, boardId);
        if (myUserIdEntries[0] === null || myUserIdEntries[0] === undefined) {
            throw new PermissionDeniedError("User is not allowed to board-chat");
        } else {
            await boardMessagesModel.deleteMessage(messageId);
            return {statusCode: 200};
        }
    }
}

export default new BoardMessagesController();