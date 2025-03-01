import connection from "../dbCon.mjs";
import {boardMessageQueries} from "../dbQueries.mjs";
import {NoMessagesFoundError} from "../../middleware/errors.mjs";

class PsBoardMessages {
    async insertNewMessage(boardId, senderID, message) {
        const [result] = await connection.query(boardMessageQueries.createMessage, [boardId, senderID, message]);
        if (result !== null) {
            return result;
        } else {
            throw new Error();
        }
    }

    async getMessages(boardId) {
        const [result] = await connection.query(boardMessageQueries.getMessagesByBoardId, [boardId]);
        if (result !== null) {
            return result;
        }
        throw new NoMessagesFoundError();
    }

    async deleteMessage(messageId) {
        const [result] = await connection.query(boardMessageQueries.deleteMessage, [messageId]);
        if (result !== null) {
            return result;
        }
        throw new Error();
    }

    async getBoardIdByMessageId(messageId) {
        const [result] = await connection.query(boardMessageQueries.getBoardIdByMessageId, [messageId]);
        if (result !== null) {
            return result[0]?.messageID;
        }
        throw new Error();
    }
}

export default new PsBoardMessages();