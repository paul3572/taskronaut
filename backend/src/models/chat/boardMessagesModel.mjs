import connection from "../../database/dbCon.mjs";
import {boardMessageQueries, p2pMessageQueries} from "../../database/dbQueries.mjs";
import authenticationModel from "../authentication/authenticationModel.mjs";

class BoardMessagesModel {
    async createNewMessage(boardId, senderID, message) {
        const [result] = await connection.query(boardMessageQueries.insertMessage, [boardId, senderID, message]);
        if (result !== null) {
            return result;
        } else {
            throw new Error();
        }
    }

    async getMessages(boardId) {
        const [messages] = await connection.query(boardMessageQueries.selectMessagesByBoardId, [boardId]);
        let returnMessages = [];
        for (const nachtricht of messages) {
            let messageId = nachtricht.messageID;
            let message = nachtricht.message;
            let userIdSender = nachtricht.senderID;
            let boardId = nachtricht.boardID;
            let timestamp = nachtricht.timestamp;

            const userSender = await authenticationModel.getUserById(userIdSender);

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
        const [result] = await connection.query(boardMessageQueries.selectBoardIdByMessageId, [messageId]);
        if (result !== null) {
            return result[0]?.messageID;
        }
        throw new Error();
    }
}

export default new BoardMessagesModel();