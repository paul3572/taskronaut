import connection from "../dbCon.mjs";
import {boardMessageQueries, p2pMessageQueries} from "../dbQueries.mjs";
import psAuthentication from "./psAuthentication.mjs";

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
        const [messages] = await connection.query(boardMessageQueries.getMessagesByBoardId, [boardId]);
        let returnMessages = [];
        for (const nachtricht of messages) {
            let messageId = nachtricht.messageID;
            let message = nachtricht.message;
            let userIdSender = nachtricht.senderID;
            let boardId = nachtricht.boardID;
            let timestamp = nachtricht.timestamp;

            const userSender = await psAuthentication.getUserById(userIdSender);
            console.log(userSender);

            const senderName = userSender.firstName + " " + userSender.lastName;

            returnMessages.push({
                messageID: messageId,
                message: message,
                senderID: senderName,
                boardID: boardId,
                timestamp: timestamp
            });
        }
        return returnMessages;
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