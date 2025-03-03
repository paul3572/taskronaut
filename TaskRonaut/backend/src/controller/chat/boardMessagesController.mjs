import {findUserBySessionId} from "../../middleware/session.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import psMessages from "../../database/preparedStatements/psBoardMessages.mjs";
import psBoardMember from "../../database/preparedStatements/psBoardMember.mjs";
import {PermissionDeniedError} from "../../middleware/errors.mjs";
import psBoardMessages from "../../database/preparedStatements/psBoardMessages.mjs";

class BoardMessagesController {
    async send(sessionId, boardId, message) {
        try {
            const myUserId = await findUserBySessionId(sessionId);
            const myUserIdEntries = await psBoardMember.getBoardUserEntries(myUserId, boardId);
            if (myUserIdEntries[0] === null || myUserIdEntries[0] === undefined) {
                throw new PermissionDeniedError("User is not allowed to board-chat");
            } else {
                await psBoardMessages.insertNewMessage(boardId, myUserId, message);
                return {statusCode: 201};
            }
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async view(sessionId, boardId) {
        try {
            const myUserId = await findUserBySessionId(sessionId);
            const myUserIdEntries = await psBoardMember.getBoardUserEntries(myUserId, boardId);
            if (myUserIdEntries[0] === null || myUserIdEntries[0] === undefined) {
                throw new PermissionDeniedError("User is not allowed to board-chat");
            } else {
                const result = await psMessages.getMessages(boardId);
                return {statusCode: 200, data: result};
            }
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async delete(sessionId, messageId) {
        try {
            const myUserId = await findUserBySessionId(sessionId);
            const boardId = await psBoardMessages.getBoardIdByMessageId(messageId);
            const myUserIdEntries = await psBoardMember.getBoardUserEntries(myUserId, boardId);
            if (myUserIdEntries[0] === null || myUserIdEntries[0] === undefined) {
                throw new PermissionDeniedError("User is not allowed to board-chat");
            } else {
                await psBoardMessages.deleteMessage(messageId);
                return {statusCode: 200};
            }

        } catch (error) {
            return await errorHandler(error);
        }

    }
}

export default new BoardMessagesController();